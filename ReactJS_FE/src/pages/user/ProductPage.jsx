import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import ScrollToTop from "../../components/ScrollToTop";
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
    { value: "0-50", label: "Under $50" },
    { value: "50-100", label: "$50 – $100" },
    { value: "100-200", label: "$100 – $200" },
    { value: "200-999999999", label: "Over $200" },
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

const FORMS = [
    {
        label: "DOM",
        value: "DOM",
        icon: (isSelected) => (
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 43 42"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
            >
                <mask id="path-1-inside-1_4357_1506" fill="white">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M39.819 22.7869V37.0849H21.4998H3.18066V22.7869V21.8227H3.2056C3.707 12.1535 11.7059 4.46777 21.4998 4.46777C31.2938 4.46777 39.2926 12.1535 39.794 21.8227H39.819V22.7869Z"
                    ></path>
                </mask>
                <path
                    d="M39.819 37.0849V39.0849C40.9235 39.0849 41.819 38.1895 41.819 37.0849H39.819ZM3.18066 37.0849H1.18066C1.18066 38.1895 2.07609 39.0849 3.18066 39.0849L3.18066 37.0849ZM3.18066 21.8227V19.8227C2.07609 19.8227 1.18066 20.7181 1.18066 21.8227H3.18066ZM3.2056 21.8227V23.8227C4.26992 23.8227 5.1478 22.9892 5.20292 21.9263L3.2056 21.8227ZM39.794 21.8227L37.7967 21.9263C37.8518 22.9892 38.7297 23.8227 39.794 23.8227V21.8227ZM39.819 21.8227H41.819C41.819 20.7181 40.9235 19.8227 39.819 19.8227V21.8227ZM37.819 22.7869V37.0849H41.819V22.7869H37.819ZM39.819 35.0849H21.4998V39.0849H39.819V35.0849ZM21.4998 35.0849H3.18066V39.0849H21.4998V35.0849ZM5.18066 37.0849V22.7869H1.18066V37.0849H5.18066ZM5.18066 22.7869V21.8227H1.18066V22.7869H5.18066ZM3.18066 23.8227H3.2056V19.8227H3.18066V23.8227ZM5.20292 21.9263C5.64949 13.3144 12.7757 6.46777 21.4998 6.46777V2.46777C10.636 2.46777 1.76451 10.9926 1.20829 21.7191L5.20292 21.9263ZM21.4998 6.46777C30.2239 6.46777 37.3501 13.3144 37.7967 21.9263L41.7913 21.7191C41.2351 10.9926 32.3636 2.46777 21.4998 2.46777V6.46777ZM39.794 23.8227H39.819V19.8227H39.794V23.8227ZM37.819 21.8227V22.7869H41.819V21.8227H37.819Z"
                    fill={isSelected ? "white" : "var(--theme-accent)"}
                ></path>
            </svg>
        ),
    },
    {
        label: "CHERRY",
        value: "CHERRY",
        icon: (isSelected) => (
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 42 22"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
            >
                <path
                    d="M3.07434 1.61719L1.28711 20.83H40.6063L32.5637 1.61719H3.07434Z"
                    stroke={isSelected ? "white" : "var(--theme-accent)"}
                    strokeWidth="3"
                    strokeLinejoin="round"
                ></path>
            </svg>
        ),
    },
    {
        label: "SA R1",
        value: "SAR1",
        icon: (isSelected) => (
            <svg
                width="95%"
                height="95%"
                viewBox="0 0 41 35"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
            >
                <path
                    d="M7.09562 1.36133C2.44881 8.86771 1.28711 23.9996 1.28711 33.0847H39.7126C41.0531 23.7018 35.6914 9.85069 34.7977 7.16984C24.0743 8.95707 9.32966 2.25495 7.09562 1.36133Z"
                    stroke={isSelected ? "white" : "var(--theme-accent)"}
                    strokeWidth="3"
                    strokeLinejoin="round"
                ></path>
            </svg>
        ),
    },
];

const ProductPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getInitialState = (key, fallback) => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.toString()) return fallback;
        try {
            const savedStr = sessionStorage.getItem(
                "keycap_shop_product_filters",
            );
            if (savedStr) {
                const saved = JSON.parse(savedStr);
                return saved[key] !== undefined ? saved[key] : fallback;
            }
        } catch (e) {}
        return fallback;
    };

    const [search, setSearch] = useState(() => getInitialState("search", ""));
    const [searchInput, setSearchInput] = useState(() =>
        getInitialState("searchInput", ""),
    );
    const [selectedCategory, setSelectedCategory] = useState(() =>
        getInitialState("selectedCategory", []),
    );
    const [selectedCollection, setSelectedCollection] = useState(() =>
        getInitialState("selectedCollection", []),
    );
    const [priceRange, setPriceRange] = useState(() =>
        getInitialState("priceRange", []),
    );
    const [customMin, setCustomMin] = useState(() =>
        getInitialState("customMin", ""),
    );
    const [customMax, setCustomMax] = useState(() =>
        getInitialState("customMax", ""),
    );
    const [stockFilter, setStockFilter] = useState(() =>
        getInitialState("stockFilter", "all"),
    );
    const [onlyDiscount, setOnlyDiscount] = useState(() =>
        getInitialState("onlyDiscount", false),
    );
    const [sortBy, setSortBy] = useState(() =>
        getInitialState("sortBy", "newest"),
    );

    // UI state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(() =>
        getInitialState("currentPage", 1),
    );
    const [filterShopId, setFilterShopId] = useState(null);

    // Filter collapse states
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isCollectionOpen, setIsCollectionOpen] = useState(true);
    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);
    const [isColorOpen, setIsColorOpen] = useState(true);

    // Color, Size, and Form state
    const [selectedColor, setSelectedColor] = useState(() =>
        getInitialState("selectedColor", []),
    );
    const [selectedSize, setSelectedSize] = useState(() =>
        getInitialState("selectedSize", []),
    );
    const [isSizeOpen, setIsSizeOpen] = useState(true);
    const [selectedForm, setSelectedForm] = useState(() =>
        getInitialState("selectedForm", []),
    );
    const [isFormOpen, setIsFormOpen] = useState(true);

    const [appliedFilters, setAppliedFilters] = useState(() =>
        getInitialState("appliedFilters", {
            category: [],
            collection: [],
            priceRange: [],
            customMin: "",
            customMax: "",
            color: [],
            size: [],
            form: [],
        }),
    );

    const toggleFilterItem = (setState, value) => {
        setState((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value],
        );
    };

    // Sticky toolbar state
    const [isSticky, setIsSticky] = useState(false);
    const toolbarRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (toolbarRef.current) {
                const rect = toolbarRef.current.getBoundingClientRect();
                // When the placeholder hits the top of the viewport (or goes above), make it sticky
                if (rect.top <= 0) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Check on mount

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [
        search,
        appliedFilters,
        stockFilter,
        onlyDiscount,
        sortBy,
        filterShopId,
    ]);

    useEffect(() => {
        const filterState = {
            search,
            searchInput,
            selectedCategory,
            selectedCollection,
            priceRange,
            customMin,
            customMax,
            stockFilter,
            onlyDiscount,
            sortBy,
            currentPage,
            selectedColor,
            selectedSize,
            selectedForm,
            appliedFilters,
        };
        sessionStorage.setItem(
            "keycap_shop_product_filters",
            JSON.stringify(filterState),
        );
    }, [
        search,
        searchInput,
        selectedCategory,
        selectedCollection,
        priceRange,
        customMin,
        customMax,
        stockFilter,
        onlyDiscount,
        sortBy,
        currentPage,
        selectedColor,
        selectedSize,
        selectedForm,
        appliedFilters,
    ]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        // If there are no query params, we don't need to parse anything, sessionStorage handled it.
        if (!queryParams.toString()) return;

        const shopIdParam = queryParams.get("shopId    ");
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

        const collectionParam = queryParams.get("collection");
        if (collectionParam) {
            setSelectedCollection([collectionParam]);
            setAppliedFilters((prev) => ({
                ...prev,
                collection: [collectionParam],
            }));
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

    const [collectionsList, setCollectionsList] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/collections`);
                if (res.ok) {
                    const data = await res.json();
                    setCollectionsList([...data.map((c) => c.name)]);
                }
            } catch (err) {
                console.error("Failed to fetch collections", err);
            }
        };
        fetchCollections();
    }, []);

    const categories = useMemo(() => {
        return [...new Set(products.map((p) => p.category).filter(Boolean))];
    }, [products]);

    const sizes = useMemo(() => {
        return [...new Set(products.map((p) => p.size).filter(Boolean))].sort(
            (a, b) => {
                // Sort standard sizes properly (e.g. 1U, 1.25U, 1.5U, 2U, 6.25U)
                const numA = parseFloat(a.replace("U", ""));
                const numB = parseFloat(b.replace("U", ""));
                if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                return a.localeCompare(b);
            },
        );
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
        setSelectedCategory([]);
        setSelectedCollection([]);
        setPriceRange([]);
        setStockFilter("all");
        setOnlyDiscount(false);
        setSortBy("newest");
        setSelectedColor([]);
        setSelectedSize([]);
        setSelectedForm([]);
        setAppliedFilters({
            category: [],
            collection: [],
            priceRange: [],
            customMin: "",
            customMax: "",
            color: [],
            size: [],
            form: [],
        });
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

        if (appliedFilters.category.length > 0) {
            list = list.filter((p) =>
                appliedFilters.category.includes(p.category),
            );
        }

        if (appliedFilters.collection.length > 0) {
            list = list.filter((p) =>
                appliedFilters.collection.includes(
                    p.collection?.name || p.collection,
                ),
            );
        }

        if (appliedFilters.color.length > 0) {
            list = list.filter((p) =>
                appliedFilters.color.includes(p.color?.toLowerCase()),
            );
        }

        if (appliedFilters.size?.length > 0) {
            list = list.filter((p) => appliedFilters.size.includes(p.size));
        }

        if (appliedFilters.form?.length > 0) {
            list = list.filter((p) => appliedFilters.form.includes(p.form));
        }

        if (appliedFilters.customMin || appliedFilters.customMax) {
            const cMin = appliedFilters.customMin
                ? Number(appliedFilters.customMin)
                : 0;
            const cMax = appliedFilters.customMax
                ? Number(appliedFilters.customMax)
                : 999999999;
            list = list.filter(
                (p) => Number(p.price) >= cMin && Number(p.price) <= cMax,
            );
        } else if (appliedFilters.priceRange.length > 0) {
            list = list.filter((p) => {
                const price = Number(p.price);
                return appliedFilters.priceRange.some((range) => {
                    const [min, max] = range.split("-").map(Number);
                    return price >= min && price <= max;
                });
            });
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
        appliedFilters,
        stockFilter,
        onlyDiscount,
        sortBy,
        filterShopId,
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
        <div className="min-h-screen text-black relative z-0 bg-[url('https://dwarf-factory.com/assets/images/bg/light.jpg')] bg-fill">
            {/* Global background handles the texture */}
            <Header isHidden={isSticky} />
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[90] transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-[450px] bg-[#ebebeb] border-r-2 border-black z-[100] transform transition-transform duration-300 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} shadow-[20px_0_60px_rgba(0,0,0,0.3)]`}
            >
                {/* Fixed Header */}
                <div className="px-6 py-5 bg-white flex items-center justify-between shrink-0 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-black hover:text-[var(--theme-accent)] transition-colors mt-1"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="5"
                                viewBox="0 0 24 35"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                        </button>
                        <h2 className="text-[32px] font-anton uppercase tracking-wider m-0 text-black leading-none">
                            Filter
                        </h2>
                    </div>
                    <button
                        onClick={clearFilters}
                        className="text-[13px] font-oswald font-medium uppercase tracking-widest text-[var(--theme-accent)] underline underline-offset-4 hover:text-black transition-colors mt-2"
                    >
                        Clear all
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Categories */}
                    <div
                        className={`transition-all duration-300 ${isCategoryOpen ? "mb-8" : "mb-2"}`}
                    >
                        <div
                            className={`flex items-center justify-between cursor-pointer ${isCategoryOpen ? "mb-4" : "mb-0"}`}
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
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
                                    onClick={() =>
                                        toggleFilterItem(
                                            setSelectedCategory,
                                            cat,
                                        )
                                    }
                                    className={`rounded-md h-full px-2 py-2 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory.includes(cat) ? "bg-[var(--theme-accent)] text-white shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"} text-center min-h-[60px] flex items-center justify-center`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Collection */}
                    <div
                        className={`transition-all duration-300 ${isCollectionOpen ? "mb-8" : "mb-2"}`}
                    >
                        <div
                            className={`flex items-center justify-between cursor-pointer ${isCollectionOpen ? "mb-4" : "mb-0"}`}
                            onClick={() =>
                                setIsCollectionOpen(!isCollectionOpen)
                            }
                        >
                            <h3 className="text-2xl font-anton uppercase tracking-widest m-0 text-black">
                                Collection
                            </h3>
                            <svg
                                className={`w-4 h-4 text-black transform transition-transform ${isCollectionOpen ? "" : "rotate-180"}`}
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
                            className={`grid grid-cols-2 gap-3 p-1 overflow-hidden transition-all duration-300 ${isCollectionOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            {collectionsList.map((col) => (
                                <button
                                    key={col}
                                    onClick={() =>
                                        toggleFilterItem(
                                            setSelectedCollection,
                                            col,
                                        )
                                    }
                                    className={`rounded-md h-full px-2 py-2 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${selectedCollection.includes(col) ? "bg-[var(--theme-accent)] text-white shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"} text-center min-h-[60px] flex items-center justify-center`}
                                >
                                    {col}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div
                        className={`transition-all duration-300 ${isPriceRangeOpen ? "mb-8" : "mb-2"}`}
                    >
                        <div
                            className={`flex items-center justify-between cursor-pointer ${isPriceRangeOpen ? "mb-4" : "mb-0"}`}
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
                            className={`grid grid-cols-2 gap-3 p-1 overflow-hidden transition-all duration-300 ${isPriceRangeOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            {PRICE_RANGES.map((pr) => (
                                <button
                                    key={pr.value}
                                    onClick={() => {
                                        toggleFilterItem(
                                            setPriceRange,
                                            pr.value,
                                        );
                                        setCustomMin("");
                                        setCustomMax("");
                                    }}
                                    className={`rounded-md h-full px-2 py-2 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${priceRange.includes(pr.value) && !customMin && !customMax ? "bg-[var(--theme-accent)] text-white shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"} flex items-center justify-center text-center min-h-[60px]`}
                                >
                                    {pr.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color */}
                    <div
                        className={`transition-all duration-300 ${isColorOpen ? "mb-8" : "mb-2"}`}
                    >
                        <div
                            className={`flex items-center justify-between cursor-pointer ${isColorOpen ? "mb-4" : "mb-0"}`}
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
                            className={`grid grid-cols-2 gap-3 p-1.5 pt-2 overflow-hidden transition-all duration-300 ${isColorOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            {COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() =>
                                        toggleFilterItem(
                                            setSelectedColor,
                                            color.value,
                                        )
                                    }
                                    className={`rounded-md h-full px-2 py-2 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${color.bg} ${color.text} ${selectedColor.includes(color.value) ? "shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1 ring-2 ring-black ring-offset-2" : "hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] opacity-90 hover:opacity-100"} text-center min-h-[60px] flex items-center justify-center`}
                                >
                                    {color.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div
                        className={`transition-all duration-300 ${isSizeOpen ? "mb-8" : "mb-2"}`}
                    >
                        <div
                            className={`flex items-center justify-between cursor-pointer ${isSizeOpen ? "mb-4" : "mb-0"}`}
                            onClick={() => setIsSizeOpen(!isSizeOpen)}
                        >
                            <h3 className="text-2xl font-anton uppercase tracking-widest m-0 text-black">
                                Size
                            </h3>
                            <svg
                                className={`w-4 h-4 text-black transform transition-transform ${isSizeOpen ? "" : "rotate-180"}`}
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
                            className={`grid grid-cols-2 gap-2 p-1 pt-2 overflow-hidden transition-all duration-300 ${isSizeOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            {sizes.map((sz) => (
                                <button
                                    key={sz}
                                    onClick={() =>
                                        toggleFilterItem(setSelectedSize, sz)
                                    }
                                    className={`rounded-md px-2 py-2 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${selectedSize.includes(sz) ? "bg-[var(--theme-accent)] text-white shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"} text-center`}
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div
                        className={`transition-all duration-300 ${isFormOpen ? "mb-8" : "mb-2"}`}
                    >
                        <div
                            className={`flex items-center justify-between cursor-pointer ${isFormOpen ? "mb-4" : "mb-0"}`}
                            onClick={() => setIsFormOpen(!isFormOpen)}
                        >
                            <h3 className="text-2xl font-anton uppercase tracking-widest m-0 text-black">
                                Form
                            </h3>
                            <svg
                                className={`w-4 h-4 text-black transform transition-transform ${isFormOpen ? "" : "rotate-180"}`}
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
                            className={`grid grid-cols-3 gap-3 p-1 pt-2 overflow-hidden transition-all duration-300 ${isFormOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            {FORMS.map((form) => (
                                <button
                                    key={form.value}
                                    onClick={() =>
                                        toggleFilterItem(
                                            setSelectedForm,
                                            form.value,
                                        )
                                    }
                                    className={`rounded-md px-2 py-3 border-2 border-black font-oswald text-xs font-bold uppercase tracking-widest transition-all ${selectedForm.includes(form.value) ? "bg-[var(--theme-accent)] text-white shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)]"} flex flex-col items-center justify-center text-center gap-2`}
                                >
                                    {form.icon && (
                                        <div className="w-8 h-8 flex items-center justify-center ">
                                            {form.icon(
                                                selectedForm.includes(
                                                    form.value,
                                                ),
                                            )}
                                        </div>
                                    )}
                                    <span>{form.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-white flex justify-end shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                    <button
                        onClick={() => {
                            setAppliedFilters({
                                category: selectedCategory,
                                collection: selectedCollection,
                                priceRange: priceRange,
                                customMin: customMin,
                                customMax: customMax,
                                color: selectedColor,
                                size: selectedSize,
                                form: selectedForm,
                            });
                            setSidebarOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-1/3 bg-[url('https://dwarf-factory.com/assets/images/button/btn-orange.jpg')] bg-cover bg-center text-white px-8 py-3 font-oswald font-bold text-xl uppercase tracking-widest btn-2d border-2 border-transparent hover:border-black"
                    >
                        Apply
                    </button>
                </div>
            </aside>

            <div className="flex-1 max-w-6xl w-full mx-auto px-4 pt-[90px] md:pt-[100px] pb-12 relative z-10">
                <Breadcrumb />
                {/* Header Title Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mt-8 mb-6 pb-6 border-b border-black/30 gap-4">
                    <div>
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
                        <span className="text-[11px] font-oswald font-bold uppercase tracking-widest text-black mt-1">
                            SORT BY:
                        </span>
                        <div className="relative border-2 border-black bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border-none focus:outline-none cursor-pointer uppercase font-bold text-black text-xs font-oswald tracking-widest appearance-none px-4 py-2 pr-10 w-full h-full z-10 relative"
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option
                                        key={o.value}
                                        value={o.value}
                                        className="text-black bg-white uppercase font-bold tracking-widest"
                                    >
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
                <div ref={toolbarRef} className="w-full relative z-[60]">
                    <div
                        className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all duration-300 ${isSticky ? "fixed top-0 left-0 w-full px-4 md:px-8 py-3 bg-white border-b-2 border-black shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-[60]" : "mb-10 z-[60]"}`}
                    >
                        <div
                            className={
                                isSticky
                                    ? "max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between gap-4"
                                    : "w-full flex flex-col md:flex-row justify-between gap-4"
                            }
                        >
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
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
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
                    </div>
                    {isSticky && (
                        <div className="h-[104px] md:h-[52px] mb-10"></div>
                    )}
                </div>

                <div className="flex gap-8 items-start">
                    {/* Main Content Grid */}
                    <div className="flex-1 min-w-0">
                        {filtered.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="font-anton text-2xl text-black mb-4 uppercase tracking-widest">
                                    No keycap matches
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-[url('https://dwarf-factory.com/assets/images/button/btn-orange.jpg')] text-white px-6 py-2 font-oswald font-bold text-sm uppercase tracking-widest btn-2d border-2 border-transparent hover:border-black"
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
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default ProductPage;
