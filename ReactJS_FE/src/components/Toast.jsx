import { useEffect } from "react";

const Toast = ({ show, message, type = "success", onClose, duration = 3000 }) => {
    useEffect(() => {
        if (show && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    const isError = type === "error";

    return (
        <div 
            className={`fixed top-10 right-6 md:right-10 z-[100] transition-all duration-300 transform ${show ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
        >
            <div className="flex items-stretch bg-white border-2 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] max-w-sm w-full">
                <div className={`w-3 ${isError ? "bg-red-500" : "bg-[var(--theme-accent)]"} border-r-2 border-black shrink-0`}></div>
                <div className="flex items-center gap-4 p-4 flex-1">
                    <p className="text-xs font-black uppercase tracking-widest text-black flex-1 leading-relaxed">
                        {message}
                    </p>
                    <button 
                        onClick={onClose} 
                        className="text-black hover:text-red-500 p-1 border-2 border-transparent hover:border-black hover:bg-black/5 transition-all shrink-0"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
