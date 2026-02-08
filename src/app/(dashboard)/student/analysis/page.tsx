"use client";

import { AnalysisHeader } from "@/components/student/analysis/AnalysisHeader";
import { SkillRadar } from "@/components/student/analysis/SkillRadar";
import { AnalysisTabs } from "@/components/student/analysis/AnalysisTabs";
import { SkillData } from "@/types/analysis";

// Mock Data for Radar Chart
const SKILL_DATA: SkillData[] = [
    { subject: 'Frontend', A: 90, B: 85, fullMark: 100 }, // You are stronger
    { subject: 'Backend', A: 75, B: 85, fullMark: 100 },  // Gap
    { subject: 'DevOps', A: 30, B: 80, fullMark: 100 },   // Critical Gap
    { subject: 'Database', A: 65, B: 70, fullMark: 100 }, // Small Gap
    { subject: 'Soft Skills', A: 80, B: 60, fullMark: 100 }, // You are stronger
];

export default function AnalysisPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0B] pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <AnalysisHeader />

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left: Visualization */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pl-1">Visual Gap Analysis</h2>
                            <SkillRadar data={SKILL_DATA} />
                        </div>

                        <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <h4 className="font-bold text-blue-400 text-sm mb-2 flex items-center gap-2">
                                <span className="text-lg">💡</span> Key Insight
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                Your <span className="text-gray-900 dark:text-white font-bold">Frontend</span> skills exceed market standards, but <span className="text-gray-900 dark:text-white font-bold">DevOps</span> is a critical bottleneck preventing high-tier offers.
                            </p>
                        </div>
                    </div>

                    {/* Right: Action & Strategy */}
                    <div className="lg:col-span-7">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pl-1">Strategic Action Plan</h2>
                        <AnalysisTabs />
                    </div>
                </div>
            </div>
        </div>
    );
}
