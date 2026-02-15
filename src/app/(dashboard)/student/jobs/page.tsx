"use client";

import { JobCard } from "@/components/student/jobs/JobCard";
import { JobFilters } from "@/components/student/jobs/JobFilters";
import { JobPosting, JobMatchAndAnalysis } from "@/types/jobs";

// Mock Data
const MOCK_JOBS: JobPosting[] = [
    {
        id: "1",
        title: "Full Stack Developer",
        company: "TechCorp",
        location: "Colombo, Sri Lanka",
        type: "Full-time",
        postedAt: "2h ago",
        salaryRange: "LKR 150k - 250k",
        description: "",
        responsibilities: [],
        requirements: [],
        benefits: []
    },
    {
        id: "2",
        title: "Frontend Engineer",
        company: "Creative Solutions",
        location: "Remote",
        type: "Contract",
        postedAt: "5h ago",
        salaryRange: "LKR 100k - 180k",
        description: "",
        responsibilities: [],
        requirements: [],
        benefits: []
    },
    {
        id: "3",
        title: "Backend Developer",
        company: "FinTech Global",
        location: "Kandy (Hybrid)",
        type: "Full-time",
        postedAt: "1d ago",
        salaryRange: "LKR 200k - 300k",
        description: "",
        responsibilities: [],
        requirements: [],
        benefits: []
    },
    {
        id: "4",
        title: "DevOps Engineer",
        company: "Cloud Systems",
        location: "Remote",
        type: "Full-time",
        postedAt: "2d ago",
        salaryRange: "LKR 250k - 400k",
        description: "",
        responsibilities: [],
        requirements: [],
        benefits: []
    }
];

const MOCK_MATCHES: Record<string, JobMatchAndAnalysis> = {
    "1": { matchScore: 92, strengths: [], gaps: [], analysisText: "" },
    "2": { matchScore: 85, strengths: [], gaps: [], analysisText: "" },
    "3": { matchScore: 78, strengths: [], gaps: [], analysisText: "" },
    "4": { matchScore: 45, strengths: [], gaps: [], analysisText: "" },
};

export default function JobsPage() {
    return (
        <div className="min-h-screen pb-20 bg-[#F5F7FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Role</h1>
                        <p className="text-gray-500">Based on your profile, we found <span className="text-blue-600 font-bold">12</span> highly matched jobs.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sidebar Filters */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24">
                            <JobFilters />
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="lg:col-span-9 space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            {MOCK_JOBS.map(job => (
                                <JobCard key={job.id} job={job} match={MOCK_MATCHES[job.id]} />
                            ))}
                        </div>

                        <button className="w-full py-4 rounded-xl bg-white hover:bg-gray-50 text-gray-600 font-bold border border-gray-200 transition-colors shadow-sm">
                            Load More Jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
