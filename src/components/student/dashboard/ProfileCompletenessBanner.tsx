"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Upload, Github, Target, Briefcase } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

interface ProfileCompletenessBannerProps {
    onComplete: () => void;
    currentProgress: number;
    onUpdateProgress: (newProgress: number) => void;
}

export function ProfileCompletenessBanner({ onComplete, currentProgress, onUpdateProgress }: ProfileCompletenessBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    // Steps configuration
    const [steps, setSteps] = useState([
        { id: "cv", label: "Example CV", icon: <Upload size={20} />, completed: false, description: "Upload your resume" },
        { id: "github", label: "GitHub", icon: <Github size={20} />, completed: false, description: "Connect your profile" },
        { id: "skills", label: "Skills", icon: <Briefcase size={20} />, completed: false, description: "Add key skills" },
        { id: "role", label: "Target Role", icon: <Target size={20} />, completed: false, description: "Set your goals" },
    ]);

    // Handle updates when a step is clicked
    const handleStepClick = (id: string) => {
        setSteps(prev => {
            const newSteps = prev.map(step =>
                step.id === id ? { ...step, completed: true } : step
            );
            // Calculate new progress immediately
            const completedCount = newSteps.filter(s => s.completed).length;
            const newProgress = (completedCount / newSteps.length) * 100;
            onUpdateProgress(newProgress);
            return newSteps;
        });
    };

    const handleCompleteProfile = () => {
        if (currentProgress >= 100) {
            setIsVisible(false);
            onComplete();
        }
    };

    if (!isVisible) return null;

    return (
        <GlassCard className="p-8 mb-8 border border-blue-100 bg-white/80 backdrop-blur-sm shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Profile Completeness</h2>
                    <p className="text-sm text-gray-500 font-medium">Complete your profile to unlock dashboard insights</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full font-bold text-sm border shadow-sm ${currentProgress >= 100
                        ? "bg-green-50 text-green-600 border-green-100"
                        : "bg-blue-50 text-blue-600 border-blue-100"
                    }`}>
                    {Math.round(currentProgress)}% Complete
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full mb-8 overflow-hidden relative border border-gray-200">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentProgress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {steps.map((step) => (
                    <button
                        key={step.id}
                        onClick={() => handleStepClick(step.id)}
                        disabled={step.completed}
                        className={`
                            group flex items-center justify-between p-5 rounded-xl border transition-all text-left relative overflow-hidden
                            ${step.completed
                                ? "bg-green-50/50 border-green-100 text-green-700 shadow-sm"
                                : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md text-gray-700 hover:bg-blue-50/30"
                            }
                        `}
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center transition-colors border
                                ${step.completed
                                    ? "bg-white border-green-100 text-green-600 shadow-sm"
                                    : "bg-gray-50 border-gray-100 text-gray-500 group-hover:text-blue-600 group-hover:bg-white group-hover:border-blue-100 shadow-sm"
                                }
                            `}>
                                {step.icon}
                            </div>
                            <div>
                                <span className="font-bold text-sm block mb-0.5">{step.label}</span>
                                <span className="text-xs text-gray-400 font-medium">{step.description}</span>
                            </div>
                        </div>
                        <div className="relative z-10 pl-2">
                            {step.completed ? (
                                <CheckCircle2 size={24} className="text-green-500" />
                            ) : (
                                <Circle size={24} className="text-gray-300 group-hover:text-blue-300 transition-colors" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Footer Action */}
            <div className="flex justify-end items-center border-t border-gray-100 pt-6">
                <GlassButton
                    onClick={handleCompleteProfile}
                    className={`
                        shadow-md px-8 py-2.5 transition-all duration-300 rounded-xl
                        ${currentProgress >= 100
                            ? "bg-blue-600 hover:bg-blue-700 text-white translate-y-0 opacity-100"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed border-none shadow-none opacity-50"
                        }
                    `}
                    disabled={currentProgress < 100}
                >
                    Complete Profile & Unlock Dashboard
                </GlassButton>
            </div>
        </GlassCard>
    );
}

