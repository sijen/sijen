import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { portfolioStats } from '../../data/portfolio';

const navSections = [
  {
    label: "MAIN",
    items: [
      { icon: "🏠", label: "Home", path: "/dashboard" },
    ],
  },
  {
    label: "VOLUNTEER",
    items: [
      { icon: "🦁", label: "Leo Club", path: "/leo" },
    ],
  },
  {
    label: "SECURITY",
    items: [
      { icon: "🏆", label: "Certifications", path: "/certs" },
      { icon: "🔬", label: "Security Lab", path: "/lab" },
      { icon: "📝", label: "Blog / Writeups", path: "/blog" },
    ],
  },
  {
    label: "OTHER",
    items: [
      { icon: "📧", label: "Contact", path: "/contact" },
    ],
  },
];

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close sidebar on route change (mobile)
  const handleNavClick = () => {
    if (isMobile) setMobileOpen(false);
  };

  // ─── MOBILE: icon-only collapsed bar + overlay drawer ───
  if (isMobile) {
    return (
      <>
        {/* Collapsed icon-only sidebar */}
        <div className="w-14 flex-shrink-0 flex flex-col glassXDR border-r border-xdr-border shadow-control-room overflow-hidden z-40">
          {/* Logo button — tap to open drawer */}
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 flex items-center justify-center border-b border-xdr-border h-[72px] hover:bg-xdr-panel/50 transition-colors"
            aria-label="Open menu"
          >
            <img
              src="/logo.png"
              alt="Sijen Logo"
              className="w-9 h-9 rounded-xl shadow-control-room object-cover"
            />
          </button>

          {/* Icon-only nav */}
          <nav className="flex-1 flex flex-col items-center py-4 space-y-1 overflow-y-auto">
            {navSections.flatMap((section) =>
              section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  title={item.label}
                  className={({ isActive }) =>
                    `w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-xdr-panel/80 border border-xdr-info/50 shadow-control-room"
                        : "hover:bg-xdr-panel/50"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                </NavLink>
              ))
            )}
          </nav>
        </div>

        {/* Full drawer overlay when logo tapped */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              />

              {/* Drawer */}
              <motion.div
                key="drawer"
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-full w-64 z-50 flex flex-col glassXDR border-r border-xdr-border shadow-control-room overflow-y-auto"
              >
                {/* Header */}
                <div className="p-6 border-b border-xdr-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/logo.png"
                        alt="Sijen Logo"
                        className="w-10 h-10 rounded-xl shadow-control-room object-cover"
                      />
                      <div>
                        <h1 className="text-base font-semibold text-xdr-text leading-tight">
                          Sijen's Portfolio
                        </h1>
                        <p className="text-xs text-xdr-muted uppercase tracking-wider font-medium">
                          Personal Site
                        </p>
                      </div>
                    </div>
                    {/* Close button */}
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="text-xdr-muted hover:text-xdr-text transition-colors text-xl leading-none"
                      aria-label="Close menu"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 py-6 space-y-5 overflow-y-auto">
                  {navSections.map((section) => (
                    <div key={section.label}>
                      <p className="text-[10px] font-semibold tracking-widest text-xdr-muted/60 uppercase px-3 mb-2">
                        {section.label}
                      </p>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={handleNavClick}
                            className={({ isActive }) =>
                              `group flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                                isActive
                                  ? "bg-xdr-panel/80 border border-xdr-info/50 text-xdr-info shadow-control-room"
                                  : "text-xdr-muted hover:text-xdr-text hover:bg-xdr-panel/50"
                              }`
                            }
                          >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium text-sm">{item.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-xdr-border">
                  <div className="text-xs text-xdr-muted space-y-1">
                    <div>Leo Roles: {portfolioStats[0].value}</div>
                    <div>Projects: {portfolioStats[2].value}</div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ─── DESKTOP: full sidebar ───
  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 flex-shrink-0 flex flex-col glassXDR border-r border-xdr-border shadow-control-room overflow-y-auto"
    >
      {/* Header */}
      <div className="p-6 border-b border-xdr-border">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Sijen Logo"
            className="w-10 h-10 rounded-xl shadow-control-room object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold text-xdr-text leading-tight">
              Sijen's Portfolio
            </h1>
            <p className="text-xs text-xdr-muted uppercase tracking-wider font-medium">
              Personal Site
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 py-6 space-y-5 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold tracking-widest text-xdr-muted/60 uppercase px-3 mb-2">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-xdr-panel/80 border border-xdr-info/50 text-xdr-info shadow-control-room glassXDR-hover"
                        : "text-xdr-muted hover:text-xdr-text hover:bg-xdr-panel/50 glassXDR-hover"
                    }`
                  }
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 pt-0 border-t border-xdr-border">
        <div className="text-xs text-xdr-muted space-y-1">
          <div>Leo Roles: {portfolioStats[0].value}</div>
          <div>Projects: {portfolioStats[2].value}</div>
        </div>
      </div>
    </motion.div>
  );
}