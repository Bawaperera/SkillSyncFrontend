"use client";

import { JobContext } from "@/types/messages";
import { ExternalLink, Briefcase } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface JobContextBarProps {
    context: JobContext;
    onViewDetails: () => void;
}

export function JobContextBar({ context, onViewDetails }: JobContextBarProps) {
    return (
        <div className="sticky top-0 z-30 mb-4">
            <GlassCard className="rounded-none border-x-0 border-t-0 border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-xl p-4 flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} className="text-gray-400" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Application Context</span>
                    </div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {context.title} <span className="text-gray-500">at</span> {context.company}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${context.status === 'Interview Scheduled' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                context.status === 'Applied' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                    'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                            }`}>
                            {context.status}
                        </span>
                    </div>
                </div>

                <button
                    onClick={onViewDetails}
                    className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                    <ExternalLink size={14} /> View Job Details
                </button>
            </GlassCard>
        </div>
    );
}
