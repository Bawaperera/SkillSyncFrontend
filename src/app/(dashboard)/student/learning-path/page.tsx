"use client";

import { CareerVelocityHeader } from "@/components/student/learning-path/CareerVelocityHeader";
import { TimelineNode } from "@/components/student/learning-path/TimelineNode";
import { CourseCard } from "@/components/student/learning-path/CourseCard";
import { CapstoneCard } from "@/components/student/learning-path/CapstoneCard";
import { ExternalLink, BookOpen, MonitorPlay } from "lucide-react";
import { useApi } from "@/lib/hooks/useApi";
import { getLearningPaths } from "@/lib/api/student-api";

export default function LearningPathPage() {
    const { data: paths, loading, error } = useApi(() => getLearningPaths(), []);

    const path = paths?.[0];
    const nodes = path?.nodes ?? [];

    if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading learning path...</div>;
    if (error || !path) return <div className="flex items-center justify-center h-64 text-red-500">Failed to load learning path.</div>;

    return (
        <div className="min-h-screen pb-20 bg-[#F5F7FA]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CareerVelocityHeader
                    jobGoal={path.jobGoal}
                    progress={path.progress}
                    totalCourses={path.totalCourses}
                    completedCourses={path.completedCourses}
                    companyTarget={path.companyTarget}
                />

                <div className="relative">
                    {nodes.map((node, index) => {
                        const isLast = index === nodes.length - 1;
                        return (
                            <div key={node.id} className="flex">
                                <div className="shrink-0">
                                    <TimelineNode status={node.status} isLast={isLast} />
                                </div>
                                <div className="grow pb-8">
                                    {node.type === 'project' ? (
                                        <CapstoneCard
                                            title={node.title}
                                            description="Apply your Docker & Kubernetes skills. Build a simple API and deploy it."
                                            technologies={["Docker", "Kubernetes", "Node.js"]}
                                            status="active"
                                        />
                                    ) : (
                                        <CourseCard node={node} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Supplemental Resources */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Supplemental Resources</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <a href="#" className="block p-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all group">
                            <div className="flex items-start justify-between mb-2">
                                <BookOpen size={20} className="text-blue-600" />
                                <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">System Design Primer</h4>
                            <p className="text-sm text-gray-500">Great article on scaling distributed systems.</p>
                        </a>
                        <a href="#" className="block p-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-all group">
                            <div className="flex items-start justify-between mb-2">
                                <MonitorPlay size={20} className="text-red-500" />
                                <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">React Advanced Patterns</h4>
                            <p className="text-sm text-gray-500">YouTube crash course by FrontendMasters.</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
