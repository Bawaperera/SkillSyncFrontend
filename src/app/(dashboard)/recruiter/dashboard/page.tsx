"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { Briefcase, Search } from "lucide-react";

export default function RecruiterDashboard() {
    return (
        <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center relative overflow-hidden">
            {/* Background Mesh */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-purple-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[150px]" />
            </div>

            <div className="w-full max-w-4xl relative z-10 text-center">
                <h1 className="text-4xl font-bold mb-8">Welcome to Recruiter Suite</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <GlassCard className="p-12 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Briefcase size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Post a Job</h2>
                        <p className="text-gray-400 mb-6">AI will match candidates instantly.</p>
                        <GlassButton variant="primary">Create Listing</GlassButton>
                    </GlassCard>

                    <GlassCard className="p-12 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Search size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Search Talent</h2>
                        <p className="text-gray-400 mb-6">Browse verified skills & badges.</p>
                        <GlassButton variant="secondary">Browse Pool</GlassButton>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
