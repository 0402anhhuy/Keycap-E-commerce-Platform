import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import { fetchAllProducts } from "../../utils/productApi";
import { fetchAllCollections } from "../../utils/collectionApi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const HorizontalProductSlider = ({ title, products, navigate }) => {
    const sliderId = useMemo(
        () => `slider-${Math.random().toString(36).substr(2, 9)}`,
        [],
    );
    const [activeDot, setActiveDot] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleScroll = (e) => {
        const container = e.target;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        if (scrollWidth <= clientWidth) {
            setTotalPages(0);
            return;
        }

        const scrollAmount = clientWidth + 24;
        const pages = Math.ceil((scrollWidth - clientWidth) / scrollAmount) + 1;

        if (pages !== totalPages) setTotalPages(pages);

        const maxScrollLeft = scrollWidth - clientWidth;
        const isAtEnd = Math.abs(container.scrollLeft - maxScrollLeft) < 10;

        let currentActive;
        if (isAtEnd) {
            currentActive = pages - 1;
        } else {
            currentActive = Math.round(container.scrollLeft / scrollAmount);
        }

        setActiveDot(Math.max(0, Math.min(currentActive, pages - 1)));
    };

    useEffect(() => {
        const container = document.getElementById(sliderId);
        if (container) handleScroll({ target: container });

        const onResize = () => {
            if (container) handleScroll({ target: container });
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [products, sliderId]);

    const scrollToPage = (pageIndex) => {
        const container = document.getElementById(sliderId);
        if (!container) return;
        const scrollAmount = container.clientWidth + 24;
        container.scrollTo({
            left: pageIndex * scrollAmount,
            behavior: "smooth",
        });
    };

    const scroll = (direction) => {
        const container = document.getElementById(sliderId);
        if (!container) return;
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
                    onScroll={handleScroll}
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
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => scrollToPage(idx)}
                            className={`h-1 w-8 cursor-pointer transition-colors ${activeDot === idx ? "bg-[var(--theme-accent)]" : "bg-black/20 hover:bg-black/40"}`}
                        ></div>
                    ))}
                </div>
            )}
        </section>
    );
};

const CollabSlider = ({ collections, navigate }) => {
    const sliderId = useMemo(
        () => `collab-slider-${Math.random().toString(36).substr(2, 9)}`,
        [],
    );
    const [activeDot, setActiveDot] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const getScrollAmount = (clientWidth) => {
        const paddingLeft = clientWidth >= 768 ? 48 : 16; // md:px-12 is 48px, px-4 is 16px
        return clientWidth - paddingLeft;
    };

    const handleScroll = (e) => {
        const container = e.target;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        if (scrollWidth <= clientWidth) {
            setTotalPages(0);
            return;
        }

        const scrollAmount = getScrollAmount(clientWidth);
        const pages = Math.ceil((scrollWidth - clientWidth) / scrollAmount) + 1;

        if (pages !== totalPages) setTotalPages(pages);

        const maxScrollLeft = scrollWidth - clientWidth;
        const isAtEnd = Math.abs(container.scrollLeft - maxScrollLeft) < 10;

        let currentActive;
        if (isAtEnd) {
            currentActive = pages - 1;
        } else {
            currentActive = Math.round(container.scrollLeft / scrollAmount);
        }

        setActiveDot(Math.max(0, Math.min(currentActive, pages - 1)));
    };

    useEffect(() => {
        const container = document.getElementById(sliderId);
        if (container) handleScroll({ target: container });

        const onResize = () => {
            if (container) handleScroll({ target: container });
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [collections, sliderId]);

    const scrollToPage = (pageIndex) => {
        const container = document.getElementById(sliderId);
        if (!container) return;
        const scrollAmount = getScrollAmount(container.clientWidth);
        container.scrollTo({
            left: pageIndex * scrollAmount,
            behavior: "smooth",
        });
    };

    const scroll = (direction) => {
        const container = document.getElementById(sliderId);
        if (!container) return;
        const scrollAmount = getScrollAmount(container.clientWidth);
        const target =
            direction === "left"
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;
        container.scrollTo({ left: target, behavior: "smooth" });
    };

    const paddedCollections = useMemo(() => {
        if (!collections || collections.length === 0) return [];
        const result = [...collections];
        const remainder = result.length % 3;
        if (remainder !== 0) {
            const paddingNeeded = 3 - remainder;
            for (let i = 0; i < paddingNeeded; i++) {
                // Duplicate elements from the start to pad the end
                result.push({ ...collections[i], _cloneId: `clone-${i}` });
            }
        }
        return result;
    }, [collections]);

    if (!paddedCollections || paddedCollections.length === 0) return null;

    return (
        <div className="relative max-w-[1400px] mx-auto">
            {/* Navigation Arrows */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-[40%] -translate-y-1/2 w-12 h-12 flex items-center justify-center text-black/30 hover:text-black transition-colors cursor-pointer z-10 hidden md:flex"
            >
                <svg
                    className="w-10 h-10"
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
                className="absolute right-0 top-[40%] -translate-y-1/2 w-12 h-12 flex items-center justify-center text-black/30 hover:text-black transition-colors cursor-pointer z-10 hidden md:flex"
            >
                <svg
                    className="w-10 h-10"
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
                onScroll={handleScroll}
                className="flex gap-4 md:gap-12 snap-x snap-mandatory px-4 md:px-12 overflow-x-auto scroll-smooth pb-8 scroll-pl-4 md:scroll-pl-12 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {paddedCollections.map((col) => (
                    <div
                        key={
                            col._cloneId ? `${col.id}-${col._cloneId}` : col.id
                        }
                        className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.334%-2rem)] flex-shrink-0 snap-start bg-white border-[3px] border-transparent hover:border-black transition-colors group flex flex-col shadow-sm animate-fade-in-up"
                    >
                        <div className="aspect-[4/3] bg-[#f4f4f4] relative flex items-center justify-center overflow-hidden">
                            <img
                                src={col.background}
                                alt="Collab"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-4 flex items-center gap-3 border-t border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center overflow-hidden p-1">
                                <img
                                    src="https://dwarf-factory.com/assets/images/logo-square.svg"
                                    className="w-full h-full object-contain"
                                    alt="dwaft factory logo"
                                />
                            </div>
                            <span className="text-xs font-bold text-black">
                                x
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center overflow-hidden p-1">
                                <img
                                    src={col.logo}
                                    className="w-full h-full object-contain"
                                    alt={col.name}
                                />
                            </div>
                            <div className="ml-auto flex flex-col items-end">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    COLLAB
                                </span>
                                <span className="text-xs font-bold text-black uppercase">
                                    {col.name}
                                </span>
                            </div>
                        </div>
                        <div
                            onClick={() =>
                                navigate(
                                    `/products?collection=${encodeURIComponent(col.name)}`,
                                )
                            }
                            className="bg-black text-white p-4 flex justify-between items-center hover:bg-[var(--theme-accent)] transition-colors cursor-pointer"
                        >
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

            {/* Dots */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4 mb-8">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => scrollToPage(idx)}
                            className={`h-1 w-8 cursor-pointer transition-colors ${activeDot === idx ? "bg-[var(--theme-accent)]" : "bg-black/20 hover:bg-black/40"}`}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
};

const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("accessToken");
                const [productsData, collectionsData] = await Promise.all([
                    fetchAllProducts({
                        apiBase: API_BASE,
                        signal: controller.signal,
                        headers: {
                            "Content-Type": "application/json",
                            ...(token
                                ? { Authorization: `Bearer ${token}` }
                                : {}),
                        },
                    }),
                    fetchAllCollections({
                        apiBase: API_BASE,
                        signal: controller.signal,
                    }),
                ]);

                setProducts(productsData);
                setCollections(collectionsData);
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

        loadData();
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
                            className="w-full bg-[url('https://dwarf-factory.com/assets/images/button/btn-orange.jpg')] text-white font-oswald font-bold py-4 uppercase flex justify-between items-center px-5 text-xl cursor-pointer"
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
                        {collections.map((collection) => (
                            <div
                                key={collection.id}
                                className="flex flex-col items-center gap-3 cursor-pointer group"
                                onClick={() =>
                                    navigate(
                                        `/products?collection=${encodeURIComponent(collection.name)}`,
                                    )
                                }
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200 overflow-hidden group-hover:border-black group-hover:shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all">
                                    <img
                                        src={collection.logo}
                                        alt={collection.name}
                                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">
                                    {collection.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Collab Cards */}
                    <CollabSlider
                        collections={collections}
                        navigate={navigate}
                    />

                    {/* Button */}
                    <div className="flex flex-col items-center mt-8">
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-[url('https://dwarf-factory.com/assets/images/button/btn-orange.jpg')] text-white font-oswald font-bold py-3 px-10 text-sm uppercase tracking-wider hover:bg-[var(--theme-accent-2)] transition-colors shadow-lg btn-2d flex items-center gap-2 cursor-pointer"
                        >
                            EXPLORE NOW
                        </button>
                    </div>
                </div>
            </section>
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default HomePage;
