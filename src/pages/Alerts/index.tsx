import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LiveFeed from "../../components/ui/LiveFeed";
import StatCard from "../../components/ui/StatCard";
import MitreTag from "../../components/ui/MitreTag";
import { sampleAlerts, xdrStats } from "../../data/xdr";
import { useState } from "react";

import type { AlertEvent } from "../../data/xdr";

const AlertsPage = () => {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [filteredAlerts, setFilteredAlerts] = useState<AlertEvent[]>(sampleAlerts);

  const handleFilterChange = (severity: string) => {
    setFilterSeverity(severity);
    if (severity === 'ALL') {
      setFilteredAlerts(sampleAlerts);
    } else {
      setFilteredAlerts(sampleAlerts.filter(alert => alert.severity === severity));
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-xdr-text to-white/80 bg-clip-text text-transparent mb-2">
            Security Alerts
          </h1>
          <p className="text-xdr-text/60 text-sm md:text-base">
            Real-time threat detection and incident response console
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            className="bg-xdr-panel/80 backdrop-blur-xl border border-xdr-border/50 px-4 py-2 rounded-xl text-sm font-mono"
            value={filterSeverity}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="ALL">All Severity</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {xdrStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <StatCard 
              title={stat.label} 
              value={stat.value} 
              color="text-xdr-accent drop-shadow-lg" 
              trend={stat.trend || 0}
              severity={stat.severity}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Feed */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center space-x-3">
            <span className="text-xdr-accent">🔴</span>
            <span>Live Alert Stream</span>
          </h2>
          <LiveFeed />
        </div>

        {/* Recent Alerts Table */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Recent Incidents ({filteredAlerts.length})</h2>
            <Link 
              to="/alerts/new" 
              className="px-6 py-2 bg-xdr-accent/20 hover:bg-xdr-accent/30 text-xdr-accent border border-xdr-accent/30 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              + New Investigation
            </Link>
          </div>

          <div className="space-y-3">
            {filteredAlerts.slice(0, 8).map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group bg-xdr-panel/60 backdrop-blur-xl border border-xdr-border/50 hover:border-xdr-accent/50 hover:bg-xdr-panel/80 p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 glassXDR-hover"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      alert.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      alert.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                      alert.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border-green-500/30'
                    } border py-1 px-3 rounded-full text-xs font-mono uppercase tracking-wider`}>
                      {alert.severity}
                    </span>
                    <MitreTag id={alert.mitre} />
                  </div>
                  <span className="text-xs text-xdr-text/50 font-mono">{alert.timestamp}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-xdr-accent transition-colors">
                  {alert.event}
                </h3>
                <p className="text-xdr-text/70 mb-3">
                  {alert.host} • {alert.user}@{alert.ip}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    to={`/alerts/${alert.id}`}
                    className="text-xdr-accent hover:text-xdr-accent/80 font-semibold text-sm transition-colors flex items-center space-x-1"
                  >
                    View Investigation →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;

