"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { BarChart3, Users } from "lucide-react";

export default function UniversityDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 flex items-center justify-center relative overflow-hidden">
            {/* Background Mesh */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-pink-100/30 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-orange-100/30 rounded-full blur-[150px]" />
            </div>

            <div className="w-full max-w-4xl relative z-10 text-center">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Welcome, Dean Perera</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <GlassCard className="p-12 hover:shadow-lg transition-all cursor-pointer group bg-white border border-gray-200">
                        <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <BarChart3 size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Curriculum Heatmap</h2>
                        <p className="text-gray-600 mb-6">View skill gaps in real-time.</p>
                        <GlassButton variant="primary" className="bg-pink-600 hover:bg-pink-700 text-white border-none">View Analytics</GlassButton>
                    </GlassCard>

                    <GlassCard className="p-12 hover:shadow-lg transition-all cursor-pointer group bg-white border border-gray-200">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Users size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Manage Students</h2>
                        <p className="text-gray-600 mb-6">Track placement & performance.</p>
                        <GlassButton variant="secondary" className="border-gray-300 text-gray-700 hover:bg-gray-100">View Cohorts</GlassButton>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
