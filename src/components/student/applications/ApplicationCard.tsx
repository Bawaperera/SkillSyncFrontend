"use client";

import { Application } from "@/types/applications";
import { GlassCard } from "@/components/ui/GlassCard";
import { PipelineStepper } from "./PipelineStepper";
import { MoreHorizontal, MessageSquare, Video, FileText, AlertCircle, Eye } from "lucide-react";
import { useState } from "react";
import { InterviewPrepModal } from "./InterviewPrepModal";

interface ApplicationCardProps {
    app: Application;
}

export function ApplicationCard({ app }: ApplicationCardProps) {
    const [isPrepOpen, setIsPrepOpen] = useState(false);

    const isInterview = app.status === 'Interview';
    const isRejected = app.status === 'Rejected';
    const isApplied = app.status === 'Applied';

    return (
        <>
            <GlassCard className="p-6 relative group border-l-4 border-l-transparent hover:border-l-blue-500 transition-all">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-white">
                            {app.logo ? <img src={app.logo} className="w-full h-full object-cover rounded-xl" /> : app.company.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white hover:text-blue-400 transition-colors cursor-pointer">{app.jobTitle}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>{app.company}</span>
                                <span>•</span>
                                <span>Applied: {app.appliedDate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <button className="p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                        {/* Dropdown would go here for Withdraw */}
                    </div>
                </div>

                {/* Stepper */}
                <div className="mb-8 pl-2 pr-4">
                    {!isRejected && <PipelineStepper steps={app.steps} />}
                    {isRejected && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                            <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-red-400 mb-1">Application Status: Not Selected</h4>
                                <p className="text-sm text-gray-300">
                                    {app.feedback?.gap ?
                                        `Feedback: The role requires stronger ${app.feedback.gap} skills.` :
                                        "Thank you for your interest. We decided to move forward with other candidates."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Context Aware Action Area */}
                <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                    {isInterview && (
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                    <Video size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-0.5">Interview Scheduled</h4>
                                    <p className="text-xs text-gray-400">{app.nextAction?.date} via Google Meet</p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => setIsPrepOpen(true)}
                                    className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <FileText size={16} /> Prep
                                </button>
                                <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                                    Join Meeting
                                </button>
                            </div>
                        </div>
                    )}

                    {isApplied && (
                        <div className="flex items-center gap-3">
                            <Eye size={16} className="text-blue-400" />
                            <span className="text-sm text-gray-300">
                                <span className="font-bold text-white">Insight:</span> Your application was viewed by the recruiter 2 hours ago.
                            </span>
                        </div>
                    )}

                    {isRejected && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">AI Recommendation: Explore Junior roles matching your profile.</span>
                            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">Find Similar Jobs</button>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
                    <button
                        disabled={isApplied || isRejected}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isApplied || isRejected ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <MessageSquare size={16} /> Message Recruiter
                    </button>
                    <div className="h-4 w-[1px] bg-gray-700" />
                    <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        View Job Details
                    </button>
                </div>
            </GlassCard>

            <InterviewPrepModal
                isOpen={isPrepOpen}
                onClose={() => setIsPrepOpen(false)}
                jobTitle={app.jobTitle}
                company={app.company}
            />
        </>
    );
}
