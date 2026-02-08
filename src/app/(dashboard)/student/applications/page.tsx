"use client";

import { ApplicationStats } from "@/components/student/applications/ApplicationStats";
import { ApplicationCard } from "@/components/student/applications/ApplicationCard";
import { Application } from "@/types/applications";
import { useState } from "react";

// Mock Data
const APPLICATIONS: Application[] = [
    {
        id: "1",
        jobId: "j1",
        jobTitle: "Senior Full-Stack Developer",
        company: "TechCorp LK",
        location: "Colombo (Hybrid)",
        appliedDate: "15 Jan 2024",
        status: "Interview",
        matchScore: 92,
        steps: [
            { label: "Applied", status: "completed", date: "Jan 15" },
            { label: "Screening", status: "completed", date: "Jan 20" },
            { label: "Interview", status: "current", date: "Jan 25" },
            { label: "Offer", status: "pending" },
        ],
        nextAction: {
            type: "interview",
            date: "Jan 25, 2024 @ 10:00 AM",
            link: "https://meet.google.com/abc-defg-hij",
        },
    },
    {
        id: "2",
        jobId: "j2",
        jobTitle: "Frontend Engineer",
        company: "StartupXYZ",
        location: "Remote",
        appliedDate: "10 Jan 2024",
        status: "Screening",
        matchScore: 85,
        steps: [
            { label: "Applied", status: "completed", date: "Jan 10" },
            { label: "Screening", status: "current", date: "Jan 12" },
            { label: "Interview", status: "pending" },
            { label: "Offer", status: "pending" },
        ],
    },
    {
        id: "3",
        jobId: "j3",
        jobTitle: "Backend Developer",
        company: "Enterprise Solutions",
        location: "Kandy",
        appliedDate: "05 Jan 2024",
        status: "Rejected",
        matchScore: 60,
        steps: [
            { label: "Applied", status: "completed", date: "Jan 05" },
            { label: "Screening", status: "completed", date: "Jan 08" },
            { label: "Rejected", status: "current", date: "Jan 09" },
        ],
        feedback: {
            reason: "Experience Mismatch",
            gap: "Java (3+ years)",
        },
    },
];

const TABS = ["All Applications", "Active", "Interview", "Archived"];

export default function ApplicationsPage() {
    const [activeTab, setActiveTab] = useState("All Applications");

    const filteredApps = APPLICATIONS.filter(app => {
        if (activeTab === "All Applications") return true;
        if (activeTab === "Active") return ["Applied", "Screening", "Interview"].includes(app.status);
        if (activeTab === "Interview") return app.status === "Interview";
        if (activeTab === "Archived") return ["Rejected", "Offer"].includes(app.status);
        return true;
    });

    return (
        <div className="min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
                    <p className="text-gray-400">Track and manage your job applications in one place.</p>
                </div>

                {/* Stats */}
                <ApplicationStats />

                {/* Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/10">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === tab ? "text-blue-400" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400" />
                            )}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-6">
                    {filteredApps.map(app => (
                        <ApplicationCard key={app.id} app={app} />
                    ))}
                </div>
            </div>
        </div>
    );
}
