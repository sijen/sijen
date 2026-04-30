import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
  icon?: string;
  trend?: number;
  severity?: string;
}

export default function StatCard({ title, value, color, icon, trend, severity }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glassXDR p-5 rounded-xl shadow-control-room border border-xdr-border hover:glassXDR-hover h-full"
    >
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className={`text-2xl opacity-90 ${color}`}>
            {icon}
          </div>
        )}
        {trend !== undefined && (
          <span className={`text-sm font-mono px-2 py-0.5 rounded ${
            trend > 0 ? 'bg-xdr-high/20 text-xdr-high border border-xdr-high/30' : 'bg-xdr-low/20 text-xdr-low border border-xdr-low/30'
          }`}>
            {trend > 0 ? `+${trend}%` : `${trend}%`}
          </span>
        )}
      </div>
      <h3 className="text-xdr-muted font-medium text-sm uppercase tracking-wide mb-1">{title}</h3>
      <p className={`text-2xl lg:text-3xl font-bold ${color} drop-shadow-lg mb-1`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {severity && (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full sev-${severity.toLowerCase()}`}>
          {severity}
        </span>
      )}
    </motion.div>
  );
}

