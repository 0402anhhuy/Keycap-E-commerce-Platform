import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OtpInput } from "../components";
import Header from "../components/Header";

const STEPS = ["Email", "Verify", "New Password"];

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [msgType, setMsgType] = useState("info");
    const [errors, setErrors] = useState({});

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const setMessage = (text, type = "info") => {
        setMsg(text);
        setMsgType(type);
    };

    const sendOtp = async () => {
        if (!email) {
            setErrors({ email: "Vui lòng nhập email." });
            return;
        }
        setErrors({});
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Lỗi gửi OTP");
            setStep(1);
            setMessage("OTP đã được gửi tới email của bạn.", "success");
        } catch (err) {
            setMessage(err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (otp.length !== 6) {
            setErrors({ otp: "Vui lòng nhập đủ 6 chữ số." });
            return;
        }
        setErrors({});
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`${API_URL}/api/auth/verify-reset-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "OTP không hợp lệ");
            setStep(2);
            setMessage(null);
        } catch (err) {
            setMessage(err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async () => {
        const newErrors = {};
        if (!passwords.newPassword || passwords.newPassword.length < 6)
            newErrors.newPassword = "Mật khẩu tối thiểu 6 ký tự.";
        if (passwords.newPassword !== passwords.confirmPassword)
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`${API_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    otp,
                    newPassword: passwords.newPassword,
                }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || "Lỗi đặt lại mật khẩu");
            setMessage(
                "Đặt lại mật khẩu thành công! Đang chuyển hướng...",
                "success",
            );
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setMessage(err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#e5e5e5] font-oswald flex flex-col items-center justify-center pt-24 pb-12 px-4 relative">
            <Header />

            <div className="w-full max-w-lg bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-8 md:p-10 z-10 relative">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-anton uppercase tracking-wider text-black mb-2">
                        Reset Password
                    </h2>
                    <p className="text-black/60 font-bold uppercase tracking-widest text-xs">
                        Recover your access
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
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                Email Address{" "}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                            />
                        </div>

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="mt-4 w-full bg-black text-white font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-70"
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
                                {email}
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

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={verifyOtp}
                                disabled={loading}
                                className="flex-[2] bg-[var(--theme-accent)] text-white font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] disabled:opacity-70"
                            >
                                <span className="text-[15px] leading-tight tracking-widest uppercase">
                                    {loading ? "VERIFYING..." : "CONFIRM OTP"}
                                </span>
                            </button>
                            <button
                                onClick={() => {
                                    setStep(0);
                                    setOtp("");
                                    setMessage(null);
                                }}
                                disabled={loading}
                                className="flex-1 bg-white text-black font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] disabled:opacity-70"
                            >
                                <span className="text-[15px] leading-tight tracking-widest uppercase">
                                    CHANGE
                                </span>
                            </button>
                        </div>
                        <p className="text-center text-xs font-bold text-black/50 mt-2 uppercase tracking-widest">
                            Didn't receive?{" "}
                            <button
                                onClick={sendOtp}
                                className="text-black hover:text-[var(--theme-accent)] hover:underline ml-1"
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-black flex justify-between">
                                New Password{" "}
                                {errors.newPassword && (
                                    <span className="text-red-500">
                                        {errors.newPassword}
                                    </span>
                                )}
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={passwords.newPassword}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        newPassword: e.target.value,
                                    })
                                }
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
                                type="password"
                                placeholder="••••••••"
                                value={passwords.confirmPassword}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                            />
                        </div>

                        <button
                            onClick={resetPassword}
                            disabled={loading}
                            className="mt-4 w-full bg-[var(--theme-accent)] hover:bg-black text-white font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] disabled:opacity-70"
                        >
                            <span className="text-[15px] leading-tight tracking-widest uppercase">
                                {loading ? "PROCESSING..." : "RESET PASSWORD"}
                            </span>
                        </button>
                    </div>
                )}

                {msg && (
                    <div
                        className={`mt-6 p-3 border-2 border-black text-xs font-bold uppercase tracking-widest text-center ${msgType === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                    >
                        {msg}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t-2 border-black/10 text-center">
                    <Link
                        to="/login"
                        className="text-xs font-bold text-black/60 hover:text-black uppercase tracking-widest transition-colors hover:underline"
                    >
                        ← BACK TO LOGIN
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
