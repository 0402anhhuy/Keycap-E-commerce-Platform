import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-white text-black pt-16 pb-12 border-t-2 border-black">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* CONTINUE EXPLORE */}
                <div className="text-center mb-10">
                    <h2 className="text-[12px] text-black/50 tracking-[0.2em] uppercase font-bold mb-2">
                        Are you looking for
                    </h2>
                    <h3 className="text-5xl font-anton text-black uppercase tracking-wider">
                        Continue Explore
                    </h3>
                </div>

                {/* Explore Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="relative group overflow-hidden rounded-[4px] aspect-[16/9] border-2 border-black">
                        <img
                            src="https://dwarf-factory.com/assets/images/footer/membership.jpg"
                            alt="Membership"
                            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-4 left-4 bg-[var(--theme-accent)] px-4 py-2 ragged-edge inline-flex items-center gap-2 text-white font-oswald text-lg uppercase tracking-wider font-bold">
                            KF MEMBERSHIP
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 12h14M12 5l7 7-7 7"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="relative group overflow-hidden rounded-[4px] aspect-[16/9] border-2 border-black">
                        <img
                            src="https://dwarf-factory.com/assets/images/footer/news.jpg"
                            alt="News"
                            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-4 left-4 bg-[var(--theme-accent)] px-4 py-2 ragged-edge inline-flex items-center gap-2 text-white font-oswald text-lg uppercase tracking-wider font-bold">
                            NEWS
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 12h14M12 5l7 7-7 7"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Grid Footer Block */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px_350px] border-4 border-black text-black bg-[#ccc] font-oswald rounded-[4px] overflow-hidden">
                    {/* Column 1: Links */}
                    <div className="flex flex-col border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                        <div className="text-center font-bold text-xl py-3 border-b-4 border-black uppercase tracking-wider">
                            Tracking Order
                        </div>
                        <div className="flex flex-1">
                            <div className="w-1/3 flex items-center justify-center font-bold text-lg border-r-4 border-black uppercase">
                                About Us
                            </div>
                            <div className="w-2/3 flex flex-col">
                                <div className="flex border-b-4 border-black">
                                    <div className="w-1/2 p-3 border-r-4 border-black font-semibold uppercase text-sm hover:bg-black/5 cursor-pointer">
                                        Help Center
                                    </div>
                                    <div className="w-1/2 p-3 font-semibold uppercase text-sm hover:bg-black/5 cursor-pointer flex items-center">
                                        Shipping &<br />
                                        Return Policy
                                    </div>
                                </div>
                                <div className="p-3 border-b-4 border-black font-semibold uppercase text-sm hover:bg-black/5 cursor-pointer flex justify-between items-center">
                                    Blog & News
                                </div>
                                <div className="p-3 border-b-4 border-black font-semibold uppercase text-sm hover:bg-black/5 cursor-pointer flex justify-between items-center">
                                    Discord
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                    </svg>
                                </div>
                                <div className="p-3 border-b-4 border-black font-semibold uppercase text-sm hover:bg-black/5 cursor-pointer flex justify-between items-center">
                                    Social Media
                                    <span className="tracking-widest">
                                        IG FB YT
                                    </span>
                                </div>
                                <div className="p-3 flex-1 font-semibold text-xs leading-snug">
                                    KEYCAP FORGE HUB
                                    <br />
                                    <span className="font-sans text-[10px] text-black/70 font-normal">
                                        Mon-Sun | 10am - 8pm
                                        <br />
                                        HCMC, Vietnam
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-t-4 border-black">
                            <div className="w-1/3 p-2 font-bold text-sm uppercase flex items-center justify-center border-r-4 border-black">
                                Support:
                            </div>
                            <div className="w-2/3 p-2 font-bold text-sm uppercase flex items-center justify-center">
                                SUPPORT@KEYCAPFORGE.COM
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Logo */}
                    <div className="flex flex-col items-center justify-center p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                        <div className="w-20 h-20 bg-black text-white flex items-center justify-center rounded-xl font-anton text-4xl mb-4">
                            KF
                        </div>
                        <div className="text-center font-bold text-xs uppercase leading-tight">
                            COPYRIGHT BY
                            <br />
                            KEYCAP FORGE 2026
                        </div>
                    </div>

                    {/* Column 3: Newsletter */}
                    <div className="bg-[var(--theme-accent)] flex flex-col">
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-anton text-4xl mb-1 uppercase tracking-wider text-black">
                                Enroll Own Gold
                            </h3>
                            <h4 className="font-bold text-sm uppercase mb-4 text-black">
                                Subscribe & Get Incentives
                            </h4>
                            <p className="text-xs font-sans font-medium text-black/80 mb-4">
                                Sign up and get the latest news about new
                                design, group buy, straight to your inbox.
                            </p>
                            <div className="text-xs font-bold font-sans text-black pt-4 border-t border-black/20">
                                Bonus: Many hot offers and giveaway await!
                            </div>
                        </div>
                        <div className="flex bg-[#e5e5e5] border-t-4 border-black">
                            <input
                                type="email"
                                placeholder="YOUR E-MAIL:"
                                className="flex-1 bg-transparent px-4 py-3 text-sm font-bold placeholder:text-black/50 text-black focus:outline-none"
                            />
                            <button className="bg-black text-white px-6 font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
