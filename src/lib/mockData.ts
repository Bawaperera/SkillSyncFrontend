import { LucideIcon, Code, Database, Layout, Server, Brain, Briefcase, FileText, User, Home, MessageSquare, Settings, LogOut, Search, Bell } from 'lucide-react';

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Cloud' | 'Mobile' | 'AI/ML' | 'Soft Skills';
  level: number; // 0-100
  verified: boolean;
  icon?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  matchScore: number;
  featured: boolean;
  postedAt: string;
  logo: string;
  requiredSkills: string[];
  missingSkills: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
  appliedAt: string;
  lastUpdate: string;
  feeback?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  university: string;
  degree: string;
  graduationYear: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
  avatar: string;
  skillScore: number;
  verifiedSkillsCount: number;
  skills: Skill[];
}

export const CURRENT_STUDENT: StudentProfile = {
  id: 'st_12345',
  name: 'Bawantha Perera',
  university: 'University of Colombo School of Computing',
  degree: 'BSc in Computer Science',
  graduationYear: '2025',
  email: 'bawantha.p@example.com',
  github: 'github.com/bawanthap',
  linkedin: 'linkedin.com/in/bawanthap',
  bio: 'Aspiring Full Stack Developer with a passion for building clean, user-centric web applications. Currently focusing on React and Cloud technologies.',
  avatar: 'https://ui-avatars.com/api/?name=Bawantha+Perera&background=3B82F6&color=fff',
  skillScore: 78,
  verifiedSkillsCount: 12,
  skills: [
    { id: '1', name: 'React', category: 'Frontend', level: 85, verified: true },
    { id: '2', name: 'TypeScript', category: 'Frontend', level: 80, verified: true },
    { id: '3', name: 'Node.js', category: 'Backend', level: 75, verified: true },
    { id: '4', name: 'Python', category: 'Backend', level: 90, verified: true },
    { id: '5', name: 'Java', category: 'Backend', level: 70, verified: false },
    { id: '6', name: 'SQL', category: 'Database', level: 85, verified: true },
    { id: '7', name: 'Git', category: 'DevOps', level: 95, verified: true },
    { id: '8', name: 'Docker', category: 'DevOps', level: 40, verified: false },
  ]
};

export const RECOMMENDED_JOBS: Job[] = [
  {
    id: 'job_1',
    title: 'Associate Software Engineer',
    company: 'Virtusa',
    location: 'Colombo, Sri Lanka',
    salaryRange: 'LKR 150k - 250k',
    type: 'Full-time',
    matchScore: 92,
    featured: true,
    postedAt: '2 days ago',
    logo: 'https://ui-avatars.com/api/?name=Virtusa&background=ff9900&color=fff',
    requiredSkills: ['React', 'Node.js', 'AWS', 'MongoDB'],
    missingSkills: ['AWS']
  },
  {
    id: 'job_2',
    title: 'Frontend Developer Intern',
    company: 'IFS',
    location: 'Colombo 03',
    salaryRange: 'LKR 45k - 60k',
    type: 'Internship',
    matchScore: 98,
    featured: false,
    postedAt: '1 day ago',
    logo: 'https://ui-avatars.com/api/?name=IFS&background=800080&color=fff',
    requiredSkills: ['React', 'TypeScript', 'HTML/CSS'],
    missingSkills: []
  },
  {
    id: 'job_3',
    title: 'Trainee Full Stack Developer',
    company: 'Sysco LABS',
    location: 'Colombo 07',
    salaryRange: 'LKR 100k - 150k',
    type: 'Full-time',
    matchScore: 75,
    featured: true,
    postedAt: '5 hours ago',
    logo: 'https://ui-avatars.com/api/?name=Sysco+LABS&background=000&color=fff',
    requiredSkills: ['Java', 'Spring Boot', 'Angular', 'AWS'],
    missingSkills: ['Spring Boot', 'Angular', 'AWS']
  },
  {
    id: 'job_4',
    title: 'Software Engineer (Python)',
    company: 'WSO2',
    location: 'Colombo 04',
    salaryRange: 'LKR 200k - 350k',
    type: 'Full-time',
    matchScore: 88,
    featured: false,
    postedAt: '3 days ago',
    logo: 'https://ui-avatars.com/api/?name=WSO2&background=ff4f00&color=fff',
    requiredSkills: ['Python', 'Django', 'REST APIs', 'Cloud'],
    missingSkills: ['Django']
  }
];

export const RECENT_APPLICATIONS: Application[] = [
  {
    id: 'app_1',
    jobId: 'job_101',
    jobTitle: 'Junior Developer',
    company: 'Creative Software',
    status: 'Interview',
    appliedAt: '2023-10-15',
    lastUpdate: '2023-10-20',
    feeback: 'Technical interview scheduled for next Tuesday.'
  },
  {
    id: 'app_2',
    jobId: 'job_102',
    jobTitle: 'React Developer',
    company: '99x',
    status: 'Applied',
    appliedAt: '2023-10-18',
    lastUpdate: '2023-10-18'
  },
  {
    id: 'app_3',
    jobId: 'job_103',
    jobTitle: 'Intern SE',
    company: 'Pearson',
    status: 'Rejected',
    appliedAt: '2023-10-01',
    lastUpdate: '2023-10-10',
    feeback: 'Missing detailed knowledge of CI/CD pipelines.'
  }
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New Job Match', message: 'Virtusa posted a job that matches 92% of your profile.', time: '2h ago', read: false },
  { id: 2, title: 'Application Update', message: 'Creative Software viewed your application.', time: '5h ago', read: false },
  { id: 3, title: 'Skill Verified', message: 'Your "React" skill has been verified via GitHub analysis.', time: '1d ago', read: true },
];
