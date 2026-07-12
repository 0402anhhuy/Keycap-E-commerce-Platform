import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../components";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [msgType, setMsgType] = useState("info");

    const setMessage = (text, type = "info") => {
        setMsg(text);
        setMsgType(type);
    };

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userRaw = localStorage.getItem("user");
        if (token && userRaw) {
            try {
                const user = JSON.parse(userRaw);
                if (user?.role === "manager" || user?.role === "admin") {
                    navigate("/manager/dashboard", { replace: true });
                    return;
                }
            } catch (e) {}
            const params = new URLSearchParams(window.location.search);
            const redirectUrl = params.get("redirect") || "/";
            navigate(redirectUrl, { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setMessage("Please enter your email and password", "error");
            return;
        }

        setLoading(true);
        setMsg(null);

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Login failed", "error");
                setLoading(false);
                return;
            }

            if (!data.token) {
                setMessage("Server không trả token", "error");
                setLoading(false);
                return;
            }

            localStorage.setItem("accessToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setMessage("Login successful", "success");

            const params = new URLSearchParams(window.location.search);
            let redirectUrl = params.get("redirect") || "/";
            if (data.user.role === "manager" || data.user.role === "admin") {
                redirectUrl = "/manager/dashboard";
            } else if (
                data.user.role === "vendor" &&
                (redirectUrl === "/vendor/setup" || redirectUrl === "/")
            ) {
                redirectUrl = "/vendor/dashboard";
            }

            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 500);
        } catch (err) {
            setMessage(err.message || "Error", "error");
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

            <Link
                to="/"
                className="absolute top-6 left-6 md:top-10 md:left-10 bg-white text-black font-black px-4 py-2 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all z-20 flex items-center gap-2"
            >
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
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                <span className="text-[12px] leading-tight tracking-widest uppercase mt-0.5">
                    BACK TO HOME
                </span>
            </Link>

            <div className="w-full max-w-md bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] p-8 md:p-10 z-10 relative">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-anton uppercase tracking-wider text-black mb-2">
                        Login
                    </h2>
                    <p className="text-black/60 font-bold uppercase tracking-widest text-xs">
                        Access your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-black">
                            Email
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
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold uppercase tracking-widest text-black">
                                Password
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-[10px] text-[var(--theme-accent)] font-bold uppercase tracking-widest hover:underline"
                            >
                                Forgot?
                            </Link>
                        </div>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="border-2 border-black p-3 text-sm font-semibold focus:outline-none focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all bg-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full bg-[var(--theme-accent)] text-white font-black h-[52px] flex items-center justify-center gap-2 transition-all border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-[2px] disabled:opacity-70 cursor-pointer"
                    >
                        <span className="text-[15px] leading-tight tracking-widest uppercase">
                            {loading ? "PROCESSING..." : "SIGN IN"}
                        </span>
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t-2 border-black/10 text-center space-y-4">
                    <p className="text-xs font-bold text-black uppercase tracking-widest">
                        New here?{" "}
                        <Link
                            to={`/register${window.location.search}`}
                            className="text-[var(--theme-accent)] hover:underline ml-1"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
