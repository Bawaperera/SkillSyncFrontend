"use client";

import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, Play, Code, Database, Server, Star } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { RoleSelectionModal } from "./RoleSelectionModal";

export function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Skill Score Animation
    const [score, setScore] = useState(60);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setScore(prev => {
                    if (prev >= 92) {
                        clearInterval(interval);
                        return 92;
                    }
                    return prev + 1;
                });
            }, 50);
            return () => clearInterval(interval);
        } else {
            setScore(60);
        }
    }, [isInView]);

    return (
        <>
            <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 overflow-hidden">


                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center mb-16 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-gray-900 dark:text-white">
                                Bridge Your <span className="text-blue-600 dark:text-blue-500">Skill Gaps</span>, <br />
                                Land Your Dream Job.
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                                The AI-powered ecosystem connecting Students, Recruiters, and Universities. Verify skills, analyze gaps, and hire with confidence.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <GlassButton
                                    onClick={() => setIsModalOpen(true)}
                                    // Using custom logic instead of variant to match premium request
                                    className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 border-none transition-all duration-300"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </GlassButton>

                                <Link href="#contact">
                                    <GlassButton className="h-14 px-8 text-lg bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white shadow-sm hover:shadow-md">
                                        <Play className="mr-2 w-5 h-5 fill-current opacity-70" />
                                        Book a Free Demo
                                    </GlassButton>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Structured Bento Grid for Visuals */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto"
                        ref={ref}
                    >
                        {/* 1. Student Profile (Left - Spans 4) */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="md:col-span-4 h-full"
                        >
                            <GlassCard className="h-full flex flex-col justify-between p-6">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">BP</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Bawantha Perera</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Computer Science @ UCSC</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Skill</span>
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Code className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">Full Stack Dev</p>
                                                    <p className="text-xs text-gray-500">Verified by GitHub</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Profile Strength</span>
                                        <span className="font-bold text-green-500">Excellent</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "95%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-green-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>

                        {/* 2. AI Skill Match (Center - Spans 4) */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="md:col-span-4 h-full"
                        >
                            <GlassCard className="h-full flex flex-col justify-center items-center text-center p-8 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-500/20">
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                                    <div className="relative inline-flex items-center justify-center">
                                        <svg className="w-40 h-40 transform -rotate-90">
                                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-200 dark:text-white/10" />
                                            <motion.circle
                                                initial={{ strokeDashoffset: 440 }}
                                                whileInView={{ strokeDashoffset: 440 - (440 * score) / 100 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 2, ease: "easeOut" }}
                                                cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-blue-600 dark:text-blue-500" strokeDasharray={440} strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center">
                                            <span className="text-5xl font-bold text-gray-900 dark:text-white">{score}%</span>
                                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mt-1">Match</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Analysis</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Real-time gap analysis based on industry demand.</p>
                            </GlassCard>
                        </motion.div>

                        {/* 3. Recruiter Dashboard (Right - Spans 4) */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="md:col-span-4 h-full"
                        >
                            <GlassCard className="h-full p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hiring Pipeline</span>
                                    <div className="flex gap-1.5 opacity-50">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="group flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-blue-200 dark:hover:border-white/10 transition-all cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${i === 1 ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-700'}`}>
                                                    {i === 1 ? '92' : i === 2 ? '85' : '72'}
                                                </div>
                                                <div>
                                                    <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-1.5" />
                                                    <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
                                                </div>
                                            </div>
                                            <CheckCircle className={`w-5 h-5 ${i === 1 ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">View all candidates</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <RoleSelectionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    );
}
