"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { RECENT_APPLICATIONS } from "@/lib/mockData";
import { CheckCircle, Clock, XCircle, Briefcase, ChevronRight, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

const STAGES = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

export default function ApplicationsPage() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Applications</h1>
                <p className="text-gray-400">Track your progress and get AI feedback.</p>
            </div>

            <div className="space-y-6">
                {RECENT_APPLICATIONS.map((app, index) => {
                    const currentStageIndex = STAGES.indexOf(app.status);
                    const isRejected = app.status === 'Rejected';

                    return (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="p-6 relative overflow-hidden">
                                {isRejected && (
                                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                        <XCircle className="w-32 h-32 text-red-500" />
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xl">
                                            {app.company.substring(0, 2)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{app.jobTitle}</h3>
                                            <p className="text-gray-400 flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" /> {app.company}
                                                <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10">ID: {app.jobId}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex gap-3">
                                        <GlassButton variant="ghost" size="sm" className="bg-white/5">View Job</GlassButton>
                                        <GlassButton variant="secondary" size="sm"><MessageSquare className="w-4 h-4 mr-2" /> Message</GlassButton>
                                    </div>
                                </div>

                                {/* Stepper */}
                                <div className="relative mb-8 px-4">
                                    {/* Progress Bar Background */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0 hidden md:block" />

                                    {/* Progress Bar Fill */}
                                    <div
                                        className={cn(
                                            "absolute top-1/2 left-0 h-1 -translate-y-1/2 z-0 transition-all duration-1000 hidden md:block",
                                            isRejected ? "bg-red-500/50" : "bg-blue-500"
                                        )}
                                        style={{ width: `${(Math.min(currentStageIndex, STAGES.length - 2) / (STAGES.length - 1)) * 100}%` }}
                                    />

                                    <div className="flex flex-col md:flex-row justify-between relative z-10 gap-4 md:gap-0">
                                        {STAGES.filter(s => s !== 'Rejected').map((stage, idx) => {
                                            const isCompleted = idx < currentStageIndex;
                                            const isCurrent = idx === currentStageIndex;

                                            return (
                                                <div key={stage} className="flex md:flex-col items-center gap-3 md:gap-2">
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                                                        isRejected && currentStageIndex === STAGES.indexOf('Rejected') && idx === currentStageIndex ? "bg-red-500 border-red-500 text-white" :
                                                            isCompleted ? "bg-green-500 border-green-500 text-white" :
                                                                isCurrent ? "bg-blue-500 border-blue-500 text-white scale-125 shadow-lg shadow-blue-500/50" :
                                                                    "bg-gray-900 border-gray-700 text-gray-500"
                                                    )}>
                                                        {isCompleted ? <CheckCircle className="w-5 h-5" /> :
                                                            isRejected && idx === currentStageIndex ? <XCircle className="w-5 h-5" /> :
                                                                <span className="text-xs font-bold">{idx + 1}</span>}
                                                    </div>
                                                    <span className={cn(
                                                        "text-sm font-medium transition-colors",
                                                        isCurrent ? "text-white font-bold" : "text-gray-500"
                                                    )}>{stage}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Status & Feedback */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "p-2 rounded-lg mt-1",
                                            isRejected ? "bg-red-500/20 text-red-400" :
                                                app.status === 'Interview' ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"
                                        )}>
                                            {isRejected ? <XCircle className="w-5 h-5" /> :
                                                app.status === 'Interview' ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white mb-1">Current Status: {app.status}</h4>
                                            <p className="text-sm text-gray-400 mb-3">Last updated on {app.lastUpdate}</p>

                                            {app.feeback && (
                                                <div className="bg-black/30 p-3 rounded-lg border-l-2 border-blue-500 text-sm italic text-gray-300">
                                                    &quot;{app.feeback}&quot;
                                                </div>
                                            )}

                                            {app.status === 'Interview' && (
                                                <div className="mt-4">
                                                    <GlassButton variant="primary" size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                                        Launch Interview Prep AI <ArrowRight className="w-4 h-4 ml-2" />
                                                    </GlassButton>
                                                </div>
                                            )}

                                            {isRejected && (
                                                <div className="mt-4">
                                                    <p className="text-sm text-red-300 mb-2 font-medium">AI Analysis: Skill Gap Detected</p>
                                                    <div className="flex gap-2">
                                                        <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20">Missing: AWS</span>
                                                        <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20">Missing: CI/CD</span>
                                                        <Link href="/learning" className="text-xs text-blue-400 underline self-center ml-2">View Learning Path</Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
