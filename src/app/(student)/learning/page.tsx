"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { CheckCircle, Lock, Play, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const learningSteps = [
    {
        id: 1,
        title: "HTML5 & CSS3 Architecture",
        type: "Foundation",
        status: "completed",
        duration: "2 weeks",
        modules: 12
    },
    {
        id: 2,
        title: "JavaScript ES6+ Deep Dive",
        type: "Core",
        status: "completed",
        duration: "3 weeks",
        modules: 18
    },
    {
        id: 3,
        title: "React & State Management",
        type: "Framework",
        status: "completed",
        duration: "4 weeks",
        modules: 24
    },
    {
        id: 4,
        title: "Docker & Containerization",
        type: "DevOps",
        status: "active",
        duration: "1 week",
        modules: 8,
        progress: 35,
        impact: "+8%"
    },
    {
        id: 5,
        title: "AWS Fundamentals",
        type: "Cloud",
        status: "locked",
        duration: "3 weeks",
        modules: 15
    },
    {
        id: 6,
        title: "CI/CD Pipelines",
        type: "DevOps",
        status: "locked",
        duration: "2 weeks",
        modules: 10
    }
];

export default function LearningPathPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Learning Path</h1>
                <p className="text-gray-400">Personalized roadmap to reach &quot;Senior Full Stack Developer&quot;</p>
            </div>

            <div className="relative pl-8 border-l border-white/10 space-y-12">
                {learningSteps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        {/* Timeline Dot */}
                        <div className={cn(
                            "absolute -left-[41px] top-6 w-5 h-5 rounded-full border-4 border-[#0f172a] transition-colors",
                            step.status === 'completed' ? "bg-green-500" :
                                step.status === 'active' ? "bg-blue-500 animate-pulse" :
                                    "bg-gray-700"
                        )} />

                        <GlassCard
                            className={cn(
                                "w-full transition-all duration-300",
                                step.status === 'active' ? "ring-2 ring-blue-500/50 bg-blue-500/5" :
                                    step.status === 'locked' ? "opacity-60 grayscale" : "hover:bg-white/10"
                            )}
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={cn(
                                            "text-xs font-bold px-2 py-1 rounded uppercase",
                                            step.status === 'active' ? "bg-blue-500/20 text-blue-300" : "bg-white/10 text-gray-400"
                                        )}>
                                            {step.type}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {step.duration}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>

                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" /> {step.modules} Modules
                                        </span>
                                        {step.impact && (
                                            <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded">
                                                Boosts Match Score by {step.impact}
                                            </span>
                                        )}
                                    </div>

                                    {step.status === 'active' && (
                                        <div className="mt-4">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-blue-300">In Progress</span>
                                                <span className="text-white">{step.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500"
                                                    style={{ width: `${step.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-center min-w-[120px]">
                                    {step.status === 'completed' && (
                                        <div className="text-green-500 flex flex-col items-center">
                                            <CheckCircle className="w-8 h-8 mb-1" />
                                            <span className="text-xs font-bold">Completed</span>
                                        </div>
                                    )}
                                    {step.status === 'active' && (
                                        <GlassButton variant="primary" className="w-full">
                                            <Play className="w-4 h-4 mr-2" /> Resume
                                        </GlassButton>
                                    )}
                                    {step.status === 'locked' && (
                                        <div className="text-gray-500 flex flex-col items-center">
                                            <Lock className="w-8 h-8 mb-1" />
                                            <span className="text-xs font-bold">Locked</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
