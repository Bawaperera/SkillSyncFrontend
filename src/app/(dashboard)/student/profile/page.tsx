"use client";

import { StudentProfile } from "@/types/profile";
import { ProfileHeader } from "@/components/student/profile/ProfileHeader";
import { ProfileTabs } from "@/components/student/profile/ProfileTabs";

// Mock Data (In a real app, this would come from an API)
const MOCK_PROFILE: StudentProfile = {
    id: "std_123",
    name: "Bawantha Perera",
    title: "Full-Stack Developer",
    location: "Colombo, Sri Lanka",
    avatarUrl: "https://github.com/shadcn.png",
    availability: "looking",
    profileStrength: 65,
    isVerifiedStudent: true,
    socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://bawantha.com",
    },
    skills: [
        { name: "React", level: "Advanced", source: "github", verified: true, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "TypeScript", level: "Advanced", source: "github", verified: true, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Node.js", level: "Intermediate", source: "cv", verified: true, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Docker", level: "Beginner", source: "manual", verified: false, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "MongoDB", level: "Intermediate", source: "cv", verified: true, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Next.js", level: "Advanced", source: "github", verified: true, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    ],
    projects: [
        {
            id: "p1",
            title: "E-commerce Platform",
            description: "A full-stack e-commerce application with payment gateway integration, admin dashboard, and user authentication.",
            techStack: ["React", "Node.js", "MongoDB", "Stripe"],
            dna: { complexity: "High", quality: "A", topLanguage: "TypeScript", topLanguagePercentage: 85 },
            repoUrl: "https://github.com",
            demoUrl: "https://demo.com",
        },
        {
            id: "p2",
            title: "Task Management App",
            description: "Real-time task collaboration tool using WebSockets and Redis for state management.",
            techStack: ["Next.js", "Socket.io", "Redis", "Tailwind"],
            dna: { complexity: "Medium", quality: "B", topLanguage: "JavaScript", topLanguagePercentage: 60 },
            repoUrl: "https://github.com",
        },
    ],
    experience: [
        {
            id: "e1",
            role: "Frontend Developer Intern",
            company: "TechOne Global",
            duration: "Jan 2023 - Jun 2023",
            type: "Internship",
            description: "Collaborated with the UI/UX team to implement responsive designs for the company's main product dashboard. Optimized load times by 40%.",
            skillsUsed: ["React", "Redux", "SASS"],
        },
    ],
    education: [
        {
            id: "edu1",
            institution: "SLIIT",
            degree: "BSc (Hons) in Software Engineering",
            year: "2021 - Present",
            grade: "GPA 3.7",
            modules: ["Data Structures", "Algorithms", "Distrubuted Systems", "Human Computer Interaction"],
        },
    ],
};

export default function StudentProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0B] pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProfileHeader profile={MOCK_PROFILE} />
                <ProfileTabs profile={MOCK_PROFILE} />
            </div>
        </div>
    );
}
