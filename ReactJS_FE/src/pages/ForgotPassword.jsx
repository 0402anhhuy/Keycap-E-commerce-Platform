import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OtpInput, Toast } from "../components";

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
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const setMessage = (text, type = "info") => {
        setMsg(text);
        setMsgType(type);
    };

    const sendOtp = async () => {
        if (!email) {
            setErrors({ email: "Email is required" });
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
            if (!res.ok) throw new Error(data.message || "Error");
            setStep(1);
            setMessage("OTP has been sent to your email", "success");
        } catch (err) {
            setMessage("Email does not exist", "Error");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (otp.length !== 6) {
            setMessage("Please enter 6 digits", "Error");
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
            if (!res.ok) throw new Error(data.message || "Invalid OTP");
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
            newErrors.newPassword = "Password must be at least 6 characters";
        if (passwords.newPassword !== passwords.confirmPassword)
            newErrors.confirmPassword = "Confirm password does not match";
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
            if (!res.ok) throw new Error(data.message || "Error");
            setMessage(
                "Reset password successfully! Redirecting...",
                "Success",
            );
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setMessage(err.message, "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#e5e5e5] font-oswald flex flex-col items-center justify-center pt-24 pb-12 px-4 relative">
            <Toast
                show={!!msg}
                message={msg}
                type={msgType}
                onClose={() => setMsg(null)}
            />
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
                            className="mt-4 w-full bg-[var(--theme-accent)] text-white font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-70 cursor-pointer"
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

                        <div className="flex gap-4 mt-3">
                            <button
                                onClick={verifyOtp}
                                disabled={loading}
                                className="flex-[2] bg-[var(--theme-accent)] text-white font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] disabled:opacity-70 cursor-pointer"
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
                                className="flex-1 bg-white text-black font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] disabled:opacity-70 cursor-pointer"
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
                                className="text-black hover:text-[var(--theme-accent)] hover:underline ml-1 cursor-pointer"
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
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={passwords.newPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    className="border-2 border-black p-3 pr-10 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black cursor-pointer focus:outline-none transition-colors"
                                >
                                    {showNewPassword ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
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
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    value={passwords.confirmPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    className="border-2 border-black p-3 pr-10 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black cursor-pointer focus:outline-none transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={resetPassword}
                            disabled={loading}
                            className="mt-4 w-full bg-[var(--theme-accent)] text-white font-black h-[52px] flex items-center justify-center transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] disabled:opacity-70 cursor-pointer"
                        >
                            <span className="text-[15px] leading-tight tracking-widest uppercase">
                                {loading ? "PROCESSING..." : "RESET PASSWORD"}
                            </span>
                        </button>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t-2 border-black/10 text-center">
                    <Link
                        to="/login"
                        className="text-xs font-bold text-black/60 hover:text-black uppercase tracking-widest transition-colors hover:underline"
                    >
                        BACK TO LOGIN
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
