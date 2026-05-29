import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { itemCount } = useCart();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?q=${encodeURIComponent(search.trim())}`);
        }
    };

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgba(10,10,14,0.9)] backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-[linear-gradient(135deg,#ffb36b,#ff7a1a)] text-black font-black flex items-center justify-center shadow-[0_12px_28px_rgba(255,122,26,0.35)]">
                        K
                    </div>
                    <div className="leading-none">
                        <div className="text-[11px] uppercase tracking-[0.35em] text-white/45">Keycap</div>
                        <div className="text-xl font-black tracking-[0.18em] text-[var(--theme-text)]">Forge</div>
                    </div>
                </Link>

                <form onSubmit={handleSearch} className="hidden xl:flex flex-1 max-w-2xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white/80">
                    <svg className="w-5 h-5 text-white/45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input
                        type="text"
                        placeholder="Tìm keycap, kit, artisan..."
                        className="w-full bg-transparent border-none focus:outline-none text-sm text-white placeholder:text-white/35"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>

                <div className="flex items-center gap-6">
                    <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                        <Link to="/" className={`hover:text-white ${location.pathname === '/' ? 'text-[var(--theme-accent)]' : ''}`}>Home</Link>
                        <Link to="/products" className={`hover:text-white ${isActive('/products') ? 'text-[var(--theme-accent)]' : ''}`}>Store</Link>
                        <Link to="/orders" className={`hover:text-white ${isActive('/orders') ? 'text-[var(--theme-accent)]' : ''}`}>Orders</Link>
                        <Link to="/profile" className={`hover:text-white ${isActive('/profile') ? 'text-[var(--theme-accent)]' : ''}`}>Profile</Link>
                        {(user?.role === 'manager' || user?.role === 'admin') && (
                            <Link to="/manager/dashboard" className={`hover:text-white text-[var(--theme-accent-2)] ${isActive('/manager/dashboard') ? 'text-[var(--theme-accent)]' : ''}`}>Manage</Link>
                        )}
                    </nav>

                    {localStorage.getItem('accessToken') ? (
                        <button onClick={handleLogout} className="hidden sm:inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-[var(--theme-accent)] text-sm font-semibold text-white hover:brightness-110 transition-colors">
                            Login
                        </Link>
                    )}

                    <div className="flex items-center gap-3 text-white/75">
                        <Link to="/wishlist" className="relative w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                        </Link>
                        <Link to="/cart" className="relative w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[var(--theme-accent)] text-white text-[10px] font-black rounded-full min-w-5 h-5 px-1 flex items-center justify-center leading-none border border-black/30">
                                    {itemCount > 99 ? '99+' : itemCount}
                                </span>
                            )}
                        </Link>
                        <button className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
