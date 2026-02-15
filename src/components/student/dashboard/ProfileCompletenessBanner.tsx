"use client";

import { motion } from "framer-motion";
import { FileText, Github, Target, Trophy, CheckCircle2, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Step {
    id: string;
    label: string;
    icon: any;
    isCompleted: boolean;
    color: string;
}

interface ProfileCompletenessBannerProps {
    progress: number;
    steps: Step[];
    onCompleteStep: (id: string) => void;
    onDismiss?: () => void;
}

export function ProfileCompletenessBanner({ 
    progress, 
    steps, 
    onCompleteStep,
    onDismiss 
}: ProfileCompletenessBannerProps) {
    if (progress >= 100) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Trophy size={120} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        Profile Completeness
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Complete your profile to unlock AI job matching and improved search ranking.
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{progress}%</div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Completed</div>
                    </div>
                    {/* Ring Chart could go here, but Bar is cleaner for horizontal layout */}
                     <div className="w-16 h-16 relative flex items-center justify-center">
                        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="4"
                                className="dark:stroke-gray-700"
                            />
                            <motion.path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#2563EB"
                                strokeWidth="4"
                                strokeDasharray={`${progress}, 100`}
                                initial={{ strokeDasharray: "0, 100" }}
                                animate={{ strokeDasharray: `${progress}, 100` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center md:hidden">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar (Visual) */}
            <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full mb-8 overflow-hidden">
                 <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                 />
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step) => (
                    <button
                        key={step.id}
                        onClick={() => onCompleteStep(step.id)}
                        disabled={step.isCompleted}
                        className={cn(
                            "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left relative overflow-hidden",
                            step.isCompleted 
                                ? "bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10 opacity-70" 
                                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md"
                        )}
                    >
                        {step.isCompleted && (
                            <div className="absolute top-2 right-2 text-green-500">
                                <CheckCircle2 size={16} />
                            </div>
                        )}
                        
                        <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shadow-sm shrink-0 transition-colors",
                            step.isCompleted ? "bg-gray-200 dark:bg-white/10 text-gray-500" : `bg-${step.color}-100 dark:bg-${step.color}-900/30 text-${step.color}-600 dark:text-${step.color}-400 group-hover:bg-${step.color}-600 group-hover:text-white`
                        )}>
                            <step.icon size={20} />
                        </div>
                        
                        <div>
                            <h4 className={cn(
                                "font-bold text-sm transition-colors",
                                step.isCompleted ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"
                            )}>
                                {step.label}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {step.isCompleted ? "Completed" : "Add details +"}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
