import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { sampleAlerts } from "../../data/xdr";
import type { AlertEvent } from "../../data/xdr";
import MitreTag from "./MitreTag";

export default function LiveFeed() {
  const [events, setEvents] = useState<AlertEvent[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        ...sampleAlerts[Math.floor(Math.random() * sampleAlerts.length)],
        id: Date.now(),
        timestamp: new Date().toTimeString().slice(0, 8),
      };
      setEvents((prev) => [newEvent, ...prev.slice(0, 9)]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glassXDR p-6 rounded-xl shadow-control-room col-span-full lg:col-span-1 h-[60vh] flex flex-col">
      <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
        <span>🚨 Alert Stream</span>
        <span className="text-xs bg-xdr-panel/80 px-2 py-1 rounded-full font-mono">LIVE</span>
      </h2>
      
      <AnimatePresence>
        <div className="flex-1 overflow-y-auto space-y-3">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="glassXDR-hover p-4 rounded-lg border-l-3 hover:shadow-control-room transition-all cursor-pointer"
              style={{ borderLeftColor: `hsl(var(--xdr-${event.severity.toLowerCase()}))` }}
              onClick={() => window.open(`/#/alerts/${event.id}`, '_self')}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm flex-1 pr-2 line-clamp-1">{event.event}</span>
                <span className={`px-2 py-px rounded-full text-xs font-bold ml-2 sev-${event.severity.toLowerCase()}`}>
                  {event.severity}
                </span>
              </div>
              <div className="text-xs text-xdr-muted grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                <span>Host: <span className="font-mono">{event.host}</span></span>
                <span>IP: <span className="font-mono">{event.ip}</span></span>
                <span>User: <span className="font-mono">{event.user}</span></span>
              </div>
              <div className="flex items-center space-x-2 mt-2 pt-1 border-t border-xdr-border/50">
                <MitreTag id={event.mitre} />
                <span className="text-xs text-xdr-muted capitalize">{event.technique}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      
      {events.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-xdr-muted">
          Waiting for telemetry...
        </div>
      )}
    </div>
  );
}

