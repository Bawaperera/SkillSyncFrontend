"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Building2, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlassCard } from "@/components/ui/GlassCard";

interface RoleSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RoleSelectionModal({ isOpen, onClose }: RoleSelectionModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <div className="relative z-[101] w-full max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <GlassCard className="overflow-hidden border-white/10 shadow-2xl bg-[#0A0A0B]/90 p-0">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-20 bg-black/20 rounded-full"
                                >
                                    <X size={20} />
                                </button>

                                <div className="grid md:grid-cols-2 min-h-[500px]">
                                    {/* Left Side: Marketing - Hidden on Mobile */}
                                    <div className="hidden md:flex p-12 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent relative overflow-hidden flex-col justify-center">
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]" />
                                            <div className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px]" />
                                        </div>
                                        <div className="relative z-10">
                                            <h2 className="text-3xl font-bold text-white mb-4">Join the Future of Hiring</h2>
                                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                                Whether you&apos;re a student building a career, or a company building a team — SkillSync bridges the gap.
                                            </p>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0"><ChevronRight size={16} /></div>
                                                    <span>AI-Verified Skills Badge</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0"><ChevronRight size={16} /></div>
                                                    <span>Instant Job Matching</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0"><ChevronRight size={16} /></div>
                                                    <span>Curriculum Intelligence</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Role Selection */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center bg-[#0A0A0B]">
                                        <div className="mb-8 text-center md:text-left">
                                            <h3 className="text-2xl font-bold text-white mb-2">Get Started</h3>
                                            <p className="text-gray-400">Select your role to continue setup.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <Link href="/register/student" onClick={onClose} className="group block">
                                                <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                                        <GraduationCap size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">I&apos;m a Student</h4>
                                                        <p className="text-xs text-gray-400">Get verified & find jobs.</p>
                                                    </div>
                                                    <ChevronRight className="text-gray-500 group-hover:translate-x-1 group-hover:text-white transition-all" size={20} />
                                                </div>
                                            </Link>

                                            <Link href="/register/recruiter" onClick={onClose} className="group block">
                                                <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                                        <Briefcase size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">I&apos;m a Recruiter</h4>
                                                        <p className="text-xs text-gray-400">Hire pre-vetted talent.</p>
                                                    </div>
                                                    <ChevronRight className="text-gray-500 group-hover:translate-x-1 group-hover:text-white transition-all" size={20} />
                                                </div>
                                            </Link>

                                            <Link href="/contact-university" onClick={onClose} className="group block">
                                                <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-pink-500/50 transition-all flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                                                        <Building2 size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-white group-hover:text-pink-400 transition-colors">I&apos;m a University</h4>
                                                        <p className="text-xs text-gray-400">Partner for intelligence.</p>
                                                    </div>
                                                    <ChevronRight className="text-gray-500 group-hover:translate-x-1 group-hover:text-white transition-all" size={20} />
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="mt-8 text-center pt-8 border-t border-white/5">
                                            <p className="text-sm text-gray-500">
                                                Already have an account?{" "}
                                                <Link href="/login" onClick={onClose} className="text-white hover:text-blue-400 font-medium transition-colors">
                                                    Log In
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
