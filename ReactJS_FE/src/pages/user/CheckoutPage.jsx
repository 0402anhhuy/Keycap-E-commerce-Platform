import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { useCart } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const fmt = (n) => Number(n).toLocaleString("vi-VN") + "đ";

// ── QR Mock Images ──────────────────────────────────────────────────────
const MOMO_QR =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MoMo-UTEShop-Payment";
const VNPAY_QR =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VNPay-UTEShop-Payment";

const STEPS = ["Shipping", "Payment", "Review"];

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { items, total, fetchCart } = useCart();

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    // Shipping info
    const [ship, setShip] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        street: "",
    });
    const [shipErrors, setShipErrors] = useState({});
    const [userAddresses, setUserAddresses] = useState([]);

    // Payment
    const [payMethod, setPayMethod] = useState("cod");
    const [payConfirmed, setPayConfirmed] = useState(false); // VNPay/MoMo đã xác nhận
    const [countdown, setCountdown] = useState(600); // 10 phút

    // Coupon & Points states
    const [couponCode, setCouponCode] = useState("");
    const [couponError, setCouponError] = useState("");
    const [couponSuccess, setCouponSuccess] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const [usePoints, setUsePoints] = useState(false);
    const [userPoints, setUserPoints] = useState(0);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setCouponError("");
        setCouponSuccess("");
        const token = localStorage.getItem("accessToken");
        try {
            const res = await fetch(`${API_URL}/api/orders/check-coupon`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    couponCode: couponCode.trim(),
                    items: items.map((i) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                    })),
                }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || "Mã giảm giá không hợp lệ.");

            setAppliedCoupon(data);
            setCouponSuccess(
                `Áp dụng mã giảm giá thành công! Giảm ${fmt(data.discountAmount)}`,
            );
        } catch (err) {
            setCouponError(err.message);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode("");
        setCouponSuccess("");
        setCouponError("");
    };

    // Fetch và pre-fill address + profile từ user API để người dùng không phải nhập lại
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const loadProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) return;
                const data = await res.json();
                const u = data.user || data; // API trả về { user: {...} }
                setUserPoints(u.points || 0);

                // Tách họ và tên từ trường name
                const nameParts = u.name ? u.name.trim().split(/\s+/) : [];
                let fName = "";
                let lName = "";
                if (nameParts.length > 1) {
                    lName = nameParts.pop(); // Tên cuối
                    fName = nameParts.join(" "); // Họ đệm
                } else if (nameParts.length === 1) {
                    lName = nameParts[0];
                }

                // Tìm địa chỉ mặc định
                const defaultAddr =
                    u.addresses?.find((a) => a.isDefault) || u.addresses?.[0];
                let fullStreet = "";
                if (defaultAddr) {
                    fullStreet = [
                        defaultAddr.street,
                        defaultAddr.ward,
                        defaultAddr.district,
                        defaultAddr.city,
                    ]
                        .filter(Boolean)
                        .join(", ");
                }

                setShip({
                    firstName: fName,
                    lastName: lName,
                    phone: u.phone || "",
                    street: fullStreet,
                });

                if (u.addresses && Array.isArray(u.addresses)) {
                    setUserAddresses(u.addresses);
                }
            } catch (err) {
                console.error("Lỗi lấy thông tin profile để pre-fill:", err);
            }
        };

        loadProfile();
    }, []);

    // Countdown for MoMo/VNPay
    useEffect(() => {
        if (step === 1 && (payMethod === "momo" || payMethod === "vnpay")) {
            setCountdown(600);
            const timer = setInterval(() => {
                setCountdown((c) => {
                    if (c <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return c - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, payMethod]);

    const validateShip = () => {
        const errs = {};
        if (!ship.firstName.trim()) errs.firstName = "Vui lòng nhập họ.";
        if (!ship.lastName.trim()) errs.lastName = "Vui lòng nhập tên.";
        if (!ship.phone.trim()) errs.phone = "Vui lòng nhập số điện thoại.";
        if (!ship.street.trim()) errs.street = "Vui lòng nhập địa chỉ.";
        setShipErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const goToPayment = () => {
        if (validateShip()) setStep(1);
    };

    const goToReview = () => {
        if (payMethod === "cod" || payConfirmed) setStep(2);
        else setMsg("Vui lòng xác nhận thanh toán trước khi tiếp tục.");
    };

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }
        if (items.length === 0) {
            setMsg("Giỏ hàng trống.");
            return;
        }

        setLoading(true);
        setMsg(null);
        try {
            const shippingAddress = {
                fullName: `${ship.firstName} ${ship.lastName}`.trim(),
                phone: ship.phone,
                street: ship.street,
            };
            const orderItems = items.map((i) => ({
                productId: i.productId,
                quantity: i.quantity,
                color: i.color || null,
            }));
            const res = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: orderItems,
                    shippingAddress,
                    paymentMethod: payMethod,
                    couponCode: appliedCoupon ? appliedCoupon.code : undefined,
                    usePoints: usePoints,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Đặt hàng thất bại.");
            await fetchCart();
            navigate("/orders", { state: { success: true } });
        } catch (err) {
            setMsg(err.message || "Đặt hàng thất bại.");
        } finally {
            setLoading(false);
        }
    };

    const subtotal = total;
    const tax = Math.round(subtotal * 0.08);
    const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    const pointsDiscount = usePoints
        ? Math.min(userPoints * 1000, subtotal - couponDiscount)
        : 0;
    const finalTotal = Math.max(
        0,
        subtotal + tax - couponDiscount - pointsDiscount,
    );
    const fmtCountdown = `${String(Math.floor(countdown / 60)).padStart(2, "0")}:${String(countdown % 60).padStart(2, "0")}`;

    return (
        <div className="min-h-screen bg-[#e5e5e5] font-oswald flex flex-col relative text-black">
            <Header />
            <main className="flex-1 max-w-[1400px] mx-auto px-6 pt-[90px] md:pt-[100px] pb-12 w-full z-10">
                <Breadcrumb />
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-12">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-12 h-12 border-2 flex items-center justify-center font-bold text-sm transition-all shadow-[2px_2px_0_rgba(0,0,0,1)] ${
                                        i < step
                                            ? "bg-black text-white border-black"
                                            : i === step
                                              ? "bg-[var(--theme-accent)] text-black border-black"
                                              : "bg-[#f8f8f8] text-black/40 border-black/20"
                                    }`}
                                >
                                    {i < step ? (
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                <span
                                    className={`text-xs mt-3 font-bold uppercase tracking-widest ${i === step ? "text-black" : "text-black/40"}`}
                                >
                                    {s}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div
                                    className={`w-16 md:w-32 h-1 mx-4 mb-6 ${i < step ? "bg-black" : "bg-black/10"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Panel */}
                    <div className="flex-1">
                        {/* ── Step 0: Shipping + Payment Method ── */}
                        {step === 0 && (
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8">
                                <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-8">
                                    THÔNG TIN GIAO HÀNG
                                </h2>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <FormField
                                        label="Họ"
                                        value={ship.firstName}
                                        error={shipErrors.firstName}
                                        onChange={(e) =>
                                            setShip((p) => ({
                                                ...p,
                                                firstName: e.target.value,
                                            }))
                                        }
                                        placeholder="NGUYỄN"
                                    />
                                    <FormField
                                        label="Tên"
                                        value={ship.lastName}
                                        error={shipErrors.lastName}
                                        onChange={(e) =>
                                            setShip((p) => ({
                                                ...p,
                                                lastName: e.target.value,
                                            }))
                                        }
                                        placeholder="VĂN A"
                                    />
                                </div>
                                <FormField
                                    label="Số điện thoại"
                                    value={ship.phone}
                                    error={shipErrors.phone}
                                    onChange={(e) =>
                                        setShip((p) => ({
                                            ...p,
                                            phone: e.target.value,
                                        }))
                                    }
                                    placeholder="037XXXXXXX"
                                />
                                <FormField
                                    label="Địa chỉ giao hàng"
                                    value={ship.street}
                                    error={shipErrors.street}
                                    onChange={(e) =>
                                        setShip((p) => ({
                                            ...p,
                                            street: e.target.value,
                                        }))
                                    }
                                    placeholder="123 ĐƯỜNG LÊ LỢI, QUẬN 1, TP.HCM"
                                    className="mt-6"
                                />

                                {userAddresses.length >= 2 && (
                                    <div className="mt-6">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-3">
                                            CHỌN ĐỊA CHỈ ĐÃ LƯU:
                                        </label>
                                        <div className="space-y-4">
                                            {userAddresses.map((addr) => {
                                                const fullAddrText = [
                                                    addr.street,
                                                    addr.ward,
                                                    addr.district,
                                                    addr.city,
                                                ]
                                                    .filter(Boolean)
                                                    .join(", ");
                                                const isSelected =
                                                    ship.street ===
                                                    fullAddrText;

                                                return (
                                                    <button
                                                        key={addr.id}
                                                        type="button"
                                                        onClick={() =>
                                                            setShip((p) => ({
                                                                ...p,
                                                                street: fullAddrText,
                                                            }))
                                                        }
                                                        className={`w-full text-left p-4 border-2 flex items-start gap-3 transition-all ${
                                                            isSelected
                                                                ? "border-black bg-[var(--theme-accent)] shadow-[4px_4px_0_rgba(0,0,0,1)]"
                                                                : "border-black/20 hover:border-black bg-white"
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mt-0.5 bg-white`}
                                                        >
                                                            {isSelected && (
                                                                <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-black uppercase tracking-widest text-sm">
                                                                    {
                                                                        addr.street
                                                                    }
                                                                </span>
                                                                {addr.isDefault && (
                                                                    <span className="px-2 py-1 text-[10px] font-bold text-white bg-black uppercase tracking-widest">
                                                                        MẶC ĐỊNH
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {(addr.ward ||
                                                                addr.district ||
                                                                addr.city) && (
                                                                <span className="text-xs font-bold uppercase tracking-widest text-black/60 block mt-1">
                                                                    {[
                                                                        addr.ward,
                                                                        addr.district,
                                                                        addr.city,
                                                                    ]
                                                                        .filter(
                                                                            Boolean,
                                                                        )
                                                                        .join(
                                                                            ", ",
                                                                        )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Payment Method */}
                                <h2 className="font-anton text-2xl uppercase tracking-widest text-black mt-12 mb-8">
                                    PHƯƠNG THỨC THANH TOÁN
                                </h2>
                                <div className="grid grid-cols-3 gap-6">
                                    <PayOption
                                        id="cod"
                                        label="COD (TIỀN MẶT)"
                                        selected={payMethod === "cod"}
                                        onClick={() => setPayMethod("cod")}
                                    />
                                    <PayOption
                                        id="vnpay"
                                        label="VNPAY"
                                        selected={payMethod === "vnpay"}
                                        onClick={() => setPayMethod("vnpay")}
                                    />
                                    <PayOption
                                        id="momo"
                                        label="MOMO"
                                        selected={payMethod === "momo"}
                                        onClick={() => setPayMethod("momo")}
                                    />
                                </div>

                                {payMethod === "cod" && (
                                    <div className="mt-6 p-4 bg-[#f8f8f8] border-2 border-black flex items-start gap-4">
                                        <svg
                                            className="w-6 h-6 text-black flex-shrink-0 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-xs font-bold uppercase tracking-widest text-black leading-relaxed">
                                            THANH TOÁN KHI NHẬN HÀNG. VUI LÒNG
                                            CHUẨN BỊ ĐÚNG SỐ TIỀN KHI NHẬN HÀNG.
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center mt-12 pt-8 border-t-2 border-black/10">
                                    <button
                                        onClick={() => navigate("/cart")}
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                                    >
                                        <svg
                                            className="w-4 h-4 border-2 border-black bg-white rounded-full p-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                        QUAY LẠI GIỎ HÀNG
                                    </button>
                                    <button
                                        onClick={goToPayment}
                                        className="px-8 py-4 bg-[var(--theme-accent)] border-2 border-black text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all cursor-pointer"
                                    >
                                        TIẾP TỤC →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── Step 1: QR Payment / Confirm ── */}
                        {step === 1 && (
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8">
                                {payMethod === "cod" ? (
                                    <div className="text-center py-12">
                                        <div className="flex justify-center mb-6">
                                            <div className="w-20 h-20 bg-[var(--theme-accent)] border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-10 h-10 text-black"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="3"
                                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="font-anton text-2xl uppercase tracking-widest text-black mb-4">
                                            THANH TOÁN KHI NHẬN HÀNG (COD)
                                        </h3>
                                        <p className="text-xs font-bold uppercase tracking-widest text-black/60">
                                            ĐƠN HÀNG SẼ ĐƯỢC XÁC NHẬN VÀ GIAO
                                            TỚI ĐỊA CHỈ CỦA BẠN.
                                        </p>
                                        <p className="text-xs font-bold uppercase tracking-widest text-black/60 mt-1">
                                            VUI LÒNG CHUẨN BỊ ĐÚNG SỐ TIỀN KHI
                                            NHẬN HÀNG.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <h3 className="font-anton text-2xl uppercase tracking-widest text-black mb-4 flex items-center justify-center gap-3">
                                            {payMethod === "momo" ? (
                                                <>
                                                    <svg
                                                        className="w-8 h-8 text-[#ff0080]"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="3"
                                                            d="M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                        />
                                                    </svg>
                                                    THANH TOÁN MOMO
                                                </>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="w-8 h-8 text-[#0063a5]"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="3"
                                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                        />
                                                    </svg>
                                                    THANH TOÁN VNPAY
                                                </>
                                            )}
                                        </h3>
                                        <p className="text-sm font-bold uppercase tracking-widest text-black/60 mb-8">
                                            QUÉT MÃ QR ĐỂ THANH TOÁN{" "}
                                            {fmt(finalTotal)}
                                        </p>
                                        <div className="inline-block p-4 bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] mb-8">
                                            <img
                                                src={
                                                    payMethod === "momo"
                                                        ? MOMO_QR
                                                        : VNPAY_QR
                                                }
                                                alt="QR Code"
                                                className="w-48 h-48"
                                            />
                                        </div>
                                        <div
                                            className={`font-anton text-3xl tracking-widest mb-8 ${countdown < 60 ? "text-[#ff4d4f] animate-pulse" : "text-black"}`}
                                        >
                                            HẾT HẠN SAU: {fmtCountdown}
                                        </div>
                                        {!payConfirmed ? (
                                            <button
                                                onClick={() =>
                                                    setPayConfirmed(true)
                                                }
                                                className={`w-full py-4 border-2 border-black text-black font-bold uppercase tracking-widest text-sm hover:-translate-y-[2px] transition-all cursor-pointer ${
                                                    payMethod === "momo"
                                                        ? "bg-[#ff0080] text-white hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"
                                                        : "bg-[#0063a5] text-white hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"
                                                }`}
                                            >
                                                ✓ TÔI ĐÃ THANH TOÁN
                                            </button>
                                        ) : (
                                            <div className="w-full py-4 border-2 border-black bg-[var(--theme-accent)] text-black font-bold uppercase tracking-widest text-sm text-center shadow-[4px_4px_0_rgba(0,0,0,1)]">
                                                ✓ ĐÃ XÁC NHẬN THANH TOÁN
                                            </div>
                                        )}
                                    </div>
                                )}

                                {msg && (
                                    <p className="text-[#ff4d4f] font-bold text-sm text-center uppercase tracking-widest mt-6">
                                        {msg}
                                    </p>
                                )}

                                <div className="flex justify-between items-center mt-12 pt-8 border-t-2 border-black/10">
                                    <button
                                        onClick={() => {
                                            setStep(0);
                                            setMsg(null);
                                        }}
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                                    >
                                        <svg
                                            className="w-4 h-4 border-2 border-black bg-white rounded-full p-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                        QUAY LẠI
                                    </button>
                                    <button
                                        onClick={goToReview}
                                        className="px-8 py-4 bg-black border-2 border-black text-white text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all cursor-pointer"
                                    >
                                        XEM LẠI ĐƠN HÀNG →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── Step 2: Review ── */}
                        {step === 2 && (
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8">
                                <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-8">
                                    XÁC NHẬN ĐƠN HÀNG
                                </h2>

                                {/* Shipping Info Review */}
                                <div className="mb-8 p-6 bg-[#f8f8f8] border-2 border-black">
                                    <p className="text-[10px] text-black/50 uppercase font-bold tracking-widest mb-3">
                                        GIAO TỚI
                                    </p>
                                    <p className="font-bold uppercase tracking-widest text-black text-lg">
                                        {ship.firstName} {ship.lastName}
                                    </p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-black/60 mt-2">
                                        {ship.phone}
                                    </p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-black/60 mt-1">
                                        {ship.street}
                                    </p>
                                </div>

                                {/* Payment Method Review */}
                                <div className="mb-8 p-6 bg-[#f8f8f8] border-2 border-black flex items-center gap-4">
                                    <span className="flex-shrink-0">
                                        {payMethod === "cod" ? (
                                            <svg
                                                className="w-8 h-8 text-black"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        ) : payMethod === "momo" ? (
                                            <svg
                                                className="w-8 h-8 text-[#ff0080]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-8 h-8 text-[#0063a5]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                    <div>
                                        <p className="text-[10px] text-black/50 uppercase font-bold tracking-widest mb-1">
                                            PHƯƠNG THỨC THANH TOÁN
                                        </p>
                                        <p className="font-bold text-black uppercase tracking-widest">
                                            {payMethod === "cod"
                                                ? "THANH TOÁN KHI NHẬN HÀNG (COD)"
                                                : payMethod === "momo"
                                                  ? "VÍ MOMO"
                                                  : "VNPAY"}
                                        </p>
                                    </div>
                                </div>

                                {/* Items Review */}
                                <div className="space-y-4 mb-8">
                                    <p className="text-[10px] text-black/50 uppercase font-bold tracking-widest mb-2">
                                        SẢN PHẨM ĐÃ CHỌN
                                    </p>
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 p-4 bg-white border-2 border-black"
                                        >
                                            <div className="w-16 h-16 border-2 border-black overflow-hidden bg-[#e5e5e5] flex-shrink-0">
                                                {item.product?.image ? (
                                                    <img
                                                        src={
                                                            item.product.image.startsWith(
                                                                "http",
                                                            )
                                                                ? item.product
                                                                      .image
                                                                : `${API_URL}${item.product.image}`
                                                        }
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[#f8f8f8]" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-black uppercase tracking-widest truncate">
                                                    {item.product?.title}
                                                </p>
                                                {item.color && (
                                                    <p className="text-[10px] font-bold text-black/50 uppercase tracking-widest mt-1">
                                                        MÀU: {item.color}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right text-sm flex-shrink-0">
                                                <p className="text-xs font-bold uppercase tracking-widest text-black/50">
                                                    x{item.quantity}
                                                </p>
                                                <p className="font-anton text-xl tracking-wider text-black">
                                                    {fmt(item.lineTotal || 0)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {msg && (
                                    <p className="text-[#ff4d4f] font-bold text-sm text-center uppercase tracking-widest mb-8">
                                        {msg}
                                    </p>
                                )}

                                <div className="flex justify-between items-center mt-8 pt-8 border-t-2 border-black/10">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors"
                                    >
                                        <svg
                                            className="w-4 h-4 border-2 border-black bg-white rounded-full p-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                        QUAY LẠI
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className="bg-[var(--theme-accent)] border-2 border-black disabled:opacity-60 text-black text-xs font-bold uppercase tracking-widest px-8 py-4 hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all flex items-center gap-3 cursor-pointer disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="animate-spin inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                                                ĐANG XỬ LÝ...
                                            </>
                                        ) : (
                                            "🛍 ĐẶT HÀNG NGAY"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-[400px] flex-shrink-0 z-20">
                        <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8 sticky top-6">
                            <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-8">
                                TỔNG ĐƠN HÀNG
                            </h2>
                            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => {
                                    const imgSrc = item.product?.image
                                        ? item.product.image.startsWith("http")
                                            ? item.product.image
                                            : `${API_URL}${item.product.image}`
                                        : null;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="w-16 h-16 border-2 border-black overflow-hidden bg-[#e5e5e5] flex-shrink-0">
                                                {imgSrc ? (
                                                    <img
                                                        src={imgSrc}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[#f8f8f8]" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-black uppercase tracking-widest line-clamp-2 leading-snug">
                                                    {item.product?.title}
                                                </p>
                                                {item.color && (
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mt-1">
                                                        MÀU: {item.color}
                                                    </p>
                                                )}
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mt-1">
                                                    SỐ LƯỢNG: {item.quantity}
                                                </p>
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-widest text-black flex-shrink-0 mt-0.5">
                                                {fmt(item.lineTotal || 0)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Promo & Loyalty Section */}
                            <div className="border-t-2 border-b-2 border-black/10 py-6 my-6 space-y-6 text-left">
                                {/* Loyalty Points Toggle */}
                                <div className="space-y-3">
                                    <label className="flex items-center justify-between cursor-pointer select-none group">
                                        <div className="flex items-center gap-2 text-xs text-black font-bold uppercase tracking-widest">
                                            <span className="text-lg">🪙</span>
                                            <span className="group-hover:text-[var(--theme-accent)] transition-colors">
                                                DÙNG XU ({userPoints} XU)
                                            </span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={usePoints}
                                            disabled={userPoints <= 0}
                                            onChange={(e) =>
                                                setUsePoints(e.target.checked)
                                            }
                                            className="w-5 h-5 border-2 border-black appearance-none checked:bg-[var(--theme-accent)] checked:border-black checked:after:content-['✓'] checked:after:text-black checked:after:text-xs checked:after:font-bold flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </label>
                                    {usePoints && userPoints > 0 && (
                                        <p className="text-[10px] text-[#52c41a] font-bold uppercase tracking-widest">
                                            QUY ĐỔI GIẢM: -{fmt(pointsDiscount)}
                                        </p>
                                    )}
                                </div>

                                {/* Coupon Code Input */}
                                <div className="space-y-3">
                                    <label className="block text-xs text-black font-bold uppercase tracking-widest">
                                        MÃ GIẢM GIÁ
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => {
                                                setCouponCode(
                                                    e.target.value.toUpperCase(),
                                                );
                                                setCouponError("");
                                                setCouponSuccess("");
                                            }}
                                            placeholder="NHẬP MÃ..."
                                            className="flex-1 border-2 border-black rounded-none px-4 py-3 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-0 focus:border-black bg-[#f8f8f8]"
                                            disabled={!!appliedCoupon}
                                        />
                                        {appliedCoupon ? (
                                            <button
                                                type="button"
                                                onClick={handleRemoveCoupon}
                                                className="px-6 py-3 bg-[#ff4d4f] border-2 border-black text-white font-bold text-xs uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all cursor-pointer"
                                            >
                                                HỦY
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleApplyCoupon}
                                                className="px-6 py-3 bg-black border-2 border-black text-white font-bold text-xs uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all cursor-pointer"
                                            >
                                                ÁP DỤNG
                                            </button>
                                        )}
                                    </div>
                                    {couponError && (
                                        <p className="text-[10px] text-[#ff4d4f] font-bold uppercase tracking-widest">
                                            {couponError}
                                        </p>
                                    )}
                                    {couponSuccess && (
                                        <p className="text-[10px] text-[#52c41a] font-bold uppercase tracking-widest">
                                            {couponSuccess}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 text-sm mt-8">
                                <div className="flex justify-between items-center text-black/60">
                                    <span className="text-xs font-bold uppercase tracking-widest">
                                        TẠM TÍNH
                                    </span>
                                    <span className="font-bold text-black">
                                        {fmt(subtotal)}
                                    </span>
                                </div>
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between items-center text-[#52c41a]">
                                        <span className="text-xs font-bold uppercase tracking-widest">
                                            MÃ GIẢM GIÁ
                                        </span>
                                        <span className="font-bold">
                                            -{fmt(couponDiscount)}
                                        </span>
                                    </div>
                                )}
                                {pointsDiscount > 0 && (
                                    <div className="flex justify-between items-center text-[#52c41a]">
                                        <span className="text-xs font-bold uppercase tracking-widest">
                                            XU TÍCH LŨY
                                        </span>
                                        <span className="font-bold">
                                            -{fmt(pointsDiscount)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-black/60">
                                    <span className="text-xs font-bold uppercase tracking-widest">
                                        VẬN CHUYỂN
                                    </span>
                                    <span className="text-[#52c41a] font-bold uppercase tracking-widest">
                                        MIỄN PHÍ
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-black/60">
                                    <span className="text-xs font-bold uppercase tracking-widest">
                                        THUẾ VAT (8%)
                                    </span>
                                    <span className="font-bold text-black">
                                        {fmt(tax)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end pt-6 mt-6 border-t-2 border-black/10">
                                    <span className="text-sm font-bold uppercase tracking-widest text-black mb-1">
                                        TỔNG CỘNG
                                    </span>
                                    <span className="font-anton text-4xl tracking-widest text-[var(--theme-accent)] leading-none">
                                        {fmt(finalTotal)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button className="flex-1 py-4 border-2 border-black bg-[#f8f8f8] text-[10px] font-bold uppercase tracking-widest text-black hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all cursor-pointer">
                                    <svg
                                        className="w-4 h-4 text-black"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    AN TOÀN
                                </button>
                                <button className="flex-1 py-4 border-2 border-black bg-[#f8f8f8] text-[10px] font-bold uppercase tracking-widest text-black hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all cursor-pointer">
                                    <svg
                                        className="w-4 h-4 text-black"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                    BẢO VỆ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

// ── Sub-components ──────────────────────────────────────────────────────────
const FormField = ({
    label,
    value,
    onChange,
    error,
    placeholder,
    className = "",
}) => (
    <div className={`mb-4 ${className}`}>
        <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">
            {label}
        </label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full border-2 bg-[#f8f8f8] rounded-none px-4 py-3 text-sm font-bold tracking-wider uppercase focus:outline-none transition-colors ${
                error
                    ? "border-[#ff4d4f] focus:border-[#ff4d4f]"
                    : "border-black focus:border-black focus:bg-white"
            }`}
        />
        {error && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff4d4f] mt-2">
                {error}
            </p>
        )}
    </div>
);

const PayOption = ({ id, label, selected, onClick }) => {
    const renderIcon = () => {
        if (id === "cod") {
            return (
                <svg
                    className={`w-8 h-8 ${selected ? "text-black" : "text-black/20"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            );
        }
        if (id === "vnpay") {
            return (
                <svg
                    className={`w-8 h-8 ${selected ? "text-black" : "text-black/20"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                </svg>
            );
        }
        if (id === "momo") {
            return (
                <svg
                    className={`w-8 h-8 ${selected ? "text-black" : "text-black/20"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                </svg>
            );
        }
        return null;
    };

    return (
        <button
            id={`pay-${id}`}
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-3 p-6 border-2 transition-all w-full min-h-[120px] ${
                selected
                    ? "border-black bg-[var(--theme-accent)] shadow-[4px_4px_0_rgba(0,0,0,1)]"
                    : "border-black/20 hover:border-black bg-white"
            }`}
        >
            {renderIcon()}
            <span
                className={`text-[10px] font-bold uppercase tracking-widest text-center ${selected ? "text-black" : "text-black/60"}`}
            >
                {label}
            </span>
        </button>
    );
};

export default CheckoutPage;
