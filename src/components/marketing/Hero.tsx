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
            <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Column: Text & CTA */}
                        <div className="flex flex-col text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-gray-900 dark:text-white">
                                    Bridge Your <span className="text-blue-600 dark:text-blue-500">Skill Gaps</span>, <br />
                                    Land Your Dream Job.
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
                                    The AI-powered ecosystem connecting Students, Recruiters, and Universities. Verify skills, analyze gaps, and hire with confidence.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-5">
                                    <GlassButton
                                        onClick={() => setIsModalOpen(true)}
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

                        {/* Right Column: Visual Bento Grid */}
                        <motion.div
                            className="relative"
                            ref={ref}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 1. Student Profile */}
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="md:col-span-2"
                                >
                                    <GlassCard className="flex flex-col sm:flex-row items-center gap-6 p-6">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-md shrink-0">BP</div>
                                        <div className="flex-1 w-full">
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Bawantha Perera</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                <Code className="w-4 h-4" /> Full Stack Dev
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
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

                                {/* 2. AI Skill Match */}
                                <motion.div
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                >
                                    <GlassCard className="h-full flex flex-col justify-center items-center text-center p-6 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-500/20">
                                        <div className="relative mb-4">
                                            <svg className="w-32 h-32 transform -rotate-90">
                                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-white/10" />
                                                <motion.circle
                                                    initial={{ strokeDashoffset: 365 }}
                                                    whileInView={{ strokeDashoffset: 365 - (365 * score) / 100 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 2, ease: "easeOut" }}
                                                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-600 dark:text-blue-500" strokeDasharray={365} strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{score}%</span>
                                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Match</span>
                                            </div>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">AI Analysis</p>
                                    </GlassCard>
                                </motion.div>

                                {/* 3. Recruiter Dashboard */}
                                <motion.div
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                >
                                    <GlassCard className="h-full p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pipeline</span>
                                            <div className="flex gap-1 opacity-50">
                                                <div className="w-2 h-2 rounded-full bg-red-400" />
                                                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            {[1, 2].map((i) => (
                                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-transparent hover:border-blue-200 dark:hover:border-white/10 transition-colors">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${i === 1 ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-700'}`}>
                                                        {i === 1 ? '92' : '85'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-1" />
                                                        <div className="h-1.5 w-10 bg-gray-100 dark:bg-gray-800 rounded-full" />
                                                    </div>
                                                    <CheckCircle className={`w-4 h-4 ${i === 1 ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <RoleSelectionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    );
}
