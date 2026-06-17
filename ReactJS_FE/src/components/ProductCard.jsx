import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const normalizeArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.products)) return data.products;
    if (Array.isArray(data?.data)) return data.data;
    return [];
};

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const [toastState, setToastState] = useState({
        show: false,
        message: "",
        type: "error",
    });
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!product) return;

        const token = localStorage.getItem("accessToken");
        if (!token) {
            setIsFavorite(false);
            return;
        }

        axios
            .get(`${API_BASE}/api/wishlists`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const list = normalizeArray(response.data);
                setIsFavorite(
                    list.some((p) => String(p.id) === String(product.id)),
                );
            })
            .catch(() => {
                setIsFavorite(false);
            });
    }, [product]);

    const showToast = (message, type = "error") => {
        setToastState({ show: true, message, type });
    };

    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!product) return;
        const token = localStorage.getItem("accessToken");
        if (!token) {
            showToast("Please login", "error");
            return;
        }

        try {
            const res = await axios.post(
                `${API_BASE}/api/wishlists/${product.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const result = res.data;
            setIsFavorite(!!result.added);
            if (result.added) {
                showToast("Added to wishlist", "success");
            } else {
                showToast("Removed from wishlist", "success");
            }
        } catch (e) {
            console.error("Backend wishlist toggle failed", e);
            showToast("Error updating wishlist", "error");
        }
    };

    let discountPrice = product.price;

    if (product.discountPercent > 0) {
        discountPrice =
            product.price - (product.discountPercent * product.price) / 100;
    }

    let image = product.image;
    if (Array.isArray(product.images) && product.images.length > 0)
        image = product.images[0];
    else if (typeof product.images === "string") {
        try {
            image = JSON.parse(product.images)[0];
        } catch (e) {}
    }

    return (
        <div className="group relative flex h-full flex-col bg-white transition-all duration-200 border-2 border-transparent hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:z-20">
            {createPortal(
                <Toast
                    show={toastState.show}
                    message={toastState.message}
                    type={toastState.type}
                    onClose={() =>
                        setToastState({ ...toastState, show: false })
                    }
                />,
                document.body,
            )}
            <div className="absolute -inset-[2px] border-2 border-black pointer-events-none z-20"></div>
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full bg-transparent flex items-center justify-center border-b-2 border-black overflow-hidden">
                <img
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-30">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.slug}`);
                        }}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-[var(--theme-accent)] hover:text-white transition-all shadow-lg translate-y-4 group-hover:translate-y-0 duration-300 cursor-pointer"
                        title="View Details"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                    <button
                        onClick={toggleFavorite}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg translate-y-4 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer ${
                            isFavorite
                                ? "bg-white text-red-500"
                                : "bg-white text-black hover:bg-red-500 hover:text-white"
                        }`}
                        title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill={isFavorite ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </button>
                </div>

                {/* Badges */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-1 items-start">
                    {product.stock === 0 ? (
                        <span className="bg-gray-500 text-white text-[10px] font-oswald font-bold px-2 py-0.5 uppercase tracking-wider">
                            Out of Stock
                        </span>
                    ) : product.stock <= 5 ? (
                        <span className="bg-[var(--theme-accent)] text-white text-[10px] font-oswald font-bold px-2 py-0.5 uppercase tracking-wider">
                            Just a Few Left
                        </span>
                    ) : product.discountPercent > 0 ? (
                        <span className="bg-[var(--theme-accent)] text-white text-[10px] font-oswald font-bold px-2 py-0.5 uppercase tracking-wider">
                            Sale
                        </span>
                    ) : (
                        <span className="bg-green-600 text-white text-[10px] font-oswald font-bold px-2 py-0.5 uppercase tracking-wider">
                            In Stock
                        </span>
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col flex-1 px-5 pt-3 pb-5 bg-white text-black relative z-0">
                {/* Logo*/}
                <div className="flex justify-between items-center mb-3">
                    <div className="h-4 flex items-center opacity-70">
                        <div className="font-anton text-sm italic pr-1">
                            <img
                                src="https://dwarf-factory.com/assets/images/logo-v1.svg"
                                alt="brand-logo"
                                className="w-10 h-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Title - Price */}
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <h3 className="text-lg font-anton leading-tight uppercase tracking-wide line-clamp-2 text-black mb-1">
                            {product.title}
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <div className="text-[var(--theme-accent)] font-anton text-sm tracking-wider">
                                <span className="align-top">$</span>
                                {Number(discountPrice).toLocaleString() + ".00"}
                            </div>
                            {product.discountPercent > 0 && (
                                <div className="text-black font-anton text-[11px] tracking-wider line-through opacity-70">
                                    <span className="text-[9px] align-top">
                                        $
                                    </span>
                                    {Number(product.price).toLocaleString() +
                                        ".00"}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="bg-[var(--theme-accent)] text-white text-[9px] font-oswald font-bold px-1.5 py-0.5 uppercase tracking-wider whitespace-nowrap mt-1">
                        1 OPTION
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
