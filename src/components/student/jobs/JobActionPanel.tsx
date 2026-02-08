"use client";

import { JobMatchAndAnalysis } from "@/types/jobs";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, AlertTriangle, Plus, Send, FileText, MessageCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface JobActionPanelProps {
    match: JobMatchAndAnalysis;
}

export function JobActionPanel({ match }: JobActionPanelProps) {
    const [addedGaps, setAddedGaps] = useState<string[]>([]);

    const handleAddGap = (gapId: string) => {
        setAddedGaps(prev => [...prev, gapId]);
        // Trigger toast in real app
    };

    const isHighMatch = match.matchScore >= 80;

    return (
        <div className="space-y-6">
            {/* Match Intelligence Card */}
            <GlassCard className="p-6 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${isHighMatch ? "bg-green-500" : "bg-yellow-500"}`} />

                <div className="text-center mb-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Match Intelligence</h3>
                    <div className="text-5xl font-bold text-white mb-2">{match.matchScore}%</div>
                    <p className={`text-sm font-medium ${isHighMatch ? "text-green-400" : "text-yellow-400"}`}>
                        {isHighMatch ? "You are a top candidate!" : "Missing a few key skills."}
                    </p>
                </div>

                {/* Segmented Progress Bar */}
                <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden flex mb-6">
                    <div style={{ width: `${match.matchScore}%` }} className={`h-full ${isHighMatch ? "bg-green-500" : "bg-yellow-500"}`} />
                    <div className="flex-1 bg-gray-600 pattern-diagonal-lines opacity-50" />
                </div>

                {/* Strengths */}
                <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-green-500" /> Your Strengths ({match.strengths.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {match.strengths.slice(0, 4).map(s => (
                            <span key={s.id} className="px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-medium">
                                {s.name}
                            </span>
                        ))}
                        {match.strengths.length > 4 && <span className="text-xs text-gray-500 py-1">+{match.strengths.length - 4} more</span>}
                    </div>
                </div>

                {/* Gaps */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                        <AlertTriangle size={12} className="text-yellow-500" /> Critical Gaps ({match.gaps.length})
                    </h4>
                    <div className="space-y-2">
                        {match.gaps.map(gap => (
                            <div key={gap.id} className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
                                <span className="text-sm text-gray-300">{gap.name}</span>
                                <button
                                    onClick={() => handleAddGap(gap.id)}
                                    disabled={addedGaps.includes(gap.id)}
                                    className={`text-xs flex items-center gap-1 transition-colors ${addedGaps.includes(gap.id)
                                            ? "text-green-400 font-medium"
                                            : "text-blue-400 hover:text-blue-300"
                                        }`}
                                >
                                    {addedGaps.includes(gap.id) ? (
                                        <>
                                            <CheckCircle2 size={12} /> Added
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={12} /> Learn
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard className="p-6 space-y-3">
                <h3 className="text-sm font-bold text-white mb-2">Quick Actions</h3>

                <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group">
                    <Send size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    Easy Apply
                    <span className="text-xs font-normal opacity-70 bg-black/20 px-1.5 py-0.5 rounded">Verified</span>
                </button>

                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium border border-white/10 transition-colors flex items-center justify-center gap-2">
                    <FileText size={16} />
                    Apply with Custom CV
                </button>

                <div className="pt-3 flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 border border-white/5">
                        <MessageCircle size={14} /> Ask Recruiter
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 border border-white/5">
                        <ExternalLink size={14} /> Share
                    </button>
                </div>
            </GlassCard>
        </div>
    );
}
