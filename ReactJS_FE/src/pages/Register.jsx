import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OtpInput } from "../components";
import Toast from "../components/Toast";

const STEPS = ["Information", "OTP Verification"];

const Register = () => {
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
    });

    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [msgType, setMsgType] = useState("info");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        const errs = {};

        const name = formData.name.trim();
        const email = formData.email.trim().toLowerCase();

        if (!name) {
            errs.name = "Name is required";
        }

        if (!formData.dob) {
            errs.dob = "Vui lòng chọn ngày sinh.";
        }

        if (!email) {
            errs.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                errs.email = "Invalid email";
            }
        }

        if (!formData.phone.trim()) {
            errs.phone = "Phone is required";
        } else {
            const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
            if (!phoneRegex.test(formData.phone.trim())) {
                errs.phone = "Invalid phone";
            }
        }

        if (!formData.password) {
            errs.password = "Vui lòng nhập mật khẩu.";
        } else if (formData.password.length < 6) {
            errs.password = "Mật khẩu tối thiểu 6 ký tự.";
        }

        if (!formData.confirmPassword) {
            errs.confirmPassword = "Vui lòng xác nhận mật khẩu.";
        } else if (formData.password !== formData.confirmPassword) {
            errs.confirmPassword = "Mật khẩu xác nhận không khớp.";
        }

        if (!formData.address.trim()) errs.address = "Vui lòng nhập địa chỉ.";

        return errs;
    };

    const sendOtp = async () => {
        if (loading) return;

        const errs = validate();

        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        setErrors({});
        setLoading(true);
        setMsg(null);

        try {
            const payload = {
                name: formData.name.trim(),
                dob: formData.dob,
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                address: {
                    street: formData.address.trim(),
                    phone: formData.phone.trim(),
                },
            };

            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || "Lỗi gửi OTP");
            }

            setStep(1);
            setMsg(data.message || "OTP đã được gửi tới email");
            setMsgType("success");
        } catch (err) {
            setMsg(err.message || "Lỗi gửi OTP");
            setMsgType("error");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (loading) return;

        if (!/^\d{6}$/.test(otp)) {
            setErrors({
                otp: "OTP phải gồm 6 chữ số.",
            });

            return;
        }

        setErrors({});
        setLoading(true);
        setMsg(null);

        try {
            const res = await fetch(`${API_URL}/api/auth/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.trim().toLowerCase(),
                    otp,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || "Lỗi xác thực OTP");
            }

            setMsg("Đăng ký thành công! Đang chuyển hướng...");
            setMsgType("success");
            setTimeout(() => {
                navigate("/login" + window.location.search);
            }, 1500);
        } catch (err) {
            setMsg(err.message || "Lỗi xác thực OTP");
            setMsgType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#e5e5e5] font-oswald flex flex-col items-center justify-center pt-24 pb-12 px-4 relative">
            <div className="w-full max-w-lg bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-8 md:p-10 z-10 relative">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-anton uppercase tracking-wider text-black mb-2">
                        Create Account
                    </h2>
                    <p className="text-black/60 font-bold uppercase tracking-widest text-xs">
                        Join Keycap Forge
                    </p>
                </div>

                <div className="flex justify-center mb-8 gap-2">
                    {STEPS.map((s, i) => (
                        <div
                            key={i}
                            className={`flex-1 text-center py-2 border-2 ${step >= i ? "border-black bg-black text-white" : "border-black/20 text-black/40"} text-xs font-bold uppercase tracking-widest transition-colors`}
                        >
                            {s}
                        </div>
                    ))}
                </div>

                {step === 0 && (
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                    Name{" "}
                                    {errors.name && (
                                        <span className="text-red-500">
                                            {errors.name}
                                        </span>
                                    )}
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                Date of Birth{" "}
                                {errors.dob && (
                                    <span className="text-red-500">
                                        {errors.dob}
                                    </span>
                                )}
                            </label>
                            <input
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                                className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent uppercase"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                Email{" "}
                                {errors.email && (
                                    <span className="text-red-500">
                                        {errors.email}
                                    </span>
                                )}
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                Phone{" "}
                                {errors.phone && (
                                    <span className="text-red-500">
                                        {errors.phone}
                                    </span>
                                )}
                            </label>
                            <input
                                name="phone"
                                type="text"
                                placeholder="0912345678"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                Password{" "}
                                {errors.password && (
                                    <span className="text-red-500">
                                        {errors.password}
                                    </span>
                                )}
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                Confirm Password{" "}
                                {errors.confirmPassword && (
                                    <span className="text-red-500">
                                        {errors.confirmPassword}
                                    </span>
                                )}
                            </label>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                Address{" "}
                                {errors.address && (
                                    <span className="text-red-500">
                                        {errors.address}
                                    </span>
                                )}
                            </label>
                            <input
                                name="address"
                                type="text"
                                placeholder="123 Street, City"
                                value={formData.address}
                                onChange={handleChange}
                                className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                            />
                        </div>

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="mt-2 w-full bg-[var(--theme-accent)] text-white font-black h-[52px] flex items-center justify-center gap-2 transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] disabled:opacity-70 cursor-pointer"
                        >
                            <span className="text-[15px] leading-tight tracking-widest uppercase">
                                {loading ? "PROCESSING..." : "SEND OTP"}
                            </span>
                        </button>
                    </div>
                )}

                {step === 1 && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-transparent border-2 border-black p-4 text-sm font-bold uppercase tracking-widest text-center">
                            OTP Sent to <br />
                            <span className="text-[var(--theme-accent)]">
                                {formData.email}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1.5 mt-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-center text-center">
                                Enter 6-digit OTP
                            </label>
                            <div className="flex justify-center">
                                <OtpInput
                                    value={otp}
                                    onChange={(val) => {
                                        setOtp(val);
                                        setErrors((prev) => ({
                                            ...prev,
                                            otp: "",
                                        }));
                                    }}
                                />
                            </div>
                            {errors.otp && (
                                <p className="text-xs text-red-500 text-center font-bold mt-2">
                                    {errors.otp}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4 mt-3">
                            <button
                                onClick={verifyOtp}
                                disabled={loading}
                                className="flex-[2] bg-[var(--theme-accent)] text-white font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] disabled:opacity-70 cursor-pointer"
                            >
                                <span className="text-[15px] leading-tight tracking-widest uppercase">
                                    {loading ? "VERIFYING..." : "CONFIRM"}
                                </span>
                            </button>
                            <button
                                onClick={sendOtp}
                                disabled={loading}
                                className="flex-1 bg-white text-black font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] disabled:opacity-70 cursor-pointer"
                            >
                                <span className="text-[15px] leading-tight tracking-widest uppercase">
                                    RESEND
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t-2 border-black/10 text-center">
                    <p className="text-xs font-bold text-black uppercase tracking-widest">
                        Already have an account?{" "}
                        <Link
                            to={`/login${window.location.search}`}
                            className="text-[var(--theme-accent)] hover:underline ml-1"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            <Toast
                show={!!msg}
                message={msg}
                type={msgType}
                onClose={() => setMsg(null)}
            />
        </div>
    );
};

export default Register;
