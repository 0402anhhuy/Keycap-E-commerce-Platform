import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileNav from "../../components/user/ProfileNav";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const RewardsPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (!stored) {
            navigate("/login");
            return;
        }
        try {
            setUser(JSON.parse(stored));
            // Fetch coupons
            const fetchCoupons = async () => {
                try {
                    const token = localStorage.getItem("accessToken");
                    if (!token) return;
                    const res = await fetch(`${API_URL}/api/users/coupons`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setCoupons(data);
                    }
                } catch (err) {
                    console.error("Lỗi lấy coupons", err);
                }
            };
            fetchCoupons();
        } catch {
            navigate("/login");
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-white flex flex-col font-oswald text-black">
            <Header />
            <main className="flex-1 pt-[90px] md:pt-[100px] pb-12">
                <div className="max-w-6xl w-full mx-auto px-4">
                    <Breadcrumb />
                    <ProfileNav />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        <div className="flex flex-col h-full">
                            <div className="bg-[#e5e5e5] border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden h-full flex flex-col">
                                <div className="bg-[var(--theme-accent)] px-6 py-4 flex items-center justify-between border-b-2 border-black text-black">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">🪙</span>
                                        <h3 className="font-anton uppercase tracking-widest text-xl">
                                            Wallet & Vouchers
                                        </h3>
                                    </div>
                                    <span className="text-[10px] border-2 border-black bg-white px-2 py-1 font-black uppercase tracking-widest">
                                        ACTIVE
                                    </span>
                                </div>
                                <div className="p-6 space-y-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between bg-white p-5 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
                                        <div>
                                            <p className="text-xs font-bold text-black uppercase tracking-widest mb-1">
                                                Points Balance
                                            </p>
                                            <p className="text-4xl font-anton text-[var(--theme-accent)] uppercase flex items-end gap-1">
                                                <span>{user.points || 0}</span>
                                                <span className="text-sm text-black mb-1.5">
                                                    PTS
                                                </span>
                                            </p>
                                        </div>
                                        <div className="text-right border-l-2 border-black/20 pl-4">
                                            <p className="text-[10px] text-black/60 font-bold uppercase tracking-widest">
                                                Cash Value
                                            </p>
                                            <p className="text-xl font-oswald font-black text-black mt-1">
                                                {(
                                                    (user.points || 0) * 1000
                                                ).toLocaleString("vi-VN")}{" "}
                                                đ
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col">
                                        <p className="text-xs uppercase font-bold text-black mb-3 tracking-widest flex items-center justify-between border-b-2 border-black/20 pb-2">
                                            <span>YOUR VOUCHERS</span>
                                            <span>({coupons.length})</span>
                                        </p>

                                        {coupons.length === 0 ? (
                                            <div className="text-center py-8 border-2 border-dashed border-black/30 bg-black/5 flex-1 flex flex-col justify-center">
                                                <p className="text-xs font-bold uppercase tracking-widest text-black/50">
                                                    No vouchers available
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                                {coupons.map((coupon) => (
                                                    <div
                                                        key={coupon.id}
                                                        className="relative flex items-center justify-between p-4 border-2 border-black bg-white hover:bg-[#f4f4f4] transition-colors shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                                    >
                                                        <div className="flex-1 min-w-0 pr-3">
                                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                                <span className="bg-black text-[var(--theme-accent)] text-[10px] font-black px-2 py-0.5 uppercase tracking-widest border border-black">
                                                                    {coupon.type === "percent"
                                                                        ? `-${Math.round(coupon.value)}%`
                                                                        : `-${Number(coupon.value).toLocaleString("vi-VN")}đ`}
                                                                </span>
                                                                <span className="text-sm font-oswald font-black text-black tracking-widest">
                                                                    {coupon.code}
                                                                </span>
                                                            </div>
                                                            <p className="text-[11px] text-black font-bold uppercase tracking-widest truncate">
                                                                Shop:{" "}
                                                                <span className="text-[var(--theme-accent)]">
                                                                    {coupon.shop?.name || `Shop #${coupon.shopId}`}
                                                                </span>
                                                            </p>
                                                            <p className="text-[10px] text-black/60 font-bold mt-1 uppercase tracking-wider">
                                                                Exp:{" "}
                                                                {new Date(coupon.expiresAt).toLocaleDateString("vi-VN")}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(coupon.code);
                                                                alert("Đã sao chép mã giảm giá!");
                                                            }}
                                                            className="text-[10px] font-black uppercase tracking-widest text-black bg-white border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
                                                        >
                                                            COPY
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RewardsPage;
