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

    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';
    
    // Dynamic styles based on route & scroll
    const headerBg = isScrolled 
        ? 'bg-white border-b-2 border-black shadow-[0_4px_0_rgba(0,0,0,0.1)]' 
        : (isHome ? 'bg-transparent border-transparent' : 'bg-white border-b-2 border-black');
    const logoBg = 'bg-black text-white';
    const logoText = 'text-black';
    const iconColor = 'text-black';
    const inputBorder = 'border-black/30 text-black placeholder:text-black/40';
    const logoutText = 'text-black/50 hover:text-black';

    const getNavClass = (path) => {
        const active = isActive(path);
        if (active) return 'text-[var(--theme-accent)] border-[var(--theme-accent)] hover:text-[var(--theme-accent)] pb-1 border-b-2 transition-colors';
        return `pb-1 border-b-2 border-transparent transition-colors text-black/70 hover:text-black`;
    };

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${headerBg}`}>
            <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <div className={`w-10 h-10 rounded font-anton flex items-center justify-center text-xl tracking-tighter ${logoBg}`}>
                        KF
                    </div>
                    <div className="leading-none flex flex-col justify-center">
                        <div className={`text-[22px] font-oswald font-bold tracking-wider uppercase mt-1 ${logoText}`}>Keycap Forge</div>
                    </div>
                </Link>

                {/* Navigation - Centered */}
                <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 text-[15px] font-oswald font-semibold tracking-wider uppercase">
                    <Link to="/products" className={getNavClass('/products')}>Store</Link>
                    <Link to="/orders" className={getNavClass('/orders')}>Orders</Link>
                    <Link to="/profile" className={getNavClass('/profile')}>Profile</Link>
                    {(user?.role === 'manager' || user?.role === 'admin') && (
                        <Link to="/manager/dashboard" className={getNavClass('/manager/dashboard')}>Manage</Link>
                    )}
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-5">
                    {/* Search Icon/Input */}
                    <form onSubmit={handleSearch} className={`hidden xl:flex items-center border-b pb-1 mr-4 ${inputBorder.split(' ')[0]}`}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`w-32 bg-transparent border-none focus:outline-none text-sm font-oswald ${inputBorder.split(' ').slice(1).join(' ')}`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className={`${iconColor} hover:text-[var(--theme-accent)] transition-colors`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </form>

                    {/* Wishlist */}
                    <Link to="/wishlist" className={`${iconColor} hover:text-[var(--theme-accent)] transition-colors`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className={`relative ${iconColor} hover:text-[var(--theme-accent)] transition-colors`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        {itemCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-[var(--theme-accent)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                                {itemCount > 99 ? '99+' : itemCount}
                            </span>
                        )}
                    </Link>

                    {/* User */}
                    {localStorage.getItem('accessToken') ? (
                        <div className="flex items-center gap-3 ml-2">
                            <button onClick={handleLogout} className={`text-xs font-oswald uppercase tracking-widest transition-colors cursor-pointer ${logoutText}`}>
                                Logout
                            </button>
                            <Link to="/profile" className={`${iconColor} hover:text-[var(--theme-accent)] transition-colors`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </Link>
                        </div>
                    ) : (
                        <Link to="/login" className={`${iconColor} hover:text-[var(--theme-accent)] transition-colors ml-2`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
