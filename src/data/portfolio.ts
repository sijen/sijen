// Personal Portfolio Data for Sijen
export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  logo?: string; // Assume images added to public/
}

export interface LeoRole {
  title: string;
  duration: string;
  club: string;
  responsibilities: string;
  achievements: string[];
  images?: string[];
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  type: 'Leo' | 'Work' | 'Volunteer';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

// Bio
export const bio = `Security Analyst with hands-on experience in monitoring, threat detection, and incident response across modern security environments. I work with tools like Microsoft Sentinel, Microsoft Defender, Cybereason, Fortinet, and Cisco Umbrella, along with various OSINT tools to investigate and respond to potential threats effectively.

I enjoy turning security data into meaningful insights and taking a proactive approach to protecting systems and users. Beyond cybersecurity, I'm passionate about community service and actively involved in volunteer work, believing that creating impact goes beyond just the digital space.

Always learning, always improving—both as a security professional and as someone committed to giving back.`;

export const workExperience: WorkExperience[] = [
  {
    company: 'Stellar Computer Systems (SCS)',
    role: 'Security Analyst',
    duration: 'Dec 2023 - Present · 2 yrs 5 mos',
    location: 'Lalitpur District, Nepal · Hybrid',
    description: 'Full-time security monitoring and incident response.',
  },
  {
    company: 'ChimpVine',
    role: 'Web Content Writer',
    duration: 'Nov 2022 - Jun 2023 · 8 mos',
    location: 'Kathmandu, Bāgmatī, Nepal',
    description: 'Full-time content creation.',
  },
  {
    company: 'Easy Software',
    role: 'Frontend Web Developer',
    duration: 'Jul 2022 - Oct 2022 · 4 mos',
    location: '',
    description: 'Internship in HTML5, Web Development, Front-End.',
  },
];

export const leoRoles: LeoRole[] = [
  {
    title: 'President',
    duration: 'Jul 2025 - Present · 10 mos',
    club: 'Leo Club of Kathmandu Budigandaki',
    responsibilities: 'Leading the club in social services.',
    achievements: ['Elected as President', 'Team group photo'],
    images: ['Nomination.jpg', 'Elected as a President.jpg', 'Group Photo with all my team.jpg'],
  },
  {
    title: '1st Vice President',
    duration: 'Jul 2024 - Jun 2025 · 1 yr',
    club: 'Leo Club of Kathmandu Budigandaki',
    responsibilities: '',
    achievements: ['Raised fund for annual charity for remote places, contributed to Leo District 325 J Nepal for Lead with Smile Camp.'],
  },
  {
    title: 'Secretary',
    duration: 'Jul 2023 - Jul 2024 · 1 yr 1 mo',
    club: 'Leo Club of Kathmandu Budigandaki',
    responsibilities: '- Scheduled and coordinated meetings. - Maintained records of officers and kept attendance. - Managed service activities and supported the Club President.',
    achievements: [
      'Coordinated a successful Blood Donation Program on August 6, 2022.',
      'Led IT efforts for the 2nd Leo District Council 325 J Nepal Meeting and Award Ceremony on January 13, 2024.',
      'Served as IT Head for the Club Officers Schooling Program on July 22, 2023.',
      'Hosted Deusi Bhailo Program (Tihar Celebration).',
      'Volunteered Winter Carnival Event.',
    ],
    images: ['Blood Donation.jpg', 'Receiving token of love for volunteering in the program.', 'Tihar Celebration.jpg', 'Hosted Deusi Bhailo Program', 'Volunteered Winter Carnival Event.jpg'],
  },
  {
    title: 'General Member Board',
    duration: 'Jun 2022 - Present · 3 yrs 11 mos',
    club: 'Leo Club of Kathmandu Budigandaki',
    responsibilities: '',
    achievements: [],
  },
];

export const volunteerExperience = [
  {
    role: 'Student Volunteer',
    org: 'Asian Hack 2019',
    duration: 'Sep 2018 · 1 mo',
    description: 'Short time volunteer for asian hack event at asian school of management venue.',
  },
];

// Stats for dashboard (like xdrStats)
export const portfolioStats = [
  { label: 'Leo Roles Held', value: 4, trend: 1 },
  { label: 'Charity Events', value: 5, trend: 2 },
  { label: 'Work Experience', value: 3, trend: 0 },
  { label: 'Volunteer Hours', value: 500, trend: 50 }, // Estimate
];

// Timeline for Leo journey/experience (like attackTimeline)
export const experienceTimeline = [
  { time: '2025', stage: 'Leadership', event: 'President @ Leo Club', type: 'leo' },
  { time: '2024', stage: 'Vice President', event: 'Fundraising for Lead with Smile Camp', type: 'leo' },
  { time: '2023', stage: 'Secretary', event: 'Blood Donation & IT Lead for District Council', type: 'leo' },
  { time: '2023', stage: 'Professional', event: 'Security Analyst @ SCS', type: 'work' },
  { time: '2022', stage: 'Content', event: 'Web Content Writer @ ChimpVine', type: 'work' },
];

// Sample projects/achievements (expand later)
export const recentProjects = [
  {
    name: 'Personal Portfolio',
    description: 'React + Tailwind XDR-themed dashboard converted to portfolio.',
    technologies: ['React', 'Vite', 'TailwindCSS'],
  },
  // Add more from user
];

// CV download link (placeholder)
export const cvLink = '/cv.pdf'; // Add CV to public/

