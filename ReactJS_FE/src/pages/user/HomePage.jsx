import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { fetchAllProducts } from "../../utils/productApi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const HorizontalProductSlider = ({ title, products, navigate }) => {
    const sliderId = useMemo(() => `slider-${Math.random().toString(36).substr(2, 9)}`, []);

    const scroll = (direction) => {
        const container = document.getElementById(sliderId);
        if (!container) return;
        const scrollWidth = container.clientWidth;
        const target = direction === "left"
            ? container.scrollLeft - scrollWidth
            : container.scrollLeft + scrollWidth;
        container.scrollTo({ left: target, behavior: "smooth" });
    };

    if (!products || products.length === 0) return null;

    return (
            <section className="mb-12 relative group/section">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-white flex items-center gap-2" style={{ fontFamily: 'Anton, sans-serif' }}>
                    {title}
                </h3>
                {/* Arrow Navigation */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-white/65 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                        title="Trước"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-white/65 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                        title="Sau"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div
                id={sliderId}
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-4 snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="w-[280px] md:w-[290px] flex-shrink-0 snap-start cursor-pointer transition-transform duration-300"
                        onClick={() => navigate(`/product/${p.id}`)}
                    >
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </section>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("recentlyViewed");
            if (raw) {
                setRecentlyViewed(JSON.parse(raw));
            }
        } catch (e) {
            console.error("Error parsing recently viewed:", e);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const loadProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("accessToken");
                const data = await fetchAllProducts({
                    apiBase: API_BASE,
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                    }
                });
                setProducts(data);

            } catch (err) {
                if (err.status === 401) {
                    localStorage.clear();
                    navigate("/login");
                    return;
                }
                if (err.name !== "AbortError") {
                    setError(err.message || "Error");
                }
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
        return () => controller.abort();
    }, [navigate]);

    const promos = useMemo(
        () => products.filter(p => Number(p.originalPrice) > Number(p.price)),
        [products]
    );

    const newest = useMemo(() => products.slice(0, 6), [products]);

    const bestsellers = useMemo(
        () => [...products]
            .sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0))
            .slice(0, 10),
        [products]
    );

    const mostViewed = useMemo(
        () => [...products]
            .sort((a, b) => Number(b.views || 0) - Number(a.views || 0))
            .slice(0, 10),
        [products]
    );

    if (loading) return <div className="p-4">Loading...</div>;

    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
            <Header />

            <div className="max-w-7xl mx-auto px-6 mt-6 mb-2">
                <div className="w-full relative rounded-[30px] overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] group" style={{ minHeight: '420px' }}>
                    <img
                        src="/homepage_banner.png"
                        alt="Keycap showcase"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.88)_0%,rgba(8,8,10,0.55)_45%,rgba(8,8,10,0.08)_100%)] flex flex-col justify-center px-10 md:px-16">
                        <span className="text-[var(--theme-accent)] font-black tracking-[0.35em] uppercase mb-3 text-xs">Keycap / Artisan / Group buy</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-5 leading-none" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.03em' }}>
                            ARTSTUFF
                            <br />
                            <span className="text-[var(--theme-accent)]">HUB</span>
                        </h2>
                        <p className="text-sm md:text-base text-white/70 mb-8 max-w-xl leading-7">
                            Không gian dành riêng cho những bộ keycap, artisan cap và bundle mang tinh thần công nghiệp, sắc nét và đầy cá tính.
                        </p>
                        <div>
                            <button
                                onClick={() => navigate('/products')}
                                className="inline-flex items-center gap-3 bg-[var(--theme-accent)] hover:brightness-110 text-black px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.02]"
                            >
                                View store
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 mt-8">
                <style>{`
                    .scrollbar-none::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-none {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>


                <HorizontalProductSlider
                    title="Hot drops"
                    products={bestsellers}
                    navigate={navigate}
                />

                <HorizontalProductSlider
                    title="Most mounted"
                    products={mostViewed}
                    navigate={navigate}
                />

                <HorizontalProductSlider
                    title="Recent boards"
                    products={recentlyViewed}
                    navigate={navigate}
                />

            </main>

            <Footer />
        </div>
    );
};

export default HomePage;