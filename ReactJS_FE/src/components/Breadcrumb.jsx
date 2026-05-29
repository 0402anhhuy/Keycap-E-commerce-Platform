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
    const list = [{ label: "Homepage", to: "/" }];
    segs.forEach((s, i) => {
      const to = "/" + segs.slice(0, i + 1).join("/");
      list.push({ label: humanize(s), to });
    });
    return list;
  }, [location.pathname]);

  const list = Array.isArray(items) && items.length ? items : auto;

  // If align=viewport we compute a left offset so breadcrumb lines up with header logo
  const viewportOffsetStyle = align === "viewport"
    ? { marginLeft: "max(24px, calc((100vw - 1280px)/2 + 24px))" }
    : {};

  return (
    <div className={`w-full ${className}`}>
      <div style={viewportOffsetStyle} className="w-full">
        <nav className="w-full flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/55" aria-label="Breadcrumb">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition text-[10px] uppercase tracking-[0.18em] text-white/70"
              title="Quay lại"
            >
              ← Quay lại
            </button>
          )}

          <ol className="flex items-center gap-2 truncate">
            {list.map((it, idx) => {
              const last = idx === list.length - 1;
              return (
                <li key={idx} className={`flex items-center ${last ? "font-semibold text-white" : "text-white/45"}`}>
                  {!last ? (
                    <Link to={it.to} className="hover:text-[var(--theme-accent)] transition-colors truncate max-w-xs">
                      {it.label}
                    </Link>
                  ) : (
                    <span className="truncate max-w-xs">{it.label}</span>
                  )}

                  {!last && <span className="mx-2 text-white/20">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
