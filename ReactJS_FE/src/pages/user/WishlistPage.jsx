import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileNav from "../../components/ProfileNav";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const WishlistPage = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWishlist = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/wishlists`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(
                    data.message || "Không thể tải danh sách yêu thích.",
                );
            setWishlist(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [navigate]);

    const handleRemove = async (productId, e) => {
        e.stopPropagation();
        const token = localStorage.getItem("accessToken");
        try {
            const res = await fetch(`${API_URL}/api/wishlists/${productId}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Lỗi khi cập nhật.");
            }
            setWishlist((prev) => prev.filter((item) => item.id !== productId));
        } catch (err) {
            alert(err.message);
        }
    };

    const fmt = (n) => Number(n).toLocaleString("vi-VN") + "đ";

    return (
        <div className="min-h-screen bg-white flex flex-col font-oswald text-black">
            <Header />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-[90px] md:pt-[100px] pb-10">
                <Breadcrumb />
                <ProfileNav />
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin w-10 h-10 border-4 border-black border-t-[var(--theme-accent)]" />
                    </div>
                ) : error ? (
                    <div className="bg-white text-black p-4 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] text-center text-sm font-bold uppercase tracking-widest">
                        {error}
                    </div>
                ) : wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)]">
                        <div className="text-5xl mb-4">🖤</div>
                        <p className="font-anton text-2xl uppercase tracking-widest text-black mb-2">
                            WISHLIST TRỐNG
                        </p>
                        <p className="text-sm text-black/60 font-bold uppercase tracking-widest mb-8">
                            Bạn chưa lưu sản phẩm nào
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            className="px-8 py-3 bg-black text-white font-black text-sm uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                        >
                            KHÁM PHÁ NGAY
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map((item) => {
                            const imgSrc = item.image
                                ? item.image.startsWith("http")
                                    ? item.image
                                    : `${API_URL}${item.image}`
                                : null;
                            return (
                                <div
                                    key={item.id}
                                    onClick={() =>
                                        navigate(`/product/${item.id}`)
                                    }
                                    className="bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group relative"
                                >
                                    {/* Image */}
                                    <div className="aspect-square bg-[#f4f4f4] relative border-b-2 border-black overflow-hidden">
                                        {imgSrc ? (
                                            <img
                                                src={imgSrc}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-black/20 uppercase tracking-widest">
                                                NO IMAGE
                                            </div>
                                        )}
                                        {/* Remove Heart Button */}
                                        <button
                                            onClick={(e) =>
                                                handleRemove(item.id, e)
                                            }
                                            className="absolute top-3 right-3 w-8 h-8 bg-white border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] flex items-center justify-center text-black hover:bg-[var(--theme-accent)] transition-colors"
                                            title="Xóa khỏi yêu thích"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Body */}
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="mb-2">
                                                <span className="bg-black text-[var(--theme-accent)] text-[10px] font-black px-2 py-0.5 uppercase tracking-widest border border-black">
                                                    {item.category || "KEYCAP"}
                                                </span>
                                            </div>
                                            <h3 className="font-oswald font-bold uppercase tracking-wider text-black text-lg line-clamp-2 leading-snug">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-baseline justify-between gap-2">
                                            <span className="font-anton text-2xl text-[var(--theme-accent)] tracking-widest">
                                                {fmt(item.price)}
                                            </span>
                                            {item.originalPrice &&
                                                Number(item.originalPrice) >
                                                    Number(item.price) && (
                                                    <span className="text-xs font-bold text-black/40 line-through tracking-wider">
                                                        {fmt(
                                                            item.originalPrice,
                                                        )}
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default WishlistPage;
