"use client";

import { useState } from "react";
import { GapCard } from "./GapCard";
import { JobDrawer } from "./JobDrawer";
import { TrustBadge } from "@/components/student/profile/TrustBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SkillGap, JobMatch } from "@/types/analysis";
import { ArrowRight, PlayCircle, BookOpen } from "lucide-react";

const TABS = ["Overview", "Skill Gaps", "Job Matches", "Recommendations"];

// Mock Data
const CRITICAL_GAPS: SkillGap[] = [
    { id: "1", name: "Docker & Containers", category: "DevOps", priority: "Critical", impact: "Appears in 78% of your target jobs. Mastery ensures you pass the ATS filter.", missingPercent: 40 },
    { id: "2", name: "AWS Cloud Basics", category: "Cloud", priority: "High", impact: "Increases average salary potential by ~20% for Full-Stack roles.", missingPercent: 35 },
];

const MATCHED_JOBS: JobMatch[] = [
    { id: "j1", title: "Junior Full Stack Engineer", company: "TechCorp", matchScore: 85, salary: "LKR 180k", description: "Looking for a developer proficient in React, Node.js, and Cloud basics..." },
    { id: "j2", title: "React Developer", company: "Creative Solutions", matchScore: 92, salary: "LKR 150k", description: "Join our creative team to build stunning UI experiences..." },
    { id: "j3", title: "Software Engineer Intern", company: "Cinnamon Digital", matchScore: 78, salary: "LKR 65k", description: "Great opportunity for undergraduates to learn enterprise development..." },
];

export function AnalysisTabs() {
    const [activeTab, setActiveTab] = useState("Skill Gaps");
    const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);

    return (
        <div className="mt-8">
            {/* Tab Nav */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                            ? "bg-white text-black shadow-lg shadow-white/10"
                            : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === "Overview" && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-white mb-4">Verified Skills (High Confidence)</h3>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                                    <span className="font-medium text-white text-sm">React</span>
                                    <TrustBadge type="github_verified" className="!text-[10px] !py-0.5" />
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                                    <span className="font-medium text-white text-sm">TypeScript</span>
                                    <TrustBadge type="github_verified" className="!text-[10px] !py-0.5" />
                                </div>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-gray-300 mb-4">Self-Reported (Medium Confidence)</h3>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 opacity-75">
                                    <span className="font-medium text-gray-300 text-sm">Node.js</span>
                                    <TrustBadge type="self_reported" className="!text-[10px] !py-0.5" />
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 opacity-75">
                                    <span className="font-medium text-gray-300 text-sm">Python</span>
                                    <TrustBadge type="self_reported" className="!text-[10px] !py-0.5" />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                )}

                {activeTab === "Skill Gaps" && (
                    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
                        {CRITICAL_GAPS.map(gap => (
                            <GapCard key={gap.id} gap={gap} />
                        ))}
                    </div>
                )}

                {activeTab === "Job Matches" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        {MATCHED_JOBS.map(job => (
                            <div key={job.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                                        🏢
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h4>
                                        <p className="text-sm text-gray-400">{job.company} • <span className="text-green-400">{job.matchScore}% Match</span></p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(job)}
                                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors"
                                >
                                    Quick View
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Recommendations" && (
                    <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
                        <GlassCard className="p-0 overflow-hidden group hover:border-blue-500/50 transition-colors cursor-pointer">
                            <div className="h-32 bg-blue-900/20 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={40} className="text-white/80 group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block">Available Course</span>
                                <h4 className="font-bold text-white mb-2">Docker for Beginners</h4>
                                <p className="text-xs text-gray-400 mb-4">Master containers in 3 hours.</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Duration: 3h 15m</span>
                                    <span>Udemy</span>
                                </div>
                            </div>
                        </GlassCard>

                        <div className="md:col-span-3 flex justify-center mt-8">
                            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:scale-105 flex items-center gap-2">
                                View Full Learning Roadmap <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <JobDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
    );
}
