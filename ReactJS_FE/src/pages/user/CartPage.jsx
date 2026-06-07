import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { useCart } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CartPage = () => {
    const navigate = useNavigate();
    const { items, total, loading, updateItem, removeItem, clearCart } =
        useCart();
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [actionLoading, setActionLoading] = useState({});

    const fmt = (n) => Number(n).toLocaleString("vi-VN") + "đ";

    const handleQtyChange = async (itemId, newQty) => {
        if (newQty < 1) return;
        setActionLoading((p) => ({ ...p, [itemId]: true }));
        try {
            await updateItem(itemId, newQty);
        } catch {}
        setActionLoading((p) => ({ ...p, [itemId]: false }));
    };

    const handleRemove = async (itemId) => {
        setActionLoading((p) => ({ ...p, [itemId]: true }));
        try {
            await removeItem(itemId);
        } catch {}
        setActionLoading((p) => ({ ...p, [itemId]: false }));
    };

    const handleClear = async () => {
        if (!window.confirm("Xóa toàn bộ giỏ hàng?")) return;
        try {
            await clearCart();
        } catch {}
    };

    const subtotal = total;
    const tax = Math.round(subtotal * 0.08);
    const finalTotal = subtotal + tax;

    return (
        <div className="min-h-screen bg-[url('https://dwarf-factory.com/assets/images/bg/light.jpg')] font-oswald flex flex-col relative text-black">
            <Header />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-[90px] md:pt-[100px] pb-12 relative z-10">
                <Breadcrumb />

                <div className="mt-8 mb-8">
                    <h1 className="text-5xl font-anton uppercase tracking-widest text-black">
                        GIỎ HÀNG
                    </h1>
                    <p className="text-black/60 font-bold uppercase tracking-widest text-xs mt-2">
                        {items.length > 0
                            ? `BẠN ĐANG CÓ ${items.length} SẢN PHẨM TRONG GIỎ.`
                            : "GIỎ HÀNG CỦA BẠN ĐANG TRỐNG."}
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-12">
                        <svg
                            className="w-24 h-24 text-black/20 mb-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-2">
                            GIỎ HÀNG TRỐNG
                        </h2>
                        <p className="text-sm font-bold uppercase tracking-widest text-black/50 mb-8">
                            HÃY THÊM SẢN PHẨM VÀO GIỎ HÀNG ĐỂ TIẾP TỤC.
                        </p>
                        <Link
                            to="/products"
                            className="px-8 py-4 bg-[var(--theme-accent)] border-2 border-black text-black font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                        >
                            KHÁM PHÁ SẢN PHẨM
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1">
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col relative z-10">
                                {/* Table Header */}
                                <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-black border-b-2 border-black text-xs font-bold text-white uppercase tracking-widest">
                                    <div className="col-span-5">SẢN PHẨM</div>
                                    <div className="col-span-2 text-center">
                                        ĐƠN GIÁ
                                    </div>
                                    <div className="col-span-3 text-center">
                                        SỐ LƯỢNG
                                    </div>
                                    <div className="col-span-2 text-right">
                                        TỔNG
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="divide-y-2 divide-black/10">
                                    {items.map((item) => {
                                        const imgSrc = item.product?.image
                                            ? item.product.image.startsWith(
                                                  "http",
                                              )
                                                ? item.product.image
                                                : `${API_URL}${item.product.image}`
                                            : null;
                                        return (
                                            <div
                                                key={item.id}
                                                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-8 py-6 hover:bg-black/5 transition-colors items-center bg-white relative group"
                                            >
                                                {/* Product */}
                                                <div className="md:col-span-5 flex items-center gap-4">
                                                    <div className="w-20 h-20 border-2 border-black overflow-hidden bg-[#f8f8f8] flex-shrink-0 flex items-center justify-center">
                                                        {imgSrc ? (
                                                            <img
                                                                src={imgSrc}
                                                                alt={
                                                                    item.product
                                                                        ?.title
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-[#e5e5e5]" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-black text-sm uppercase tracking-widest line-clamp-2">
                                                            {item.product
                                                                ?.title ||
                                                                "KEYCAP"}
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                handleRemove(
                                                                    item.id,
                                                                )
                                                            }
                                                            disabled={
                                                                actionLoading[
                                                                    item.id
                                                                ]
                                                            }
                                                            className="text-[10px] font-bold uppercase tracking-widest text-[#ff4d4f] hover:text-[#ff4d4f]/80 mt-2 flex items-center gap-1 transition-colors cursor-pointer"
                                                        >
                                                            <svg
                                                                className="w-3 h-3"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="3"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                            XÓA
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="md:col-span-2 text-left md:text-center text-sm font-bold uppercase tracking-widest text-black mt-2 md:mt-0">
                                                    <span className="md:hidden text-[10px] text-black/50 mr-2">
                                                        ĐƠN GIÁ:
                                                    </span>
                                                    {fmt(
                                                        item.product?.price ||
                                                            0,
                                                    )}
                                                </div>

                                                {/* Quantity */}
                                                <div className="md:col-span-3 flex justify-start md:justify-center mt-2 md:mt-0">
                                                    <div className="flex items-center border-2 border-black bg-white">
                                                        <button
                                                            onClick={() =>
                                                                handleQtyChange(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1,
                                                                )
                                                            }
                                                            disabled={
                                                                actionLoading[
                                                                    item.id
                                                                ] ||
                                                                item.quantity <=
                                                                    1
                                                            }
                                                            className="w-8 h-8 flex items-center justify-center text-black hover:bg-black/10 transition-colors disabled:opacity-40 font-black cursor-pointer"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-bold text-black border-x-2 border-black bg-[#f8f8f8] py-1">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                handleQtyChange(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1,
                                                                )
                                                            }
                                                            disabled={
                                                                actionLoading[
                                                                    item.id
                                                                ]
                                                            }
                                                            className="w-8 h-8 flex items-center justify-center text-black hover:bg-black/10 transition-colors disabled:opacity-40 font-black cursor-pointer"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Total */}
                                                <div className="md:col-span-2 text-left md:text-right font-anton text-xl tracking-wider text-[var(--theme-accent)] mt-2 md:mt-0">
                                                    <span className="md:hidden text-xs font-oswald text-black mr-2">
                                                        TỔNG:
                                                    </span>
                                                    {fmt(item.lineTotal || 0)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                                <Link
                                    to="/products"
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
                                    TIẾP TỤC MUA SẮM
                                </Link>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <button
                                        onClick={handleClear}
                                        className="w-full sm:w-auto px-6 py-3 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-widest hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all cursor-pointer"
                                    >
                                        XÓA TẤT CẢ
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-96 flex-shrink-0 z-20">
                            <div className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-8 sticky top-6">
                                <h2 className="font-anton text-2xl uppercase tracking-widest text-black mb-8">
                                    THÔNG TIN THANH TOÁN
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-widest text-black/50">
                                            Tạm tính
                                        </span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-black">
                                            {fmt(subtotal)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-widest text-black/50">
                                            Vận chuyển
                                        </span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-[#52c41a]">
                                            MIỄN PHÍ
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-widest text-black/50">
                                            VAT (8%)
                                        </span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-black">
                                            {fmt(tax)}
                                        </span>
                                    </div>
                                    <div className="border-t-2 border-black/10 pt-6 mt-6 flex items-end justify-between">
                                        <span className="text-sm font-bold uppercase tracking-widest text-black">
                                            Tổng cộng
                                        </span>
                                        <span className="font-anton text-4xl tracking-widest text-[var(--theme-accent)] leading-none">
                                            {fmt(finalTotal)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="w-full mt-8 bg-[var(--theme-accent)] border-2 border-black text-black font-bold py-4 text-sm tracking-widest uppercase hover:-translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all cursor-pointer"
                                >
                                    TIẾN HÀNH THANH TOÁN
                                </button>

                                {/* Shipping Info */}
                                <div className="mt-8 p-4 bg-[#f8f8f8] border-2 border-black flex items-start gap-4">
                                    <span className="text-2xl mt-1">🚚</span>
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-widest text-black">
                                            GIAO HÀNG SIÊU TỐC
                                        </p>
                                        <p className="text-xs font-bold uppercase tracking-widest text-black/50 mt-1">
                                            DỰ KIẾN GIAO TRONG 3–5 NGÀY.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;
