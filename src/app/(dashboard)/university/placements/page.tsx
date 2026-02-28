"use client";

import React, { useState } from "react";
import {
    Filter, Download, Share2, Target, TrendingUp, Search, UserCheck, Users, Briefcase, ChevronRight, Award
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProgrammeData {
    name: string;
    eligible: number;
    seeking: number;
    secured: number;
    rate: number;
    trend: number;
}

interface CompanyData {
    id: string;
    rank: number;
    name: string;
    interns: number;
    roles: { role: string; count: number }[];
}

interface RoleData {
    name: string;
    students: number;
    percent: number;
    duration: number; // in months
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PROGRAMMES: ProgrammeData[] = [
    { name: "Computer Science & SE", eligible: 398, seeking: 198, secured: 187, rate: 94, trend: 1 },
    { name: "Data Science", eligible: 187, seeking: 89, secured: 78, rate: 88, trend: 1 },
    { name: "IT Management", eligible: 168, seeking: 98, secured: 82, rate: 84, trend: 0 },
    { name: "Cybersecurity", eligible: 94, seeking: 47, secured: 32, rate: 68, trend: -1 },
];

const COMPANIES: CompanyData[] = [
    { id: "c1", rank: 1, name: "99X Technology", interns: 87, roles: [{ role: "Full-Stack", count: 42 }, { role: "Backend", count: 28 }, { role: "QA/Testing", count: 17 }] },
    { id: "c2", rank: 2, name: "Virtusa", interns: 68, roles: [{ role: "Backend", count: 35 }, { role: "Full-Stack", count: 24 }, { role: "DevOps", count: 9 }] },
    { id: "c3", rank: 3, name: "WSO2", interns: 54, roles: [{ role: "Java Dev", count: 32 }, { role: "QA", count: 22 }] },
    { id: "c4", rank: 4, name: "IFS", interns: 47, roles: [{ role: "C#/.NET", count: 28 }, { role: "Support", count: 19 }] },
    { id: "c5", rank: 5, name: "Sysco Labs", interns: 42, roles: [{ role: "Full-Stack", count: 24 }, { role: "Data", count: 18 }] },
    { id: "c6", rank: 6, name: "Dialog Axiata", interns: 38, roles: [] },
    { id: "c7", rank: 7, name: "Brandix", interns: 32, roles: [] },
    { id: "c8", rank: 8, name: "John Keells", interns: 28, roles: [] },
    { id: "c9", rank: 9, name: "hSenid", interns: 24, roles: [] },
    { id: "c10", rank: 10, name: "Pearson Lanka", interns: 21, roles: [] },
];

const ROLES: RoleData[] = [
    { name: "Full-Stack Developer", students: 145, percent: 35, duration: 5.8 },
    { name: "Backend Developer", students: 98, percent: 24, duration: 5.2 },
    { name: "QA / Testing", students: 67, percent: 16, duration: 4.5 },
    { name: "Frontend Developer", students: 48, percent: 12, duration: 4.8 },
    { name: "Data Analyst/Science", students: 32, percent: 8, duration: 6.2 },
    { name: "DevOps / Cloud", students: 15, percent: 4, duration: 5.5 },
    { name: "Mobile Developer", students: 10, percent: 2, duration: 4.2 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getStatusLabel(rate: number) {
    if (rate >= 80) return <span className="px-2 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-600 rounded">High</span>;
    if (rate >= 60) return <span className="px-2 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-600 rounded">Medium</span>;
    return <span className="px-2 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-600 rounded">Low</span>;
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function PlacementsTrackingPage() {
    return (
        <div className="space-y-6 pb-20">
            {/* ── Header ────────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Placement Tracking</h1>
                    <p className="text-sm text-gray-500 mt-1">Academic Year 2024/25</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                        <Download size={13} className="text-gray-500" /> Export Report
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                        <Share2 size={13} className="text-gray-500" /> Share
                    </button>
                </div>
            </div>

            {/* ── Filters ───────────────────────────────────────────────── */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mr-2">
                    <Filter size={16} /> Filters & Scope
                </div>

                <select className="bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400 min-w-[140px]">
                    <option>Academic Year: 2024/25</option>
                    <option>Academic Year: 2023/24</option>
                </select>

                <select className="bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400 min-w-[140px]">
                    <option>All Programmes</option>
                    <option>Computer Science</option>
                    <option>Information Tech</option>
                    <option>Data Science</option>
                    <option>Cybersecurity</option>
                </select>

                <select className="bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400 min-w-[140px]">
                    <option>Status: All</option>
                    <option>Secured</option>
                    <option>Seeking</option>
                    <option>Not Seeking</option>
                </select>
            </div>

            {/* ── Summary Stats ─────────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Users size={14} className="text-gray-400" /> Internship Seekers
                        </p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">847</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Search size={14} className="text-gray-400" /> Actively Seeking
                        </p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">432</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Briefcase size={14} className="text-gray-400" /> Secured Internships
                        </p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">415</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <TrendingUp size={14} className="text-gray-400" /> Success Rate
                        </p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">49%</p>
                </div>
            </div>

            {/* ── Placement Funnel & Programme Success ───────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Visual Funnel */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                        Internship Placement Funnel <span className="text-gray-400 normal-case font-normal">(Current Semester)</span>
                    </h2>

                    <div className="space-y-6 flex-1">
                        {/* Stage 1 */}
                        <div className="relative">
                            <div className="flex justify-between text-sm font-medium mb-1">
                                <span className="text-gray-700 text-base">Total Eligible Students</span>
                                <span className="text-gray-900 font-bold">847 (100%)</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-md overflow-hidden">
                                <div className="h-full bg-slate-400 rounded-md" style={{ width: '100%' }}></div>
                            </div>
                        </div>

                        {/* Stage 2 */}
                        <div className="relative border-l-2 border-dashed border-gray-200 ml-4 pl-4">
                            <div className="flex justify-between text-sm font-medium mb-1 pt-2">
                                <span className="text-gray-700">Actively Seeking Internships</span>
                                <span className="text-gray-900 font-bold">432 (51%)</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-md overflow-hidden">
                                <div className="h-full bg-slate-500 rounded-md" style={{ width: '51%' }}></div>
                            </div>
                        </div>

                        {/* Stage 3 */}
                        <div className="relative border-l-2 border-dashed border-gray-200 ml-8 pl-4">
                            <div className="flex justify-between text-sm font-medium mb-1 pt-2">
                                <span className="text-gray-700">Applied to Companies <span className="text-xs text-gray-400">(via SkillSync)</span></span>
                                <span className="text-gray-900 font-bold">387 (46%)</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-md overflow-hidden">
                                <div className="h-full bg-slate-600 rounded-md" style={{ width: '46%' }}></div>
                            </div>
                        </div>

                        {/* Stage 4 */}
                        <div className="relative border-l-2 border-dashed border-gray-200 ml-12 pl-4">
                            <div className="flex justify-between text-sm font-medium mb-1 pt-2">
                                <span className="text-gray-700">Got Interview Invitations</span>
                                <span className="text-gray-900 font-bold">298 (35%)</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-md overflow-hidden">
                                <div className="h-full bg-slate-700 rounded-md" style={{ width: '35%' }}></div>
                            </div>
                        </div>

                        {/* Stage 5 */}
                        <div className="relative border-l-2 border-dashed border-gray-200 ml-16 pl-4">
                            <div className="flex justify-between text-sm font-medium mb-1 pt-2">
                                <span className="text-gray-900 font-bold">Secured Internship Offers</span>
                                <span className="text-gray-900 font-bold text-lg">415 (49%)</span>
                            </div>
                            <div className="h-5 bg-gray-100 overflow-hidden rounded-md shadow-inner border border-gray-200">
                                <div className="h-full bg-slate-700" style={{ width: '49%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success By Programme */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                        Internship Success By Programme
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Programme</th>
                                    <th className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Eligible</th>
                                    <th className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Seeking</th>
                                    <th className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Secured</th>
                                    <th className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Success%</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {PROGRAMMES.map((prog, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50">
                                        <td className="py-4">
                                            <div className="font-bold text-gray-900 text-sm mb-1.5">{prog.name}</div>
                                            <div className="h-2 bg-gray-100 rounded-full w-48 overflow-hidden">
                                                <div className="h-full bg-slate-600" style={{ width: `${prog.rate}%` }}></div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-sm text-gray-500 text-right">{prog.eligible}</td>
                                        <td className="py-4 text-sm text-gray-500 text-right">{prog.seeking}</td>
                                        <td className="py-4 text-sm font-bold text-gray-900 text-right">{prog.secured}</td>
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="font-bold text-gray-900">{prog.rate}%</span>
                                                {getStatusLabel(prog.rate)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ── Top Companies & Duration ───────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Top Companies */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm lg:col-span-2 flex flex-col">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                            Top Internship Hiring Companies
                        </h2>
                    </div>

                    <div className="flex-1 p-0 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">Rank</th>
                                    <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Interns</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {COMPANIES.map(company => (
                                    <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-6 text-sm font-bold text-gray-400">{company.rank}.</td>
                                        <td className="py-3 px-6">
                                            <div className="font-bold text-gray-900 text-sm">{company.name}</div>
                                            {company.roles.length > 0 && (
                                                <div className="text-[11px] text-gray-500 mt-1 flex gap-2">
                                                    <span className="font-semibold text-gray-400">Roles:</span>
                                                    {company.roles.map((r, i) => (
                                                        <span key={i}>{r.role}({r.count}){i < company.roles.length - 1 ? ', ' : ''}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-right font-bold text-gray-900">{company.interns}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">Total: 47 companies hiring</span>
                        <button className="text-xs font-semibold text-gray-600 hover:text-gray-800 flex items-center gap-1">
                            View All 47 Companies <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Duration & Insights */}
                <div className="flex flex-col gap-6">
                    {/* Duration Info */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                            Internship By Duration
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="font-medium text-gray-700">3 months</span>
                                    <span className="font-bold text-gray-900">142 (34%)</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400" style={{ width: '34%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="font-medium text-gray-700">6 months</span>
                                    <span className="font-bold text-gray-900">198 (48%)</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-500" style={{ width: '48%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="font-medium text-gray-700">12 months</span>
                                    <span className="font-bold text-gray-900">75 (18%)</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-600" style={{ width: '18%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-3 bg-stone-50 border border-gray-200 rounded-lg">
                            <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 mb-1">
                                Most common: 6 months
                            </h4>
                            <p className="text-[11px] text-gray-600">Industry prefers semester-long internships. Consider adjusting 3-month practicums to 6-months.</p>
                        </div>
                    </div>

                    {/* General Insight Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm p-5 flex-1 flex flex-col justify-center">
                        <div className="flex items-start gap-3">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 mb-1">Strategic Insight</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    <b>99X, Virtusa, and WSO2</b> are your top recruiters.
                                    Strong partnerships here are worth maintaining or expanding for future graduate employment pipelines.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Role Types Table ───────────────────────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        Internship By Role Type
                    </h2>
                </div>

                <div className="p-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[35%]">Role Type</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%] text-right">Students</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%] text-right">% of Total</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[35%] pl-6">Distribution</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {ROLES.map((role, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 font-bold text-gray-900 text-sm">{role.name}</td>
                                    <td className="py-4 font-semibold text-gray-700 text-right">{role.students}</td>
                                    <td className="py-4 text-sm font-bold text-gray-900 text-right">{role.percent}%</td>
                                    <td className="py-4 pl-6">
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden w-full max-w-[200px]">
                                            <div className="h-full bg-slate-700" style={{ width: `${role.percent}%` }}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-6 p-4 bg-stone-50 border border-gray-200 rounded-lg flex items-start gap-3">
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">Curriculum Alignment Insight</h4>
                            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                                Full-Stack internships are the most common (<b className="text-slate-800">35%</b>).
                                Curriculum should heavily prepare students for full-stack roles.
                                DevOps and Mobile roles have fewer entry-level internship opportunities — set student expectations accordingly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
