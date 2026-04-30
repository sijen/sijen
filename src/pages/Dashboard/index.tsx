import { motion } from "framer-motion";
import StatCard from "../../components/ui/StatCard";
import LiveFeed from "../../components/ui/LiveFeed";
import Timeline from "../../components/ui/TimeLine";
import MitreTag from "../../components/ui/MitreTag";
import { portfolioStats, bio, leoRoles, experienceTimeline, recentProjects, workExperience } from "../../data/portfolio";

export default function Dashboard() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-2 lg:p-4 2xl:p-6">
      {/* Top Row: Key Metrics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {portfolioStats.map((stat, i) => (
          <StatCard
            key={stat.label}
            title={stat.label}
            value={stat.value.toLocaleString()}
            color="text-xdr-info"
            icon={i === 0 ? '❤️' : i === 1 ? '📈' : i === 2 ? '💼' : '⏱️'}
            trend={stat.trend}
          />
        ))}
      </motion.div>

      {/* Live Telemetry Feed - Full height left */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="col-span-1 lg:col-span-2 xl:col-span-1 h-[70vh] lg:h-auto">
        <div className="glassXDR h-full rounded-xl p-4 flex flex-col">
          <h2 className="text-xdr-2xl font-semibold mb-4 flex items-center space-x-2">
            <span>❤️ Leo Club Activities</span>
            <span className="text-xs bg-xdr-panel px-2 py-1 rounded-full">LIVE</span>
          </h2>
          <div className="flex-1 overflow-y-auto space-y-2">
            {leoRoles.slice(0, 4).map((role, idx) => (
              <motion.div
                key={idx}
                className="p-3 rounded-lg border-l-4 glassXDR-hover border-xdr-info"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{role.title}</span>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-xdr-info/20 text-xdr-info">{role.duration}</span>
                </div>
                <div className="text-xs text-xdr-muted space-y-0.5">
                  <div>{role.club}</div>
                  <div className="font-medium">{role.responsibilities}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Threat Metrics & MITRE */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-1 lg:col-span-2 xl:col-span-1 space-y-6">
        {/* Active Threats Summary */}
        <div className="glassXDR p-4 rounded-xl col-span-full md:col-span-1">
          <h3 className="font-semibold mb-3 text-xdr-xl flex items-center space-x-2">
            💼 Work Experience
          </h3>
          <div className="space-y-2">
            {workExperience.slice(0, 3).map((job, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{job.role}</span>
                <span className="font-mono">{job.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MITRE Techniques Heatmap */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="col-span-full xl:col-span-2 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-xdr-text leading-relaxed">{bio}</p>
        </motion.div>
      </motion.div>

      {/* Attack Timeline - Right full height */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-1 h-[60vh]">
        <div className="glassXDR h-full rounded-xl p-6 flex flex-col">
          <h2 className="text-xdr-2xl font-semibold mb-6 flex items-center space-x-2">
            ⏱️ Experience Timeline
          </h2>
          <div className="flex-1 space-y-4">
            {experienceTimeline.map((step, i) => (
              <div key={i} className="flex items-start space-x-4 glassXDR-hover p-3 rounded-lg border border-xdr-border">
                <div className="w-8 h-8 rounded-full bg-xdr-panel flex items-center justify-center font-mono text-sm min-w-[2rem]">
                  {step.time}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-xdr-info/20 text-xdr-info">
                      {step.type.toUpperCase()}
                    </span>
                    <span className="font-medium">{step.stage}</span>
                  </div>
                  <p className="text-xdr-text">{step.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quick Actions & Recent Logs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full lg:col-span-3 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glassXDR p-6 rounded-xl cursor-pointer hover:glassXDR-hover border-2 border-dashed border-xdr-border hover:border-xdr-info transition-all">
            <h3 className="font-semibold mb-2 flex items-center space-x-2">
              📄 Download CV
            </h3>
            <p className="text-xdr-muted text-sm">Get my resume</p>
            <a href="/cv.pdf" className="mt-2 block text-xdr-info font-medium">Download CV →</a>
          </div>
          <div className="glassXDR p-6 rounded-xl cursor-pointer hover:glassXDR-hover border-2 border-dashed border-xdr-border hover:border-xdr-info transition-all col-span-1 md:col-span-2">
            <h3 className="font-semibold mb-2 flex items-center space-x-2">
              🚀 Recent Projects
            </h3>
            <p className="text-xdr-muted text-sm">{recentProjects[0]?.description || 'Check out my latest work'}</p>
          </div>
        </div>

        {/* Recent Events Table */}
        <div className="glassXDR rounded-xl overflow-hidden">
          <div className="p-4 border-b border-xdr-border">
            <h3 className="text-xdr-xl font-semibold">Recent Leo Achievements</h3>
          </div>
          <div className="divide-y divide-xdr-border">
            {leoRoles.slice(-3).map((role) => (
              <div key={role.title} className="p-4 hover:bg-xdr-panel/50 glassXDR-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-xdr-info"></span>
                    <span>{role.title}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs">{role.duration}</div>
                    <div className="text-xs text-xdr-muted">{role.club}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

