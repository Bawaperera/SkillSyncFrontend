"use client";

import { useState, useMemo } from "react";
import {
    Users, Target, Github, FileText, TrendingUp,
    AlertTriangle, CheckCircle, ArrowRight, Info,
    ChevronDown, Download, BookOpen,
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell,
} from "recharts";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Programme {
    name: string;
    students: number;
    avgScore: number;
    profileCompletion: number;
    githubRate: number;
    cvRate: number;
    atRisk: number; // count of students scoring <40
}

interface MissingSkill {
    skill: string;
    studentsLacking: number;
    category: string;
    severity: "critical" | "moderate" | "low";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PROGRAMMES: Programme[] = [
    { name: "Computer Science & SE", students: 342, avgScore: 79, profileCompletion: 91, githubRate: 88, cvRate: 82, atRisk: 21 },
    { name: "Data Science", students: 218, avgScore: 74, profileCompletion: 89, githubRate: 71, cvRate: 90, atRisk: 29 },
    { name: "Information Technology", students: 287, avgScore: 68, profileCompletion: 82, githubRate: 63, cvRate: 74, atRisk: 48 },
    { name: "Software Engineering", students: 224, avgScore: 76, profileCompletion: 87, githubRate: 82, cvRate: 79, atRisk: 31 },
    { name: "Cybersecurity", students: 176, avgScore: 61, profileCompletion: 78, githubRate: 55, cvRate: 67, atRisk: 52 },
];

const MISSING_SKILLS: MissingSkill[] = [
    { skill: "TypeScript", studentsLacking: 968, category: "Frontend", severity: "critical" },
    { skill: "Docker", studentsLacking: 847, category: "DevOps", severity: "critical" },
    { skill: "AWS / Cloud", studentsLacking: 765, category: "Cloud", severity: "critical" },
    { skill: "Kubernetes", studentsLacking: 682, category: "DevOps", severity: "moderate" },
    { skill: "System Design", studentsLacking: 598, category: "Architecture", severity: "moderate" },
    { skill: "CI/CD Practices", studentsLacking: 541, category: "DevOps", severity: "moderate" },
    { skill: "React / Next.js", studentsLacking: 487, category: "Frontend", severity: "moderate" },
    { skill: "GraphQL", studentsLacking: 415, category: "Backend", severity: "low" },
];

// Score distribution (histogram): score range → number of students
const SCORE_DISTRIBUTION_ALL = [
    { range: "0–20", count: 62, color: "#EF4444" },
    { range: "21–40", count: 125, color: "#F97316" },
    { range: "41–60", count: 287, color: "#EAB308" },
    { range: "61–80", count: 521, color: "#22C55E" },
    { range: "81–100", count: 252, color: "#2563EB" },
];

const SCORE_BY_PROGRAMME: Record<string, typeof SCORE_DISTRIBUTION_ALL> = {
    "Computer Science & SE": [
        { range: "0–20", count: 5, color: "#EF4444" },
        { range: "21–40", count: 16, color: "#F97316" },
        { range: "41–60", count: 62, color: "#EAB308" },
        { range: "61–80", count: 148, color: "#22C55E" },
        { range: "81–100", count: 111, color: "#2563EB" },
    ],
    "Data Science": [
        { range: "0–20", count: 10, color: "#EF4444" },
        { range: "21–40", count: 19, color: "#F97316" },
        { range: "41–60", count: 55, color: "#EAB308" },
        { range: "61–80", count: 98, color: "#22C55E" },
        { range: "81–100", count: 36, color: "#2563EB" },
    ],
    "Information Technology": [
        { range: "0–20", count: 20, color: "#EF4444" },
        { range: "21–40", count: 28, color: "#F97316" },
        { range: "41–60", count: 90, color: "#EAB308" },
        { range: "61–80", count: 115, color: "#22C55E" },
        { range: "81–100", count: 34, color: "#2563EB" },
    ],
    "Software Engineering": [
        { range: "0–20", count: 8, color: "#EF4444" },
        { range: "21–40", count: 23, color: "#F97316" },
        { range: "41–60", count: 48, color: "#EAB308" },
        { range: "61–80", count: 105, color: "#22C55E" },
        { range: "81–100", count: 40, color: "#2563EB" },
    ],
    "Cybersecurity": [
        { range: "0–20", count: 19, color: "#EF4444" },
        { range: "21–40", count: 39, color: "#F97316" },
        { range: "41–60", count: 32, color: "#EAB308" },
        { range: "61–80", count: 55, color: "#22C55E" },
        { range: "81–100", count: 31, color: "#2563EB" },
    ],
};

const TOTAL_STUDENTS = PROGRAMMES.reduce((a, p) => a + p.students, 0);
const AVG_SCORE = Math.round(PROGRAMMES.reduce((a, p) => a + p.avgScore * p.students, 0) / TOTAL_STUDENTS);
const AVG_PROFILE = Math.round(PROGRAMMES.reduce((a, p) => a + p.profileCompletion * p.students, 0) / TOTAL_STUDENTS);
const AVG_GITHUB = Math.round(PROGRAMMES.reduce((a, p) => a + p.githubRate * p.students, 0) / TOTAL_STUDENTS);
const AVG_CV = Math.round(PROGRAMMES.reduce((a, p) => a + p.cvRate * p.students, 0) / TOTAL_STUDENTS);
const TOTAL_AT_RISK = PROGRAMMES.reduce((a, p) => a + p.atRisk, 0);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
    if (score >= 75) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-500";
}

function severityColor(s: MissingSkill["severity"]) {
    if (s === "critical") return "bg-red-100 text-red-700 border-red-200";
    if (s === "moderate") return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
    const pct = Math.round((value / max) * 100);
    return (
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: color }}
            />
        </div>
    );
}

// Custom bar chart tooltip
function DistTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xs shadow-xl">
            <p className="font-bold mb-0.5">Score {label}</p>
            <p className="text-gray-300">{payload[0].value} students</p>
        </div>
    );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, icon: Icon, accent = false }: {
    label: string; value: string; sub: string;
    icon: React.ElementType; accent?: boolean;
}) {
    return (
        <div className={`relative rounded-xl border p-5 flex flex-col gap-2.5 overflow-hidden transition-all hover:shadow-md ${accent ? "bg-blue-600 border-blue-500" : "bg-white border-gray-200 shadow-sm"}`}>
            {accent && <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />}
            <div className="flex items-center justify-between relative z-10">
                <p className={`text-xs font-semibold uppercase tracking-wide ${accent ? "text-blue-100" : "text-gray-500"}`}>{label}</p>
                <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${accent ? "bg-white/20" : "bg-blue-50"}`}>
                    <Icon size={15} className={accent ? "text-white" : "text-blue-600"} />
                </div>
            </div>
            <p className={`text-3xl font-extrabold tracking-tight ${accent ? "text-white" : "text-gray-900"}`}>{value}</p>
            <p className={`text-[11px] leading-snug ${accent ? "text-blue-100" : "text-gray-500"}`}>{sub}</p>
        </div>
    );
}

// ─── Programme Row ─────────────────────────────────────────────────────────────

function ProgrammeRow({ p, total }: { p: Programme; total: number }) {
    return (
        <tr className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
            <td className="py-3.5 pr-4 whitespace-nowrap">
                <p className="text-[13px] font-semibold text-gray-900">{p.name}</p>
                <p className="text-[11px] text-gray-400">{p.students} students · {p.atRisk} at risk</p>
            </td>
            <td className="py-3.5 px-3 text-center">
                <span className={`text-sm font-bold ${scoreColor(p.avgScore)}`}>{p.avgScore}</span>
                <span className="text-[10px] text-gray-400">/100</span>
            </td>
            <td className="py-3.5 px-3 w-36">
                <div className="flex items-center gap-2">
                    <ProgressBar value={p.profileCompletion} max={100} color="#2563EB" />
                    <span className="text-[11px] font-semibold text-gray-600 w-8 text-right">{p.profileCompletion}%</span>
                </div>
            </td>
            <td className="py-3.5 px-3 w-36">
                <div className="flex items-center gap-2">
                    <ProgressBar value={p.githubRate} max={100} color="#6366F1" />
                    <span className="text-[11px] font-semibold text-gray-600 w-8 text-right">{p.githubRate}%</span>
                </div>
            </td>
            <td className="py-3.5 px-3 w-36">
                <div className="flex items-center gap-2">
                    <ProgressBar value={p.cvRate} max={100} color="#10B981" />
                    <span className="text-[11px] font-semibold text-gray-600 w-8 text-right">{p.cvRate}%</span>
                </div>
            </td>
            <td className="py-3.5 pl-3 text-right">
                {p.atRisk > 35 ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                        <AlertTriangle size={9} /> High
                    </span>
                ) : p.atRisk > 20 ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Med
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle size={9} /> Good
                    </span>
                )}
            </td>
        </tr>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StudentAnalyticsPage() {
    const [selectedProgramme, setSelectedProgramme] = useState("All Programmes");
    const [showAllSkills, setShowAllSkills] = useState(false);

    const chartData = selectedProgramme === "All Programmes"
        ? SCORE_DISTRIBUTION_ALL
        : SCORE_BY_PROGRAMME[selectedProgramme] ?? SCORE_DISTRIBUTION_ALL;

    const totalInChart = chartData.reduce((a, b) => a + b.count, 0);
    const atRiskPct = Math.round(((chartData[0].count + chartData[1].count) / totalInChart) * 100);
    const avgPct = Math.round(((chartData[2].count + chartData[3].count) / totalInChart) * 100);
    const highPct = Math.round((chartData[4].count / totalInChart) * 100);

    const visibleSkills = showAllSkills ? MISSING_SKILLS : MISSING_SKILLS.slice(0, 5);

    return (
        <div className="space-y-6 pb-20">

            {/* ── Header ────────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Student Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">Aggregate performance metrics across all programmes · Academic Year 2024/25</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 bg-white shadow-sm transition-colors">
                    <Download size={14} /> Export Report
                </button>
            </div>

            {/* ── KPI Cards ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <KpiCard
                    label="Total Students"
                    value={TOTAL_STUDENTS.toLocaleString()}
                    sub="Enrolled across 5 programmes"
                    icon={Users}
                    accent
                />
                <KpiCard
                    label="Avg Skill Score"
                    value={`${AVG_SCORE}/100`}
                    sub="Across all active student profiles"
                    icon={Target}
                />
                <KpiCard
                    label="Profile Completion"
                    value={`${AVG_PROFILE}%`}
                    sub="Students with complete profiles"
                    icon={FileText}
                />
                <KpiCard
                    label="GitHub Connected"
                    value={`${AVG_GITHUB}%`}
                    sub="Verified GitHub accounts linked"
                    icon={Github}
                />
            </div>

            {/* ── Engagement Metrics Row ────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* CV Upload Rate */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex-shrink-0 flex items-center justify-center">
                        <FileText size={18} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">CV Upload Rate</p>
                        <p className="text-2xl font-extrabold text-gray-900">{AVG_CV}%</p>
                        <p className="text-[11px] text-gray-400">AI-analysed CVs submitted</p>
                    </div>
                </div>

                {/* At-Risk Students */}
                <div className="bg-white border border-red-100 rounded-xl p-4 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex-shrink-0 flex items-center justify-center">
                        <AlertTriangle size={18} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">At-Risk Students</p>
                        <p className="text-2xl font-extrabold text-red-600">{TOTAL_AT_RISK}</p>
                        <p className="text-[11px] text-gray-400">Scoring below 40 — need intervention</p>
                    </div>
                </div>

                {/* High Performers */}
                <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex-shrink-0 flex items-center justify-center">
                        <TrendingUp size={18} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">High Performers</p>
                        <p className="text-2xl font-extrabold text-blue-700">252</p>
                        <p className="text-[11px] text-gray-400">Scoring above 80 — placement ready</p>
                    </div>
                </div>
            </div>

            {/* ── Skill Score Distribution ──────────────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-100 bg-stone-50/50">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">📊 Skill Score Distribution</h2>
                        <p className="text-[11px] text-gray-500 mt-0.5">How scores spread across your student cohort</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 font-medium">Programme:</label>
                        <select
                            value={selectedProgramme}
                            onChange={e => setSelectedProgramme(e.target.value)}
                            className="text-xs font-semibold bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        >
                            <option value="All Programmes">All Programmes</option>
                            {PROGRAMMES.map(p => <option key={p.name}>{p.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="p-5">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={chartData} margin={{ top: 8, right: 16, bottom: 4, left: 0 }} barSize={56}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                            <XAxis dataKey="range" tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 500 }} />
                            <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} />
                            <Tooltip content={<DistTooltip />} cursor={{ fill: "#F1F5F9" }} />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                    {/* Distribution analysis */}
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
                        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-100">
                            <span className="text-base mt-0.5">🔴</span>
                            <div>
                                <p className="text-xs font-bold text-red-700">{atRiskPct}% At-Risk</p>
                                <p className="text-[10px] text-red-500 mt-0.5">Scoring &lt;40 — need immediate curriculum support or personal guidance</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-100">
                            <span className="text-base mt-0.5">🟡</span>
                            <div>
                                <p className="text-xs font-bold text-amber-700">{avgPct}% Developing</p>
                                <p className="text-[10px] text-amber-600 mt-0.5">Scoring 40–80 — average cohort, room for structured improvement</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-50 border border-blue-100">
                            <span className="text-base mt-0.5">🔵</span>
                            <div>
                                <p className="text-xs font-bold text-blue-700">{highPct}% High Performers</p>
                                <p className="text-[10px] text-blue-600 mt-0.5">Scoring &gt;80 — placement-ready, strong employer interest expected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Programme Performance Table ───────────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-stone-50/50">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">Programme Performance Breakdown</h2>
                        <p className="text-[11px] text-gray-500 mt-0.5">Avg skill score, profile completeness and engagement per programme</p>
                    </div>
                    <Link href="/university/curriculum" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        Curriculum Gaps <ArrowRight size={11} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 w-56">Programme</th>
                                <th className="text-center text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-3">Avg Score</th>
                                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-3 w-40">
                                    <span className="flex items-center gap-1"><FileText size={9} /> Profile</span>
                                </th>
                                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-3 w-40">
                                    <span className="flex items-center gap-1"><Github size={9} /> GitHub</span>
                                </th>
                                <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-3 w-40">
                                    <span className="flex items-center gap-1"><FileText size={9} /> CV Upload</span>
                                </th>
                                <th className="text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-3">Risk</th>
                            </tr>
                        </thead>
                        <tbody className="px-4">
                            {PROGRAMMES.map(p => (
                                <ProgrammeRow key={p.name} p={p} total={TOTAL_STUDENTS} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Top Missing Skills ────────────────────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-stone-50/50">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">🎯 Top Missing Skills</h2>
                        <p className="text-[11px] text-gray-500 mt-0.5">Most common skill gaps across all students — aggregated from profile assessments</p>
                    </div>
                    <Link href="/university/curriculum" className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        <BookOpen size={11} /> Curriculum Analysis
                    </Link>
                </div>

                <div className="p-5 space-y-4">
                    {visibleSkills.map((sk) => {
                        const pct = Math.round((sk.studentsLacking / TOTAL_STUDENTS) * 100);
                        return (
                            <div key={sk.skill}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2.5">
                                        <p className="text-[13px] font-semibold text-gray-900">{sk.skill}</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${severityColor(sk.severity)}`}>
                                            {sk.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-right">
                                        <span className="text-[12px] font-bold text-gray-700">{sk.studentsLacking.toLocaleString()} students</span>
                                        <span className="text-[12px] font-extrabold text-red-600 w-10">{pct}%</span>
                                    </div>
                                </div>
                                {/* Progress bar */}
                                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${sk.severity === "critical" ? "bg-red-400" :
                                                sk.severity === "moderate" ? "bg-amber-400" : "bg-blue-400"
                                            }`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            onClick={() => setShowAllSkills(v => !v)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            {showAllSkills ? "Show less" : "View All Gaps"}
                            <ChevronDown size={12} className={`transition-transform ${showAllSkills ? "rotate-180" : ""}`} />
                        </button>
                        <span className="text-gray-300">·</span>
                        <Link href="/university/curriculum" className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                            Link to Curriculum Analysis <ArrowRight size={11} />
                        </Link>
                    </div>
                </div>

                {/* Insight banner */}
                <div className="mx-5 mb-5 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 items-start">
                    <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-amber-800 mb-0.5">Curriculum Intervention Recommended</p>
                        <p className="text-[11px] text-amber-700 leading-relaxed">
                            <b>TypeScript, Docker, and AWS</b> are missing in over 60% of all students — these are the highest-impact curriculum additions.
                            Even a single practical module per skill could significantly close the gap before students enter the job market.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
