// Comprehensive mock data for SkillSync platform

export const SRI_LANKAN_UNIVERSITIES = [
  'University of Colombo',
  'University of Moratuwa',
  'University of Peradeniya',
  'SLIIT',
  'NSBM',
  'IIT',
  'CINEC',
  'APIIT',
  'ICBT',
]

export const SRI_LANKAN_COMPANIES = [
  { id: '1', name: 'TechCorp LK', industry: 'Software Development', size: '50-200' },
  { id: '2', name: 'StartupXYZ', industry: 'FinTech', size: '10-50' },
  { id: '3', name: 'Enterprise Solutions', industry: 'Enterprise Software', size: '200-500' },
  { id: '4', name: 'Digital Innovations', industry: 'Digital Marketing', size: '50-200' },
  { id: '5', name: 'CloudTech Lanka', industry: 'Cloud Services', size: '10-50' },
  { id: '6', name: 'DataSys Solutions', industry: 'Data Analytics', size: '50-200' },
  { id: '7', name: 'MobileFirst Lanka', industry: 'Mobile Development', size: '10-50' },
  { id: '8', name: 'AI Ventures', industry: 'Artificial Intelligence', size: '50-200' },
]

export const SKILLS = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'Go', 'Rust', 'PHP', 'Ruby',
  // Frontend
  'React', 'Vue.js', 'Angular', 'Next.js', 'Svelte', 'HTML', 'CSS', 'Tailwind CSS', 'SASS',
  // Backend
  'Node.js', 'Express', 'NestJS', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel',
  // Databases
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle',
  // Cloud & DevOps
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Jenkins',
  // Mobile
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic',
  // Other
  'GraphQL', 'REST API', 'Microservices', 'Agile', 'Scrum', 'Machine Learning', 'Data Science',
]

export const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp LK',
    companyId: '1',
    location: 'Colombo',
    type: 'Full-time',
    experience: '3-5 years',
    salary: { min: 200000, max: 300000 },
    postedDate: '2024-01-15',
    description: 'We are looking for an experienced full-stack developer to join our growing team.',
    responsibilities: [
      'Develop and maintain web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Participate in code reviews',
    ],
    requirements: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    preferred: ['AWS', 'Docker'],
    applications: 24,
    views: 156,
  },
  {
    id: '2',
    title: 'Frontend Engineer',
    company: 'StartupXYZ',
    companyId: '2',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-4 years',
    salary: { min: 150000, max: 250000 },
    postedDate: '2024-01-14',
    description: 'Join our innovative team building the next generation of fintech products.',
    responsibilities: [
      'Build responsive user interfaces',
      'Optimize application performance',
      'Work with design team',
    ],
    requirements: ['React', 'TypeScript', 'Tailwind CSS'],
    preferred: ['Next.js', 'GraphQL'],
    applications: 18,
    views: 98,
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'Enterprise Solutions',
    companyId: '3',
    location: 'Kandy',
    type: 'Full-time',
    experience: '2-5 years',
    salary: { min: 180000, max: 280000 },
    postedDate: '2024-01-13',
    description: 'Looking for a backend developer to work on enterprise-level applications.',
    requirements: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
    preferred: ['Docker', 'Kubernetes'],
    applications: 32,
    views: 201,
  },
]

export const MOCK_STUDENTS = [
  {
    id: 'student-1',
    name: 'Sarah Perera',
    email: 'sarah.perera@example.com',
    university: 'University of Colombo',
    degree: 'BSc Computer Science',
    graduationYear: 2024,
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    githubConnected: true,
    githubUsername: 'sarahperera',
    profileCompleteness: 92,
  },
  {
    id: 'student-2',
    name: 'Kamal Silva',
    email: 'kamal.silva@example.com',
    university: 'University of Moratuwa',
    degree: 'BSc IT',
    graduationYear: 2024,
    skills: ['React', 'Vue.js', 'Python', 'MongoDB'],
    githubConnected: false,
    profileCompleteness: 75,
  },
]

export const MOCK_CANDIDATES = [
  {
    id: 'candidate-1',
    name: 'Sarah Perera',
    title: 'Senior Full-Stack Developer',
    experience: '5 years',
    education: 'BSc Computer Science, University of Colombo',
    appliedDate: '2024-01-15',
    match: 92,
    status: 'Screening',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    avatar: 'SP',
    matchExplanation: 'Strong alignment in full-stack development. Candidate\'s React and TypeScript experience matches requirements perfectly. Strong project portfolio and GitHub activity.',
  },
  {
    id: 'candidate-2',
    name: 'Kamal Silva',
    title: 'Frontend Engineer',
    experience: '3 years',
    education: 'BSc IT, University of Moratuwa',
    appliedDate: '2024-01-14',
    match: 88,
    status: 'Interview',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    avatar: 'KS',
    matchExplanation: 'Excellent frontend skills with modern frameworks. Strong portfolio showcasing responsive design work.',
  },
  {
    id: 'candidate-3',
    name: 'Nimal Fernando',
    title: 'Backend Developer',
    experience: '4 years',
    education: 'BSc Software Engineering, SLIIT',
    appliedDate: '2024-01-13',
    match: 85,
    status: 'Screening',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    avatar: 'NF',
    matchExplanation: 'Solid backend experience with required technologies. Good understanding of database design and API development.',
  },
  {
    id: 'candidate-4',
    name: 'Priya Wijesinghe',
    title: 'Full-Stack Developer',
    experience: '2 years',
    education: 'BSc CS, University of Peradeniya',
    appliedDate: '2024-01-12',
    match: 90,
    status: 'New',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    avatar: 'PW',
    matchExplanation: 'Rising talent with strong fundamentals. Recent projects demonstrate excellent problem-solving skills.',
  },
]
