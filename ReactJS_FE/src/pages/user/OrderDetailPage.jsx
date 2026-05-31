import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import Breadcrumb from "../../components/Breadcrumb";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const fmt = (n) => Number(n).toLocaleString("vi-VN") + "đ";

const STATUS_STEPS = [
    { key: "pending", label: "Đơn hàng mới", icon: "📋", desc: "Đơn hàng của bạn đã được tiếp nhận" },
    { key: "confirmed", label: "Đã xác nhận", icon: "✅", desc: "Shop đã xác nhận đơn hàng" },
    { key: "preparing", label: "Đang chuẩn bị", icon: "📦", desc: "Shop đang đóng gói sản phẩm" },
    { key: "shipping", label: "Đang giao hàng", icon: "🚚", desc: "Đơn hàng đang trên đường giao" },
    { key: "delivered", label: "Đã giao thành công", icon: "🎉", desc: "Bạn đã nhận được hàng" },
];

const STATUS_CONFIG = {
    pending: { label: "Đơn hàng mới", color: "bg-[#ffd500] text-black border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", dot: "hidden" },
    confirmed: { label: "Đã xác nhận", color: "bg-[#00e5ff] text-black border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", dot: "hidden" },
    preparing: { label: "Đang chuẩn bị", color: "bg-[#ff8c00] text-black border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", dot: "hidden" },
    shipping: { label: "Đang giao hàng", color: "bg-[#b026ff] text-white border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", dot: "hidden" },
    delivered: { label: "Đã giao thành công", color: "bg-[#52c41a] text-white border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", dot: "hidden" },
    cancelled: { label: "Đã hủy", color: "bg-[#ff4d4f] text-white border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", dot: "hidden" },
    cancel_requested: { label: "Yêu cầu hủy đang chờ", color: "bg-[#faad14] text-black border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", dot: "hidden" },
    refunded: { label: "Đã hoàn tiền", color: "bg-[#d9d9d9] text-black border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)]", dot: "hidden" },
};

const OrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [cancelMsg, setCancelMsg] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const [showCancelForm, setShowCancelForm] = useState(false);

    // Review states
    const [reviewProduct, setReviewProduct] = useState(null);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
    const [reviewLoading, setReviewLoading] = useState(false);
    const [rewardInfo, setRewardInfo] = useState(null);

    const handleOpenReview = (item) => {
        setReviewProduct(item);
        setReviewForm({ rating: 5, comment: "" });
        setRewardInfo(null);
    };

    const handleCloseReview = () => {
        setReviewProduct(null);
        setRewardInfo(null);
    };

    const handleSubmitReview = async () => {
        if (!reviewForm.comment.trim()) {
            alert("Vui lòng nhập nội dung đánh giá.");
            return;
        }

        setReviewLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) { alert("Vui lòng đăng nhập để đánh giá."); return; }

            const res = await fetch(`${API_URL}/api/reviews/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: reviewProduct.productId,
                    orderId: order.id,
                    rating: reviewForm.rating,
                    comment: reviewForm.comment
                })
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || "Đánh giá thất bại.");

            setRewardInfo({
                points: data.rewardPoints || 10,
                couponCode: data.rewardCouponCode
            });
            // close review modal
            setReviewProduct(null);
        } catch (err) {
            alert(err.message || "Đánh giá thất bại.");
        } finally {
            setReviewLoading(false);
        }
    };

    useEffect(() => {
        const fetchOrder = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) { navigate("/login"); return; }
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/api/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Không tìm thấy đơn hàng.");
                setOrder(data);
            } catch (err) {
                setCancelMsg(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id, navigate]);

    const handleCancel = async () => {
        const token = localStorage.getItem("accessToken");
        setCancelLoading(true); setCancelMsg(null);
        try {
            const res = await fetch(`${API_URL}/api/orders/${id}/cancel`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ reason: cancelReason || "Người dùng hủy đơn" })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Không thể hủy đơn.");
            setOrder(data);
            setShowCancelForm(false);
            setCancelMsg(data.status === "cancel_requested"
                ? "Đã gửi yêu cầu hủy đơn cho shop. Shop sẽ xử lý trong thời gian sớm nhất."
                : "Đơn hàng đã được hủy thành công.");
        } catch (err) {
            setCancelMsg(err.message);
        } finally {
            setCancelLoading(false);
        }
    };

    const canCancel = (order) => {
        if (!order) return false;
        if (!["pending", "confirmed", "preparing"].includes(order.status)) return false;
        const diff = Date.now() - new Date(order.createdAt).getTime();
        return diff < 30 * 60 * 1000 || order.status === "preparing";
    };

    const getActiveStep = (status) => {
        if (status === "cancelled" || status === "cancel_requested") return -1;
        const idx = STATUS_STEPS.findIndex((s) => s.key === status);
        return idx;
    };

    if (loading) return (
        <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-2 border-[#00b14f] border-t-transparent rounded-full" />
            </div>
        </div>
    );

    if (!order && !loading) return (
        <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center flex-col gap-4 text-gray-500">
                <p className="text-lg font-semibold">Không tìm thấy đơn hàng</p>
                <button onClick={() => navigate("/orders")} className="text-[#00b14f] font-semibold hover:underline">← Quay lại</button>
            </div>
        </div>
    );

    const sc = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
    const activeStep = getActiveStep(order.status);

    return (
        <div className="min-h-screen bg-[#e5e5e5] font-oswald flex flex-col relative">
            <Header />
            <main className="flex-1 max-w-[1400px] mx-auto px-6 pt-[90px] md:pt-[100px] pb-12 w-full z-10">
                <Breadcrumb />
                {/* Back */}
                <button onClick={() => navigate("/orders")} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black mb-8 transition-colors">
                    <svg className="w-4 h-4 border-2 border-black bg-white rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                    Quay lại đơn hàng
                </button>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-anton uppercase tracking-widest text-black">Đơn hàng #{order.id}</h1>
                        <p className="text-xs font-bold uppercase tracking-widest text-black/50 mt-2">Đặt ngày {new Date(order.createdAt).toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                    <span className={`px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${sc.color}`}>
                        {sc.label}
                    </span>
                </div>

                {/* Cancel Message */}
                {cancelMsg && (
                    <div className={`mb-8 p-4 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-start gap-3 text-sm font-bold uppercase tracking-widest text-white ${cancelMsg.includes("thành công") || cancelMsg.includes("gửi") ? "bg-[#52c41a]" : "bg-[#ff4d4f]"}`}>
                        <span>{cancelMsg.includes("thành công") || cancelMsg.includes("gửi") ? "✅" : "⚠️"}</span>
                        <span>{cancelMsg}</span>
                    </div>
                )}

                <div className="flex gap-6">
                    {/* Left */}
                    <div className="flex-1 space-y-6">
                        {/* Status Timeline */}
                        {order.status !== "cancelled" && order.status !== "cancel_requested" ? (
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8">
                                <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-8">Theo dõi đơn hàng</h2>
                                <div className="relative">
                                    {STATUS_STEPS.map((step, idx) => {
                                        const isCompleted = idx <= activeStep;
                                        const isActive = idx === activeStep;
                                        return (
                                            <div key={step.key} className="flex items-start gap-4 pb-8 last:pb-0 relative">
                                                {/* Connector line */}
                                                {idx < STATUS_STEPS.length - 1 && (
                                                    <div className={`absolute left-4 top-10 w-0.5 h-full ${isCompleted ? "bg-[var(--theme-accent)]" : "bg-black/10"}`} />
                                                )}
                                                {/* Icon Circle */}
                                                <div className={`w-9 h-9 border-2 flex items-center justify-center flex-shrink-0 text-sm z-10 transition-all font-bold ${
                                                    isActive
                                                        ? "border-black bg-[var(--theme-accent)] text-black shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                                        : isCompleted
                                                        ? "border-black bg-black text-white shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                                        : "border-black/20 bg-[#e5e5e5] text-black/40"
                                                }`}>
                                                    {isCompleted ? (idx === activeStep ? step.icon : "✓") : <span className={isCompleted ? "text-white" : "text-black/40"}>{idx + 1}</span>}
                                                </div>
                                                {/* Content */}
                                                <div className="flex-1 pt-1.5">
                                                    <p className={`text-sm font-bold uppercase tracking-widest ${isActive ? "text-[var(--theme-accent)]" : isCompleted ? "text-black" : "text-black/40"}`}>
                                                        {step.label}
                                                    </p>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-black/50 mt-1">{step.desc}</p>
                                                    {isActive && (
                                                        <p className="text-xs text-[var(--theme-accent)] font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                                                            <span className="w-2 h-2 border border-black bg-[var(--theme-accent)] animate-pulse inline-block" />
                                                            Đang cập nhật...
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] flex items-center justify-center text-2xl flex-shrink-0 ${order.status === "cancelled" ? "bg-[#ff4d4f]" : "bg-[#faad14]"}`}>
                                        {order.status === "cancelled" ? "❌" : "⏳"}
                                    </div>
                                    <div>
                                        <p className={`font-bold text-lg uppercase tracking-widest ${order.status === "cancelled" ? "text-[#ff4d4f]" : "text-[#faad14]"}`}>
                                            {order.status === "cancelled" ? "Đơn hàng đã bị hủy" : "Yêu cầu hủy đang chờ xử lý"}
                                        </p>
                                        {order.cancelReason && (
                                            <p className="text-sm font-bold text-black/50 uppercase tracking-widest mt-1">Lý do: {order.cancelReason}</p>
                                        )}
                                        {order.cancelledAt && (
                                            <p className="text-xs font-bold text-black/40 uppercase tracking-widest mt-1">Hủy lúc: {new Date(order.cancelledAt).toLocaleString("vi-VN")}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Products */}
                        <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8">
                            <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-6">Sản phẩm đã mua</h2>
                            <div className="space-y-4">
                                {(order.items || []).map((item) => {
                                    const imgSrc = item.productImage
                                        ? (item.productImage.startsWith("http") ? item.productImage : `${API_URL}${item.productImage}`)
                                        : null;
                                    return (
                                        <div key={item.id} className="p-4 border-2 border-black hover:bg-black/5 transition-colors space-y-4 bg-white">
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 border-2 border-black overflow-hidden bg-[#f8f8f8] flex-shrink-0">
                                                    {imgSrc ? <img src={imgSrc} alt={item.productTitle} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#e5e5e5]" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-black text-sm uppercase tracking-widest">{item.productTitle}</p>
                                                    {item.color && <p className="text-[10px] font-bold text-black/50 uppercase tracking-widest mt-1">Màu: {item.color}</p>}
                                                    <p className="text-xs font-bold text-black/60 uppercase tracking-widest mt-1">x{item.quantity} · {fmt(item.price)} / ITEM</p>
                                                </div>
                                                <p className="font-anton text-xl tracking-wider text-[var(--theme-accent)] flex-shrink-0">{fmt(Number(item.price) * item.quantity)}</p>
                                            </div>
                                            {order.status === "delivered" && (
                                                <div className="flex justify-end pt-4 border-t-2 border-black/10">
                                                    <button 
                                                        onClick={() => handleOpenReview(item)}
                                                        className="px-6 py-2 bg-[var(--theme-accent)] border-2 border-black text-black font-bold text-xs uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all flex items-center gap-2 cursor-pointer"
                                                    >
                                                        <span>★</span> Viết đánh giá nhận quà
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Cancel Form */}
                        {canCancel(order) && (
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8 mt-6">
                                <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-6">
                                    {order.status === "preparing" ? "Gửi yêu cầu hủy đơn" : "Hủy đơn hàng"}
                                </h2>
                                {order.status === "preparing" && (
                                    <p className="text-xs font-bold text-[#faad14] bg-[#faad14]/10 border-2 border-[#faad14] px-4 py-3 uppercase tracking-widest mb-6">
                                        ⚠️ Shop đang chuẩn bị hàng. Yêu cầu hủy sẽ được gửi cho shop để xem xét.
                                    </p>
                                )}
                                {!showCancelForm ? (
                                    <button onClick={() => setShowCancelForm(true)} className="px-6 py-3 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all">
                                        {order.status === "preparing" ? "Gửi yêu cầu hủy" : "Hủy đơn hàng"}
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        <textarea
                                            value={cancelReason}
                                            onChange={(e) => setCancelReason(e.target.value)}
                                            placeholder="Lý do hủy đơn (tuỳ chọn)..."
                                            rows={3}
                                            className="w-full border-2 border-black bg-[#f8f8f8] px-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] resize-none transition-all placeholder:text-black/30"
                                        />
                                        <div className="flex gap-4">
                                            <button
                                                onClick={handleCancel}
                                                disabled={cancelLoading}
                                                className="px-6 py-3 bg-[#ff4d4f] border-2 border-black text-white text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                            >
                                                {cancelLoading ? "PROCESSING..." : "CONFIRM CANCEL"}
                                            </button>
                                            <button onClick={() => setShowCancelForm(false)} className="px-6 py-3 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all">
                                                KEEP ORDER
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right — Summary */}
                    <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
                        {/* Order Info */}
                        <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-6">
                            <h3 className="font-anton text-xl uppercase tracking-widest text-black mb-6">Thông tin đơn hàng</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black/50">Mã đơn</span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-black">#{order.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black/50">Thanh toán</span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-black">
                                        {order.paymentMethod === "cod" ? "COD" : order.paymentMethod === "momo" ? "MOMO" : order.paymentMethod === "vnpay" ? "VNPAY" : order.paymentMethod || "—"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black/50">Trạng thái TT</span>
                                    <span className={`text-sm font-bold uppercase tracking-widest ${order.paymentStatus === "paid" ? "text-[#52c41a]" : "text-[#ff8c00]"}`}>
                                        {order.paymentStatus === "paid" ? "ĐÃ THANH TOÁN" : "CHƯA THANH TOÁN"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping */}
                        {order.shippingAddress && (
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-6">
                                <h3 className="font-anton text-xl uppercase tracking-widest text-black mb-6">Giao hàng đến</h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-black">{order.shippingAddress.fullName}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-black/60 mt-2">{order.shippingAddress.phone}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-black/50 mt-1">{order.shippingAddress.street}</p>
                            </div>
                        )}

                        {/* Price Breakdown */}
                        <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-6">
                            <h3 className="font-anton text-xl uppercase tracking-widest text-black mb-6">Thanh toán</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black/50">Tạm tính</span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-black">{fmt(order.subtotal)}</span>
                                </div>
                                {Number(order.discount) > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#52c41a]">Giảm giá</span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-[#52c41a]">-{fmt(order.discount)}</span>
                                    </div>
                                )}
                                {Number(order.pointsDiscount) > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)]">Xu tích lũy</span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-[var(--theme-accent)]">-{fmt(order.pointsDiscount)}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black/50">Vận chuyển</span>
                                    <span className="text-sm font-bold uppercase tracking-widest text-black">{Number(order.shippingFee) === 0 ? "MIỄN PHÍ" : fmt(order.shippingFee)}</span>
                                </div>
                                {Number(order.tax) > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-widest text-black/50">VAT (8%)</span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-black">{fmt(order.tax)}</span>
                                    </div>
                                )}
                                <div className="border-t-2 border-black/10 pt-4 mt-4 flex items-end justify-between">
                                    <span className="text-sm font-bold uppercase tracking-widest text-black">Tổng cộng</span>
                                    <span className="font-anton text-3xl tracking-widest text-black leading-none">{fmt(order.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            {/* Review Modal */}
            {reviewProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-oswald">
                    <div className="bg-white max-w-md w-full overflow-hidden border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)]">
                        {/* Header */}
                        <div className="bg-[var(--theme-accent)] px-6 py-4 text-black flex items-center justify-between border-b-2 border-black">
                            <h3 className="font-anton text-xl uppercase tracking-widest flex items-center gap-2">
                                <span>✍️</span> Đánh giá sản phẩm
                            </h3>
                            <button onClick={handleCloseReview} className="text-black hover:scale-110 transition-transform text-xl font-bold cursor-pointer">✕</button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Product Info */}
                            <div className="flex items-center gap-4 bg-[#f8f8f8] p-4 border-2 border-black">
                                <div className="w-16 h-16 border-2 border-black bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
                                    {reviewProduct.productImage ? (
                                        <img 
                                            src={reviewProduct.productImage.startsWith("http") ? reviewProduct.productImage : `${API_URL}${reviewProduct.productImage}`} 
                                            alt={reviewProduct.productTitle} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#e5e5e5]" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-black text-sm uppercase tracking-widest truncate">{reviewProduct.productTitle}</h4>
                                    {reviewProduct.color && <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mt-1">MÀU: {reviewProduct.color}</p>}
                                </div>
                            </div>

                            {/* Reward Notice */}
                            {!rewardInfo && (
                                <div className="bg-[#52c41a] text-white border-2 border-black p-4 flex items-start gap-4">
                                    <span className="text-2xl">🎁</span>
                                    <div>
                                        <p className="font-bold uppercase tracking-widest text-sm">Đánh giá để nhận ngay:</p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 text-xs font-bold uppercase tracking-widest">
                                            <li>TẶNG <strong className="font-black">+10 XU</strong> VÀO TÀI KHOẢN</li>
                                            <li>TẶNG <strong className="font-black">VOUCHER GIẢM 10%</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {rewardInfo ? (
                                /* Reward Success Popup Contents */
                                <div className="text-center py-6 space-y-6">
                                    <div className="w-20 h-20 bg-[var(--theme-accent)] border-2 border-black mx-auto rounded-full flex items-center justify-center text-4xl shadow-[4px_4px_0_rgba(0,0,0,1)] animate-bounce">
                                        🎉
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-anton uppercase tracking-widest text-black">ĐÁNH GIÁ THÀNH CÔNG!</h4>
                                        <p className="text-xs font-bold uppercase tracking-widest text-black/60 mt-2">CẢM ƠN BẠN ĐÃ ĐÓNG GÓP ĐÁNH GIÁ SẢN PHẨM.</p>
                                    </div>
                                    <div className="bg-[#f8f8f8] border-2 border-black p-6 space-y-4 text-left">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-widest text-black/60">XU TÍCH LŨY NHẬN ĐƯỢC:</span>
                                            <span className="text-sm font-bold uppercase tracking-widest text-[#52c41a]">🪙 +{rewardInfo.points} XU</span>
                                        </div>
                                        {rewardInfo.couponCode && (
                                            <div className="border-t-2 border-black/10 pt-4 space-y-3">
                                                <p className="text-xs font-bold uppercase tracking-widest text-black/60">MÃ GIẢM GIÁ 10% ĐÃ THÊM VÀO VÍ CỦA BẠN:</p>
                                                <div className="flex items-center justify-between bg-white border-2 border-dashed border-black p-3">
                                                    <span className="font-anton text-lg tracking-wider text-black">
                                                        {rewardInfo.couponCode}
                                                    </span>
                                                    <button 
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(rewardInfo.couponCode);
                                                            alert("Đã sao chép mã giảm giá!");
                                                        }}
                                                        className="text-xs font-bold uppercase tracking-widest text-white bg-black hover:bg-black/80 px-4 py-2 transition-colors cursor-pointer"
                                                    >
                                                        SAO CHÉP
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button 
                                        onClick={handleCloseReview}
                                        className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_var(--theme-accent)] transition-all border-2 border-black cursor-pointer"
                                    >
                                        ĐÓNG
                                    </button>
                                </div>
                            ) : (
                                /* Form inputs */
                                <div className="space-y-6 text-left">
                                    <div>
                                        <label className="block text-xs font-bold text-black uppercase tracking-widest mb-3">CHỌN SỐ SAO</label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setReviewForm(p => ({ ...p, rating: star }))}
                                                    className={`text-3xl transition-transform hover:scale-110 active:scale-95 cursor-pointer ${star <= reviewForm.rating ? "text-black" : "text-black/20"}`}
                                                    style={{ textShadow: star <= reviewForm.rating ? "2px 2px 0 var(--theme-accent)" : "none" }}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                            <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)] bg-black px-3 py-1 ml-4 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                                {reviewForm.rating === 5 ? "TUYỆT VỜI" : reviewForm.rating === 4 ? "TỐT" : reviewForm.rating === 3 ? "BÌNH THƯỜNG" : reviewForm.rating === 2 ? "TỆ" : "RẤT TỆ"}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-black uppercase tracking-widest mb-3">NỘI DUNG ĐÁNH GIÁ *</label>
                                        <textarea
                                            value={reviewForm.comment}
                                            onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))}
                                            placeholder="CHIA SẺ NHẬN XÉT CỦA BẠN VỀ SẢN PHẨM NÀY NHÉ..."
                                            rows={4}
                                            className="w-full border-2 border-black bg-[#f8f8f8] px-4 py-3 text-sm font-bold uppercase tracking-widest focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] resize-none transition-all placeholder:text-black/30"
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <button 
                                            onClick={handleSubmitReview}
                                            disabled={reviewLoading}
                                            className="flex-1 py-3 bg-[var(--theme-accent)] border-2 border-black text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
                                        >
                                            {reviewLoading ? "ĐANG GỬI..." : "GỬI ĐÁNH GIÁ"}
                                        </button>
                                        <button 
                                            onClick={handleCloseReview}
                                            className="px-6 py-3 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all cursor-pointer"
                                        >
                                            HỦY
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailPage;
