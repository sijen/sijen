import { motion } from 'framer-motion';
import Terminal from '../../components/ui/Terminal';
import SkillsRadar from '../../components/ui/SkillsRadar';
import ImpactCounter from '../../components/ui/ImpactCounter';
import { bio, workExperience, leoRoles } from '../../data/portfolio';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Stats for Leo Impact (from portfolio data)
const leoStats = [
  { label: 'Leo Roles Held', value: 4, icon: '👔', color: 'text-xdr-info', suffix: '' },
  { label: 'Events Organized', value: 5, icon: '📅', color: 'text-xdr-high', suffix: '' },
  { label: 'Volunteer Hours', value: 500, icon: '⏱️', color: 'text-xdr-low', prefix: '' },
  { label: 'Members Led', value: 25, icon: '👥', color: 'text-xdr-medium', suffix: '+' },
];

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 px-2 md:px-4 py-4 max-w-7xl mx-auto"
    >
      {/* Hero Section with Terminal */}
      <motion.section variants={itemVariants} className="text-center py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-xdr-info via-xdr-high to-xdr-critical bg-clip-text text-transparent">
          Welcome to My Portfolio
        </h1>
        <p className="text-xdr-muted text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Security Analyst • Leo Volunteer • lifelong Learner
        </p>
        <Terminal 
          role="Cloud Security Analyst" 
          mission="protecting systems and users from threats"
        />
      </motion.section>

      {/* Stats Overview */}
      <motion.section variants={itemVariants} className="py-6">
        <ImpactCounter stats={leoStats} />
      </motion.section>

      {/* Two Column Layout: Skills + About */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Skills Radar */}
        <div className="glassXDR p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span>🎯</span>
            <span>Skills Radar</span>
          </h2>
          <SkillsRadar />
        </div>

        {/* About Bio */}
        <div className="glassXDR p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span>ℹ️</span>
            <span>About Me</span>
          </h2>
          <p className="text-xdr-text leading-relaxed">{bio}</p>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-wrap gap-2">
              <a href="/cv.pdf" className="px-4 py-2 bg-xdr-info/20 text-xdr-info rounded-lg hover:bg-xdr-info/30 transition-colors text-sm font-medium">
                📄 Download CV
              </a>
              <a href="/contact" className="px-4 py-2 bg-xdr-panel border border-xdr-border rounded-lg hover:border-xdr-info transition-colors text-sm">
                📧 Contact Me
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Work Experience Preview */}
      <motion.section variants={itemVariants} className="glassXDR p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span>💼</span>
          <span>Work Experience</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workExperience.map((job, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-xdr-border hover:border-xdr-info/50 transition-colors"
            >
              <h3 className="font-semibold text-xdr-text">{job.role}</h3>
              <p className="text-sm text-xdr-muted">{job.company}</p>
              <p className="text-xs text-xdr-muted mt-2">{job.duration}</p>
              <p className="text-sm text-xdr-text mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Leo Club Preview */}
      <motion.section variants={itemVariants} className="glassXDR p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span>🦁</span>
          <span>Leo Club Journey</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leoRoles.slice(0, 4).map((role, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-xdr-border hover:border-xdr-high/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-xdr-high">{role.title}</h3>
                <span className="text-xs text-xdr-muted">{role.duration}</span>
              </div>
              <p className="text-sm text-xdr-muted">{role.club}</p>
              <p className="text-xs text-xdr-text mt-2 line-clamp-2">
                {role.responsibilities || role.achievements[0]}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/leo" className="text-xdr-info hover:underline">
            View full Leo journey →
          </a>
        </div>
      </motion.section>
    </motion.div>
  );
}
