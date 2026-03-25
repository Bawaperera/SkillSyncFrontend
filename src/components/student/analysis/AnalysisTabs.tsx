"use client";

import { useState } from "react";
import { GapCard } from "./GapCard";
import { JobDrawer } from "./JobDrawer";
import { TrustBadge } from "@/components/student/profile/TrustBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SkillGap, JobMatch } from "@/types/analysis";
import { ArrowRight, PlayCircle, BookOpen } from "lucide-react";
import { useApi } from "@/lib/hooks/useApi";
import { getSkillGaps, getJobMatches } from "@/lib/api/student-api";

const TABS = ["Overview", "Skill Gaps", "Job Matches", "Recommendations"];

export function AnalysisTabs() {
    const [activeTab, setActiveTab] = useState("Skill Gaps");
    const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);

    const { data: gapsData } = useApi<SkillGap[]>(() => getSkillGaps());
    const { data: jobsData } = useApi<JobMatch[]>(() => getJobMatches());
    const CRITICAL_GAPS = gapsData ?? [];
    const MATCHED_JOBS = jobsData ?? [];

    return (
        <div className="mt-8">
            {/* Tab Nav */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
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
                        <GlassCard className="p-6 bg-white border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4">Verified Skills (High Confidence)</h3>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 p-2 rounded bg-green-50 border border-green-100">
                                    <span className="font-medium text-green-700 text-sm">React</span>
                                    <TrustBadge type="github_verified" className="!text-[10px] !py-0.5" />
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded bg-green-50 border border-green-100">
                                    <span className="font-medium text-green-700 text-sm">TypeScript</span>
                                    <TrustBadge type="github_verified" className="!text-[10px] !py-0.5" />
                                </div>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-6 bg-white border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4">Self-Reported (Medium Confidence)</h3>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                    <span className="font-medium text-gray-600 text-sm">Node.js</span>
                                    <TrustBadge type="self_reported" className="!text-[10px] !py-0.5" />
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                    <span className="font-medium text-gray-600 text-sm">Python</span>
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
                            <div key={job.id} className="p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                                        🏢
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                                        <p className="text-sm text-gray-500">{job.company} • <span className="text-green-600">{job.matchScore}% Match</span></p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(job)}
                                    className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-sm font-medium text-blue-600 transition-colors"
                                >
                                    Quick View
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Recommendations" && (
                    <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
                        <GlassCard className="p-0 overflow-hidden group hover:border-blue-400 transition-colors cursor-pointer bg-white border-gray-200">
                            <div className="h-32 bg-blue-50 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={40} className="text-blue-600 group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">Available Course</span>
                                <h4 className="font-bold text-gray-900 mb-2">Docker for Beginners</h4>
                                <p className="text-xs text-gray-500 mb-4">Master containers in 3 hours.</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Duration: 3h 15m</span>
                                    <span>Udemy</span>
                                </div>
                            </div>
                        </GlassCard>

                        <div className="md:col-span-3 flex justify-center mt-8">
                            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:scale-105 flex items-center gap-2">
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
