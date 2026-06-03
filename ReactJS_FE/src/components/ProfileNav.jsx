import { Link, useLocation } from "react-router-dom";

const ProfileNav = () => {
    const location = useLocation();

    const tabs = [
        { name: "PROFILE", path: "/profile" },
        { name: "ORDERS", path: "/orders" },
        { name: "WISHLIST", path: "/wishlist" },
        { name: "REWARDS", path: "/rewards" },
    ];

    return (
        <div className="mb-8 mt-2 flex flex-wrap items-center gap-5 md:gap-7 border-b border-black pb-0">
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                    <Link
                        key={tab.name}
                        to={tab.path}
                        className={`relative pb-2 text-base font-oswald uppercase tracking-wider transition-colors ${
                            isActive
                                ? "text-black font-bold"
                                : "text-gray-400 font-bold hover:text-black"
                        }`}
                    >
                        {tab.name}
                        {isActive && (
                            <span className="absolute -bottom-[1px] left-0 w-full h-[4px] bg-[var(--theme-accent)]"></span>
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default ProfileNav;
