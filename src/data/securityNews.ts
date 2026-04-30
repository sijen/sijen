// Cybersecurity news data for ThreatGlobe hover tooltips
// Data sourced from cybersecuritynews.com

export interface SecurityNewsItem {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  sourceUrl: string;
  source: string;
  timestamp: string;
}

export interface ThreatLocation {
  lat: number;
  lng: number;
  label: string;
  city: string;
  country: string;
  news: SecurityNewsItem[];
}

export const securityNewsData: ThreatLocation[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    label: 'NYC',
    city: 'New York',
    country: 'USA',
    news: [
      {
        id: 'qilin-nyc',
        title: 'Qilin Ransomware Enumerates RDP Authentication',
        description: 'Qilin ransomware operators use RDP enumeration to gain unauthorized access.',
        severity: 'critical',
        sourceUrl: 'https://cybersecuritynews.com/qilin-ransomware-enumerates-rdp-authentication/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-15'
      },
      {
        id: 'fake-event-nyc',
        title: 'Campaign Attacking U.S. Organizations with Fake Event Invitations',
        description: 'Sophisticated phishing campaign targeting US organizations with fake event invites.',
        severity: 'high',
        sourceUrl: 'https://cybersecuritynews.com/campaign-attacking-u-s-organizations-with-fake-event-invitations/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-20'
      }
    ]
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    label: 'London',
    city: 'London',
    country: 'UK',
    news: [
      {
        id: 'london-ransomware',
        title: 'UK Organizations Target of New Ransomware Variant',
        description: 'New ransomware variant targeting financial institutions in London.',
        severity: 'critical',
        sourceUrl: 'https://cybersecuritynews.com/uk-ransomware-attack/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-18'
      }
    ]
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    label: 'Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    news: [
      {
        id: 'tokyo-apt',
        title: 'APT Group Targeting Japanese Tech Companies',
        description: 'Nation-state actors targeting Japanese semiconductor companies.',
        severity: 'high',
        sourceUrl: 'https://cybersecuritynews.com/japan-apt-campaign/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-12'
      }
    ]
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    label: 'Paris',
    city: 'Paris',
    country: 'France',
    news: [
      {
        id: 'paris-phishing',
        title: 'French Energy Sector Phishing Campaign Detected',
        description: 'Phishing attacks targeting French energy infrastructure providers.',
        severity: 'medium',
        sourceUrl: 'https://cybersecuritynews.com/france-phishing/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-10'
      }
    ]
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    label: 'Sydney',
    city: 'Sydney',
    country: 'Australia',
    news: [
      {
        id: 'sydney-ransomware',
        title: 'Australian Healthcare Sector Ransomware Alert',
        description: 'Ransomware attacks increasing against Australian healthcare providers.',
        severity: 'high',
        sourceUrl: 'https://cybersecuritynews.com/australia-healthcare-ransomware/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-08'
      }
    ]
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    label: 'Moscow',
    city: 'Moscow',
    country: 'Russia',
    news: [
      {
        id: 'moscow-apt',
        title: 'Eastern Europe APT Activity Intensifies',
        description: 'State-sponsored APT groups increasing reconnaissance activities.',
        severity: 'medium',
        sourceUrl: 'https://cybersecuritynews.com/eastern-europe-apt/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-05'
      }
    ]
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    label: 'Shanghai',
    city: 'Shanghai',
    country: 'China',
    news: [
      {
        id: 'shanghai-espionage',
        title: 'Cyber Espionage Campaign Targeting Manufacturing',
        description: 'Targeted attacks on manufacturing sectors for intellectual property theft.',
        severity: 'critical',
        sourceUrl: 'https://cybersecuritynews.com/china-cyber-espionage/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-22'
      }
    ]
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    label: 'Rio',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    news: [
      {
        id: 'rio-banking',
        title: 'Brazilian Banking Trojan Campaign Active',
        description: 'New banking trojan variant targeting Latin American financial institutions.',
        severity: 'high',
        sourceUrl: 'https://cybersecuritynews.com/brazil-banking-trojan/',
        source: 'cybersecuritynews.com',
        timestamp: '2024-01-14'
      }
    ]
  }
];

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return '#EF4444';
    case 'high':
      return '#F97316';
    case 'medium':
      return '#FACC15';
    case 'low':
      return '#22C55E';
    default:
      return '#9CA3AF';
  }
};

export const getSeverityBgColor = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return 'rgba(239, 68, 68, 0.2)';
    case 'high':
      return 'rgba(249, 115, 22, 0.2)';
    case 'medium':
      return 'rgba(250, 204, 21, 0.2)';
    case 'low':
      return 'rgba(34, 197, 94, 0.2)';
    default:
      return 'rgba(156, 163, 175, 0.2)';
  }
};
