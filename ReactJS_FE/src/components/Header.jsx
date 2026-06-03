import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { itemCount } = useCart();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?q=${encodeURIComponent(search.trim())}`);
        }
    };

    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome =
        location.pathname === "/" ||
        location.pathname === "/home" ||
        location.pathname === "";

    // Dynamic styles based on route & scroll
    const isAtTop = !isScrolled && isHome;

    const headerBg = isAtTop
        ? "bg-transparent border-transparent"
        : `bg-white border-b-2 border-black ${isScrolled ? "shadow-[0_4px_0_rgba(0,0,0,0.1)]" : ""}`;

    const logoBg = isAtTop ? "bg-white text-black" : "bg-black text-white";
    const logoText = isAtTop ? "!text-white" : "text-black";
    const iconColor = isAtTop ? "!text-white" : "text-black";
    const inputBorder = isAtTop
        ? "border-white/50 !text-white placeholder:!text-white/60"
        : "border-black/30 text-black placeholder:text-black/40";
    const logoutText = isAtTop
        ? "!text-white/80 hover:!text-white"
        : "text-black/50 hover:text-black";

    const getNavClass = (path) => {
        const active = isActive(path);
        if (active)
            return `pb-1 border-b-2 transition-colors ${isAtTop ? "border-white !text-white hover:!text-white/80" : "border-[var(--theme-accent)] text-[var(--theme-accent)] hover:text-[var(--theme-accent)]/80"}`;
        return `pb-1 border-b-2 border-transparent transition-colors ${isAtTop ? "!text-white hover:!text-white/80" : "text-black/70 hover:text-black"}`;
    };

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${headerBg}`}
        >
            <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <div
                        className={`w-10 h-10 rounded font-anton flex items-center justify-center text-xl tracking-tighter ${logoBg}`}
                    >
                        KF
                    </div>
                    <div className="leading-none flex flex-col justify-center">
                        <div
                            className={`text-[22px] font-oswald font-bold tracking-wider uppercase mt-1 ${logoText}`}
                        >
                            Keycap Forge
                        </div>
                    </div>
                </Link>

                {/* Navigation - Centered */}
                <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 text-[15px] font-oswald font-semibold tracking-wider uppercase">
                    <Link to="/products" className={getNavClass("/products")}>
                        Store
                    </Link>
                    <Link
                        to="/collections"
                        className={getNavClass("/collections")}
                    >
                        Collections
                    </Link>
                    <Link to="/orders" className={getNavClass("/orders")}>
                        Orders
                    </Link>
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-3">
                    {/* Search Icon/Input */}
                    <form
                        onSubmit={handleSearch}
                        className={`hidden xl:flex items-center border-b pb-1 mr-2 ${inputBorder.split(" ")[0]}`}
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`w-32 bg-transparent border-none focus:outline-none text-sm font-oswald ${inputBorder.split(" ").slice(1).join(" ")}`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={`${iconColor} hover:text-[var(--theme-accent)] transition-colors`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </form>

                    {/* Notification (Bell) */}
                    <Link
                        to="/notifications"
                        className={`relative ${iconColor} hover:text-[var(--theme-accent)] transition-colors`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {/* Red dot for unread notifications (static for now, just to show) */}
                        <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--theme-accent)] rounded-full border border-black"></span>
                    </Link>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className={`relative ${iconColor} hover:text-[var(--theme-accent)] transition-colors`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {itemCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-[var(--theme-accent)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                                {itemCount > 99 ? "99+" : itemCount}
                            </span>
                        )}
                    </Link>

                    {/* User */}
                    <div className="relative">
                        {localStorage.getItem("accessToken") ? (
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowUserMenu(!showUserMenu)
                                    }
                                    onBlur={() =>
                                        setTimeout(
                                            () => setShowUserMenu(false),
                                            200,
                                        )
                                    }
                                    className={`${iconColor} hover:text-[var(--theme-accent)] transition-colors flex items-center cursor-pointer`}
                                >
                                    <div
                                        className={`w-7 h-7 rounded-full border-2 overflow-hidden bg-white ${isHome && !isScrolled ? "border-white" : "border-black"}`}
                                    >
                                        <img
                                            src={
                                                user?.avatar
                                                    ? user.avatar.startsWith(
                                                          "http",
                                                      )
                                                        ? user.avatar
                                                        : `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${user.avatar}`
                                                    : "https://i.pravatar.cc/150?img=11"
                                            }
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </button>

                                {showUserMenu && (
                                    <div
                                        className="absolute right-0 mt-6 w-48 bg-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col z-[100] animate-fade-in-down py-2"
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        <Link
                                            to="/profile"
                                            onClick={() =>
                                                setShowUserMenu(false)
                                            }
                                            className="px-4 py-2 text-sm font-oswald font-bold uppercase tracking-widest text-black hover:bg-black/5 hover:text-[var(--theme-accent)] transition-colors text-left"
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setShowUserMenu(false);
                                                handleLogout();
                                            }}
                                            className="px-4 py-2 text-sm font-oswald font-bold uppercase tracking-widest text-red-500 hover:bg-black/5 transition-colors text-left w-full"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`${iconColor} hover:text-[var(--theme-accent)] transition-colors flex items-center`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
