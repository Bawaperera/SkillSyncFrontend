"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { RECOMMENDED_JOBS } from "@/lib/mockData";
import { Search, MapPin, DollarSign, Clock, Building2, CheckCircle, XCircle, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function JobsPage() {
    const [selectedJob, setSelectedJob] = useState(RECOMMENDED_JOBS[0]);
    const [activeTab, setActiveTab] = useState<'recommended' | 'saved'>('recommended');

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Find Your Next Role</h1>
                <div className="w-96">
                    <GlassInput
                        placeholder="Search by role, skill, or company..."
                        icon={<Search className="w-4 h-4" />}
                    />
                </div>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-12 gap-6">
                {/* Job List (Left) */}
                <div className="col-span-4 flex flex-col min-h-0">
                    <GlassCard className="flex-1 flex flex-col min-h-0 p-0 overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex gap-4">
                            <button
                                onClick={() => setActiveTab('recommended')}
                                className={cn(
                                    "text-sm font-medium pb-2 border-b-2 transition-colors",
                                    activeTab === 'recommended' ? "text-blue-400 border-blue-400" : "text-gray-400 border-transparent"
                                )}
                            >
                                Recommended (12)
                            </button>
                            <button
                                onClick={() => setActiveTab('saved')}
                                className={cn(
                                    "text-sm font-medium pb-2 border-b-2 transition-colors",
                                    activeTab === 'saved' ? "text-blue-400 border-blue-400" : "text-gray-400 border-transparent"
                                )}
                            >
                                Saved (4)
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {RECOMMENDED_JOBS.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/5",
                                        selectedJob.id === job.id
                                            ? "bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10"
                                            : "bg-white/5 border-white/10"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white line-clamp-1">{job.title}</h3>
                                        <span className={cn(
                                            "text-xs font-bold px-2 py-0.5 rounded",
                                            job.matchScore >= 90 ? "bg-green-500/20 text-green-400" :
                                                job.matchScore >= 75 ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"
                                        )}>
                                            {job.matchScore}% Match
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2">{job.company}</p>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                                        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salaryRange.split(' ')[1]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* Job Detail (Right) */}
                <div className="col-span-8 flex flex-col min-h-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedJob.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <GlassCard className="h-full flex flex-col overflow-y-auto relative">
                                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-white/10 -z-0" />

                                <div className="relative z-10 pt-16 px-8 pb-8">
                                    <div className="flex items-start gap-6 mb-8">
                                        <div className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl font-bold text-gray-800 overflow-hidden">
                                            {/* Mock Logo */}
                                            <div style={{ backgroundColor: selectedJob.logo.includes('Virtusa') ? '#ff9900' : '#333', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                                {selectedJob.company.substring(0, 2)}
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-6 text-white">
                                            <h2 className="text-3xl font-bold mb-1">{selectedJob.title}</h2>
                                            <div className="flex items-center gap-4 text-gray-300">
                                                <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {selectedJob.company}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedJob.location}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedJob.postedAt}</span>
                                            </div>
                                        </div>
                                        <div className="pt-6 flex gap-2">
                                            <GlassButton variant="ghost" className="p-3 rounded-full hover:bg-white/10"><Share2 className="w-5 h-5" /></GlassButton>
                                            <GlassButton variant="ghost" className="p-3 rounded-full hover:bg-white/10"><Bookmark className="w-5 h-5" /></GlassButton>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6 mb-8">
                                        <div className="col-span-2 space-y-6">
                                            <GlassCard className="bg-white/5 border-none">
                                                <h3 className="font-bold mb-4">Job Description</h3>
                                                <p className="text-gray-300 leading-relaxed text-sm">
                                                    We are looking for a {selectedJob.title} to join our dynamic team at {selectedJob.company}.
                                                    You will be working on cutting-edge technologies to build scalable solutions.
                                                    The ideal candidate is passionate about code quality and user experience.
                                                </p>
                                            </GlassCard>

                                            <GlassCard className="bg-white/5 border-none">
                                                <h3 className="font-bold mb-4">Why you&apos;re a match: {selectedJob.matchScore}%</h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="mt-1 bg-green-500/20 text-green-400 p-1 rounded-full"><CheckCircle className="w-4 h-4" /></div>
                                                        <div>
                                                            <p className="text-sm font-bold text-white">Strong Skills Identified</p>
                                                            <p className="text-xs text-gray-400">Your experience with {selectedJob.requiredSkills.join(', ')} aligns perfectly.</p>
                                                        </div>
                                                    </div>
                                                    {selectedJob.missingSkills.length > 0 && (
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-1 bg-red-500/20 text-red-400 p-1 rounded-full"><XCircle className="w-4 h-4" /></div>
                                                            <div>
                                                                <p className="text-sm font-bold text-white">Missing Critical Skills</p>
                                                                <p className="text-xs text-gray-400">You need to learn {selectedJob.missingSkills.join(', ')} to increase your chances.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </GlassCard>
                                        </div>

                                        <div className="col-span-1 space-y-4">
                                            <GlassCard className="bg-blue-600/20 border-blue-500/30 text-center">
                                                <p className="text-sm text-gray-300 mb-1">Salary Estimate</p>
                                                <p className="text-xl font-bold text-white">{selectedJob.salaryRange}</p>
                                            </GlassCard>

                                            <div className="h-px bg-white/10 my-4" />

                                            <h4 className="font-bold text-sm mb-2">Detailed Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedJob.requiredSkills.map(skill => (
                                                    <span key={skill} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sticky bottom-0 bg-[#020617] p-4 -mx-8 -mb-8 border-t border-white/10 flex justify-between items-center z-20">
                                        <div>
                                            <p className="text-xs text-gray-400">Application deadline: Oct 31, 2023</p>
                                        </div>
                                        <GlassButton variant="primary" size="lg" className="px-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                                            Easy Apply
                                        </GlassButton>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
