// XDR/SOC Fake Telemetry Data
export interface AlertEvent {
  id: number;
  timestamp: string;
  host: string;
  user: string;
  ip: string;
  event: string;
  mitre: string;
  technique: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
}

export interface XdrStat {
  label: string;
  value: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  trend: number;
}

export const xdrStats: XdrStat[] = [
  { label: "Active Incidents", value: 4, severity: 'HIGH', trend: 2 },
  // { label: "Endpoints Monitored", value: 128, severity: 'LOW', trend: 0 },
  { label: "Threats Blocked", value: 942, severity: 'MEDIUM', trend: -15 },
  { label: "Suspicious IPs", value: 17, severity: 'CRITICAL', trend: 5 },
];

export const mitreTechniques = [
  { id: 'T1055', technique: 'Process Injection', category: 'Execution' },
  { id: 'T1110', technique: 'Brute Force', category: 'Credential Access' },
  { id: 'T1078', technique: 'Valid Accounts', category: 'Defense Evasion' },
  { id: 'T1204', technique: 'User Execution', category: 'Execution' },
];

export const sampleAlerts: AlertEvent[] = [
  {
    id: 1,
    timestamp: '10:32:11',
    host: 'WIN-SRV-02',
    user: 'admin',
    ip: '192.168.1.100',
    event: 'PROCESS INJECTION detected',
    mitre: 'T1055',
    technique: 'Process Injection',
    severity: 'CRITICAL'
  },
  {
    id: 2,
    timestamp: '10:31:45',
    host: 'DB-PROD-01',
    user: 'svc_account',
    ip: '10.0.2.15',
    event: 'Brute force 5 failed logins',
    mitre: 'T1110',
    technique: 'Brute Force',
    severity: 'HIGH'
  },
  {
    id: 3,
    timestamp: '10:30:22',
    host: 'EP-USER-45',
    user: 'jdoe',
    ip: '172.16.0.89',
    event: 'Suspicious PowerShell execution',
    mitre: 'T1059.1',
    technique: 'PowerShell',
    severity: 'MEDIUM'
  },
  {
    id: 4,
    timestamp: '10:29:08',
    host: 'MAIL-SRV-03',
    user: 'system',
    ip: '192.168.5.42',
    event: 'Phishing attachment blocked',
    mitre: 'T1566',
    technique: 'Phishing',
    severity: 'LOW'
  },
];

export const attackTimeline = [
  { time: '10:01', stage: 'Initial Access', event: 'Phishing email opened', severity: 'MEDIUM' },
  { time: '10:05', stage: 'Execution', event: 'Process injection T1055', severity: 'HIGH' },
  { time: '10:09', stage: 'Persistence', event: 'Registry run key modified', severity: 'HIGH' },
  { time: '10:15', stage: 'Exfiltration', event: 'Data staged for upload', severity: 'CRITICAL' },
];
