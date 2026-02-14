"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload, Github, Target, Lock, CheckCircle2,
    Trophy, TrendingUp, Briefcase, ChevronRight, X
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";


export default function StudentDashboard() {
    // Start at 15% (Zero State)
    const [progress, setProgress] = useState(15);
    const [showConfetti, setShowConfetti] = useState(false);

    // Unlock threshold
    const isUnlocked = progress >= 100;

    // Simulate Actions
    const handleAction = (increment: number) => {
        const newProgress = Math.min(progress + increment, 100);
        setProgress(newProgress);
        if (newProgress === 100) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-[#0A0A0B] text-gray-900 dark:text-white overflow-x-hidden">
            {/* 
                ZERO STATE OVERLAY 
                - Covers the entire screen with a high z-index
                - Blurs the content behind it
            */}
            <AnimatePresence>
                {!isUnlocked && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <div className="w-full max-w-4xl relative">
                            {/* Glow Effects */}
                            {/* Glow Effects - Premium Mesh Alignment */}
                            <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                            <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

                            <GlassCard className="relative z-10 p-12 text-center border-white/10 bg-black/40 shadow-2xl">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                        Welcome, Alex! 👋
                                    </h1>
                                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                                        Your dashboard is currently locked. Complete these steps to unlock AI-powered job matching and skill analysis.
                                    </p>

                                    {/* Action Grid */}
                                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                        {/* Action 1: Upload CV */}
                                        <button
                                            onClick={() => handleAction(50)}
                                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative z-10">
                                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <Upload size={24} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">Upload CV</h3>
                                                <p className="text-sm text-gray-400 mb-4">We'll extract your skills automatically.</p>
                                                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                                                    Start Scan <ChevronRight size={16} />
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/20">
                                                +50%
                                            </div>
                                        </button>

                                        {/* Action 2: Connect GitHub */}
                                        <button
                                            onClick={() => handleAction(35)}
                                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative z-10">
                                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <Github size={24} />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">Connect GitHub</h3>
                                                <p className="text-sm text-gray-400 mb-4">Verify your code quality & projects.</p>
                                                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                                                    Connect Now <ChevronRight size={16} />
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-400 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/20">
                                                +35%
                                            </div>
                                        </button>
                                    </div>

                                    {/* Progress Indicator */}
                                    <div className="mt-12 flex flex-col items-center">
                                        <div className="flex items-center justify-between w-full max-w-md mb-2 text-sm">
                                            <span className="text-gray-400">Profile Completion</span>
                                            <span className="font-bold text-white">{progress}%</span>
                                        </div>
                                        <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                                initial={{ width: "15%" }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>

                                    </div>
                                </motion.div>
                            </GlassCard>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 
                ACTIVE CONTENT LAYER 
                - Rendered always, but blurred when locked
            */}
            <div className={`transition-all duration-700 ${!isUnlocked ? "filter blur-sm grayscale-[0.5] pointer-events-none opacity-50" : ""}`}>

                {/* Premium Background Mesh - Continuous & Aligned with Landing Page */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[1200px] h-[1200px] bg-blue-500/10 rounded-full blur-[180px]" />
                    <div className="absolute top-[40%] right-[-10%] w-[1000px] h-[1000px] bg-purple-500/10 rounded-full blur-[180px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-cyan-500/10 rounded-full blur-[180px]" />
                </div>

                <div className="p-8 max-w-7xl mx-auto relative z-10">
                    {/* Header: KPIs */}
                    <header className="mb-12">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
                                <p className="text-gray-600 dark:text-gray-400">Track your growth and job applications.</p>
                            </div>
                            <GlassButton size="sm">Download Report</GlassButton>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: "Skill Score", value: "850", trend: "+12%", color: "text-blue-500 dark:text-blue-400" },
                                { label: "Profile Views", value: "1,204", trend: "+5%", color: "text-purple-500 dark:text-purple-400" },
                                { label: "Applications", value: "12", trend: "Pending", color: "text-orange-500 dark:text-orange-400" },
                                { label: "Interviews", value: "3", trend: "This Week", color: "text-green-500 dark:text-green-400" },
                            ].map((stat, i) => (
                                <GlassCard key={i} className="p-6">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</p>
                                    <h3 className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</h3>
                                    <p className="text-xs font-medium text-green-500 dark:text-green-400 flex items-center gap-1">
                                        <TrendingUp size={12} /> {stat.trend}
                                    </p>
                                </GlassCard>
                            ))}
                        </div>
                    </header>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Column 1 & 2: Charts and Activity */}
                        <div className="lg:col-span-2 space-y-8">
                            <GlassCard className="p-8 min-h-[400px]">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skill Growth Analysis</h3>
                                <div className="h-[300px] w-full bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/5 border-dashed">
                                    <p className="text-gray-500 dark:text-gray-400">Interactive Chart Placeholder (Recharts)</p>
                                </div>
                            </GlassCard>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Jobs</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((job) => (
                                    <GlassCard key={job} className="p-6 flex items-center justify-between group hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {job === 1 ? "G" : job === 2 ? "F" : "A"}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">Senior React Developer</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Remote • $120k - $150k</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="text-gray-400 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Sidebar Widgets */}
                        <div className="space-y-8">
                            {/* Profile Strength */}
                            <GlassCard className="p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-50">
                                    <Trophy size={80} className="text-yellow-500/20" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profile Strength</h3>
                                <div className="text-3xl font-bold text-green-500 dark:text-green-400 mb-4">Top 5%</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">You rank higher than 95% of candidates with similar experience.</p>
                                <GlassButton className="w-full" variant="secondary">View Insights</GlassButton>
                            </GlassCard>

                            {/* Recent Activity */}
                            <GlassCard className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: "Application Viewed", time: "2h ago", color: "bg-blue-500" },
                                        { title: "New Skill Badge", time: "5h ago", color: "bg-purple-500" },
                                        { title: "Profile Updated", time: "1d ago", color: "bg-green-500" },
                                    ].map((activity, i) => (
                                        <div key={i} className="flex gap-4 relative">
                                            {i !== 2 && <div className="absolute top-8 left-1.5 w-0.5 h-full bg-gray-200 dark:bg-white/10" />}
                                            <div className={`w-3 h-3 rounded-full ${activity.color} mt-1.5 relative z-10 shrink-0`} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>

            {showConfetti && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 border border-gray-200 dark:border-white/20"
                    >
                        <Trophy className="text-yellow-500 fill-yellow-500" />
                        Dashboard Unlocked! Welcome aboard.
                    </motion.div>
                </div>
            )}
        </div>
    );
}
