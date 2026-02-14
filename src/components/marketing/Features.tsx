"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ScanFace, FileCode, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const radarData = [
    { subject: 'Frontend', A: 80, fullMark: 100 },
    { subject: 'Backend', A: 90, fullMark: 100 },
    { subject: 'Cloud', A: 45, fullMark: 100 },
    { subject: 'DevOps', A: 60, fullMark: 100 },
    { subject: 'Design', A: 70, fullMark: 100 },
    { subject: 'Mobile', A: 50, fullMark: 100 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export function Features() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Default to dark theme colors to avoid hydration mismatch, or handle with mounted check
    const isDark = mounted && (theme === 'dark' || theme === 'system');

    // Force light theme colors for this section as per mixed theme requirement
    const gridColor = "rgba(0,0,0,0.1)";
    const textColor = "rgba(0,0,0,0.5)";
    const radarColor = "#3b82f6";

    return (
        <section id="features" className="py-24 relative overflow-hidden bg-[#F8F7F4]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Everything you need to <span className="text-blue-600">stand out</span></h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Skip the generic CVs. SkillSync gives you tools to prove your worth with data.</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-6 auto-rows-[400px]"
                >
                    {/* Visual 1: Radar Chart (Equal Size) */}
                    <motion.div variants={itemVariants} className="h-full">
                        <GlassCard className="h-full relative overflow-hidden group flex flex-col justify-between p-0 bg-white dark:bg-white border-gray-100 dark:border-gray-100 shadow-sm">
                            <div className="p-6 z-10 relative">
                                <div className="p-3 bg-blue-50 rounded-xl inline-block mb-3 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                    <ScanFace className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-900 mb-2">AI Skill Gap Analysis</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-600">Deep dive into your strengths.</p>
                            </div>

                            <div className="flex-1 w-full h-[200px] mt-4 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                        <PolarGrid stroke={gridColor} />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 10 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar name="Skill" dataKey="A" stroke={radarColor} strokeWidth={3} fill={radarColor} fillOpacity={0.3} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Visual 2: Code Scanning */}
                    <motion.div variants={itemVariants} className="h-full">
                        <GlassCard className="h-full relative group overflow-hidden flex flex-col p-0 bg-white dark:bg-white border-gray-100 dark:border-gray-100 shadow-sm">
                            <div className="p-6 z-10 relative">
                                <div className="p-2 bg-purple-50 rounded-lg inline-block mb-2 text-purple-600">
                                    <FileCode className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-900">GitHub Code Scanning</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-600 mt-1">Prove your code quality.</p>
                            </div>

                            <div className="absolute right-0 bottom-0 w-3/4 p-4 bg-gray-900 border-t border-l border-white/10 rounded-tl-2xl font-mono text-[10px] text-gray-400 leading-relaxed shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                </div>
                                <p><span className="text-blue-400">const</span> <span className="text-yellow-400">analyzeRepo</span> = <span className="text-purple-400">async</span> (url) ={">"} {"{"}</p>
                                <p className="pl-4"><span className="text-purple-400">const</span> complexity = <span className="text-blue-400">await</span> scan(url);</p>
                                <p className="pl-4"><span className="text-purple-400">return</span> complexity {">"} 85;</p>
                                <p>{"}"}</p>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Visual 3: Verified Talent Badge */}
                    <motion.div variants={itemVariants} className="h-full">
                        <GlassCard className="h-full relative group overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-white dark:to-green-50 flex flex-col p-0 border-gray-100 dark:border-gray-100 shadow-sm">
                            <div className="p-6 z-10 relative">
                                <div className="p-2 bg-green-50 rounded-lg inline-block mb-2 text-green-600">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-900">Verified Talent Pool</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-600 mt-1">Hire in half the time.</p>
                            </div>

                            <div className="absolute bottom-6 right-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white relative group-hover:scale-110 transition-transform duration-300 ${i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-purple-500' : 'bg-gray-600'} z-${30 - i * 10} shadow-md`}>
                                            {i === 1 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white" />}
                                            {i === 1 ? 'JS' : i === 2 ? 'TS' : '+8'}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
