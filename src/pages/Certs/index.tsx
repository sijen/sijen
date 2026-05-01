import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Shield, ExternalLink, Calendar, Trophy } from 'lucide-react';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface ProfessionalCert {
  name: string;
  issuer: string;
  color: string;
  date: string;
  status: 'active' | 'in-progress' | 'expired';
  credentialId: string;
  verifyUrl: string;
}

interface LeoAward {
  name: string;
  org: string;
  year: string;
  desc: string;
}

// ============================================
// DATA
// ============================================

const professionalCerts: ProfessionalCert[] = [
  {
    name: 'AZ-900: Azure Fundamentals',
    issuer: 'Microsoft',
    color: '#0078d4',
    date: 'July 11, 2025',
    status: 'active',
    credentialId: '56F91D5E6DFA0186',
    verifyUrl: 'https://learn.microsoft.com/en-us/users/sijendangol-7831/credentials/56f91d5e6dfa0186?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
  {
    name: 'AZ-500: Azure Security Engineer',
    issuer: 'Microsoft',
    color: '#0078d4',
    date: 'in-progress',
    status: 'in-progress',
    credentialId: 'AZ500-XXXX',
    verifyUrl: '#',
  },
  {
    name: 'Foundations of Operationalizing MITRE ATT&CK v13',
    issuer: 'AttackIQ',
    color: '#0078d4',
    date: '6/28/2024',
    status: 'active',
    credentialId: '4bbc7f15-e95f-4814-ba4b-129a8e5c3e9f',
    verifyUrl: 'https://www.credly.com/earner/earned/badge/4bbc7f15-e95f-4814-ba4b-129a8e5c3e9f',
  },
  {
    name: 'Security+',
    issuer: 'CompTIA',
    color: '#e02020',
    date: 'in-progress',
    status: 'in-progress',
    credentialId: 'COMP-XXXX',
    verifyUrl: '#',
  },
  
  {
    name: 'Fortinet FortiGate 7.4 Operator',
    issuer: 'Fortinet',
    color: '#0078d4',
    date: '1/31/2024',
    status: 'active',
    credentialId: '2d2689aa-e510-4976-9c75-5a08d3d455b1',
    verifyUrl: 'https://www.credly.com/earner/earned/badge/2d2689aa-e510-4976-9c75-5a08d3d455b1',
  },
  {
    name: 'Application of ATT&CK Navigator',
    issuer: 'AttackIQ',
    color: '#6d28d9',
    date: 'June 08, 2025',
    status: 'active',
    credentialId: '',
    verifyUrl: 'https://www.credly.com/earner/earned/badge/baf56ef7-98f6-4052-868b-6be7fd02c24a',
  },
];

const leoAwards: LeoAward[] = [
  {
    name: 'Best Leo Club Award',
    org: 'Lions District 306 B2',
    year: '2023',
    desc: 'Recognized for outstanding club performance',
  },
  {
    name: 'Outstanding Leo Member',
    org: 'Leo Club of YourCity',
    year: '2022',
    desc: 'Awarded for exceptional service and leadership',
  },
  {
    name: 'Leo Leadership Certificate',
    org: 'Lions Club International',
    year: '2023',
    desc: 'Completed leadership development program',
  },
  {
    name: 'Community Service Excellence',
    org: 'Lions District 306 B2',
    year: '2022',
    desc: '100+ hours of community service',
  },
  {
    name: 'Best Leo Project Award',
    org: 'Leo Club of YourCity',
    year: '2023',
    desc: 'For organizing annual blood donation drive',
  },
];

// Stats calculations
const totalCerts = professionalCerts.length;
const activeCerts = professionalCerts.filter((c) => c.status === 'active').length;
const inProgressCerts = professionalCerts.filter((c) => c.status === 'in-progress').length;
const leoAwardsCount = leoAwards.length;

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================

function AnimatedCounter({
  value,
  suffix = '',
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ============================================
// STATUS BADGE
// ============================================

function StatusBadge({ status }: { status: ProfessionalCert['status'] }) {
  const config = {
    active: { label: 'Active', color: 'bg-xdr-low' },
    'in-progress': { label: 'In Progress', color: 'bg-xdr-medium' },
    expired: { label: 'Expired', color: 'bg-xdr-critical' },
  };

  const { label, color } = config[status];

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${color} text-xdr-bg`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {label}
    </span>
  );
}

// ============================================
// PROFESSIONAL CARD
// ============================================

function ProfessionalCard({ cert, index }: { cert: ProfessionalCert; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glassXDR p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-xdr-border hover:border-xdr-info/50 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        {/* Issuer Badge */}
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm"
          style={{ backgroundColor: cert.color }}
        >
          {cert.issuer.slice(0, 2).toUpperCase()}
        </div>
        <StatusBadge status={cert.status} />
      </div>

      {/* Certification Name */}
      <h3 className="text-base sm:text-lg font-semibold text-xdr-text mb-1">{cert.name}</h3>

      {/* Issuing Organization */}
      <p className="text-xdr-muted text-xs sm:text-sm mb-2 sm:mb-3">{cert.issuer}</p>

      {/* Date */}
      <div className="flex items-center gap-2 text-xdr-muted text-xs sm:text-sm mb-2 sm:mb-3">
        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="truncate">Date obtained: {cert.date}</span>
      </div>

      {/* Credential ID */}
      {cert.credentialId && (
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-3 sm:mb-4">
          <span className="text-xdr-muted whitespace-nowrap">Credential ID:</span>
          <span
            className={`font-mono px-1 sm:px-2 py-0.5 rounded text-xs truncate max-w-[120px] sm:max-w-none ${
              isHovered ? 'bg-xdr-panel text-xdr-text' : 'bg-xdr-panel text-xdr-muted blur-[2px] group-hover:blur-0'
            } transition-all`}
          >
            {cert.credentialId}
          </span>
        </div>
      )}

      {/* Verify Button */}
      {cert.verifyUrl && cert.status === 'active' && (
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-xdr-info/20 text-xdr-info rounded-lg hover:bg-xdr-info/30 transition-colors text-xs sm:text-sm font-medium"
        >
          <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Verify Credential</span>
          <span className="sm:hidden">Verify</span>
          <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </a>
      )}
    </motion.div>
  );
}

// ============================================
// LEO AWARD CARD
// ============================================

function LeoAwardCard({ award, index }: { award: LeoAward; index: number }) {
  return (
<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="glassXDR p-4 sm:p-5 rounded-xl sm:rounded-2xl border-l-4 border-amber-500 hover:border-amber-400 transition-all duration-300"
    >
      {/* Trophy Icon + Year */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
        </div>
        <span className="px-2 sm:px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs sm:text-sm font-medium">
          {award.year}
        </span>
      </div>

      {/* Award Name */}
      <h3 className="text-base sm:text-lg font-semibold text-xdr-text mb-1">{award.name}</h3>

      {/* Organization */}
      <p className="text-xdr-muted text-xs sm:text-sm mb-1 sm:mb-2">Issued by: {award.org}</p>

      {/* Description */}
      <p className="text-xdr-text text-xs sm:text-sm">{award.desc}</p>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Certs() {
  const [activeTab, setActiveTab] = useState<'professional' | 'leo'>('professional');

  const stats = [
    { label: 'Total Certs', value: totalCerts },
    { label: 'Active', value: activeCerts },
    { label: 'In Progress', value: inProgressCerts },
    { label: 'Leo Awards', value: leoAwardsCount },
  ];

return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 sm:space-y-8 px-3 sm:px-4 py-3 sm:py-4 max-w-6xl mx-auto"
    >
      {/* ============================================ */}
      {/* PAGE HEADER */}
      {/* ============================================ */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-4 sm:py-6 md:py-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
          <span className="text-xdr-info">Certifications</span> & Awards
        </h1>
        <p className="text-xdr-muted text-sm sm:text-lg mb-6 sm:mb-8">
          Professional credentials & volunteer recognition
        </p>

        {/* Stats Row - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glassXDR p-3 sm:p-4 rounded-lg sm:rounded-xl text-center"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-xdr-info mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-xs sm:text-xs md:text-sm text-xdr-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ============================================ */}
      {/* TAB SWITCHER - Mobile Optimized */}
      {/* ============================================ */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="glassXDR p-1 rounded-xl flex flex-col sm:flex-row gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('professional')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeTab === 'professional'
                ? 'bg-xdr-info/20 text-xdr-info border-b-2 border-xdr-info'
                : 'text-xdr-muted hover:text-xdr-text'
            }`}
          >
            💼 Professional
          </button>
          <button
            onClick={() => setActiveTab('leo')}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeTab === 'leo'
                ? 'bg-amber-500/20 text-amber-500 border-b-2 border-amber-500'
                : 'text-xdr-muted hover:text-xdr-text'
            }`}
          >
            🦁 Leo & Volunteer
          </button>
        </div>
      </div>

      {/* ============================================ */}
      {/* TAB CONTENT */}
      {/* ============================================ */}
      <AnimatePresence mode="wait">
        {activeTab === 'professional' ? (
          <motion.div
            key="professional"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {professionalCerts.map((cert, index) => (
              <ProfessionalCard key={cert.credentialId || cert.name} cert={cert} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="leo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {leoAwards.map((award, index) => (
              <LeoAwardCard key={award.name + award.year} award={award} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
