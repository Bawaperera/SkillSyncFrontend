"use client";

import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, GraduationCap, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState<'student' | 'recruiter'>('student');
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm font-medium text-gray-300">AI-Powered Talent Alignment</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                                Bridge Your <br />
                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Skill Gaps
                                </span>
                            </h1>

                            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                                Connect with top Sri Lankan tech companies. Verify your skills, find your gaps, and get hired based on ability, not just keywords.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/register">
                                    <GlassButton variant="primary" size="lg" className="h-14 bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto group">
                                        Get Started
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </GlassButton>
                                </Link>
                                <Link href="#recruiters">
                                    <GlassButton variant="secondary" size="lg" className="h-14 w-full sm:w-auto">
                                        I&apos;m a Recruiter
                                    </GlassButton>
                                </Link>
                            </div>

                            <div className="mt-12 flex items-center gap-8 opacity-70 grayscale">
                                <span className="text-lg font-bold text-gray-500">TRUSTED BY</span>
                                {/* Mock logos provided as text for simplicity, in real app use SVGs */}
                                <span className="font-semibold text-gray-400">Virtusa</span>
                                <span className="font-semibold text-gray-400">WSO2</span>
                                <span className="font-semibold text-gray-400">IFS</span>
                                <span className="font-semibold text-gray-400">99x</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <GlassCard className="absolute top-0 right-0 w-80 z-20 animate-float">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                                        BP
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Bawantha Perera</h3>
                                        <p className="text-sm text-gray-400">Aspiring Full Stack Dev</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Skill Match</span>
                                        <span className="text-green-400 font-bold">92%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[92%] bg-gradient-to-r from-blue-500 to-green-500" />
                                    </div>
                                    <div className="pt-2 flex gap-2">
                                        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">React</span>
                                        <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">Node.js</span>
                                        <span className="px-2 py-1 rounded bg-white/10 text-gray-300 text-xs border border-white/20">+3</span>
                                    </div>
                                </div>
                            </GlassCard>

                            <GlassCard className="absolute bottom-[-50px] left-[-30px] w-72 z-10 backdrop-blur-md bg-white/5 border-white/5" style={{ y }}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">GitHub Verified</p>
                                        <p className="text-xs text-gray-400">25 Repositories Scanned</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Value Prop Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">The Ecosystem</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Connecting the three pillars of the Sri Lankan tech industry.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "For Students",
                                desc: "AI Career Coach that identifies skill gaps and builds a personalized learning path.",
                                icon: GraduationCap,
                                color: "text-blue-400",
                                bg: "bg-blue-400/10"
                            },
                            {
                                title: "For Recruiters",
                                desc: "Hiring Suite that filters candidates by verified skill scores, not just keywords.",
                                icon: Briefcase,
                                color: "text-purple-400",
                                bg: "bg-purple-400/10"
                            },
                            {
                                title: "For Universities",
                                desc: "Analytics Dashboard showing faculty where students struggle against market trends.",
                                icon: Building2,
                                color: "text-pink-400",
                                bg: "bg-pink-400/10"
                            }
                        ].map((card, i) => (
                            <GlassCard key={i} hoverEffect className="group">
                                <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <card.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
