import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { fetchAllProducts } from "../../utils/productApi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const SORT_OPTIONS = [
    { value: "newest", label: "NEWEST" },
    { value: "price_asc", label: "PRICE: LOW TO HIGH" },
    { value: "price_desc", label: "PRICE: HIGH TO LOW" },
    { value: "bestseller", label: "BEST SELLERS" },
    { value: "discount", label: "HIGHEST DISCOUNT" },
];

const PRICE_RANGES = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "0-200000", label: "Dưới 200.000đ" },
    { value: "200000-500000", label: "200.000đ – 500.000đ" },
    { value: "500000-1000000", label: "500.000đ – 1.000.000đ" },
    { value: "1000000-999999999", label: "Trên 1.000.000đ" },
];

const COLORS = [
    { label: "Black", value: "black", bg: "bg-black", text: "text-white" },
    { label: "White", value: "white", bg: "bg-white", text: "text-black" },
    { label: "Red", value: "red", bg: "bg-[#C63323]", text: "text-white" },
    {
        label: "Orange",
        value: "orange",
        bg: "bg-[#DE6036]",
        text: "text-white",
    },
    {
        label: "Yellow",
        value: "yellow",
        bg: "bg-[#E6BC49]",
        text: "text-white",
    },
    { label: "Green", value: "green", bg: "bg-[#52A358]", text: "text-white" },
    { label: "Blue", value: "blue", bg: "bg-[#234483]", text: "text-white" },
    { label: "Grey", value: "grey", bg: "bg-[#67686C]", text: "text-white" },
    {
        label: "Purple",
        value: "purple",
        bg: "bg-[#541270]",
        text: "text-white",
    },
    { label: "Pink", value: "pink", bg: "bg-[#D40078]", text: "text-white" },
    { label: "Brown", value: "brown", bg: "bg-[#5C2B14]", text: "text-white" },
    {
        label: "Multi Color",
        value: "multi",
        bg: "bg-[#EAEBEA]",
        text: "text-black",
    },
];

const ProductPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState("all");
    const [customMin, setCustomMin] = useState("");
    const [customMax, setCustomMax] = useState("");
    const [stockFilter, setStockFilter] = useState("all");
    const [onlyDiscount, setOnlyDiscount] = useState(false);
    const [sortBy, setSortBy] = useState("newest");

    // UI state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterShopId, setFilterShopId] = useState(null);

    // Filter collapse states
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);
    const [isColorOpen, setIsColorOpen] = useState(true);

    // Color state
    const [selectedColor, setSelectedColor] = useState("all");

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        selectedCategory,
        priceRange,
        customMin,
        customMax,
        stockFilter,
        onlyDiscount,
        sortBy,
        filterShopId,
        selectedColor,
    ]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const shopIdParam = queryParams.get("shopId");
        if (shopIdParam) {
            setFilterShopId(Number(shopIdParam));
        } else {
            setFilterShopId(null);
        }
        const qParam = queryParams.get("q");
        if (qParam) {
            setSearch(qParam);
            setSearchInput(qParam);
        }
    }, [location.search]);

    useEffect(() => {
        const controller = new AbortController();
        const load = async () => {
            try {
                setLoading(true);
                setError("");
                const allProducts = await fetchAllProducts({
                    apiBase: API_BASE,
                    signal: controller.signal,
                });
                setProducts(allProducts);
            } catch (err) {
                if (err.name !== "AbortError")
                    setError(err.message || "Có lỗi xảy ra");
            } finally {
                setLoading(false);
            }
        };
        load();
        return () => controller.abort();
    }, []);

    const categories = useMemo(() => {
        const cats = [
            ...new Set(products.map((p) => p.category).filter(Boolean)),
        ];
        return ["all", ...cats];
    }, [products]);

    const handleSearch = useCallback(
        (e) => {
            e.preventDefault();
            setSearch(searchInput.trim());
        },
        [searchInput],
    );

    const clearFilters = () => {
        setSearch("");
        setSearchInput("");
        setSelectedCategory("all");
        setPriceRange("all");
        setStockFilter("all");
        setOnlyDiscount(false);
        setSortBy("newest");
        setSelectedColor("all");
    };

    const filtered = useMemo(() => {
        let list = [...products];

        if (filterShopId) {
            list = list.filter((p) => Number(p.shopId) === filterShopId);
        }

        if (search) {
            const q = search.toLowerCase();
            list = list.filter(
                (p) =>
                    p.title?.toLowerCase().includes(q) ||
                    p.desc?.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q),
            );
        }

        if (selectedCategory !== "all") {
            list = list.filter((p) => p.category === selectedCategory);
        }

        if (selectedColor !== "all") {
            list = list.filter(
                (p) => p.color?.toLowerCase() === selectedColor.toLowerCase(),
            );
        }

        if (customMin || customMax) {
            const cMin = customMin ? Number(customMin) : 0;
            const cMax = customMax ? Number(customMax) : 999999999;
            list = list.filter(
                (p) => Number(p.price) >= cMin && Number(p.price) <= cMax,
            );
        } else if (priceRange !== "all") {
            const [min, max] = priceRange.split("-").map(Number);
            list = list.filter(
                (p) => Number(p.price) >= min && Number(p.price) <= max,
            );
        }

        if (stockFilter === "instock") list = list.filter((p) => p.stock > 0);
        if (stockFilter === "outofstock")
            list = list.filter((p) => p.stock === 0);

        if (onlyDiscount) {
            list = list.filter(
                (p) =>
                    p.originalPrice &&
                    Number(p.originalPrice) > Number(p.price),
            );
        }

        switch (sortBy) {
            case "price_asc":
                list.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case "price_desc":
                list.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case "bestseller":
                list.sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0));
                break;
            case "discount":
                list.sort((a, b) => {
                    const da = a.originalPrice
                        ? Number(a.originalPrice) - Number(a.price)
                        : 0;
                    const db = b.originalPrice
                        ? Number(b.originalPrice) - Number(b.price)
                        : 0;
                    return db - da;
                });
                break;
            default:
                break;
        }

        return list;
    }, [
        products,
        search,
        selectedCategory,
        priceRange,
        customMin,
        customMax,
        stockFilter,
        onlyDiscount,
        sortBy,
        filterShopId,
        selectedColor,
    ]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-texture-light font-oswald text-xl font-bold">
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-texture-light font-oswald">
                <div className="bg-white p-8 border-2 border-black text-center max-w-sm">
                    <p className="text-[var(--theme-accent)] font-bold text-xl">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-black relative z-0">
            {/* Global background handles the texture */}
            <Header />

            <div className="max-w-[1400px] mx-auto px-6 pt-12 md:pt-25 pb-20 relative z-10">
                {/* Header Title Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-6 border-b border-black/30 gap-4">
                    <div>
                        <div className="text-[10px] font-oswald uppercase font-bold tracking-widest text-black mb-1">
                            HOME <span className="text-black/30 mx-1">/</span>{" "}
                            STORE
                        </div>
                        <h1
                            className="text-6xl font-anton uppercase tracking-wider text-black m-0 leading-none"
                            style={{
                                textShadow: "1px 1px 0 rgba(255,255,255,0.5)",
                            }}
                        >
                            ALL ITEMS
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] font-oswald font-bold uppercase tracking-widest text-black mt-1">SORT BY:</span>
                        <div className="relative border-2 border-black bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border-none focus:outline-none cursor-pointer uppercase font-bold text-black text-xs font-oswald tracking-widest appearance-none px-4 py-2 pr-10 w-full h-full z-10 relative"
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value} className="text-black bg-white uppercase font-bold tracking-widest">
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                                <svg
                                    className="w-4 h-4 text-black"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-10 gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="border-2 border-black bg-white px-5 py-2 flex items-center gap-2 font-oswald font-bold uppercase tracking-widest text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            ></path>
                        </svg>
                        Filter
                    </button>

                    <form
                        onSubmit={handleSearch}
                        className="flex border-2 border-black w-full md:w-96 bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform focus-within:-translate-y-[2px]"
                    >
                        <input
                            type="text"
                            placeholder="Pokemon, Gummy Pet..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="flex-1 px-4 py-2 text-sm bg-transparent focus:outline-none text-black font-semibold placeholder-black/40"
                        />
                        <button
                            type="submit"
                            className="px-4 text-black hover:bg-black hover:text-white transition-colors"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </button>
                    </form>
                </div>

                <div className="flex gap-8 items-start">
                    {/* Overlay */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    {/* Sidebar */}
                    <aside
                        className={`fixed top-0 left-0 h-full w-[350px] bg-white border-r-2 border-black p-6 z-50 transform transition-transform duration-300 overflow-y-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} shadow-[20px_0_60px_rgba(0,0,0,0.3)]`}
                    >
                        <div className="flex items-center justify-between mb-8 pb-4">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="text-[var(--theme-accent)] hover:text-black"
                            >
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
                                        d="M15 19l-7-7 7-7"
                                    ></path>
                                </svg>
                            </button>
                            <h2 className="text-3xl font-anton uppercase tracking-wider m-0 flex-1 ml-4 text-black">
                                Filter
                            </h2>
                            <button
                                onClick={clearFilters}
                                className="text-sm font-oswald font-bold uppercase tracking-widest text-[var(--theme-accent)] hover:underline"
                            >
                                Clear all
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="mb-8">
                            <div
                                className="flex items-center justify-between mb-4 cursor-pointer"
                                onClick={() =>
                                    setIsCategoryOpen(!isCategoryOpen)
                                }
                            >
                                <h3 className="text-2xl font-anton uppercase tracking-widest m-0 text-black">
                                    Category
                                </h3>
                                <svg
                                    className={`w-4 h-4 text-black transform transition-transform ${isCategoryOpen ? "" : "rotate-180"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div
                                className={`grid grid-cols-2 gap-3 p-1 overflow-hidden transition-all duration-300 ${isCategoryOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-2 py-2 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? "bg-black text-white shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"} text-center min-h-[40px] flex items-center justify-center`}
                                    >
                                        {cat === "all" ? "Tất cả" : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-8">
                            <div
                                className="flex items-center justify-between mb-4 cursor-pointer"
                                onClick={() =>
                                    setIsPriceRangeOpen(!isPriceRangeOpen)
                                }
                            >
                                <h3 className="text-2xl font-anton uppercase tracking-widest m-0 text-black">
                                    Price range
                                </h3>
                                <svg
                                    className={`w-4 h-4 text-black transform transition-transform ${isPriceRangeOpen ? "" : "rotate-180"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div
                                className={`flex flex-col gap-3 p-1 overflow-hidden transition-all duration-300 ${isPriceRangeOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                {PRICE_RANGES.map((pr) => (
                                    <button
                                        key={pr.value}
                                        onClick={() => {
                                            setPriceRange(pr.value);
                                            setCustomMin("");
                                            setCustomMax("");
                                        }}
                                        className={`px-3 py-2 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${priceRange === pr.value && !customMin && !customMax ? "bg-black text-white shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"} flex items-center justify-center w-full min-h-[40px]`}
                                    >
                                        {pr.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color */}
                        <div className="mb-8">
                            <div
                                className="flex items-center justify-between mb-4 cursor-pointer"
                                onClick={() => setIsColorOpen(!isColorOpen)}
                            >
                                <h3 className="text-2xl font-anton uppercase tracking-widest m-0 text-black">
                                    Color
                                </h3>
                                <svg
                                    className={`w-4 h-4 text-black transform transition-transform ${isColorOpen ? "" : "rotate-180"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div
                                className={`grid grid-cols-2 gap-3 p-1.5 overflow-hidden transition-all duration-300 ${isColorOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                {COLORS.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() =>
                                            setSelectedColor(
                                                selectedColor === color.value
                                                    ? "all"
                                                    : color.value,
                                            )
                                        }
                                        className={`px-2 py-2 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${color.bg} ${color.text} ${selectedColor === color.value ? "shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1 ring-2 ring-black ring-offset-2" : "hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] opacity-90 hover:opacity-100"} text-center min-h-[40px] flex items-center justify-center`}
                                    >
                                        {color.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 flex justify-end">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="bg-[var(--theme-accent)] text-white px-8 py-3 font-oswald font-bold text-xl uppercase tracking-widest btn-2d border-2 border-transparent hover:border-black"
                            >
                                Apply
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Grid */}
                    <div className="flex-1 min-w-0">
                        {filtered.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-5xl mb-4">⌁</div>
                                <p className="font-anton text-2xl text-black mb-4 uppercase tracking-widest">
                                    No keycap matches
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-[var(--theme-accent)] text-white px-6 py-2 font-oswald font-bold text-sm uppercase tracking-widest btn-2d border-2 border-transparent hover:border-black"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filtered
                                        .slice(
                                            (currentPage - 1) * 9,
                                            currentPage * 9,
                                        )
                                        .map((p) => (
                                            <ProductCard
                                                key={p.id}
                                                product={p}
                                            />
                                        ))}
                                </div>

                                {/* Pagination */}
                                {Math.ceil(filtered.length / 9) > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-12 mb-8 font-oswald font-bold">
                                        <button
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.max(1, prev - 1),
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 flex items-center justify-center text-black border-2 border-black disabled:opacity-30 disabled:border-black/30 hover:bg-black hover:text-white transition-colors btn-2d"
                                        >
                                            &lt;
                                        </button>

                                        {Array.from(
                                            {
                                                length: Math.ceil(
                                                    filtered.length / 9,
                                                ),
                                            },
                                            (_, i) => i + 1,
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                                className={`w-10 h-10 flex items-center justify-center border-2 border-black transition-colors btn-2d ${currentPage === page ? "bg-[var(--theme-accent)] text-white border-[var(--theme-accent)]" : "hover:bg-black hover:text-white"}`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.min(
                                                        Math.ceil(
                                                            filtered.length / 9,
                                                        ),
                                                        prev + 1,
                                                    ),
                                                )
                                            }
                                            disabled={
                                                currentPage ===
                                                Math.ceil(filtered.length / 9)
                                            }
                                            className="w-10 h-10 flex items-center justify-center text-black border-2 border-black disabled:opacity-30 disabled:border-black/30 hover:bg-black hover:text-white transition-colors btn-2d"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* The footer is dark, but this page is light. Let's use the torn-paper-bottom effect on the main container to transition to the dark footer */}
            <div className="torn-paper-bottom"></div>
            <Footer />
        </div>
    );
};

export default ProductPage;
