"use client";

import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { Pricing } from "@/components/marketing/Pricing";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    GraduationCap,
    Briefcase,
    AlertTriangle,
    FileSearch,
    TrendingDown,
    Plus,
    Minus,
    CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { RoleSelectionModal } from "@/components/marketing/RoleSelectionModal";

const TRUSTED_LOGOS = [
    "University of Colombo", "SLIIT", "IIT", "Tech Innovations Ltd", "Virtusa", "Pearson",
    "University of Colombo", "SLIIT", "IIT", "Tech Innovations Ltd", "Virtusa", "Pearson",
    "University of Colombo", "SLIIT", "IIT", "Tech Innovations Ltd", "Virtusa", "Pearson"
];

const FAQS = [
    { q: "Is SkillSync free for students?", a: "Yes! Core features like skill analysis, GitHub scanning, and job matching are 100% free for students." },
    { q: "How does the verification work?", a: "We scan your public GitHub repositories for code complexity, language usage, and best practices to verify your skills." },
    { q: "Do you share my data?", a: "Your personal data is private. We only share anonymized aggregate data with universities for curriculum improvement." },
];

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState<'student' | 'recruiter' | 'university'>('student');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative overflow-x-hidden bg-white">
            <div className="relative z-10">
                <Hero />

                {/* Trust Strip - Off-white background, Black text */}
                <section className="py-10 border-y border-gray-100 bg-[#F8F7F4] overflow-hidden">
                    <div className="container mx-auto px-6 mb-4 text-center">
                        <p className="text-sm text-black font-bold uppercase tracking-widest">Trusted by leading institutions</p>
                    </div>
                    <div className="relative flex overflow-x-hidden group">
                        <motion.div
                            className="flex gap-16 items-center whitespace-nowrap px-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                        >
                            {TRUSTED_LOGOS.map((logo, i) => (
                                <span key={i} className="text-xl md:text-2xl font-bold text-black opacity-80 hover:opacity-100 transition-opacity cursor-default">
                                    {logo}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Problem Section - White background */}
                <section className="py-16 relative bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">The <span className="text-red-600">Broken</span> Bridge</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Why fits are failing despite degrees and job openings.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <GlassCard className="group hover:border-red-500/30 transition-colors bg-[#F8F7F4] dark:bg-[#F8F7F4] border-gray-100 dark:border-gray-100 shadow-sm">
                                <div className="p-3 bg-red-100 rounded-xl inline-block mb-4 text-red-600 group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-900">The Student Trap</h3>
                                <p className="text-gray-600 dark:text-gray-600">Graduating with good grades but still getting rejected? It’s not you; it’s the <strong className="text-gray-900 dark:text-gray-900">Skill Gap</strong> between curriculum and industry.</p>
                            </GlassCard>

                            <GlassCard className="group hover:border-orange-500/30 transition-colors bg-[#F8F7F4] dark:bg-[#F8F7F4] border-gray-100 dark:border-gray-100 shadow-sm">
                                <div className="p-3 bg-orange-100 rounded-xl inline-block mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                                    <FileSearch className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-900">The Recruiter Fatigue</h3>
                                <p className="text-gray-600 dark:text-gray-600">Tired of shifting through hundreds of CVs that list &apos;Java&apos; but have <strong className="text-gray-900 dark:text-gray-900">no code</strong> to back it up?</p>
                            </GlassCard>

                            <GlassCard className="group hover:border-yellow-500/30 transition-colors bg-[#F8F7F4] dark:bg-[#F8F7F4] border-gray-100 dark:border-gray-100 shadow-sm">
                                <div className="p-3 bg-yellow-100 rounded-xl inline-block mb-4 text-yellow-600 group-hover:scale-110 transition-transform">
                                    <TrendingDown className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-900">The University Blindspot</h3>
                                <p className="text-gray-600 dark:text-gray-600">Struggling to track if your syllabus matches what companies are hiring for <strong className="text-gray-900 dark:text-gray-900">right now</strong>?</p>
                            </GlassCard>
                        </div>
                    </div>
                </section>

                {/* Solution Section (Triangle) - Off-white background */}
                <section className="py-12 relative overflow-hidden bg-[#F8F7F4]">
                    <div className="container mx-auto px-6">
                        <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-white shadow-xl border-gray-100 rounded-[3rem]">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="text-left">
                                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                                        Meet SkillSync <br />
                                        The <span className="text-blue-600">AI-Bridge</span>
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        We don't just list jobs. We analyze code, verify skills, and match candidates based on <strong className="text-gray-900">real data</strong>, not just claims on a CV.
                                    </p>
                                    <GlassButton className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 font-bold border-none shadow-lg">
                                        See How It Works
                                    </GlassButton>
                                </div>

                                <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
                                    {/* Triangle Animation Lines */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M50 15 L20 85 L80 85 Z" stroke="url(#gradient)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" fill="none" className="opacity-30" />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                        {/* Animated Dots */}
                                        <motion.circle r="1" fill="#3b82f6"
                                            animate={{ pathLength: 1, offsetDistance: ["0%", "100%"] }}
                                            style={{ offsetPath: "path('M50 15 L20 85 L80 85 Z')" }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        />
                                    </svg>

                                    <div className="absolute top-0 md:top-8 left-1/2 -translate-x-1/2">
                                        <GlassCard className="p-4 flex flex-col items-center bg-white z-10 w-40 border-gray-100 shadow-lg">
                                            <GraduationCap className="w-8 h-8 text-blue-500 mb-2" />
                                            <span className="font-bold text-sm text-gray-900">Student Data</span>
                                        </GlassCard>
                                    </div>
                                    <div className="absolute bottom-0 md:bottom-8 left-0">
                                        <GlassCard className="p-4 flex flex-col items-center bg-white z-10 w-40 border-gray-100 shadow-lg">
                                            <Building2 className="w-8 h-8 text-purple-500 mb-2" />
                                            <span className="font-bold text-sm text-gray-900">University</span>
                                        </GlassCard>
                                    </div>
                                    <div className="absolute bottom-0 md:bottom-8 right-0">
                                        <GlassCard className="p-4 flex flex-col items-center bg-white z-10 w-40 border-gray-100 shadow-lg">
                                            <Briefcase className="w-8 h-8 text-pink-500 mb-2" />
                                            <span className="font-bold text-sm text-gray-900">Tech Industry</span>
                                        </GlassCard>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </section>

                {/* How It Works - Dark background */}
                <section className="py-16 bg-[#0A0A0B]" id="how-it-works">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">How It Works</h2>

                        <div className="flex justify-center mb-12">
                            <div className="p-1 bg-white/5 rounded-full border border-white/10 flex">
                                {['student', 'recruiter', 'university'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`
                            px-6 py-2 rounded-full text-sm font-bold transition-all capitalize
                            ${activeTab === tab
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'}
                        `}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="grid md:grid-cols-3 gap-8"
                                >
                                    {activeTab === 'student' && [
                                        { step: 1, title: 'Sync', desc: 'Connect GitHub & Upload CV.', icon: <CheckCircle2 className="w-6 h-6 text-blue-400" /> },
                                        { step: 2, title: 'Analyze', desc: 'AI identifies your missing skills.', icon: <CheckCircle2 className="w-6 h-6 text-purple-400" /> },
                                        { step: 3, title: 'Grow', desc: 'Follow a custom path & get hired.', icon: <CheckCircle2 className="w-6 h-6 text-green-400" /> },
                                    ].map((item) => (
                                        <GlassCard key={item.step} className="text-center p-8 bg-white/5 backdrop-blur-[20px] border-white/10 shadow-2xl">
                                            <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/30 font-bold text-xl text-blue-400">
                                                {item.step}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                            <p className="text-gray-400">{item.desc}</p>
                                        </GlassCard>
                                    ))}
                                    {/* Recruiter and University tabs follow similar pattern */}
                                    {activeTab === 'recruiter' && [
                                        { step: 1, title: 'Define', desc: 'Post jobs with AI-suggested skills.', icon: <Briefcase className="w-6 h-6" /> },
                                        { step: 2, title: 'Filter', desc: 'See candidates by Verified Scores.', icon: <FileSearch className="w-6 h-6" /> },
                                        { step: 3, title: 'Hire', desc: 'Skip screening & interview matches.', icon: <CheckCircle2 className="w-6 h-6" /> },
                                    ].map((item) => (
                                        <GlassCard key={item.step} className="text-center p-8 bg-white/5 backdrop-blur-[20px] border-white/10 shadow-2xl">
                                            <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30 font-bold text-xl text-purple-400">
                                                {item.step}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                            <p className="text-gray-400">{item.desc}</p>
                                        </GlassCard>
                                    ))}

                                    {activeTab === 'university' && [
                                        { step: 1, title: 'Integrate', desc: 'Sync student performance data.', icon: <Building2 className="w-6 h-6" /> },
                                        { step: 2, title: 'Insights', desc: 'View Curriculum vs. Industry Gaps.', icon: <TrendingDown className="w-6 h-6" /> },
                                        { step: 3, title: 'Adapt', desc: 'Update course modules instantly.', icon: <CheckCircle2 className="w-6 h-6" /> },
                                    ].map((item) => (
                                        <GlassCard key={item.step} className="text-center p-8 bg-white/5 backdrop-blur-[20px] border-white/10 shadow-2xl">
                                            <div className="w-12 h-12 mx-auto bg-pink-500/20 rounded-full flex items-center justify-center mb-4 border border-pink-500/30 font-bold text-xl text-pink-400">
                                                {item.step}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                            <p className="text-gray-400">{item.desc}</p>
                                        </GlassCard>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                <Features />
                <Pricing />

                {/* Testimonials & FAQ - Off-white background */}
                <section className="py-24 relative bg-[#F8F7F4]">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-16">
                            <div>
                                <h3 className="text-2xl font-bold mb-8 text-gray-900">What People Say</h3>
                                <div className="space-y-6">
                                    <GlassCard className="bg-white border-l-4 border-blue-500 p-6 shadow-md">
                                        <p className="italic text-gray-600 mb-4">&quot;I didn&apos;t know I needed Docker until SkillSync told me. Learned it in 2 weeks and got hired.&quot;</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">BP</div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">Bawantha P.</p>
                                                <p className="text-xs text-gray-500">Software Engineer @ Virtusa</p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                    <GlassCard className="bg-white border-l-4 border-purple-500 p-6 shadow-md">
                                        <p className="italic text-gray-600 mb-4">&quot;The &apos;Verified Skills&apos; badge saves us technical interview time. We hire faster now.&quot;</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white">JD</div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">John Doe</p>
                                                <p className="text-xs text-gray-500">HR Manager @ TechCorp</p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h3>
                                <div className="space-y-4">
                                    {FAQS.map((faq, i) => (
                                        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                                            <button
                                                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                                className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-gray-50 transition-colors text-gray-900"
                                            >
                                                {faq.q}
                                                {openFaqIndex === i ? <Minus className="w-4 h-4 text-blue-500" /> : <Plus className="w-4 h-4 text-gray-400" />}
                                            </button>
                                            <AnimatePresence>
                                                {openFaqIndex === i && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: 'auto' }}
                                                        exit={{ height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 pt-0 text-sm text-gray-600 leading-relaxed">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA - White background */}
                <section className="py-24 relative overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50" />
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Your Career Can&apos;t Wait.</h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join 1000+ students bridging the gap today.</p>
                        <GlassButton
                            onClick={() => setIsModalOpen(true)}
                            variant="primary"
                            size="lg"
                            className="mt-6 px-10 py-6 text-xl shadow-xl bg-blue-600 text-white hover:bg-blue-700 font-bold border-none"
                        >
                            Get Started Now
                        </GlassButton>
                    </div>
                </section>
            </div>

            <RoleSelectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
