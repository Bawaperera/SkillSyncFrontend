"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Rocket, Clock, Target } from "lucide-react";

interface CareerVelocityHeaderProps {
    jobGoal: string;
    progress: number;
    totalCourses: number;
    completedCourses: number;
    companyTarget?: string;
}

export function CareerVelocityHeader({ jobGoal, progress, totalCourses, completedCourses, companyTarget }: CareerVelocityHeaderProps) {
    const remainingCourses = totalCourses - completedCourses;

    return (
        <GlassCard className="p-6 md:p-8 relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                            <Rocket size={16} /> Career Velocity
                        </h2>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            Path to {jobGoal}
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                            <Clock size={14} /> Est. 2 Weeks
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                            <Target size={14} /> Mid Level
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-white font-medium">{progress}% Complete</span>
                        <span className="text-gray-400">{completedCourses}/{totalCourses} Modules</span>
                    </div>
                    <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base">
                    "You are <span className="text-white font-bold">{remainingCourses} courses</span> away from qualifying for
                    {companyTarget ? ` roles at ${companyTarget} and similar companies` : " 15+ new job opportunities"}."
                </p>
            </div>
        </GlassCard>
    );
}
