import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const humanize = (seg) => {
  try {
    const d = decodeURIComponent(seg);
    return d.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  } catch (e) {
    return seg;
  }
};

/**
 * Breadcrumb
 * Props:
 * - items: [{ label, to }]
 * - showBack: boolean
 * - align: 'container' | 'viewport' (default: 'viewport')
 * - className: extra wrapper classes
 */
const Breadcrumb = ({ items, showBack = false, align = "viewport", className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const auto = useMemo(() => {
    const segs = location.pathname.split("/").filter(Boolean);
    const list = [{ label: "TRANG CHỦ", to: "/" }];
    segs.forEach((s, i) => {
      const to = "/" + segs.slice(0, i + 1).join("/");
      list.push({ label: humanize(s).toUpperCase(), to });
    });
    return list;
  }, [location.pathname]);

  const list = Array.isArray(items) && items.length ? items : auto;

  // If align=viewport we compute a left offset so breadcrumb lines up with header logo
  return (
    <div className={`w-full pb-6 ${className}`}>
      <nav className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/40 text-[10px] font-oswald font-bold uppercase tracking-widest text-black border border-black/10" aria-label="Breadcrumb">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 hover:text-[var(--theme-accent)] transition-colors pr-2 border-r border-black/20"
              title="Quay lại"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              BACK
            </button>
          )}

          <ol className="flex items-center truncate">
            {list.map((it, idx) => {
              const last = idx === list.length - 1;
              return (
                <li key={idx} className={`flex items-center ${last ? "text-black" : "text-black/60"}`}>
                  {!last ? (
                    <Link to={it.to} className="hover:text-[var(--theme-accent)] transition-colors truncate max-w-xs">
                      {it.label}
                    </Link>
                  ) : (
                    <span className="truncate max-w-xs bg-[var(--theme-accent)] text-white px-2 py-0.5 rounded-[2px]">{it.label}</span>
                  )}

                  {!last && <span className="mx-2 text-black/30 font-normal">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
    </div>
  );
};

export default Breadcrumb;
