"use client";

import { useState } from "react";
import { SkillGap } from "@/types/analysis";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";

interface GapCardProps {
    gap: SkillGap;
}

export function GapCard({ gap }: GapCardProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToPath = () => {
        setIsAdded(true);
        // Simulate API call
    };

    return (
        <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">{gap.name}</h3>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-gray-700 text-gray-300">{gap.category}</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${gap.priority === "Critical" ? "bg-red-500/20 text-red-400" :
                                gap.priority === "High" ? "bg-orange-500/20 text-orange-400" : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                            {gap.priority} Priority
                        </span>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-2xl font-bold text-red-400">-{gap.missingPercent}%</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Skill Gap</div>
                </div>
            </div>

            <div className="p-3 bg-black/20 rounded-lg border border-white/5 mb-4">
                <div className="flex items-start gap-2">
                    <ArrowUpRight size={16} className="text-green-400 mt-0.5" />
                    <div>
                        <span className="text-xs font-bold text-green-400 block mb-0.5">Impact Strategy:</span>
                        <p className="text-sm text-gray-300 leading-snug">{gap.impact}</p>
                    </div>
                </div>
            </div>

            <button
                onClick={handleAddToPath}
                disabled={isAdded}
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${isAdded
                        ? "bg-green-500/20 text-green-400 border border-green-500/20"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                    }`}
            >
                {isAdded ? (
                    <>
                        <Check size={16} /> Added to Learning Path
                    </>
                ) : (
                    <>
                        <Plus size={16} /> Add to Learning Path
                    </>
                )}
            </button>
        </div>
    );
}
