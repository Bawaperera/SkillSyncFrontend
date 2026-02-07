"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { CURRENT_STUDENT, MOCK_NOTIFICATIONS } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Award, AlertCircle, Eye, ArrowUp, Briefcase, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const data = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 68 },
    { name: 'Mar', score: 75 },
    { name: 'Apr', score: 72 },
    { name: 'May', score: 78 },
    { name: 'Jun', score: 82 },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Welcome back, {CURRENT_STUDENT.name.split(' ')[0]}! 👋</h1>
                    <p className="text-gray-400">Your skill profile is looking great today.</p>
                </div>
                <Link href="/jobs">
                    <GlassButton variant="primary" className="bg-gradient-to-r from-blue-600 to-purple-600">
                        Find Jobs
                    </GlassButton>
                </Link>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard hoverEffect>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <Award className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-green-500/20 text-green-400 flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" /> +12%
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{CURRENT_STUDENT.skillScore}%</h3>
                    <p className="text-sm text-gray-400">Overall Skill Score</p>
                </GlassCard>

                <GlassCard hoverEffect>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{CURRENT_STUDENT.verifiedSkillsCount}</h3>
                    <p className="text-sm text-gray-400">Verified Skills</p>
                </GlassCard>

                <GlassCard hoverEffect>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">5</h3>
                    <p className="text-sm text-gray-400">Critical Skill Gaps</p>
                </GlassCard>

                <GlassCard hoverEffect>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
                            <Eye className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-green-500/20 text-green-400 flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" /> +5
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">128</h3>
                    <p className="text-sm text-gray-400">Profile Views</p>
                </GlassCard>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="lg:col-span-2">
                    <GlassCard className="h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Skill Growth Trajectory</h3>
                            <select className="bg-white/5 border border-white/10 rounded-lg text-sm px-3 py-1 outline-none">
                                <option>Last 6 Months</option>
                                <option>Year to Date</option>
                            </select>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </GlassCard>
                </div>

                {/* Recent Activity Feed */}
                <div className="lg:col-span-1">
                    <GlassCard className="h-full">
                        <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {MOCK_NOTIFICATIONS.map((notif) => (
                                <div key={notif.id} className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <div className="w-px h-full bg-blue-500/20 mx-auto my-1" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1">{notif.title}</h4>
                                        <p className="text-xs text-gray-400 mb-2">{notif.message}</p>
                                        <span className="text-xs text-blue-400">{notif.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/learning" className="block mt-6">
                            <GlassButton variant="secondary" className="w-full text-sm py-2">View All Activity</GlassButton>
                        </Link>
                    </GlassCard>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard hoverEffect className="group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white group-hover:scale-110 transition-transform">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold">Find Jobs</h3>
                            <p className="text-xs text-gray-400">Explore matched roles</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard hoverEffect className="group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold">Update CV</h3>
                            <p className="text-xs text-gray-400">Refresh your profile</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard hoverEffect className="group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white group-hover:scale-110 transition-transform">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold">Continue Learning</h3>
                            <p className="text-xs text-gray-400">Resume &quot;Docker Mastery&quot;</p>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
