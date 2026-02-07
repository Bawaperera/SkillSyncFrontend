"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Award, AlertCircle } from "lucide-react";
import Link from "next/link";

const data = [
    { subject: 'Frontend', A: 85, B: 90, fullMark: 100 },
    { subject: 'Backend', A: 80, B: 85, fullMark: 100 },
    { subject: 'Database', A: 85, B: 80, fullMark: 100 },
    { subject: 'DevOps', A: 50, B: 90, fullMark: 100 },
    { subject: 'Mobile', A: 60, B: 70, fullMark: 100 },
    { subject: 'AI/ML', A: 40, B: 60, fullMark: 100 },
];

export default function AnalysisPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Skill Analysis</h1>
                    <p className="text-gray-400">Target Role: Full Stack Developer (LKR 150k - 250k)</p>
                </div>
                <GlassButton variant="secondary">Export Report</GlassButton>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Radar Chart Section */}
                <GlassCard className="h-[500px] flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-xs text-gray-300">Your Skills</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gray-500" />
                            <span className="text-xs text-gray-300">Market Demand</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="You" dataKey="A" stroke="#3b82f6" strokeWidth={3} fill="#3b82f6" fillOpacity={0.4} />
                            <Radar name="Market" dataKey="B" stroke="#94a3b8" strokeWidth={2} fill="#94a3b8" fillOpacity={0.1} />
                        </RadarChart>
                    </ResponsiveContainer>
                </GlassCard>

                {/* Gaps & Recommendations */}
                <div className="space-y-6">
                    <GlassCard>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            Critical Gaps Found
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors cursor-pointer">
                                <div>
                                    <h4 className="font-bold text-white mb-1">Docker & Kubernetes</h4>
                                    <p className="text-xs text-gray-400">DevOps • Importance: High</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-red-400 font-bold block">-40%</span>
                                    <span className="text-[10px] text-gray-500">vs Market</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors cursor-pointer">
                                <div>
                                    <h4 className="font-bold text-white mb-1">AWS Cloud</h4>
                                    <p className="text-xs text-gray-400">Cloud Computing • Importance: High</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-red-400 font-bold block">-35%</span>
                                    <span className="text-[10px] text-gray-500">vs Market</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-green-400" />
                            Top Strengths
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Python', 'SQL'].map(skill => (
                                <span key={skill} className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/30">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-white mb-1">Boost Your Score?</h3>
                                <p className="text-sm text-gray-300">Completing &quot;Docker Mastery&quot; will add +8%</p>
                            </div>
                            <Link href="/learning">
                                <GlassButton variant="primary" size="sm">Go to Learning Path</GlassButton>
                            </Link>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
