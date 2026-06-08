import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { useCart } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const fmt = (n) => "$" + Number(n).toFixed(2);

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

    const [userEmail, setUserEmail] = useState("");
    // Shipping info
    const [ship, setShip] = useState({
        firstName: "",
        lastName: "",
        company: "",
        street: "",
        apartment: "",
        country: "Country",
        city: "",
        postcode: "",
        phone: "",
        useContactBook: true,
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
                setUserEmail(u.email || "");

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
                    street: defaultAddr?.street || "",
                    city: defaultAddr?.city || "",
                    company: "",
                    apartment: "",
                    country: "Vietnam",
                    postcode: "",
                    useContactBook: true,
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
        if (!ship.firstName.trim()) errs.firstName = "First Name is required";
        if (!ship.lastName.trim()) errs.lastName = "Last Name is required";
        if (!ship.phone.trim()) errs.phone = "Phone number is required";
        if (!ship.street.trim()) errs.street = "Address is required";
        if (!ship.city.trim()) errs.city = "City is required";
        setShipErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const goToPayment = () => {
        if (validateShip()) setStep(1);
    };

    const goToReview = () => {
        if (payMethod === "cod" || payConfirmed) setStep(2);
        else setMsg("Please confirm payment before continuing");
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
            const combinedStreet = [
                ship.apartment,
                ship.street,
                ship.city,
                ship.country,
                ship.postcode ? `Postcode: ${ship.postcode}` : "",
            ]
                .filter(Boolean)
                .join(", ");

            const shippingAddress = {
                fullName: `${ship.firstName} ${ship.lastName}`.trim(),
                phone: ship.phone,
                street: combinedStreet,
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
    const tax = 0; // tax is set to 0 to match mockup
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
        <div className="min-h-screen bg-[url('https://dwarf-factory.com/assets/images/bg/light.jpg')] font-oswald flex flex-col relative text-black">
            <Header />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-[90px] md:pt-[100px] pb-24 relative z-10">
                <Breadcrumb />

                {/* Header & Stepper */}
                <div className="mt-8 mb-4 border-b-2 border-black/10 pb-4 relative">
                    <div className="flex flex-col lg:flex-row gap-12 items-end">
                        <div className="flex-1 flex justify-between items-end w-full">
                            <h1 className="text-[40px] leading-none font-anton uppercase tracking-widest text-black">
                                {step === 0
                                    ? "INFORMATION"
                                    : step === 1
                                      ? "PAYMENT"
                                      : "REVIEW"}
                            </h1>
                        </div>
                        <div className="w-full lg:w-[380px] xl:w-[380px] shrink-0">
                            {/* Stepper Steps */}
                            <div className="flex items-center gap-3 md:gap-4 w-full text-[11px] xl:text-[12px] tracking-widest uppercase font-oswald font-medium">
                                <div
                                    className="flex-1 flex flex-col gap-2 cursor-pointer"
                                    onClick={() => navigate("/cart")}
                                >
                                    <div className="w-full h-[4px] bg-[#F17336]"></div>
                                    <div className="flex justify-between items-center text-black hover:opacity-70 transition-opacity">
                                        <span>YOUR CART</span>
                                        <span>01</span>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div
                                        className={`w-full h-[4px] ${step >= 0 ? "bg-[#F17336]" : "bg-black/30"}`}
                                    ></div>
                                    <div
                                        className={`flex justify-between items-center ${step >= 0 ? "text-black" : "text-black/50"}`}
                                    >
                                        <span className="truncate mr-1">
                                            INFORMATION
                                        </span>
                                        <span>02</span>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div
                                        className={`w-full h-[4px] ${step >= 1 ? "bg-[#F17336]" : "bg-black/30"}`}
                                    ></div>
                                    <div
                                        className={`flex justify-between items-center ${step >= 1 ? "text-black" : "text-black/50"}`}
                                    >
                                        <span>PAYMENT</span>
                                        <span>03</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 mt-12">
                    {/* Left Panel */}
                    <div className="flex-1">
                        {step === 0 && (
                            <div className="flex flex-col">
                                {/* Email Info */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-1">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="font-anton tracking-widest uppercase text-xl">
                                            EMAIL
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium">
                                        {userEmail || "guest@example.com"}
                                    </p>
                                </div>

                                <h2 className="font-anton text-[28px] uppercase tracking-widest text-black mb-6">
                                    SHIPPING INFORMATION
                                </h2>

                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            label="FIRST NAME"
                                            value={ship.firstName}
                                            error={shipErrors.firstName}
                                            onChange={(e) =>
                                                setShip({
                                                    ...ship,
                                                    firstName: e.target.value,
                                                })
                                            }
                                        />
                                        <FormField
                                            label="LAST NAME"
                                            value={ship.lastName}
                                            error={shipErrors.lastName}
                                            onChange={(e) =>
                                                setShip({
                                                    ...ship,
                                                    lastName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <FormField
                                        label="COMPANY"
                                        value={ship.company}
                                        onChange={(e) =>
                                            setShip({
                                                ...ship,
                                                company: e.target.value,
                                            })
                                        }
                                    />
                                    <FormField
                                        label="STREET ADDRESS"
                                        value={ship.street}
                                        error={shipErrors.street}
                                        onChange={(e) =>
                                            setShip({
                                                ...ship,
                                                street: e.target.value,
                                            })
                                        }
                                    />
                                    <FormField
                                        label="APARTMENT"
                                        value={ship.apartment}
                                        onChange={(e) =>
                                            setShip({
                                                ...ship,
                                                apartment: e.target.value,
                                            })
                                        }
                                    />

                                    <div className="mb-4">
                                        <label className="block text-[13px] text-black/60 font-bold uppercase tracking-widest mb-1">
                                            COUNTRY
                                        </label>
                                        <select
                                            value={ship.country}
                                            onChange={(e) =>
                                                setShip({
                                                    ...ship,
                                                    country: e.target.value,
                                                })
                                            }
                                            className="w-full border border-black/30 bg-transparent rounded-sm px-4 py-3 text-[14px] font-medium text-black focus:outline-none focus:border-black appearance-none cursor-pointer"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                backgroundPosition:
                                                    "right 1rem center",
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "1.2em",
                                            }}
                                        >
                                            <option value="Country" disabled>
                                                Country
                                            </option>
                                            <option value="Vietnam">
                                                Vietnam
                                            </option>
                                            <option value="USA">
                                                United States
                                            </option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            label="CITY"
                                            value={ship.city}
                                            error={shipErrors.city}
                                            onChange={(e) =>
                                                setShip({
                                                    ...ship,
                                                    city: e.target.value,
                                                })
                                            }
                                        />
                                        <FormField
                                            label="POSTCODE"
                                            value={ship.postcode}
                                            onChange={(e) =>
                                                setShip({
                                                    ...ship,
                                                    postcode: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <FormField
                                        label="PHONE"
                                        value={ship.phone}
                                        error={shipErrors.phone}
                                        onChange={(e) =>
                                            setShip({
                                                ...ship,
                                                phone: e.target.value,
                                            })
                                        }
                                    />

                                    <label className="flex items-center gap-3 cursor-pointer mt-2 group">
                                        <input
                                            type="checkbox"
                                            checked={ship.useContactBook}
                                            onChange={(e) =>
                                                setShip({
                                                    ...ship,
                                                    useContactBook:
                                                        e.target.checked,
                                                })
                                            }
                                            className="w-5 h-5 border-2 border-black appearance-none checked:bg-[#F17336] checked:border-[#F17336] rounded-sm transition-all relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[6px] after:top-[2px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                                        />
                                        <span className="text-[14px] font-bold">
                                            Use information to Contact book
                                        </span>
                                    </label>
                                </div>

                                <h2 className="font-anton text-[28px] uppercase tracking-widest text-black mt-10 mb-4">
                                    SHIPPING METHOD
                                </h2>
                                <div className="border border-black/30 p-4 bg-transparent flex items-center gap-3 mb-10 rounded-sm">
                                    <svg
                                        className="w-6 h-6 text-black"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                        />
                                    </svg>
                                    <span className="text-[14px] font-medium text-black">
                                        Please fill out your address to view
                                        your shipping fee
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-6">
                                    <button
                                        onClick={() => navigate("/cart")}
                                        className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-black hover:opacity-70 transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                            />
                                        </svg>
                                        BACK TO CART
                                    </button>
                                    <button
                                        onClick={goToPayment}
                                        className="px-8 py-3 bg-[#F17336] text-white font-oswald font-bold text-[16px] tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2 rounded-sm shadow-md"
                                    >
                                        CONTINUE PAYMENT
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 1: Payment */}
                        {step === 1 && (
                            <div className="flex flex-col">
                                <h2 className="font-anton text-[28px] uppercase tracking-widest text-black mb-6">
                                    PAYMENT METHOD
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                                {(payMethod === "momo" ||
                                    payMethod === "vnpay") && (
                                    <div className="mt-8 text-center bg-white p-8 border border-black/10 shadow-sm">
                                        <p className="text-sm font-bold uppercase tracking-widest text-black/60 mb-6">
                                            QUÉT MÃ QR ĐỂ THANH TOÁN{" "}
                                            {fmt(finalTotal)}
                                        </p>
                                        <div className="inline-block p-4 border-2 border-black/10 mb-6">
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
                                            className={`font-anton text-2xl tracking-widest mb-6 ${countdown < 60 ? "text-[#ff4d4f] animate-pulse" : "text-black"}`}
                                        >
                                            HẾT HẠN SAU: {fmtCountdown}
                                        </div>
                                        {!payConfirmed ? (
                                            <button
                                                onClick={() =>
                                                    setPayConfirmed(true)
                                                }
                                                className={`w-full max-w-sm mx-auto py-3 text-white font-bold uppercase tracking-widest rounded-sm transition-all ${payMethod === "momo" ? "bg-[#ff0080]" : "bg-[#0063a5]"}`}
                                            >
                                                ✓ TÔI ĐÃ THANH TOÁN
                                            </button>
                                        ) : (
                                            <div className="w-full max-w-sm mx-auto py-3 bg-[#52c41a] text-white font-bold uppercase tracking-widest rounded-sm">
                                                ✓ ĐÃ XÁC NHẬN THANH TOÁN
                                            </div>
                                        )}
                                    </div>
                                )}

                                {msg && (
                                    <p className="text-[#ff4d4f] font-bold text-sm text-center mt-6">
                                        {msg}
                                    </p>
                                )}

                                <div className="flex justify-between items-center mt-12 pt-8">
                                    <button
                                        onClick={() => setStep(0)}
                                        className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-black hover:opacity-70 transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                            />
                                        </svg>
                                        BACK
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={
                                            loading ||
                                            (payMethod !== "cod" &&
                                                !payConfirmed)
                                        }
                                        className="px-8 py-3 bg-[#F17336] disabled:bg-gray-400 text-white font-oswald font-bold text-[16px] tracking-widest uppercase hover:opacity-90 transition-all flex items-center gap-2 rounded-sm shadow-md"
                                    >
                                        {loading
                                            ? "PROCESSING..."
                                            : "PLACE ORDER"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Order Summary & Promo */}
                    <div className="w-full lg:w-[420px] flex-shrink-0 z-20">
                        <div className="sticky top-6">
                            {/* Promo Code */}
                            <h2 className="font-anton text-[24px] uppercase tracking-widest text-black mb-4">
                                ENTER YOUR PROMOTION CODE
                            </h2>
                            <div className="flex gap-0 mb-8 h-12 shadow-sm">
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
                                    placeholder="Your Code"
                                    className="flex-1 border border-black/30 border-r-0 bg-transparent rounded-l-sm px-4 text-[14px] font-medium text-black focus:outline-none focus:border-black"
                                    disabled={!!appliedCoupon}
                                />
                                {appliedCoupon ? (
                                    <button
                                        onClick={handleRemoveCoupon}
                                        className="px-6 bg-[#ff4d4f] text-white font-bold text-[14px] uppercase tracking-widest rounded-r-sm"
                                    >
                                        REMOVE
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="px-6 bg-black text-white font-bold text-[14px] uppercase tracking-widest rounded-r-sm"
                                    >
                                        APPLY
                                    </button>
                                )}
                            </div>
                            {couponError && (
                                <p className="text-[12px] text-[#ff4d4f] font-bold mb-4">
                                    {couponError}
                                </p>
                            )}
                            {couponSuccess && (
                                <p className="text-[12px] text-[#52c41a] font-bold mb-4">
                                    {couponSuccess}
                                </p>
                            )}

                            {/* Order Summary */}
                            <div className="flex justify-between items-end mb-6">
                                <h2 className="font-anton text-[28px] uppercase tracking-widest text-black leading-none">
                                    ORDER SUMMARY
                                </h2>
                                <span className="text-[14px] font-medium text-black">
                                    {items.length} items
                                </span>
                            </div>

                            <div className="flex flex-col gap-6 mb-8 border-t border-black/10 pt-6">
                                {items.map((item) => {
                                    const imgSrc = item.product?.image
                                        ? item.product.image.startsWith("http")
                                            ? item.product.image
                                            : `${API_URL}${item.product.image}`
                                        : null;
                                    const stock = item.product?.stock || 0;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex gap-4"
                                        >
                                            <div className="w-[80px] h-[80px] bg-white shadow-sm flex-shrink-0 flex items-center justify-center p-1 rounded-sm">
                                                {imgSrc ? (
                                                    <img
                                                        src={imgSrc}
                                                        alt=""
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[#f8f8f8]" />
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col justify-start min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-oswald text-[16px] font-medium leading-tight truncate pr-2">
                                                        {item.product?.title}
                                                    </h3>
                                                    <div className="font-anton text-xl tracking-widest text-black flex-shrink-0">
                                                        {fmt(
                                                            item.product
                                                                ?.price || 0,
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="inline-block bg-[#F17336] text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest rounded-sm">
                                                        {stock} IN STOCK
                                                    </div>
                                                    <p className="text-[13px] text-black/60 font-medium text-right">
                                                        Quantity:{" "}
                                                        <span className="text-black font-bold">
                                                            {item.quantity}
                                                        </span>
                                                    </p>
                                                </div>
                                                <p className="text-[13px] text-black/60 font-medium truncate">
                                                    Skin:{" "}
                                                    <span className="text-black font-semibold">
                                                        {item.product?.title}
                                                    </span>
                                                </p>
                                                {item.color && (
                                                    <p className="text-[13px] text-black/60 font-medium truncate">
                                                        Profile Type:{" "}
                                                        <span className="text-black font-semibold">
                                                            {item.color}
                                                        </span>
                                                    </p>
                                                )}
                                                <div className="mt-1 flex items-center gap-1 text-[#F17336] text-[11px] font-medium">
                                                    <svg
                                                        className="w-3 h-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                        />
                                                    </svg>
                                                    Only {stock} Item(s) in
                                                    stock
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-black/10">
                                <div className="flex justify-between items-center text-[15px] text-black font-medium uppercase tracking-widest">
                                    <span>MERCHANDISE SUBTOTAL</span>
                                    <span>{fmt(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[15px] text-black font-medium uppercase tracking-widest">
                                    <span>SHIPPING FEE</span>
                                    <span>{fmt(0)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[15px] text-black font-medium uppercase tracking-widest">
                                    <span>DISCOUNT</span>
                                    <span>
                                        {fmt(couponDiscount + pointsDiscount)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 mt-2">
                                    <span className="text-[16px] font-bold uppercase tracking-widest text-black">
                                        ORDER TOTAL
                                    </span>
                                    <span className="font-anton text-2xl tracking-wider text-black">
                                        {fmt(finalTotal)}
                                    </span>
                                </div>
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
