"use client";

import { CareerVelocityHeader } from "@/components/student/learning-path/CareerVelocityHeader";
import { TimelineNode } from "@/components/student/learning-path/TimelineNode";
import { CourseCard } from "@/components/student/learning-path/CourseCard";
import { CapstoneCard } from "@/components/student/learning-path/CapstoneCard";
import { LearningNode, LearningPath } from "@/types/learning-path";
import { ExternalLink, BookOpen, MonitorPlay } from "lucide-react";

// Mock Data
const MOCK_NODES: LearningNode[] = [
    {
        id: "1",
        title: "Docker Fundamentals",
        provider: "SkillSync Academy",
        duration: "4 Hours",
        status: "completed",
        type: "course",
        matchBoost: 5,
        resources: [
            { label: "Cheat Sheet", url: "#", type: "documentation" }
        ]
    },
    {
        id: "2",
        title: "Kubernetes Orchestration",
        provider: "Udemy",
        duration: "12 Hours",
        status: "in-progress",
        progress: 45,
        type: "course",
        matchBoost: 8,
        resources: [
            { label: "K8s Documentation", url: "https://kubernetes.io/docs/home/", type: "documentation" },
            { label: "Interactive Tutorial", url: "#", type: "article" }
        ]
    },
    {
        id: "3",
        title: "Build a Microservice API",
        provider: "Project",
        duration: "2 Days",
        status: "active", // Using 'active' for Capstone status logic reuse
        type: "project",
        matchBoost: 15,
    } as any, // Cast for CapstoneCard usage
    {
        id: "4",
        title: "AWS Cloud Deployment",
        provider: "AWS Certified",
        duration: "8 Hours",
        status: "locked",
        type: "course",
        matchBoost: 10,
        prerequisites: ["Kubernetes Orchestration"],
    }
];

const MOCK_PATH: LearningPath = {
    id: "path-1",
    jobGoal: "Full-Stack Developer",
    companyTarget: "Tech Innovations Ltd",
    progress: 35,
    totalCourses: 10,
    completedCourses: 1, // Only 1 completed in nodes list for demo
    nodes: MOCK_NODES
};

export default function LearningPathPage() {
    return (
        <div className="min-h-screen pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CareerVelocityHeader
                    jobGoal={MOCK_PATH.jobGoal}
                    progress={MOCK_PATH.progress}
                    totalCourses={MOCK_PATH.totalCourses}
                    completedCourses={MOCK_PATH.completedCourses}
                    companyTarget={MOCK_PATH.companyTarget}
                />

                <div className="relative">
                    {MOCK_NODES.map((node, index) => {
                        const isLast = index === MOCK_NODES.length - 1;
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
                <div className="mt-12 pt-8 border-t border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6">Supplemental Resources</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <a href="#" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                            <div className="flex items-start justify-between mb-2">
                                <BookOpen size={20} className="text-blue-400" />
                                <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="font-bold text-white mb-1">System Design Primer</h4>
                            <p className="text-sm text-gray-400">Great article on scaling distributed systems.</p>
                        </a>
                        <a href="#" className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                            <div className="flex items-start justify-between mb-2">
                                <MonitorPlay size={20} className="text-red-400" />
                                <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="font-bold text-white mb-1">React Advanced Patterns</h4>
                            <p className="text-sm text-gray-400">YouTube crash course by FrontendMasters.</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
