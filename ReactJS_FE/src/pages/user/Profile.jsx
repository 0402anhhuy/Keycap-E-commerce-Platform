import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Message, PageWrapper } from "../../components";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import Breadcrumb from "../../components/Breadcrumb";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ── Address Form Component ──────────────────────────────────────────────────
const AddressForm = ({ initial, onSave, onCancel, loading }) => {
    const [form, setForm] = useState({
        street: initial?.street || "",
        isDefault: initial?.isDefault || false
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.street.trim()) errs.street = "Vui lòng nhập địa chỉ.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) onSave({ ...form, id: initial?.id });
    };

    return (
        <div className="border-2 border-black bg-white p-5 space-y-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-black mb-1.5">Địa chỉ *</label>
                    <input value={form.street} onChange={(e) => setForm(p => ({ ...p, street: e.target.value }))}
                        placeholder="VD: 123 Lê Lợi, Phường 1, Quận 1, TP.HCM"
                        className={`w-full border-2 border-black px-3 py-2 text-sm focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent ${errors.street ? "border-red-500" : ""}`} />
                    {errors.street && <p className="text-xs text-red-500 mt-1 font-bold">{errors.street}</p>}
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm(p => ({ ...p, isDefault: e.target.checked }))}
                        className="w-4 h-4 accent-black border-2 border-black" />
                    <span className="text-xs font-bold uppercase tracking-widest text-black">Đặt làm địa chỉ mặc định</span>
                </label>
            </div>
            <div className="flex gap-3 pt-2">
                <button onClick={handleSubmit} disabled={loading}
                    className="px-6 py-2.5 bg-black text-white text-xs font-black uppercase tracking-widest border-2 border-black hover:shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all disabled:opacity-60">
                    {loading ? "Đang lưu..." : "Lưu địa chỉ"}
                </button>
                <button onClick={onCancel} className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest border-2 border-black hover:shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">Hủy</button>
            </div>
        </div>
    );
};

// ── Main Profile Component ─────────────────────────────────────────────────
const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [user, setUser] = useState(null);

    // Split name into first and last name for the form
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
    const [securityForm, setSecurityForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [msgType, setMsgType] = useState("info");
    const [errors, setErrors] = useState({});

    // Address state
    const [addresses, setAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addrLoading, setAddrLoading] = useState(false);
    const [addrMsg, setAddrMsg] = useState(null);
    const [addrMsgType, setAddrMsgType] = useState("info");

    const [coupons, setCoupons] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (!stored) { navigate("/login"); return; }
        try {
            const parsed = JSON.parse(stored);
            if (parsed.isActive === false) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }
            setUser(parsed);

            // Split name
            const nameParts = (parsed.name || "").trim().split(" ");
            let fName = "";
            let lName = "";
            if (nameParts.length > 1) {
                lName = nameParts.pop();
                fName = nameParts.join(" ");
            } else {
                fName = nameParts[0] || "";
            }

            setForm({ firstName: fName, lastName: lName, email: parsed.email || "", phone: parsed.phone || "" });
            setAddresses(parsed.addresses || []);
            if (parsed.avatar) {
                setAvatarPreview(parsed.avatar.startsWith("http") ? parsed.avatar : `${API_URL}${parsed.avatar}`);
            }

            // Fetch latest user profile from API to update points
            const fetchLatestProfile = async () => {
                try {
                    const token = localStorage.getItem("accessToken");
                    if (!token) return;
                    const res = await fetch(`${API_URL}/api/users/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (data.user) {
                            const merged = { ...parsed, ...data.user };
                            localStorage.setItem("user", JSON.stringify(merged));
                            setUser(merged);
                        }
                    }
                } catch (e) {
                    console.error("Error fetching latest profile:", e);
                }
            };
            fetchLatestProfile();

            // Fetch user coupons
            const fetchCoupons = async () => {
                try {
                    const token = localStorage.getItem("accessToken");
                    if (!token) return;
                    const res = await fetch(`${API_URL}/api/users/coupons`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setCoupons(data || []);
                    }
                } catch (err) {
                    console.error("Error fetching coupons:", err);
                }
            };
            fetchCoupons();
            
            // Fetch user wishlist
            const fetchWishlist = async () => {
                try {
                    const token = localStorage.getItem("accessToken");
                    if (!token) return;
                    const res = await fetch(`${API_URL}/api/wishlists`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setWishlist(Array.isArray(data) ? data : []);
                    }
                } catch (err) {
                    console.error("Error fetching wishlist:", err);
                }
            };
            fetchWishlist();

        } catch {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        return () => { if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview); };
    }, [avatarPreview]);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) { setMsg("File phải là ảnh."); setMsgType("error"); return; }
        if (file.size > 2 * 1024 * 1024) { setMsg("Ảnh không được vượt quá 2MB."); setMsgType("error"); return; }
        if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
        setAvatarPreview(null);
    };

    const validate = () => {
        const errs = {};
        if (!form.firstName.trim()) errs.firstName = "Bắt buộc";
        if (!form.lastName.trim()) errs.lastName = "Bắt buộc";
        if (form.phone.trim() && !/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) errs.phone = "Không hợp lệ";
        return errs;
    };

    const handleSave = async () => {
        if (loading) return;
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({}); setLoading(true); setMsg(null);
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) { navigate("/login"); return; }

            const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();

            const payload = new FormData();
            payload.append("name", fullName);
            payload.append("phone", form.phone.trim());
            if (avatar) payload.append("avatar", avatar);

            const res = await fetch(`${API_URL}/api/users/profile`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: payload
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");

            const updated = data.user;
            const merged = { ...user, ...updated };
            localStorage.setItem("user", JSON.stringify(merged));
            setUser(merged);

            const nameParts = (merged.name || "").trim().split(" ");
            let fName = "", lName = "";
            if (nameParts.length > 1) { lName = nameParts.pop(); fName = nameParts.join(" "); } else { fName = nameParts[0] || ""; }
            setForm({ firstName: fName, lastName: lName, email: merged.email || "", phone: merged.phone || "" });

            if (merged.avatar) setAvatarPreview(merged.avatar.startsWith("http") ? merged.avatar : `${API_URL}${merged.avatar}`);
            setAvatar(null);
            setMsg("Cập nhật hồ sơ thành công!"); setMsgType("success");

            setTimeout(() => setMsg(null), 3000);
        } catch (err) {
            setMsg(err.message || "Cập nhật thất bại"); setMsgType("error");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        const nameParts = (user.name || "").trim().split(" ");
        let fName = "", lName = "";
        if (nameParts.length > 1) { lName = nameParts.pop(); fName = nameParts.join(" "); } else { fName = nameParts[0] || ""; }

        setForm({ firstName: fName, lastName: lName, email: user.email || "", phone: user.phone || "" });
        setAvatar(null); setErrors({}); setMsg(null);
        if (user.avatar) setAvatarPreview(user.avatar.startsWith("http") ? user.avatar : `${API_URL}${user.avatar}`);
        else setAvatarPreview(null);
    };

    // ── Address handlers ────────────────────────────────────────────────────
    const refreshAddresses = (newAddresses) => {
        setAddresses(newAddresses);
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                const u = JSON.parse(stored);
                u.addresses = newAddresses;
                localStorage.setItem("user", JSON.stringify(u));
                setUser(u);
            } catch { }
        }
    };

    const handleSaveAddress = async (addrData) => {
        const token = localStorage.getItem("accessToken");
        setAddrLoading(true); setAddrMsg(null);
        try {
            const res = await fetch(`${API_URL}/api/users/addresses`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(addrData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Lỗi lưu địa chỉ.");
            refreshAddresses(data);
            setShowAddressForm(false); setEditingAddress(null);
            setAddrMsg("Địa chỉ đã được lưu."); setAddrMsgType("success");
            setTimeout(() => setAddrMsg(null), 3000);
        } catch (err) {
            setAddrMsg(err.message); setAddrMsgType("error");
        } finally {
            setAddrLoading(false);
        }
    };

    const handleRemoveAddress = async (addrId) => {
        if (!window.confirm("Xóa địa chỉ này?")) return;
        const token = localStorage.getItem("accessToken");
        setAddrLoading(true); setAddrMsg(null);
        try {
            const res = await fetch(`${API_URL}/api/users/addresses/${addrId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Lỗi xóa địa chỉ.");
            refreshAddresses(data);
            setAddrMsg("Đã xóa địa chỉ."); setAddrMsgType("success");
            setTimeout(() => setAddrMsg(null), 3000);
        } catch (err) {
            setAddrMsg(err.message); setAddrMsgType("error");
        } finally {
            setAddrLoading(false);
        }
    };

    const handleSetDefault = async (addrId) => {
        const token = localStorage.getItem("accessToken");
        setAddrLoading(true); setAddrMsg(null);
        try {
            const res = await fetch(`${API_URL}/api/users/addresses/${addrId}/default`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Lỗi cập nhật địa chỉ mặc định.");
            refreshAddresses(data);
            setAddrMsg("Đã đặt địa chỉ mặc định."); setAddrMsgType("success");
            setTimeout(() => setAddrMsg(null), 3000);
        } catch (err) {
            setAddrMsg(err.message); setAddrMsgType("error");
        } finally {
            setAddrLoading(false);
        }
    };

    const handleRemoveFavorite = async (productId) => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        try {
            const res = await fetch(`${API_URL}/api/wishlists/${productId}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                setWishlist(prev => prev.filter(p => p.id !== productId));
            }
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-white flex flex-col font-oswald text-black">
            <Header />
            <main className="flex-1 pt-[90px] md:pt-[100px] pb-12">
                <div className="max-w-6xl w-full mx-auto px-4">
                    <Breadcrumb />

                    {/* Page Header */}
                    <div className="mb-10 border-b-4 border-black pb-4">
                        <h1 className="text-5xl font-anton uppercase tracking-wider text-black mb-2">Account Settings</h1>
                        <p className="text-black/60 font-bold uppercase tracking-widest text-xs">Manage your personal information, security, and addresses.</p>
                    </div>

                    {msg && (
                        <div className={`mb-8 p-4 border-2 border-black font-bold text-xs uppercase tracking-widest flex items-center justify-between shadow-[4px_4px_0_rgba(0,0,0,1)] ${msgType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {msg}
                            <button onClick={() => setMsg(null)} className="hover:text-black">✕</button>
                        </div>
                    )}

                    {/* Avatar Card */}
                    <div className="bg-[#e5e5e5] border-2 border-black p-8 shadow-[8px_8px_0_rgba(0,0,0,1)] mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div
                                    className="w-24 h-24 overflow-hidden border-2 border-black bg-white flex items-center justify-center"
                                    style={{ background: avatarPreview ? "transparent" : "#fff" }}
                                >
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-12 h-12 text-black/20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--theme-accent)] border-2 border-black flex items-center justify-center text-white cursor-pointer hover:bg-black transition-colors" onClick={() => fileInputRef.current?.click()}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </div>
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-anton uppercase tracking-widest text-black mb-1">{user.name}</h2>
                                <p className="text-black/60 text-xs font-bold uppercase tracking-widest">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-[var(--theme-accent)] text-white text-xs font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                                Upload Photo
                            </button>
                            <button onClick={handleRemoveAvatar} className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                                Remove
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">

                        {/* ROW 1: Personal Info & Loyalty/Coupons */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* Personal Information */}
                            <div className="lg:col-span-7">
                                <div className="bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden h-full">
                                    <div className="bg-black px-6 py-4 flex items-center gap-3 border-b-2 border-black">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        <h3 className="font-anton uppercase tracking-widest text-white text-xl">Personal Info</h3>
                                    </div>
                                    <div className="p-8 space-y-6 bg-white">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">First Name</label>
                                                <input type="text" value={form.firstName} onChange={(e) => setForm(p => ({ ...p, firstName: e.target.value }))}
                                                    className={`w-full px-4 py-3 text-sm border-2 border-black focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent ${errors.firstName ? 'border-red-500' : ''}`} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Last Name</label>
                                                <input type="text" value={form.lastName} onChange={(e) => setForm(p => ({ ...p, lastName: e.target.value }))}
                                                    className={`w-full px-4 py-3 text-sm border-2 border-black focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent ${errors.lastName ? 'border-red-500' : ''}`} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Email Address</label>
                                            <input type="email" value={form.email} disabled
                                                className="w-full px-4 py-3 text-sm border-2 border-black bg-gray-100 text-gray-500 cursor-not-allowed font-semibold opacity-70" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-black mb-2">Phone Number</label>
                                            <input type="text" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                                                className={`w-full px-4 py-3 text-sm border-2 border-black focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent ${errors.phone ? 'border-red-500' : ''}`} />
                                            {errors.phone && <p className="text-xs text-red-500 mt-2 font-bold">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Loyalty & Coupons */}
                            <div className="lg:col-span-5">
                                <div className="bg-[#e5e5e5] border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden h-full flex flex-col">
                                    <div className="bg-[var(--theme-accent)] px-6 py-4 flex items-center justify-between border-b-2 border-black text-black">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">🪙</span>
                                            <h3 className="font-anton uppercase tracking-widest text-xl">Wallet & Vouchers</h3>
                                        </div>
                                        <span className="text-[10px] border-2 border-black bg-white px-2 py-1 font-black uppercase tracking-widest">
                                            ACTIVE
                                        </span>
                                    </div>
                                    <div className="p-6 space-y-6 flex-1 flex flex-col">
                                        {/* Points Balance */}
                                        <div className="flex items-center justify-between bg-white p-5 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
                                            <div>
                                                <p className="text-xs font-bold text-black uppercase tracking-widest mb-1">Points Balance</p>
                                                <p className="text-4xl font-anton text-[var(--theme-accent)] uppercase flex items-end gap-1">
                                                    <span>{user.points || 0}</span>
                                                    <span className="text-sm text-black mb-1.5">PTS</span>
                                                </p>
                                            </div>
                                            <div className="text-right border-l-2 border-black/20 pl-4">
                                                <p className="text-[10px] text-black/60 font-bold uppercase tracking-widest">Cash Value</p>
                                                <p className="text-xl font-oswald font-black text-black mt-1">
                                                    {((user.points || 0) * 1000).toLocaleString('vi-VN')} đ
                                                </p>
                                            </div>
                                        </div>

                                        {/* Vouchers/Coupons List */}
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-xs uppercase font-bold text-black mb-3 tracking-widest flex items-center justify-between border-b-2 border-black/20 pb-2">
                                                <span>YOUR VOUCHERS</span>
                                                <span>({coupons.length})</span>
                                            </p>
                                            
                                            {coupons.length === 0 ? (
                                                <div className="text-center py-8 border-2 border-dashed border-black/30 bg-black/5 flex-1 flex flex-col justify-center">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-black/50">No vouchers available</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                                    {coupons.map((coupon) => (
                                                        <div key={coupon.id} className="relative flex items-center justify-between p-4 border-2 border-black bg-white hover:bg-[#f4f4f4] transition-colors shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                                            <div className="flex-1 min-w-0 pr-3">
                                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                                    <span className="bg-black text-[var(--theme-accent)] text-[10px] font-black px-2 py-0.5 uppercase tracking-widest border border-black">
                                                                        {coupon.type === 'percent' ? `-${Math.round(coupon.value)}%` : `-${Number(coupon.value).toLocaleString('vi-VN')}đ`}
                                                                    </span>
                                                                    <span className="text-sm font-oswald font-black text-black tracking-widest">
                                                                        {coupon.code}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[11px] text-black font-bold uppercase tracking-widest truncate">
                                                                    Shop: <span className="text-[var(--theme-accent)]">{coupon.shop?.name || `Shop #${coupon.shopId}`}</span>
                                                                </p>
                                                                <p className="text-[10px] text-black/60 font-bold mt-1 uppercase tracking-wider">
                                                                    Exp: {new Date(coupon.expiresAt).toLocaleDateString('vi-VN')}
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

                        {/* ROW 2: Addresses & Favorite Products */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            {/* Addresses Management */}
                            <div className="lg:col-span-7 flex flex-col">
                                <div className="bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden flex-1 flex flex-col">
                                    <div className="bg-black px-6 py-4 flex items-center justify-between border-b-2 border-black">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            <h3 className="font-anton uppercase tracking-widest text-white text-xl">Addresses</h3>
                                        </div>
                                        {!showAddressForm && (
                                            <button onClick={() => { setShowAddressForm(true); setEditingAddress(null); }} className="text-xs font-black uppercase tracking-widest text-[var(--theme-accent)] hover:text-white transition-colors">
                                                + ADD NEW
                                            </button>
                                        )}
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col justify-between">
                                        <div>
                                            {addrMsg && (
                                                <div className={`mb-6 px-4 py-3 border-2 border-black text-xs font-bold uppercase tracking-widest ${addrMsgType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                    {addrMsg}
                                                </div>
                                            )}

                                            {showAddressForm && editingAddress === null && (
                                                <div className="mb-8">
                                                    <AddressForm initial={null} onSave={handleSaveAddress} onCancel={() => setShowAddressForm(false)} loading={addrLoading} />
                                                </div>
                                            )}

                                            {addresses.length === 0 && !showAddressForm ? (
                                                <div className="text-center py-8 border-2 border-dashed border-black/30 bg-black/5">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-black/50">No addresses saved</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {addresses.map((addr) => (
                                                        <div key={addr.id}>
                                                            {editingAddress === addr.id ? (
                                                                <AddressForm initial={addr} onSave={handleSaveAddress} onCancel={() => setEditingAddress(null)} loading={addrLoading} />
                                                            ) : (
                                                                <div className={`p-5 border-2 border-black bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all ${addr.isDefault ? "border-[var(--theme-accent)] shadow-[4px_4px_0_var(--theme-accent)]" : ""}`}>
                                                                    <div className="flex items-start justify-between">
                                                                        <div>
                                                                            {addr.isDefault && <span className="text-[10px] uppercase font-black text-[var(--theme-accent)] mb-2 block tracking-widest bg-black px-2 py-0.5 w-fit">DEFAULT</span>}
                                                                            <p className="text-sm text-black font-bold uppercase tracking-widest">{addr.street}</p>
                                                                            {(addr.ward || addr.district || addr.city) && (
                                                                                <p className="text-xs text-black/60 font-bold uppercase tracking-widest mt-1.5">
                                                                                    {[addr.ward, addr.district, addr.city].filter(Boolean).join(", ")}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex gap-3 ml-4">
                                                                            <button onClick={() => setEditingAddress(addr.id)} className="text-black hover:text-[var(--theme-accent)] transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                                                                            {!addr.isDefault && <button onClick={() => handleRemoveAddress(addr.id)} className="text-black hover:text-red-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>}
                                                                        </div>
                                                                    </div>
                                                                    {!addr.isDefault && (
                                                                        <button onClick={() => handleSetDefault(addr.id)} className="text-xs text-black border-b-2 border-black font-bold uppercase tracking-widest mt-4 hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)] transition-colors pb-0.5">Set as default</button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Favorite Products */}
                            <div className="lg:col-span-5 flex flex-col">
                                <div className="bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden flex-1 flex flex-col">
                                    <div className="bg-black px-6 py-4 flex items-center justify-between border-b-2 border-black">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                            </svg>
                                            <h3 className="font-anton uppercase tracking-widest text-white text-xl">Wishlist</h3>
                                        </div>
                                        <span className="text-[10px] bg-red-500 text-white px-2 py-1 font-black uppercase tracking-widest border border-black">
                                            {wishlist.length} ITEMS
                                        </span>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        {wishlist.length === 0 ? (
                                            <div className="text-center py-8 border-2 border-dashed border-black/30 bg-black/5 flex-1 flex flex-col justify-center">
                                                <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-3">Chưa có sản phẩm yêu thích.</p>
                                                <button 
                                                    onClick={() => navigate('/products')} 
                                                    className="mx-auto w-fit px-4 py-2 bg-black text-white text-xs font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
                                                >
                                                    Khám phá ngay
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 max-h-[148px] overflow-y-auto pr-2 custom-scrollbar flex-1">
                                                {wishlist.map((item) => {
                                                    const imgUrl = Array.isArray(item.images) && item.images.length > 0
                                                        ? (item.images[0].startsWith('http') ? item.images[0] : `${API_URL}${item.images[0]}`)
                                                        : (item.image ? (item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`) : "/placeholder.png");

                                                    return (
                                                        <div key={item.id} className="flex items-center justify-between gap-3 p-3 border-2 border-black bg-white shadow-[2px_2px_0_rgba(0,0,0,1)] hover:bg-[#f4f4f4] transition-colors">
                                                            <div 
                                                                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" 
                                                                onClick={() => navigate(`/product/${item.id}`)}
                                                            >
                                                                <div className="w-12 h-12 overflow-hidden border-2 border-black flex-shrink-0 bg-white">
                                                                    <img src={imgUrl} alt={item.title} className="w-full h-full object-cover" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-black truncate">{item.title}</h4>
                                                                    <p className="text-sm font-oswald font-black text-black mt-1">{Number(item.price).toLocaleString('vi-VN')}đ</p>
                                                                </div>
                                                            </div>
                                                            <button 
                                                                onClick={() => handleRemoveFavorite(item.id)}
                                                                className="text-black hover:text-red-500 hover:bg-black/5 p-2 transition-colors cursor-pointer"
                                                                title="Bỏ thích"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ROW 3: Security & Spacer */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* Empty spacer to align with left columns */}
                            <div className="lg:col-span-7 hidden lg:block"></div>
                            {/* Security */}
                            <div className="lg:col-span-5">
                                <div className="bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden">
                                    <div className="bg-black px-6 py-4 flex items-center gap-3 border-b-2 border-black">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        <h3 className="font-anton uppercase tracking-widest text-white text-xl">Security</h3>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div>
                                            <p className="text-[10px] uppercase font-black text-black mb-3 tracking-widest border-b-2 border-black/20 pb-2">CHANGE PASSWORD</p>
                                            <div className="space-y-4">
                                                <input type="password" placeholder="CURRENT PASSWORD" value={securityForm.currentPassword} onChange={e => setSecurityForm(p => ({ ...p, currentPassword: e.target.value }))} className="w-full px-4 py-3 text-sm font-bold uppercase tracking-widest border-2 border-black focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent placeholder:text-black/30" />
                                                <input type="password" placeholder="NEW PASSWORD" value={securityForm.newPassword} onChange={e => setSecurityForm(p => ({ ...p, newPassword: e.target.value }))} className="w-full px-4 py-3 text-sm font-bold uppercase tracking-widest border-2 border-black focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent placeholder:text-black/30" />
                                                <input type="password" placeholder="CONFIRM NEW PASSWORD" value={securityForm.confirmPassword} onChange={e => setSecurityForm(p => ({ ...p, confirmPassword: e.target.value }))} className="w-full px-4 py-3 text-sm font-bold uppercase tracking-widest border-2 border-black focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent placeholder:text-black/30" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t-2 border-black/20 pt-6">
                                            <div>
                                                <p className="text-sm font-bold uppercase tracking-widest text-black">Two-Factor Auth</p>
                                                <p className="text-[10px] font-black text-[var(--theme-accent)] uppercase mt-1 tracking-widest bg-black px-2 py-0.5 w-fit">Currently Active</p>
                                            </div>
                                            <div className="w-12 h-6 bg-[var(--theme-accent)] border-2 border-black relative cursor-pointer shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                                <div className="w-4 h-4 bg-white border-2 border-black absolute right-0.5 top-0.5"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-10 pt-8 border-t-4 border-black flex justify-end gap-4 items-center">
                        <button onClick={handleCancel} className="px-6 py-3 bg-white text-black text-sm font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">Cancel</button>
                        <button onClick={handleSave} disabled={loading} className="px-8 py-3 bg-black text-white text-sm font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 transition-all disabled:opacity-70">
                            {loading ? "SAVING..." : "SAVE CHANGES"}
                        </button>
                    </div>




                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;