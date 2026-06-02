import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import Breadcrumb from "../../components/Breadcrumb";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const CollectionsPage = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/collections`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setCollections(data);
            } catch (error) {
                console.error("Error fetching collections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const filteredCollections = collections.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredCollections.length / ITEMS_PER_PAGE);
    const paginatedCollections = filteredCollections.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    const breadcrumbPaths = [
        { name: "Home", url: "/" },
        { name: "Collections" },
    ];

    return (
        <div className="min-h-screen flex flex-col font-oswald bg-[#e2e2e2] text-black">
            <Header />

            {/* Main Content */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-[90px] md:pt-[100px] pb-12">
                <div>
                    <Breadcrumb paths={breadcrumbPaths} />
                </div>

                {/* Top Bar */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mt-8 mb-8 gap-4">
                    <h1 className="text-4xl md:text-5xl font-anton uppercase tracking-wider text-black">
                            Collections
                        </h1>

                        <div className="relative border-2 border-black bg-transparent">
                            <input
                                type="text"
                                placeholder="SEARCH"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full md:w-64 px-4 py-2 bg-transparent text-sm font-oswald tracking-widest uppercase focus:outline-none placeholder:text-black/50"
                            />
                            <svg
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedCollections.map((col) => (
                                <Link
                                    to={`/products?collection=${encodeURIComponent(col.name)}`}
                                    key={col.id}
                                    className="group relative border-2 border-black p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] hover:bg-black/5 transition-colors cursor-pointer"
                                >
                                    {/* Circular Logo Container */}
                                    <div className="w-48 h-48 md:w-48 md:h-48 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm border-2 border-transparent group-hover:border-black transition-all group-hover:-translate-y-2 group-hover:shadow-[4px_4px_0_rgba(0,0,0,1)] overflow-hidden">
                                        <img
                                            src={
                                                col.image ||
                                                "https://market.dwarf-factory.com/ams-ecom/70783785-b0b6-4092-a90b-aa310e651f45/gallery-collections/68da10e9662dec5f2da9828e"
                                            }
                                            alt={col.name}
                                            className="w-[90%] h-[90%] object-contain mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Name */}
                                    <div className="font-oswald text-sm md:text-base font-bold tracking-widest uppercase flex items-center gap-2 group-hover:text-[var(--theme-accent)] transition-colors">
                                        {col.name}
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            fit=""
                                            preserveAspectRatio="xMidYMid meet"
                                            focusable="false"
                                        >
                                            <path
                                                d="M4 12H20"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="square"
                                            ></path>
                                            <path
                                                d="M14 5L21 12L14 19"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="square"
                                            ></path>
                                        </svg>
                                    </div>

                                    {/* Optional Item Count */}
                                    <div className="absolute top-4 left-4 text-xs font-bold bg-black text-white px-2 py-1">
                                        {col.productCount || 0} ITEMS
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12 mb-8 font-oswald font-bold">
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center text-black border-2 border-black disabled:opacity-30 disabled:border-black/30 hover:bg-black hover:text-white transition-colors btn-2d"
                            >
                                &lt;
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 flex items-center justify-center border-2 border-black transition-colors btn-2d ${
                                        currentPage === page
                                            ? "bg-[var(--theme-accent)] text-white border-[var(--theme-accent)]"
                                            : "hover:bg-black hover:text-white"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(totalPages, p + 1),
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 flex items-center justify-center text-black border-2 border-black disabled:opacity-30 disabled:border-black/30 hover:bg-black hover:text-white transition-colors btn-2d"
                            >
                                &gt;
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredCollections.length === 0 && (
                        <div className="text-center py-20 text-black/50 font-oswald tracking-widest uppercase">
                            No collections found.
                        </div>
                    )}
            </main>

            <Footer />
        </div>
    );
};

export default CollectionsPage;
