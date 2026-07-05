export const Button = ({
    children,
    loading,
    variant = "primary",
    className = "",
    ...props
}) => {
    const base =
        "w-full py-3.5 rounded-xl font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed tracking-wide";
    const variants = {
        primary:
            "bg-[var(--theme-accent)] text-black shadow-[0_18px_40px_rgba(255,122,26,0.28)] hover:brightness-110",
        secondary:
            "bg-white/5 text-[var(--theme-text)] border border-white/10 hover:bg-white/10",
        danger: "bg-red-500 text-white hover:opacity-90",
    };
    return (
        <button
            disabled={loading}
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                        />
                    </svg>
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export const InputField = ({ label, error, ...props }) => (
    <div className="mb-4">
        {label && (
            <label className="block text-sm font-medium text-[var(--theme-text)] mb-1.5">
                {label}
            </label>
        )}
        <input
            className={`w-full px-4 py-3 border rounded-xl bg-white/5 text-[var(--theme-text)] placeholder:text-white/35 focus:ring-2 focus:ring-[rgba(255,122,26,0.35)] focus:outline-none transition-all ${error ? "border-red-400/80 bg-red-500/10" : "border-white/10"}`}
            {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
);

export const Message = ({ text, type = "info" }) => {
    if (!text) return null;
    const styles = {
        info: "bg-white/5 text-[var(--theme-text)] border-white/10",
        success: "bg-emerald-500/10 text-emerald-200 border-emerald-500/20",
        error: "bg-red-500/10 text-red-200 border-red-500/20",
    };
    return (
        <div
            className={`mt-4 px-4 py-3 rounded-xl border text-sm text-center ${styles[type]}`}
        >
            {text}
        </div>
    );
};

export const StepIndicator = ({ steps, current }) => (
    <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((label, i) => {
            const done = i < current;
            const active = i === current;
            return (
                <div key={i} className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${done ? "bg-primary border-primary text-white" : active ? "border-primary text-primary bg-white" : "border-gray-300 text-gray-400 bg-white"}`}
                        >
                            {done ? (
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                i + 1
                            )}
                        </div>
                        <span
                            className={`text-xs font-medium ${active ? "text-primary" : done ? "text-primary" : "text-gray-400"}`}
                        >
                            {label}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div
                            className={`w-10 h-0.5 mb-5 rounded ${done ? "bg-primary" : "bg-gray-200"}`}
                        />
                    )}
                </div>
            );
        })}
    </div>
);

export const OtpInput = ({ value, onChange }) => (
    <div className="mb-2">
        <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={value}
            onChange={(e) =>
                onChange(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-center text-2xl font-mono tracking-[0.5em] transition-all"
        />
        <p className="text-xs text-gray-400 mt-1 text-center">
            Please enter the 6-digit OTP code sent to your email
        </p>
    </div>
);

export const Card = ({ children, className = "" }) => (
    <div
        className={`max-w-md w-full bg-[rgba(21,21,26,0.92)] p-8 rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.55)] border border-white/10 backdrop-blur-sm ${className}`}
    >
        {children}
    </div>
);

export const PageWrapper = ({ children, center = true }) => (
    <div
        className={`min-h-screen flex ${center ? "items-center justify-center" : "items-start justify-start"} px-4 py-12`}
    >
        {children}
    </div>
);

export { default as Toast } from "./Toast";
