"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { Briefcase, Search } from "lucide-react";

export default function RecruiterDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 flex items-center justify-center relative overflow-hidden">
            {/* Background Mesh */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-purple-100/30 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-blue-100/30 rounded-full blur-[150px]" />
            </div>

            <div className="w-full max-w-4xl relative z-10 text-center">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Welcome to Recruiter Suite</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <GlassCard className="p-12 hover:shadow-lg transition-all cursor-pointer group bg-white border border-gray-200">
                        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Briefcase size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Post a Job</h2>
                        <p className="text-gray-600 mb-6">AI will match candidates instantly.</p>
                        <GlassButton variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white border-none">Create Listing</GlassButton>
                    </GlassCard>

                    <GlassCard className="p-12 hover:shadow-lg transition-all cursor-pointer group bg-white border border-gray-200">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Search size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Search Talent</h2>
                        <p className="text-gray-600 mb-6">Browse verified skills & badges.</p>
                        <GlassButton variant="secondary" className="border-gray-300 text-gray-700 hover:bg-gray-100">Browse Pool</GlassButton>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
