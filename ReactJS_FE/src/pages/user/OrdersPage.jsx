import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileNav from "../../components/ProfileNav";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const fmt = (n) => Number(n).toLocaleString("vi-VN") + "đ";

const STATUS_CONFIG = {
    pending: {
        label: "Đơn hàng mới",
        color: "bg-[#ffd500] text-black border-2 border-black",
        dot: "hidden",
    },
    confirmed: {
        label: "Đã xác nhận",
        color: "bg-[#00e5ff] text-black border-2 border-black",
        dot: "hidden",
    },
    preparing: {
        label: "Đang chuẩn bị",
        color: "bg-[#ff8c00] text-black border-2 border-black",
        dot: "hidden",
    },
    shipping: {
        label: "Đang giao hàng",
        color: "bg-[#b026ff] text-white border-2 border-black",
        dot: "hidden",
    },
    delivered: {
        label: "Đã giao thành công",
        color: "bg-[#52c41a] text-white border-2 border-black",
        dot: "hidden",
    },
    cancelled: {
        label: "Đã hủy",
        color: "bg-[#ff4d4f] text-white border-2 border-black",
        dot: "hidden",
    },
    cancel_requested: {
        label: "Yêu cầu hủy",
        color: "bg-[#faad14] text-black border-2 border-black",
        dot: "hidden",
    },
    refunded: {
        label: "Đã hoàn tiền",
        color: "bg-[#d9d9d9] text-black border-2 border-black",
        dot: "hidden",
    },
};

const TABS = [
    { key: "all", label: "Tất cả" },
    { key: "pending,confirmed,preparing,shipping", label: "Đang xử lý" },
    { key: "delivered", label: "Đã giao" },
    { key: "cancelled", label: "Đã hủy" },
];

const OrdersPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState("all");
    const [search, setSearch] = useState("");
    const [cancelLoading, setCancelLoading] = useState({});
    const [cancelMsg, setCancelMsg] = useState({});
    const [successBanner, setSuccessBanner] = useState(
        location.state?.success || false,
    );

    const fetchOrders = useCallback(async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }
        setLoading(true);
        try {
            const statusParam = tab !== "all" ? `&status=${tab}` : "";
            const res = await fetch(
                `${API_URL}/api/orders/me?limit=50${statusParam}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            let rows = data.orders || [];
            if (search.trim()) {
                const q = search.trim().toLowerCase();
                rows = rows.filter(
                    (o) =>
                        String(o.id).includes(q) ||
                        o.items?.some((i) =>
                            i.productTitle?.toLowerCase().includes(q),
                        ),
                );
            }
            setOrders(rows);
            setTotal(data.total || 0);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [tab, search, navigate]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        if (successBanner) {
            const t = setTimeout(() => setSuccessBanner(false), 5000);
            return () => clearTimeout(t);
        }
    }, [successBanner]);

    const handleCancel = async (orderId) => {
        if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
        const token = localStorage.getItem("accessToken");
        setCancelLoading((p) => ({ ...p, [orderId]: true }));
        setCancelMsg((p) => ({ ...p, [orderId]: null }));
        try {
            const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reason: "Người dùng hủy đơn" }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Không thể hủy đơn.");
            setCancelMsg((p) => ({
                ...p,
                [orderId]:
                    data.status === "cancel_requested"
                        ? "Đã gửi yêu cầu hủy đơn cho shop."
                        : "Hủy đơn thành công.",
            }));
            await fetchOrders();
        } catch (err) {
            setCancelMsg((p) => ({ ...p, [orderId]: err.message }));
        } finally {
            setCancelLoading((p) => ({ ...p, [orderId]: false }));
        }
    };

    const canCancel = (order) => {
        if (!["pending", "confirmed", "preparing"].includes(order.status))
            return false;
        const diff = Date.now() - new Date(order.createdAt).getTime();
        return diff < 30 * 60 * 1000 || order.status === "preparing";
    };

    const annualSpend = orders
        .filter(
            (o) =>
                o.status === "delivered" &&
                new Date(o.createdAt).getFullYear() ===
                    new Date().getFullYear(),
        )
        .reduce((s, o) => s + Number(o.total), 0);

    return (
        <div className="min-h-screen bg-white flex flex-col font-oswald text-black">
            <Header />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-[90px] md:pt-[100px] pb-12">
                <Breadcrumb />
                <ProfileNav />
                {/* Success Banner */}
                {successBanner && (
                    <div className="mb-8 p-4 bg-[#52c41a] border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center gap-3 text-white">
                        <svg
                            className="w-6 h-6 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span className="font-bold uppercase tracking-widest text-sm">
                            Đặt hàng thành công! Đơn hàng của bạn đang được xử
                            lý.
                        </span>
                        <button
                            onClick={() => setSuccessBanner(false)}
                            className="ml-auto hover:scale-110 transition-transform"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div>
                        <h1 className="text-5xl font-anton uppercase tracking-widest text-black">
                            Order History
                        </h1>
                        <p className="text-black/60 font-bold uppercase tracking-widest text-xs mt-2">
                            Track your recent purchases and manage your orders.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate("/products")}
                            className="flex items-center gap-2 px-5 py-3 bg-[var(--theme-accent)] border-2 border-black text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                        >
                            + New
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left — Orders */}
                    <div className="flex-1 min-w-0">
                        {/* Tabs */}
                        <div
                            className="flex gap-2 border-b-2 border-black/20 mb-6 overflow-x-auto"
                            style={{ scrollbarWidth: "none" }}
                        >
                            {TABS.map((t) => (
                                <button
                                    key={t.key}
                                    onClick={() => setTab(t.key)}
                                    className={`px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 -mb-[2px] whitespace-nowrap ${
                                        tab === t.key
                                            ? "border-black text-black"
                                            : "border-transparent text-black/40 hover:text-black/70"
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="flex items-center bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] px-5 py-3 mb-8 gap-3">
                            <svg
                                className="w-5 h-5 text-black/50 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="TÌM ĐƠN HÀNG, MÃ ĐƠN..."
                                className="flex-1 text-sm font-bold uppercase tracking-widest focus:outline-none text-black placeholder-black/30"
                            />
                        </div>

                        {/* Orders List */}
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin w-12 h-12 border-4 border-black border-t-transparent rounded-full" />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-24 bg-white border-2 border-black border-dashed flex flex-col items-center">
                                <svg
                                    className="w-16 h-16 mx-auto mb-4 text-black/20"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                                <p className="font-bold text-black uppercase tracking-widest text-lg">
                                    Không có đơn hàng nào
                                </p>
                                <p className="text-xs font-bold text-black/50 uppercase tracking-widest mt-2 mb-6">
                                    Hãy đặt hàng để bắt đầu.
                                </p>
                                <button
                                    onClick={() => navigate("/products")}
                                    className="px-8 py-3 bg-[var(--theme-accent)] border-2 border-black text-black font-bold uppercase tracking-widest text-sm hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                                >
                                    Mua ngay
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => {
                                    const sc =
                                        STATUS_CONFIG[order.status] ||
                                        STATUS_CONFIG.pending;
                                    return (
                                        <div
                                            key={order.id}
                                            className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all overflow-hidden group hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)]"
                                        >
                                            {/* Header */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 bg-white border-b-2 border-black text-xs font-bold uppercase tracking-widest text-black/70 gap-4">
                                                <div className="flex flex-wrap gap-6">
                                                    <span>
                                                        ĐẶT NGÀY{" "}
                                                        <strong className="text-black ml-1">
                                                            {new Date(
                                                                order.createdAt,
                                                            ).toLocaleDateString(
                                                                "vi-VN",
                                                            )}
                                                        </strong>
                                                    </span>
                                                    <span>
                                                        TỔNG{" "}
                                                        <strong className="text-[var(--theme-accent)] ml-1">
                                                            {fmt(order.total)}
                                                        </strong>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-black">
                                                        ĐƠN #{order.id}
                                                    </span>
                                                    <span
                                                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[2px_2px_0_rgba(0,0,0,1)] ${sc.color}`}
                                                    >
                                                        {sc.label}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Body */}
                                            <div className="p-6">
                                                {/* Items preview */}
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="flex gap-2">
                                                        {(order.items || [])
                                                            .slice(0, 3)
                                                            .map((item) => {
                                                                const imgSrc =
                                                                    item.productImage
                                                                        ? item.productImage.startsWith(
                                                                              "http",
                                                                          )
                                                                            ? item.productImage
                                                                            : `${API_URL}${item.productImage}`
                                                                        : null;
                                                                return (
                                                                    <div
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className="w-16 h-16 border-2 border-black flex-shrink-0 flex items-center justify-center bg-[#f8f8f8]"
                                                                    >
                                                                        {imgSrc ? (
                                                                            <img
                                                                                src={
                                                                                    imgSrc
                                                                                }
                                                                                alt={
                                                                                    item.productTitle
                                                                                }
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <div className="w-full h-full bg-[#e5e5e5]" />
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        {order.items?.length >
                                                            3 && (
                                                            <div className="w-16 h-16 border-2 border-black bg-black text-[var(--theme-accent)] flex items-center justify-center text-xs font-black tracking-widest">
                                                                +
                                                                {order.items
                                                                    .length - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-2 flex-1">
                                                        <p className="text-sm font-bold text-black uppercase tracking-widest line-clamp-2 leading-relaxed">
                                                            {
                                                                order.items?.[0]
                                                                    ?.productTitle
                                                            }
                                                            {order.items
                                                                ?.length >
                                                                1 && (
                                                                <span className="text-black/50 ml-1">
                                                                    VÀ{" "}
                                                                    {order.items
                                                                        .length -
                                                                        1}{" "}
                                                                    SP KHÁC
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs font-bold text-black/40 uppercase tracking-widest mt-1">
                                                            {order.items
                                                                ?.length ||
                                                                0}{" "}
                                                            ITEMS
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Cancel message */}
                                                {cancelMsg[order.id] && (
                                                    <p
                                                        className={`text-xs mb-4 font-bold uppercase tracking-widest p-2 border-2 border-black ${cancelMsg[order.id].includes("thành công") || cancelMsg[order.id].includes("gửi") ? "bg-[#52c41a] text-white" : "bg-[#ff4d4f] text-white"}`}
                                                    >
                                                        {cancelMsg[order.id]}
                                                    </p>
                                                )}

                                                {/* Actions */}
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/orders/${order.id}`,
                                                            )
                                                        }
                                                        className="flex items-center gap-2 px-6 py-2.5 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                                                    >
                                                        Details
                                                    </button>
                                                    {[
                                                        "shipping",
                                                        "delivered",
                                                    ].includes(
                                                        order.status,
                                                    ) && (
                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/orders/${order.id}`,
                                                                )
                                                            }
                                                            className="flex items-center gap-2 px-6 py-2.5 bg-[#00e5ff] border-2 border-black text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                                                        >
                                                            Track
                                                        </button>
                                                    )}
                                                    {canCancel(order) && (
                                                        <button
                                                            onClick={() =>
                                                                handleCancel(
                                                                    order.id,
                                                                )
                                                            }
                                                            disabled={
                                                                cancelLoading[
                                                                    order.id
                                                                ]
                                                            }
                                                            className="flex items-center gap-2 px-6 py-2.5 bg-black border-2 border-black text-white text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(var(--theme-accent-rgb),1)] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                                        >
                                                            {cancelLoading[
                                                                order.id
                                                            ]
                                                                ? "PROCESSING..."
                                                                : order.status ===
                                                                    "preparing"
                                                                  ? "REQ CANCEL"
                                                                  : "CANCEL"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right — Stats */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-6 sticky top-24">
                            <h3 className="text-xs font-bold text-black/50 uppercase tracking-widest mb-2">
                                Annual Spend
                            </h3>
                            <p className="text-4xl font-anton uppercase tracking-wider text-black">
                                {fmt(annualSpend)}
                            </p>
                            <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-2">
                                {
                                    orders.filter(
                                        (o) => o.status === "delivered",
                                    ).length
                                }{" "}
                                ĐƠN ĐÃ GIAO TRONG NĂM NAY
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrdersPage;
