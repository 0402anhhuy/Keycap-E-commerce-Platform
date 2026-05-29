import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [adding, setAdding] = useState(false);
    const [success, setSuccess] = useState(false);

    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    let image = product.image;
    if (Array.isArray(product.images) && product.images.length > 0) image = product.images[0];
    else if (typeof product.images === 'string') {
        try { image = JSON.parse(product.images)[0]; } catch(e){}
    }

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (adding) return;
        setAdding(true);
        try {
            // Lấy màu đầu tiên làm mặc định nếu có
            let defaultColor = "";
            if (product.colors && product.colors.length > 0) {
                defaultColor = product.colors[0].label;
            }
            await addToCart(product.id, 1, defaultColor);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            alert(err.message || "Không thể thêm vào giỏ hàng");
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
                <img src={image} alt={product.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.72)_100%)]" />
                <div className="absolute left-4 top-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-black">
                    <span className="rounded-full bg-[var(--theme-accent)] px-3 py-1 font-black">{product.category || 'Keycap set'}</span>
                    {hasDiscount && <span className="rounded-full bg-white px-3 py-1 font-black text-black">-{discountPercent}%</span>}
                </div>
            </div>
            <div className="flex flex-1 flex-col p-5 text-white">
                <div className="text-[10px] uppercase tracking-[0.32em] text-white/40 mb-2">Featured drop</div>
                <h3 className="text-[15px] font-black leading-tight line-clamp-2" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.03em' }}>{product.title}</h3>

                <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">Price</div>
                        <div className="text-xl font-black text-[var(--theme-accent-2)]">{Number(product.price).toLocaleString()}đ</div>
                    </div>
                    <div className="text-xs font-semibold text-white/70">
                        <span className="text-[var(--theme-accent)] text-sm">★</span> {product.rating ? Number(product.rating).toFixed(1) : '5.0'}
                    </div>
                </div>

                <button
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.18em] transition-colors ${success ? "bg-emerald-500 text-white" : "bg-[var(--theme-accent)] text-black hover:brightness-110"}`}
                    onClick={handleAddToCart}
                    disabled={adding}
                >
                    {adding ? "Adding..." : success ? "Added" : "Add to cart"}
                    {!success && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

