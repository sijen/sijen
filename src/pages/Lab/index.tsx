import { useState } from 'react';
import { motion } from 'framer-motion';
import ThreatGlobe from '../../components/ui/ThreatGlobe';
import { type ThreatLocation, getSeverityColor, getSeverityBgColor } from '../../data/securityNews';

interface PasswordResult {
  score: number;
  strength: 'weak' | 'fair' | 'good' | 'strong';
  feedback: string[];
}

export default function Lab() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<PasswordResult | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<ThreatLocation | null>(null);

  const analyzePassword = (pwd: string): PasswordResult => {
    const feedback: string[] = [];
    let score = 0;

    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    if (pwd.length < 8) {
      feedback.push('❌ Password should be at least 8 characters');
    } else {
      feedback.push('✓ Good length');
    }
    if (!/[a-z]/.test(pwd) || !/[A-Z]/.test(pwd)) {
      feedback.push('❌ Add both lowercase and uppercase letters');
    } else {
      feedback.push('✓ Has mixed case');
    }
    if (!/[0-9]/.test(pwd)) {
      feedback.push('❌ Add numbers');
    } else {
      feedback.push('✓ Has numbers');
    }
    if (!/[^a-zA-Z0-9]/.test(pwd)) {
      feedback.push('❌ Add special characters (!@#$%^&*)');
    } else {
      feedback.push('✓ Has special characters');
    }

    let strength: PasswordResult['strength'];
    if (score <= 2) strength = 'weak';
    else if (score <= 4) strength = 'fair';
    else if (score <= 5) strength = 'good';
    else strength = 'strong';

    return { score, strength, feedback };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (pwd) {
      setResult(analyzePassword(pwd));
    } else {
      setResult(null);
    }
  };

  const getStrengthColor = (strength: PasswordResult['strength']) => {
    switch (strength) {
      case 'weak': return 'text-xdr-critical';
      case 'fair': return 'text-xdr-medium';
      case 'good': return 'text-xdr-info';
      case 'strong': return 'text-xdr-low';
    }
  };

  const getStrengthBg = (strength: PasswordResult['strength']) => {
    switch (strength) {
      case 'weak': return 'bg-xdr-critical';
      case 'fair': return 'bg-xdr-medium';
      case 'good': return 'bg-xdr-info';
      case 'strong': return 'bg-xdr-low';
    }
  };

  // Sample CTF writeups
  const ctfWriteups = [
    { title: 'SQL Injection Challenge', difficulty: 'Easy', category: 'Web', description: 'Bypassing login with OR 1=1--' },
    { title: 'Buffer Overflow Basics', difficulty: 'Medium', category: 'PWN', description: 'Buffer overflow exploit for shell access' },
    { title: 'RSA Cryptography', difficulty: 'Hard', category: 'Crypto', description: 'Factoring weak RSA keys' },
    { title: 'Steganography Hidden Data', difficulty: 'Easy', category: 'Forensics', description: 'Extracting hidden data from images' },
    { title: 'JWT Token Forge', difficulty: 'Medium', category: 'Web', description: 'JWT authentication bypass' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 px-2 md:px-4 py-4 max-w-6xl mx-auto"
    >
      {/* Hero */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-xdr-critical">Security</span> Lab
        </h1>
        <p className="text-xdr-muted text-lg">
          Interactive security tools, threat visualization, and CTF writeups
        </p>
      </section>

{/* Stacked Layout: Threat Globe → News Display → Password Analyzer */}
      <div className="space-y-6">
        {/* Threat Globe */}
        <section className="glassXDR p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span>🌍</span>
            <span>Live Threat Visualizer</span>
          </h2>
          <ThreatGlobe onHover={setHoveredLocation} />
        </section>

        {/* News Display Panel - shows when hovering globe pointers */}
        <section className="glassXDR p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span>📰</span>
            <span>Threat News</span>
          </h2>
          
          {hoveredLocation ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Location Header */}
              <div className="flex items-center justify-between pb-3 border-b border-xdr-border/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-xdr-critical animate-pulse"></div>
                  <span className="font-semibold text-white">
                    {hoveredLocation.city}, {hoveredLocation.country}
                  </span>
                </div>
                <span className="text-xs text-xdr-muted">Source: cybersecuritynews.com</span>
              </div>
              
              {/* News Items */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {hoveredLocation.news.map((news) => (
                  <a
                    key={news.id}
                    href={news.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg bg-xdr-panel border border-xdr-border hover:border-xdr-critical/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{ 
                          color: getSeverityColor(news.severity),
                          backgroundColor: getSeverityBgColor(news.severity)
                        }}
                      >
                        {news.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-xdr-muted">
                        {news.timestamp}
                      </span>
                    </div>
                    <h4 className="text-white font-medium mb-2">
                      {news.title}
                    </h4>
                    <p className="text-xdr-muted text-sm">
                      {news.description}
                    </p>
                  </a>
                ))}
              </div>
              
              {/* Footer */}
              <div className="pt-3 border-t border-xdr-border/20 flex items-center justify-between text-sm text-xdr-muted">
                <span>{hoveredLocation.news.length} threat{hoveredLocation.news.length > 1 ? 's' : ''} reported</span>
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>cybersecuritynews.com</span>
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-8 text-xdr-muted">
              <p>Hover over the threat globe pointers to view cybersecurity news</p>
              <p className="text-sm mt-2">Drag or scroll to rotate the globe</p>
            </div>
          )}
        </section>

        {/* Password Analyzer */}
        <section className="glassXDR p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span>🔐</span>
            <span>Password Strength Analyzer</span>
          </h2>
          
          <div className="space-y-4">
            <input
              type="text"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter a password to analyze..."
              className="w-full p-3 bg-xdr-panel border border-xdr-border rounded-lg text-xdr-text focus:border-xdr-info focus:outline-none"
            />
            
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {/* Strength indicator */}
                <div className="flex items-center space-x-3">
                  <span className="text-xdr-muted">Strength:</span>
                  <span className={`font-bold ${getStrengthColor(result.strength)}`}>
                    {result.strength.toUpperCase()}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-xdr-panel rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getStrengthBg(result.strength)}`}
                    style={{ width: `${(result.score / 7) * 100}%` }}
                  ></div>
                </div>
                
                {/* Feedback */}
                <ul className="space-y-1 text-sm">
                  {result.feedback.map((fb, index) => (
                    <li key={index} className={fb.startsWith('✓') ? 'text-xdr-low' : 'text-xdr-critical'}>
                      {fb}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            {!result && (
              <p className="text-xdr-muted text-sm">
                Type a password above to check its entropy and strength
              </p>
            )}
          </div>
        </section>
      </div>

      {/* CTF Writeups */}
      <section className="glassXDR p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <span>💻</span>
          <span>CTF Writeups</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ctfWriteups.map((writeup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border border-xdr-border hover:border-xdr-critical/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-xdr-text">{writeup.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  writeup.difficulty === 'Easy' ? 'bg-xdr-low/20 text-xdr-low' :
                  writeup.difficulty === 'Medium' ? 'bg-xdr-medium/20 text-xdr-medium' :
                  'bg-xdr-critical/20 text-xdr-critical'
                }`}>
                  {writeup.difficulty}
                </span>
              </div>
              <p className="text-sm text-xdr-muted">{writeup.description}</p>
              <span className="text-xs text-xdr-info mt-2 inline-block">{writeup.category}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <span className="text-xdr-muted text-sm">More writeups coming soon...</span>
        </div>
      </section>

      {/* Security Resources */}
      <section className="glassXDR p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span>📚</span>
          <span>Security Resources</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#" className="p-4 bg-xdr-panel rounded-lg hover:bg-xdr-panel/80 transition-colors">
            <h3 className="font-semibold text-xdr-info">OWASP Top 10</h3>
            <p className="text-sm text-xdr-muted">Web application security risks</p>
          </a>
          <a href="#" className="p-4 bg-xdr-panel rounded-lg hover:bg-xdr-panel/80 transition-colors">
            <h3 className="font-semibold text-xdr-info">MITRE ATT&CK</h3>
            <p className="text-sm text-xdr-muted">Adversarial tactics and techniques</p>
          </a>
          <a href="#" className="p-4 bg-xdr-panel rounded-lg hover:bg-xdr-panel/80 transition-colors">
            <h3 className="font-semibold text-xdr-info">NIST CSF</h3>
            <p className="text-sm text-xdr-muted">Cybersecurity framework</p>
          </a>
        </div>
      </section>
    </motion.div>
  );
}
