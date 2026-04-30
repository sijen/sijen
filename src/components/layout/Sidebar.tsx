import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import { portfolioStats } from '../../data/portfolio';

const navItems = [
  { icon: "🏠", label: "Home", path: "/home" },
  { icon: "🚀", label: "Projects", path: "/projects" },
  { icon: "🧪", label: "Security Lab", path: "/lab" },
  { icon: "🦁", label: "Leo Club", path: "/leo" },
  { icon: "🏆", label: "Certifications", path: "/certs" },
  { icon: "📝", label: "Blog", path: "/blog" },
  { icon: "📧", label: "Contact", path: "/contact" },
];

export default function Sidebar() {
  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 flex-shrink-0 flex flex-col glassXDR border-r border-xdr-border shadow-control-room overflow-y-auto"
    >
      {/* Header */}
      <div className="p-6 border-b border-xdr-border">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Sijen Logo" className="w-10 h-10 rounded-xl shadow-control-room object-cover" />
          <div>
            <h1 className="text-xl font-semibold text-xdr-text leading-tight">Sijen's Portfolio</h1>
            <p className="text-xs text-xdr-muted uppercase tracking-wider font-medium">Personal Site</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-xdr-panel/80 border border-xdr-info/50 text-xdr-info shadow-control-room glassXDR-hover'
                  : 'text-xdr-muted hover:text-xdr-text hover:bg-xdr-panel/50 glassXDR-hover'
              }`
            }
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
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

