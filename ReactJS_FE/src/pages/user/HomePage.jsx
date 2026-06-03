import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import ScrollToTop from "../../components/user/ScrollToTop";
import { fetchAllProducts } from "../../utils/productApi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const HorizontalProductSlider = ({ title, products, navigate }) => {
    const sliderId = useMemo(
        () => `slider-${Math.random().toString(36).substr(2, 9)}`,
        [],
    );

    const scroll = (direction) => {
        const container = document.getElementById(sliderId);
        if (!container) return;
        // Add 24px (gap-6) to ensure we scroll past the snap threshold
        const scrollAmount = container.clientWidth + 24;
        const target =
            direction === "left"
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;
        container.scrollTo({ left: target, behavior: "smooth" });
    };

    if (!products || products.length === 0) return null;

    return (
        <section className="mb-8 relative py-8">
            <div className="text-center mb-12">
                <h3 className="text-5xl md:text-6xl font-anton uppercase tracking-wider text-black inline-block relative">
                    {title}
                </h3>
            </div>

            {/* Navigation Arrows inside container for better placement */}
            <div className="relative max-w-[1400px] mx-auto px-12">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-black/50 hover:text-black transition-colors cursor-pointer z-10"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-black/50 hover:text-black transition-colors cursor-pointer z-10"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>

                {/* Scrollable Container */}
                <div
                    id={sliderId}
                    className="overflow-x-auto scroll-smooth pt-4 pb-8 -mt-4 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <div className="flex gap-6 snap-x snap-mandatory px-4 lg:px-0">
                        {products.map((p) => (
                            <div
                                key={p.id}
                                className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex-shrink-0 snap-start"
                            >
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Minimal line indicators */}
            <div className="flex justify-center gap-2 mt-8">
                <div className="h-0.5 w-8 bg-black/20"></div>
                <div className="h-0.5 w-8 bg-[var(--theme-accent)]"></div>
                <div className="h-0.5 w-8 bg-black/20"></div>
                <div className="h-0.5 w-8 bg-black/20"></div>
            </div>
        </section>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
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

    const bestsellers = useMemo(
        () =>
            [...products]
                .sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0))
                .slice(0, 10),
        [products],
    );

    if (loading)
        return (
            <div className="p-10 text-center font-oswald text-white text-xl">
                Loading...
            </div>
        );
    if (error)
        return (
            <div className="p-10 text-center font-oswald text-[var(--theme-accent)] text-xl">
                {error}
            </div>
        );

    return (
        <div className="min-h-screen bg-transparent overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <div className="w-full relative min-h-[700px] flex items-center border-b-2 border-black z-20">
                <img
                    src="https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/685e097bf8734a1154e57a98"
                    alt="Keycap showcase"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                />

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-end items-center">
                    <div className="hidden lg:flex flex-col bg-white w-[320px] shadow-[8px_8px_0_rgba(0,0,0,1)] mt-12 border-2 border-black rounded-none overflow-hidden font-mono text-black text-xs font-bold leading-relaxed tracking-tight">
                        <div className="p-3 border-b-2 border-black text-center text-[11px] tracking-widest">
                            FIT CHERRY MX SWITCHES
                        </div>

                        <div className="flex border-b-2 border-black min-h-[60px]">
                            <div className="w-[50%] p-2 border-r-2 border-black flex items-center justify-center text-center">
                                WORLDWIDE
                                <br />
                                DELIVERY
                            </div>
                            <div className="w-[50%] p-2 flex items-center justify-center text-center">
                                PREMIUM
                                <br />
                                QUALITY
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/products")}
                            className="w-full bg-[var(--theme-accent)] text-white font-oswald font-bold py-4 uppercase tracking-widest flex justify-between items-center px-5 hover:bg-black transition-colors text-xl"
                            style={{ letterSpacing: "0.2em" }}
                        >
                            SHOP NOW
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content slider sections */}
            <main className="pt-12 pb-20 z-20 relative overflow-hidden bg-[url('https://dwarf-factory.com/assets/images/bg/light.jpg')] bg-contain">
                <HorizontalProductSlider
                    title="FEATURED"
                    products={bestsellers}
                    navigate={navigate}
                />
            </main>

            {/* Collaborations Section */}
            <section className="py-20 relative z-10 overflow-hidden bg-[url('https://dwarf-factory.com/assets/images/bg/light.jpg')] bg-contain">
                <div className="max-w-[1400px] mx-auto px-6">
                    <h2 className="text-5xl md:text-6xl font-anton uppercase text-center text-black mb-16">
                        COLLECTIONS
                    </h2>

                    {/* Logos Grid */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-16 opacity-80">
                        {[
                            "DROP",
                            "STEELSERIES",
                            "FAZE CLAN",
                            "G2 ESPORTS",
                            "FNATIC",
                            "NZXT",
                            "EMINENT CRAFTS",
                        ].map((partner) => (
                            <div
                                key={partner}
                                className="flex flex-col items-center gap-3"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center font-bold text-black text-xs md:text-sm text-center p-2 shadow-sm border border-gray-200">
                                    {partner.split(" ")[0]}
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                    {partner}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Collab Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4 md:px-12">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white border-[3px] border-transparent hover:border-black transition-colors cursor-pointer group flex flex-col shadow-sm"
                            >
                                <div className="aspect-[4/3] bg-[#f4f4f4] p-6 relative flex items-center justify-center">
                                    <img
                                        src="https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/685e097bf8734a1154e57a98"
                                        alt="Collab"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4 flex items-center gap-3 border-t border-gray-100">
                                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-[8px]">
                                        LOGO
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">
                                        x
                                    </span>
                                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-[8px]">
                                        LOGO
                                    </div>
                                    <div className="ml-auto flex flex-col items-end">
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                            OF 1 DROP
                                        </span>
                                        <span className="text-xs font-bold text-black uppercase">
                                            LORD OF THE RINGS™
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-black text-white p-4 flex justify-between items-center group-hover:bg-[var(--theme-accent)] transition-colors">
                                    <span className="font-anton uppercase tracking-widest text-[15px]">
                                        VIEW DETAILS
                                    </span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="square"
                                            strokeLinejoin="miter"
                                            strokeWidth="2"
                                            d="M5 19L19 5m0 0v14m0-14H5"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots & Button */}
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex justify-center gap-2">
                            <div className="h-1 w-8 bg-gray-300"></div>
                            <div className="h-1 w-8 bg-[var(--theme-accent)]"></div>
                            <div className="h-1 w-8 bg-gray-300"></div>
                            <div className="h-1 w-8 bg-gray-300"></div>
                        </div>
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-[url('https://dwarf-factory.com/assets/images/button/btn-orange.jpg')] text-white font-oswald font-bold py-3 px-10 text-sm uppercase tracking-wider hover:bg-[var(--theme-accent-2)] transition-colors shadow-lg btn-2d flex items-center gap-2"
                        >
                            EXPLORE NOW
                        </button>
                    </div>
                </div>
            </section>

            {/* Happy Owners Section */}
            <section className="pt-8 pb-28 z-20 relative overflow-hidden bg-[url('https://dwarf-factory.com/assets/images/bg/light.jpg')] bg-contain">
                <div className="max-w-[1400px] mx-auto px-6">
                    <h2 className="text-5xl md:text-6xl font-anton uppercase text-center text-black mb-12">
                        HAPPY OWNERS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4 md:px-12">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="aspect-square relative group cursor-pointer overflow-hidden shadow-lg border-4 border-white"
                            >
                                <img
                                    src={`https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/685e097bf8734a1154e57a98`}
                                    alt="Happy owner"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-oswald text-xs font-bold uppercase tracking-widest border-b-2 border-white pb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        VIEW POST
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2">
                        <div className="h-0.5 w-8 bg-gray-400"></div>
                        <div className="h-0.5 w-8 bg-[var(--theme-accent)]"></div>
                        <div className="h-0.5 w-8 bg-gray-400"></div>
                        <div className="h-0.5 w-8 bg-gray-400"></div>
                    </div>
                </div>
            </section>
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default HomePage;
