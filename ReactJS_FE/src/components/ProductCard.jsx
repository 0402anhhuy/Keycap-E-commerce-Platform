import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const hasDiscount = product.originalPrice && product.originalPrice > product.price;

    let image = product.image;
    if (Array.isArray(product.images) && product.images.length > 0) image = product.images[0];
    else if (typeof product.images === 'string') {
        try { image = JSON.parse(product.images)[0]; } catch(e){}
    }

    const optionsCount = product.colors && product.colors.length > 0 ? product.colors.length : 1;

    return (
        <div 
            onClick={() => navigate(`/product/${product.id}`)}
            className="group relative flex h-full flex-col bg-white overflow-hidden cursor-pointer transition-transform duration-200 btn-2d border-2 border-transparent hover:border-black"
        >
            {/* Image Section */}
            <div className="relative aspect-square w-full bg-[#f4f4f4] flex items-center justify-center">
                <img src={image} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                
                {/* Badges container */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                    <div className="flex gap-2">
                        {product.stock === 0 ? (
                            <span className="bg-gray-500 text-white text-[11px] font-oswald font-bold px-2 py-1 uppercase tracking-wider">Out of Stock</span>
                        ) : (
                            hasDiscount && (
                                <span className="bg-[var(--theme-accent)] text-white text-[11px] font-oswald font-bold px-2 py-1 uppercase tracking-wider">Sale</span>
                            )
                        )}
                        {product.stock <= 5 && product.stock > 0 && (
                            <span className="bg-[var(--theme-accent)] text-white text-[11px] font-oswald font-bold px-2 py-1 uppercase tracking-wider">Just a Few Left</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col flex-1 p-4 bg-white text-black">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category?.name || 'Keycap'}</span>
                            <span className="text-[10px] text-gray-300">|</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.shop?.name || 'Forge'}</span>
                        </div>
                        <h3 className="text-lg font-oswald font-bold leading-tight uppercase tracking-wide line-clamp-2">{product.title}</h3>
                        <div className="text-[var(--theme-accent)] font-oswald text-sm font-semibold mt-1 tracking-wider">
                            ${Number(product.price).toLocaleString()}
                        </div>
                    </div>
                    
                    {/* Options Tag */}
                    <div className="bg-[var(--theme-accent)] text-white text-[11px] font-oswald font-bold px-2 py-1 uppercase tracking-wider whitespace-nowrap mt-1">
                        {optionsCount} OPTION{optionsCount > 1 ? 'S' : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

