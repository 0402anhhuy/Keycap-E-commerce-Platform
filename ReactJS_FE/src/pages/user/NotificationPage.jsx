import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/user/Header';
import Footer from '../../components/user/Footer';
import Breadcrumb from '../../components/Breadcrumb';

const NotificationPage = () => {
    const [allowNotifications, setAllowNotifications] = useState(false);
    
    // Dummy data for notifications based on the screenshot
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "You have 2 items in cart not check ...",
            body: "2 items in cart not check out yet.\nGet it now",
            date: "MAY 31, 2026 9:15 PM",
            image: "https://via.placeholder.com/60?text=Keycap", // Placeholder, we can replace with actual image later
            unread: true,
        },
        {
            id: 2,
            title: "Order #KF-10294 has been shipped",
            body: "Your order is on the way. Track your package now.",
            date: "MAY 30, 2026 2:30 PM",
            image: null,
            unread: false,
        }
    ]);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const toggleReadStatus = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, unread: !n.unread } : n
        ));
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="min-h-screen text-black relative z-0 flex flex-col bg-white">
            <Header />

            <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-[90px] md:pt-[100px] pb-12 relative z-10">
                <div>
                    <Breadcrumb />

                    <div className="mt-8 mb-10 flex items-center gap-4">
                        <h1 className="text-5xl font-anton uppercase tracking-wider text-black m-0 leading-none" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.5)' }}>
                            NOTIFICATIONS
                        </h1>
                        <span className="bg-black text-white font-oswald font-bold text-xl px-4 py-1.5 shadow-[4px_4px_0_var(--theme-accent)]">
                            {unreadCount}
                        </span>
                    </div>

                    {/* Settings Panel */}
                    <div className="bg-white border-2 border-black p-6 mb-8 shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="font-oswald font-bold text-xl uppercase tracking-wider">Allow Notification</h2>
                            {!allowNotifications && (
                                <p className="text-[var(--theme-accent)] font-medium text-sm mt-1 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    You must allow notification permission in your browser setting.
                                </p>
                            )}
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={allowNotifications}
                                onChange={() => setAllowNotifications(!allowNotifications)}
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none border-2 border-black peer-checked:bg-[var(--theme-accent)] transition-colors after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-black after:border-2 after:border-black after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-7 peer-checked:after:bg-white"></div>
                        </label>
                    </div>

                    <div className="flex justify-end mb-4">
                        <button 
                            onClick={markAllAsRead}
                            className="font-oswald font-bold text-sm uppercase tracking-widest text-black/60 hover:text-[var(--theme-accent)] underline decoration-2 underline-offset-4 transition-colors"
                        >
                            Mark all as read
                        </button>
                    </div>

                    {/* Notifications List */}
                    <div className="flex flex-col gap-5">
                        {notifications.map((notif) => (
                            <div 
                                key={notif.id}
                                onClick={() => toggleReadStatus(notif.id)}
                                className={`relative bg-white border-2 border-black p-5 cursor-pointer transition-all hover:-translate-y-1 ${
                                    notif.unread 
                                    ? 'shadow-[6px_6px_0_var(--theme-accent)]' 
                                    : 'shadow-[4px_4px_0_rgba(0,0,0,1)] opacity-70 hover:opacity-100'
                                }`}
                            >
                                {notif.unread && (
                                    <div className="absolute top-5 right-5 w-3 h-3 bg-[var(--theme-accent)] rounded-full border border-black shadow-[2px_2px_0_rgba(0,0,0,1)]"></div>
                                )}
                                
                                <div className="flex items-start gap-5 pr-8">
                                    {notif.image ? (
                                        <div className="w-16 h-16 shrink-0 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] bg-gray-100 overflow-hidden">
                                            <img src={notif.image} alt="Notification" className="w-full h-full object-cover mix-blend-multiply p-2" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 shrink-0 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] bg-[var(--theme-accent)] flex items-center justify-center text-white">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                    
                                    <div className="flex-1">
                                        <h3 className="font-oswald font-bold text-xl uppercase tracking-wider mb-2 leading-tight">
                                            {notif.title}
                                        </h3>
                                        <p className="text-black/70 whitespace-pre-line leading-relaxed text-[15px] font-medium mb-3">
                                            {notif.body}
                                        </p>
                                        <span className="inline-block text-xs font-oswald font-bold tracking-widest text-black/50 bg-black/5 px-2 py-1">
                                            {notif.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default NotificationPage;
