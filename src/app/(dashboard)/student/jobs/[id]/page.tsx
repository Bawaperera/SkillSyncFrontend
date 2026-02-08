"use client";

import { JobDescription } from "@/components/student/jobs/JobDescription";
import { JobActionPanel } from "@/components/student/jobs/JobActionPanel";
import { MobileStickyBar } from "@/components/student/jobs/MobileStickyBar";
import { JobPosting, JobMatchAndAnalysis } from "@/types/jobs";
import { ArrowLeft, Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Mock Data for a single job
const JOB: JobPosting = {
    id: "1",
    title: "Full Stack Developer",
    company: "TechCorp",
    logo: "https://media.licdn.com/dms/image/C4D0BAQHiNSL4Or29cg/company-logo_200_200/0/1630546059871?e=2147483647&v=beta&t=0uV7X3Qe0a3q2m_1z6k3l7o5r9p8s4v2x6z9", // Placeholder
    location: "Colombo, Sri Lanka (Hybrid)",
    type: "Full-time",
    postedAt: "2 hours ago",
    salaryRange: "LKR 150,000 - 250,000 / month",
    description: "", // handled in component
    responsibilities: [
        "Build and maintain scalable web applications using React.js and Node.js.",
        "Collaborate with cross-functional teams to define, design, and ship new features.",
        "Optimize applications for maximum speed and scalability.",
        "Participate in code reviews and maintain code quality standards."
    ],
    requirements: [
        "BSc in Computer Science or related field.",
        "2+ years of experience in Full Stack Development.",
        "Strong proficiency in JavaScript, TypeScript, and modern frameworks.",
        "Experience with RESTful APIs and database design (SQL/NoSQL)."
    ],
    benefits: [
        "Competitive Salary (LKR 150k+)",
        "Health Insurance Coverage",
        "Remote/Hybrid Work Options",
        "Annual Performance Bonus",
        "Professional Development Budget"
    ]
};

const MATCH: JobMatchAndAnalysis = {
    matchScore: 92,
    strengths: [
        { id: "1", name: "React", verified: true },
        { id: "2", name: "Node.js", verified: true },
        { id: "3", name: "TypeScript", verified: true },
        { id: "4", name: "SQL", verified: false },
        { id: "5", name: "REST APIs", verified: true },
    ],
    gaps: [
        { id: "1", name: "Docker" },
        { id: "2", name: "AWS" },
        { id: "3", name: "CI/CD" },
    ],
    analysisText: "You are a strong candidate for this role. Your experience with React and Node.js aligns perfectly. Learning Docker would make you an ideal match."
};

export default function JobDetailsPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen pb-24 md:pb-10">
            {/* Top Nav (Breadcrumb style) */}
            <div className="bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/student/jobs" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium">Back to Search</span>
                    </Link>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Info */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-bold text-white">
                            {JOB.company.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{JOB.title}</h1>
                            <p className="text-gray-400 text-sm md:text-base">
                                {JOB.company} • {JOB.location} • <span className="text-gray-500">{JOB.postedAt}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium">
                            {JOB.type}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-medium">
                            {JOB.salaryRange}
                        </span>
                    </div>
                </div>

                {/* Split Screen Layout */}
                <div className="grid lg:grid-cols-12 gap-8 relative items-start">
                    {/* Left Column: Description (Scrolls) */}
                    <div className="lg:col-span-8">
                        <JobDescription job={JOB} />
                    </div>

                    {/* Right Column: Sticky Action Panel */}
                    <div className="hidden lg:block lg:col-span-4 sticky top-24">
                        <JobActionPanel match={MATCH} />
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bar */}
            <div className="lg:hidden">
                <MobileStickyBar />
            </div>
        </div>
    );
}
