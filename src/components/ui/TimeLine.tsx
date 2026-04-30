import { motion } from "framer-motion";
import { attackTimeline } from "../../data/xdr";

export default function Timeline() {
  return (
    <div className="glassXDR p-6 rounded-xl shadow-control-room">
      <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
        ⏱️ Attack Chain
      </h2>
      
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-xdr-info/30 to-xdr-critical/30 rounded-full" />
        
        <div className="space-y-4">
          {attackTimeline.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center pl-12 relative group"
            >
              {/* Timeline Node */}
              <div className={`absolute left-1 w-3 h-3 rounded-full flex items-center justify-center sev-${step.severity.toLowerCase()} ring-4 ring-${step.severity.toLowerCase()}/20 shadow-lg`}>
                <div className="w-1.5 h-1.5 bg-current rounded-full" />
              </div>
              
              {/* Content */}
              <div className="glassXDR group-hover:glassXDR-hover p-4 rounded-xl flex-1 ml-2 min-h-[80px] flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-px rounded-full text-xs font-bold sev-${step.severity.toLowerCase()}`}>
                    {step.severity}
                  </span>
                  <span className="font-medium text-sm text-xdr-text">{step.stage}</span>
                </div>
                <p className="text-xdr-text font-semibold">{step.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

