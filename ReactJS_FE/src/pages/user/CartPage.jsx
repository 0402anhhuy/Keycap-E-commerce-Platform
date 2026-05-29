import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import { useCart } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CartPage = () => {
    const navigate = useNavigate();
    const { items, total, loading, updateItem, removeItem, clearCart } = useCart();
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [actionLoading, setActionLoading] = useState({});

    const fmt = (n) => Number(n).toLocaleString("vi-VN") + "đ";

    const handleQtyChange = async (itemId, newQty) => {
        if (newQty < 1) return;
        setActionLoading((p) => ({ ...p, [itemId]: true }));
        try { await updateItem(itemId, newQty); } catch { }
        setActionLoading((p) => ({ ...p, [itemId]: false }));
    };

    const handleRemove = async (itemId) => {
        setActionLoading((p) => ({ ...p, [itemId]: true }));
        try { await removeItem(itemId); } catch { }
        setActionLoading((p) => ({ ...p, [itemId]: false }));
    };

    const handleClear = async () => {
        if (!window.confirm("Xóa toàn bộ giỏ hàng?")) return;
        try { await clearCart(); } catch { }
    };

    const subtotal = total;
    const tax = Math.round(subtotal * 0.08);
    const finalTotal = subtotal + tax;

    if (loading) return (
        <div className="min-h-screen bg-[var(--theme-bg)] flex flex-col text-[var(--theme-text)]">
            <Header />
            <Breadcrumb align="viewport"/>
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b14f]"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] flex flex-col text-[var(--theme-text)]">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
                <h1 className="text-3xl font-black uppercase tracking-[0.18em] mb-1" style={{ fontFamily: 'Anton, sans-serif' }}>Your Cart</h1>
                <p className="text-white/55 text-sm mb-8">
                    {items.length > 0
                        ? `${items.length} item${items.length > 1 ? "s" : ""} are waiting for your build.`
                        : "Your cart is empty."}
                </p>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <svg className="w-24 h-24 text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-700 mb-2">Giỏ hàng trống</h2>
                        <p className="text-gray-400 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục.</p>
                        <Link to="/products" className="bg-[#00b14f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#009943] transition-colors">
                            Khám phá sản phẩm
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1">
                            <div className="rounded-[28px] bg-[rgba(255,255,255,0.04)] shadow-[0_20px_60px_rgba(0,0,0,0.28)] border border-white/10 overflow-hidden">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-white/5 border-b border-white/10 text-[10px] font-black text-white/40 uppercase tracking-[0.22em]">
                                    <div className="col-span-5">Sản phẩm</div>
                                    <div className="col-span-2 text-center">Giá</div>
                                    <div className="col-span-3 text-center">Số lượng</div>
                                    <div className="col-span-2 text-right">Tổng</div>
                                </div>

                                {/* Items */}
                                {items.map((item) => {
                                    const imgSrc = item.product?.image
                                        ? (item.product.image.startsWith("http")
                                            ? item.product.image
                                            : `${API_URL}${item.product.image}`)
                                        : null;
                                    return (
                                        <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                                            {/* Product */}
                                            <div className="col-span-5 flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                                    {imgSrc
                                                        ? <img src={imgSrc} alt={item.product?.title} className="w-full h-full object-cover" />
                                                        : <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                                                    }
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white text-sm leading-tight">{item.product?.title || "Keycap"}</p>
                                                    {item.color && <p className="text-xs text-white/45 mt-0.5">{item.color}</p>}
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        disabled={actionLoading[item.id]}
                                                        className="text-xs text-[var(--theme-accent-2)] hover:text-[var(--theme-accent)] mt-1 flex items-center gap-1 transition-colors"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-2 text-center text-sm text-gray-700 font-medium">
                                                {fmt(item.product?.price || 0)}
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-span-3 flex justify-center">
                                                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-white/5">
                                                    <button
                                                        onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                                                        disabled={actionLoading[item.id] || item.quantity <= 1}
                                                        className="w-8 h-8 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors disabled:opacity-40 font-medium"
                                                    >−</button>
                                                    <span className="w-8 text-center text-sm font-semibold text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                                                        disabled={actionLoading[item.id]}
                                                        className="w-8 h-8 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors disabled:opacity-40 font-medium"
                                                    >+</button>
                                                </div>
                                            </div>

                                            {/* Total */}
                                            <div className="col-span-2 text-right text-sm font-bold text-[var(--theme-accent)]">
                                                {fmt(item.lineTotal || 0)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Bottom Actions */}
                            <div className="flex justify-between items-center mt-4">
                                <Link to="/products" className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors font-medium">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                    Continue Shopping
                                </Link>
                                <div className="flex gap-3">
                                    <button onClick={handleClear} className="px-4 py-2 text-sm border border-white/10 rounded-lg text-white/55 hover:bg-white/10 hover:text-[var(--theme-accent)] transition-colors font-medium">
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-[rgba(255,255,255,0.04)] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.28)] border border-white/10 p-6 sticky top-6 backdrop-blur-sm">
                                <h2 className="font-black uppercase tracking-[0.18em] text-white text-lg mb-5" style={{ fontFamily: 'Anton, sans-serif' }}>Order Summary</h2>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-white/60">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-white">{fmt(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Shipping</span>
                                        <span className="text-[var(--theme-accent)] font-semibold">Free</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Estimated Tax (8%)</span>
                                        <span className="font-medium text-white">{fmt(tax)}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-3 flex justify-between">
                                        <span className="font-bold text-white text-base">Total</span>
                                        <span className="font-extrabold text-white text-xl">{fmt(finalTotal)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="w-full mt-6 bg-[var(--theme-accent)] hover:brightness-110 text-black font-black py-3.5 rounded-xl transition-colors text-sm tracking-[0.18em] uppercase shadow-sm"
                                >
                                    Proceed to Checkout
                                </button>



                                {/* Shipping Info */}
                                <div className="mt-5 p-3.5 bg-white/5 rounded-xl flex items-start gap-3 border border-white/10">
                                    <svg className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Fast shipping</p>
                                        <p className="text-xs text-white/50 mt-0.5">Dự kiến giao trong 3–5 ngày.</p>
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
