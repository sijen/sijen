import { motion } from 'framer-motion';
import ImpactCounter from '../../components/ui/ImpactCounter';
import { leoRoles, experienceTimeline } from '../../data/portfolio';

const leoStats = [
  { label: 'Years Active', value: 4, icon: '📅', color: 'text-xdr-high', suffix: ' yrs' },
  { label: 'Events Coordinated', value: 12, icon: '🎉', color: 'text-xdr-info', suffix: '+' },
  { label: 'Hours Volunteered', value: 500, icon: '⏱️', color: 'text-xdr-low', prefix: '' },
  { label: 'Lives Impacted', value: 1000, icon: '❤️', color: 'text-xdr-critical', prefix: '1k+' },
];

export default function Leo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 px-2 md:px-4 py-4 max-w-6xl mx-auto"
    >
      {/* Hero */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-xdr-high">Leo</span> Club Journey
        </h1>
        <p className="text-xdr-muted text-lg">
          Making a difference in my community, one service at a time
        </p>
      </section>

      {/* Impact Stats */}
      <section className="py-6">
        <ImpactCounter stats={leoStats} />
      </section>

      {/* Leadership Roles */}
      <section className="glassXDR p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <span>👔</span>
          <span>Leadership Roles</span>
        </h2>
        
        <div className="space-y-6">
          {leoRoles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border border-xdr-border hover:border-xdr-high/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-xdr-high">{role.title}</h3>
                  <p className="text-sm text-xdr-muted">{role.club}</p>
                </div>
                <span className="text-sm text-xdr-muted mt-2 md:mt-0 px-3 py-1 bg-xdr-panel rounded-full">
                  {role.duration}
                </span>
              </div>
              
              {role.responsibilities && (
                <p className="text-xdr-text mt-3">{role.responsibilities}</p>
              )}
              
              {role.achievements.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-xdr-muted mb-2">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {role.achievements.map((achievement: string, i: number) => (
                      <li key={i} className="text-sm text-xdr-text flex items-start space-x-2">
                        <span className="text-xdr-low">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="glassXDR p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <span>⏱️</span>
          <span>Journey Timeline</span>
        </h2>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-xdr-border"></div>
          
          <div className="space-y-6">
            {experienceTimeline
              .filter((item) => item.type === 'leo')
              .map((item, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-xdr-high border-2 border-xdr-bg"></div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-sm font-mono text-xdr-high w-16">{item.time}</span>
                    <div className="flex-1">
                      <span className="font-semibold text-xdr-text">{item.event}</span>
                      <span className="text-xdr-muted text-sm ml-2">- {item.stage}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Service Projects Gallery - placeholder */}
      <section className="glassXDR p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span>📸</span>
          <span>Service Highlights</span>
        </h2>
        
        <p className="text-xdr-muted">
          Photo gallery coming soon. Meanwhile, check out my key achievements above!
        </p>
        
        {/* Placeholder gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-xdr-panel rounded-lg flex items-center justify-center text-xdr-muted"
            >
              📷 {i}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
