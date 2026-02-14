"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle, Code, Cpu, Globe, Zap } from "lucide-react";

export function HeroCollage() {
    return (
        <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">

            {/* Center Logo/Icon */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20"
            >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[30px] flex items-center justify-center shadow-2xl shadow-blue-500/30">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </motion.div>

            {/* Orbiting Elements */}

            {/* Top Left: Candidate Profile */}
            <motion.div
                className="absolute top-[10%] left-[10%] md:left-[15%] z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            >
                <GlassCard className="p-3 flex items-center gap-3 rounded-[20px] !bg-white/80 dark:!bg-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">SJ</div>
                    <div className="text-xs">
                        <div className="font-bold text-gray-900 dark:text-white">Sarah Jenkins</div>
                        <div className="text-gray-500">Product Designer</div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Top Right: Pill Tag */}
            <motion.div
                className="absolute top-[20%] right-[10%] md:right-[15%] z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div className="bg-white dark:bg-white/10 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-gray-100 dark:border-white/5">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold text-gray-800 dark:text-white">AI Analysis</span>
                </div>
            </motion.div>

            {/* Bottom Right: Recruiter Profile */}
            <motion.div
                className="absolute bottom-[20%] right-[5%] md:right-[10%] z-10"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
                <GlassCard className="p-3 flex items-center gap-3 rounded-[20px] !bg-white/80 dark:!bg-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">MR</div>
                    <div className="text-xs">
                        <div className="font-bold text-gray-900 dark:text-white">Mark Roberts</div>
                        <div className="text-gray-500">Tech Recruiter</div>
                    </div>
                    <div className="bg-green-100 text-green-600 p-1 rounded-full"><CheckCircle className="w-3 h-3" /></div>
                </GlassCard>
            </motion.div>

            {/* Bottom Left: GitHub Pill */}
            <motion.div
                className="absolute bottom-[15%] left-[5%] md:left-[10%] z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <div className="bg-white dark:bg-white/10 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-gray-100 dark:border-white/5">
                    <Code className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm font-bold text-gray-800 dark:text-white">GitHub Verified</span>
                </div>
            </motion.div>

            {/* Decorative Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-purple-500/20 rounded-full blur-[60px] -z-10 pointer-events-none translate-x-10 -translate-y-10" />

        </div>
    );
}
