"use client";

import { useState, useMemo } from "react";
import {
    Target, TrendingUp, TrendingDown, AlertCircle, CheckCircle2,
    Users, Sparkles, ArrowRight, X, ChevronRight,
    Building2, Plus, Clock, BookOpen, BarChart3,
    Download, RefreshCw, Bell,
} from "lucide-react";
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertSeverity = "critical" | "warning" | "info";
type InterventionStatus = "implemented" | "pending" | "under-review";

interface DashboardAlert {
    id: string;
    severity: AlertSeverity;
    title: string;
    detail: string;
    action: string;
    actionHref: string;
}

interface SkillGapRow {
    skill: string;
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    marketDemand: number;
}

interface ProgrammePlacement {
    programme: string;
    rate: number;
}

interface TopEmployer {
    name: string;
    hires: number;
    percentage: number;
    avgSalary: string;
    topRole: string;
    initials: string;
    color: string;
}

interface Intervention {
    id: string;
    title: string;
    status: InterventionStatus;
    date: string;
    impact: string;
    programme: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ALERTS: DashboardAlert[] = [
    {
        id: "a1",
        severity: "critical",
        title: "TypeScript coverage critical — 3 programmes affected",
        detail: "Market demand sits at 87% but average student coverage is only 14%. This is the #1 skill gap across all CS-related programmes.",
        action: "Review Curriculum Gaps",
        actionHref: "/university/curriculum",
    },
    {
        id: "a2",
        severity: "warning",
        title: "Cybersecurity placement rate dropped 8% year-over-year",
        detail: "Cybersecurity graduates placed within 6 months fell from 51% to 43%. Peer institutions average 58% for similar programmes.",
        action: "View Placement Analysis",
        actionHref: "/university/placements",
    },
    {
        id: "a3",
        severity: "info",
        title: "4 new in-demand skills entered the top 20 this semester",
        detail: "LLM/Prompt Engineering, Go, Rust, and Apache Kafka have entered employer top-20 demand lists. None are currently covered in curriculum.",
        action: "Explore Industry Trends",
        actionHref: "/university/industry",
    },
];

const SKILL_GAP_ROWS: SkillGapRow[] = [
    { skill: "TypeScript", year1: 12, year2: 18, year3: 15, year4: 24, marketDemand: 87 },
    { skill: "Docker / Containers", year1: 8, year2: 15, year3: 32, year4: 45, marketDemand: 85 },
    { skill: "AWS / Cloud", year1: 5, year2: 10, year3: 28, year4: 41, marketDemand: 78 },
    { skill: "Testing / TDD", year1: 15, year2: 22, year3: 35, year4: 48, marketDemand: 71 },
    { skill: "System Design", year1: 10, year2: 18, year3: 42, year4: 65, marketDemand: 82 },
];

const PLACEMENT_DONUT = [
    { name: "Placed", value: 61, color: "#2563EB" },
    { name: "Delayed", value: 24, color: "#F59E0B" },
    { name: "Seeking", value: 15, color: "#F97316" },
];

const PROGRAMME_PLACEMENTS: ProgrammePlacement[] = [
    { programme: "Data Science", rate: 71 },
    { programme: "Computer Science", rate: 67 },
    { programme: "Information Technology", rate: 58 },
    { programme: "Software Engineering", rate: 55 },
    { programme: "Cybersecurity", rate: 43 },
];

const TOP_EMPLOYERS: TopEmployer[] = [
    { name: "99X Technology", hires: 24, percentage: 19, avgSalary: "LKR 125k", topRole: "Full-Stack Dev", initials: "99", color: "#2563EB" },
    { name: "Virtusa", hires: 18, percentage: 14, avgSalary: "LKR 110k", topRole: "Backend Dev", initials: "V", color: "#4F46E5" },
    { name: "WSO2", hires: 16, percentage: 12, avgSalary: "LKR 135k", topRole: "Software Engineer", initials: "W", color: "#0891B2" },
    { name: "Dialog Axiata", hires: 12, percentage: 9, avgSalary: "LKR 105k", topRole: "Systems Analyst", initials: "DA", color: "#059669" },
    { name: "hSenid Mobile", hires: 10, percentage: 8, avgSalary: "LKR 98k", topRole: "Mobile Dev", initials: "HS", color: "#7C3AED" },
];

const INTERVENTIONS: Intervention[] = [
    {
        id: "i1",
        title: "TypeScript module added to Year 3 CS",
        status: "implemented",
        date: "Jan 15, 2025",
        impact: "Expected to close 42% coverage gap by next semester",
        programme: "Computer Science",
    },
    {
        id: "i2",
        title: "Docker workshop series planned for Year 4",
        status: "pending",
        date: "Feb 1, 2025",
        impact: "Targets improvement from 45% to 65% coverage",
        programme: "All CS Programmes",
    },
    {
        id: "i3",
        title: "Cloud Computing elective proposal submitted",
        status: "under-review",
        date: "Jan 28, 2025",
        impact: "Addresses AWS/Azure gap (currently 28% in Year 3)",
        programme: "IT & Data Science",
    },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function cellColor(coverage: number, marketDemand: number): string {
    const gap = marketDemand - coverage;
    if (gap >= 50) return "bg-gray-200 text-gray-900 font-bold";
    if (gap >= 30) return "bg-stone-100 text-gray-800 font-semibold";
    if (gap >= 10) return "bg-stone-50 text-gray-700 font-medium";
    return "bg-slate-100 text-slate-700 font-medium";
}

function demandCellColor(val: number): string {
    if (val >= 80) return "bg-gray-700 text-white font-bold";
    if (val >= 65) return "bg-gray-600 text-white font-bold";
    return "bg-gray-500 text-white font-bold";
}

function gapIcon(coverage: number, marketDemand: number) {
    const gap = marketDemand - coverage;
    if (gap >= 50) return "●";
    if (gap >= 30) return "◐";
    return "○";
}

function statusConfig(status: InterventionStatus) {
    const configs = {
        "implemented": {
            label: "Implemented",
            bg: "bg-green-50",
            text: "text-green-700",
            border: "border-green-200",
            dot: "bg-green-500",
        },
        "pending": {
            label: "Pending Approval",
            bg: "bg-amber-50",
            text: "text-amber-700",
            border: "border-amber-200",
            dot: "bg-amber-500",
        },
        "under-review": {
            label: "Under Review",
            bg: "bg-blue-50",
            text: "text-blue-700",
            border: "border-blue-200",
            dot: "bg-blue-500",
        },
    };
    return configs[status];
}

function alertConfig(severity: AlertSeverity) {
    const configs = {
        critical: {
            border: "border-gray-300",
            bg: "bg-gray-50",
            iconBg: "bg-gray-200",
            iconColor: "text-gray-700",
            badgeBg: "bg-gray-200",
            badgeText: "text-gray-800",
            badgeLabel: "High Priority",
            actionBg: "bg-gray-700 hover:bg-gray-800",
        },
        warning: {
            border: "border-gray-200",
            bg: "bg-slate-50",
            iconBg: "bg-slate-100",
            iconColor: "text-slate-600",
            badgeBg: "bg-slate-100",
            badgeText: "text-slate-700",
            badgeLabel: "Review Needed",
            actionBg: "bg-slate-600 hover:bg-slate-700",
        },
        info: {
            border: "border-gray-200",
            bg: "bg-gray-50",
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
            badgeBg: "bg-gray-100",
            badgeText: "text-gray-700",
            badgeLabel: "Update",
            actionBg: "bg-gray-600 hover:bg-gray-700",
        },
    };
    return configs[severity];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({
    label, value, subtitle, delta, deltaPositive, icon: Icon, highlight,
}: {
    label: string;
    value: string;
    subtitle: string;
    delta: string;
    deltaPositive: boolean | null;
    icon: React.ElementType;
    highlight?: boolean;
}) {
    const chipCls = deltaPositive === null
        ? "bg-gray-100 text-gray-500"
        : deltaPositive
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-600";

    return (
        <div className={`relative rounded-xl border p-5 flex flex-col gap-3 overflow-hidden transition-all hover:shadow-md ${highlight ? "bg-blue-600 border-blue-500 text-white" : "bg-white border-gray-200 shadow-sm"}`}>
            {highlight && <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none" />}
            <div className="flex items-center justify-between relative z-10">
                <p className={`text-xs font-semibold uppercase tracking-wide leading-tight ${highlight ? "text-blue-100" : "text-gray-500"}`}>{label}</p>
                <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${highlight ? "bg-white/20" : "bg-blue-50"}`}>
                    <Icon size={15} className={highlight ? "text-white" : "text-blue-600"} />
                </div>
            </div>
            <p className={`text-3xl font-extrabold tracking-tight ${highlight ? "text-white" : "text-gray-900"}`}>{value}</p>
            <div className="flex items-center justify-between gap-2">
                <p className={`text-[11px] ${highlight ? "text-blue-100" : "text-gray-500"}`}>{subtitle}</p>
                {deltaPositive !== null ? (
                    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${highlight ? "bg-white/20 text-white" : chipCls}`}>
                        {deltaPositive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                        {delta}
                    </span>
                ) : (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${highlight ? "bg-white/20 text-white" : chipCls}`}>{delta}</span>
                )}
            </div>
        </div>
    );
}

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xs shadow-xl">
            <p className="font-bold">{d.name}</p>
            <p className="text-gray-300 mt-0.5">{d.value}% of graduates</p>
        </div>
    );
}

function AddInterventionModal({ onClose }: { onClose: () => void }) {
    const [title, setTitle] = useState("");
    const [programme, setProgramme] = useState("Computer Science");
    const [impact, setImpact] = useState("");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        if (!title.trim()) return;
        setSaved(true);
        setTimeout(() => { setSaved(false); onClose(); }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900">Log New Curriculum Intervention</h3>
                    <button onClick={onClose} className="p-1.5 rounded hover:bg-stone-100 text-gray-400"><X size={15} /></button>
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Intervention Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. TypeScript module added to Year 3 CS"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Programme</label>
                        <select
                            value={programme}
                            onChange={e => setProgramme(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            {["Computer Science", "Information Technology", "Data Science", "Cybersecurity", "Software Engineering", "All Programmes"].map(p => (
                                <option key={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Expected Impact</label>
                        <textarea
                            value={impact}
                            onChange={e => setImpact(e.target.value)}
                            rows={3}
                            placeholder="e.g. Expected to close 42% coverage gap by next semester"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>
                </div>
                <div className="flex gap-2 px-5 pb-5">
                    <button onClick={onClose} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-stone-50 transition-colors">Cancel</button>
                    <button
                        onClick={handleSave}
                        disabled={!title.trim()}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${saved ? "bg-green-600 text-white" : "bg-blue-700 hover:bg-blue-800 text-white"}`}
                    >
                        {saved ? <><CheckCircle2 size={13} /> Logged!</> : <><Plus size={13} /> Log Intervention</>}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UniversityDashboard() {
    const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
    const [showAddIntervention, setShowAddIntervention] = useState(false);
    const [lastUpdated] = useState("2 hours ago");

    const visibleAlerts = ALERTS.filter(a => !dismissedAlerts.has(a.id));
    const dismissAlert = (id: string) => setDismissedAlerts(prev => new Set([...prev, id]));

    // Gap counts for reference
    const criticalGaps = SKILL_GAP_ROWS.filter(r => (r.marketDemand - r.year4) >= 50).length;

    return (
        <div className="space-y-6">
            {/* ── Greeting Banner ───────────────────────────────────────── */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white mb-2">Good Morning, Dr. Perera! 👋</h1>
                        {visibleAlerts.length > 0 ? (
                            <p className="text-sm text-blue-50">
                                You have <span className="font-semibold text-white">{visibleAlerts.length} Recommendation{visibleAlerts.length > 1 ? 's' : ''} for Improvement</span>. Let's review them and take action to enhance student outcomes!
                            </p>
                        ) : (
                            <p className="text-sm text-blue-50">
                                All key metrics are meeting targets. Great work on maintaining student success!
                            </p>
                        )}
                        <p className="text-xs text-blue-200 mt-2">Academic Year 2024/25 · Semester 2 · University of Colombo</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-blue-100">
                            <RefreshCw size={12} className="text-blue-200" />
                            Updated {lastUpdated}
                        </span>
                        {visibleAlerts.length > 0 && (
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg shadow-sm transition-colors">
                                <ArrowRight size={16} /> Take Action
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── KPI Cards ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <KpiCard
                    label="Student Readiness"
                    value="72%"
                    subtitle="Avg skill gap score across all students"
                    delta="+5% vs last sem"
                    deltaPositive={true}
                    icon={Target}
                />
                <KpiCard
                    label="Placement Rate"
                    value="61%"
                    subtitle="Graduates hired within 6 months"
                    delta="-8% vs last year"
                    deltaPositive={false}
                    icon={TrendingUp}
                />
                <KpiCard
                    label="Critical Skill Gaps"
                    value={String(criticalGaps)}
                    subtitle="Skills with >50% industry mismatch"
                    delta="Needs action"
                    deltaPositive={null}
                    icon={AlertCircle}
                />
                <KpiCard
                    label="Programme Health"
                    value="4 / 5"
                    subtitle="Programmes improving vs. last year"
                    delta="Improving ↑"
                    deltaPositive={true}
                    icon={BarChart3}
                />
            </div>

            {/* ── Skill Gap Heatmap Preview ──────────────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-stone-50/50">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">Skill Gap Heatmap — Top 5 Critical Gaps</h2>
                        <p className="text-[11px] text-gray-500 mt-0.5">Student coverage vs. market demand, by year. Click a cell to see details.</p>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        Full Analysis <ArrowRight size={12} />
                    </button>
                </div>

                <div className="p-5 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 w-44">Skill</th>
                                {["Year 1", "Year 2", "Year 3", "Year 4"].map(y => (
                                    <th key={y} className="text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 w-24">{y}</th>
                                ))}
                                <th className="text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 w-28">Market Demand</th>
                                <th className="text-center text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 w-16">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {SKILL_GAP_ROWS.map(row => (
                                <tr key={row.skill} className="hover:bg-stone-50/50 transition-colors">
                                    <td className="py-3 pr-4">
                                        <p className="text-[13px] font-semibold text-gray-800">{row.skill}</p>
                                    </td>
                                    {[row.year1, row.year2, row.year3, row.year4].map((val, i) => (
                                        <td key={i} className="py-3 px-2 text-center">
                                            <span className={`inline-block text-[12px] px-2.5 py-1 rounded-md cursor-pointer hover:opacity-80 transition-opacity ${cellColor(val, row.marketDemand)}`}>
                                                {val}%
                                            </span>
                                        </td>
                                    ))}
                                    <td className="py-3 px-2 text-center">
                                        <span className={`inline-block text-[12px] px-2.5 py-1 rounded-md ${demandCellColor(row.marketDemand)}`}>
                                            {row.marketDemand}%
                                        </span>
                                    </td>
                                    <td className="py-3 text-center text-base">
                                        {gapIcon(row.year4, row.marketDemand)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Legend */}
                    <div className="flex items-center gap-5 mt-4 pt-4 border-t border-gray-100">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Coverage legend:</span>
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded bg-gray-200 border border-gray-300 inline-block" />
                            <span className="text-[11px] text-gray-600">● Large gap (&gt;50%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded bg-stone-100 border border-gray-200 inline-block" />
                            <span className="text-[11px] text-gray-600">◐ Moderate gap (30–50%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block" />
                            <span className="text-[11px] text-gray-600">○ On track (&lt;30% gap)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Placement Overview + Top Employers ────────────────────── */}
            <div className="grid lg:grid-cols-2 gap-5">

                {/* LEFT: Donut + Programme Bars */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-stone-50/50">
                        <h2 className="text-sm font-semibold text-gray-900">Graduate Placement Overview</h2>
                        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                            View Details <ArrowRight size={11} />
                        </button>
                    </div>
                    <div className="p-5">
                        {/* Donut */}
                        <div className="flex items-center gap-6 mb-6">
                            <div className="flex-shrink-0">
                                <ResponsiveContainer width={140} height={140}>
                                    <PieChart>
                                        <Pie
                                            data={PLACEMENT_DONUT}
                                            cx={68}
                                            cy={68}
                                            innerRadius={44}
                                            outerRadius={65}
                                            dataKey="value"
                                            strokeWidth={0}
                                        >
                                            {PLACEMENT_DONUT.map((entry, i) => (
                                                <Cell key={i} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex-1 space-y-2.5">
                                {PLACEMENT_DONUT.map(d => (
                                    <div key={d.name} className="flex items-center gap-2.5">
                                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                        <span className="text-xs text-gray-700 flex-1">{d.name}</span>
                                        <span className="text-sm font-bold text-gray-900">{d.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Programme breakdown */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">By Programme</p>
                            {PROGRAMME_PLACEMENTS.map(p => (
                                <div key={p.programme} className="flex items-center gap-3">
                                    <p className="text-[12px] text-gray-700 w-36 flex-shrink-0 truncate">{p.programme}</p>
                                    <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${p.rate >= 65 ? "bg-slate-600" : p.rate >= 50 ? "bg-slate-500" : "bg-slate-400"}`}
                                            style={{ width: `${p.rate}%` }}
                                        />
                                    </div>
                                    <span className={`text-[12px] font-bold w-9 text-right flex-shrink-0 ${p.rate >= 65 ? "text-slate-700" : p.rate >= 50 ? "text-slate-600" : "text-slate-600"}`}>
                                        {p.rate}%
                                    </span>
                                    {p.rate < 50 && <span className="text-[10px] font-bold px-1.5 py-0.5 bg-stone-100 text-gray-700 border border-gray-200 rounded-full flex-shrink-0">↓ Low</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Top Employers */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-stone-50/50">
                        <h2 className="text-sm font-semibold text-gray-900">Top Hiring Employers</h2>
                        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                            View All <ArrowRight size={11} />
                        </button>
                    </div>
                    <div className="p-5 space-y-1">
                        {TOP_EMPLOYERS.map((emp, i) => (
                            <div key={emp.name} className="flex items-center gap-3.5 p-3 rounded-lg hover:bg-stone-50 transition-colors group cursor-pointer">
                                {/* Rank */}
                                <span className="text-[11px] font-bold text-gray-300 w-4 flex-shrink-0 text-center">{i + 1}</span>

                                {/* Avatar */}
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-[11px] flex-shrink-0"
                                    style={{ background: emp.color }}
                                >
                                    {emp.initials}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-[13px] font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">{emp.name}</p>
                                    </div>
                                    <p className="text-[11px] text-gray-500 truncate">{emp.topRole} · {emp.avgSalary}/mo avg</p>
                                </div>

                                {/* Stats */}
                                <div className="text-right flex-shrink-0">
                                    <p className="text-[13px] font-bold text-gray-900">{emp.hires}</p>
                                    <p className="text-[10px] text-gray-400">{emp.percentage}% of hires</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Recent Curriculum Interventions ───────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-stone-50/50">
                    <div className="flex items-center gap-2.5">
                        <BookOpen size={14} className="text-blue-600" />
                        <h2 className="text-sm font-semibold text-gray-900">Recent Curriculum Interventions</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowAddIntervention(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-semibold rounded-md transition-colors"
                        >
                            <Plus size={11} /> Log New
                        </button>
                        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                            View All <ArrowRight size={11} />
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {INTERVENTIONS.map(item => {
                        const s = statusConfig(item.status);
                        return (
                            <div key={item.id} className="flex items-start gap-4 px-5 py-4 hover:bg-stone-50/50 transition-colors">
                                {/* Status dot */}
                                <div className="mt-1.5 flex-shrink-0">
                                    <span className={`w-2.5 h-2.5 rounded-full block ${s.dot}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <p className="text-[13px] font-semibold text-gray-900">{item.title}</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                                            {s.label}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed">{item.impact}</p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                            <Clock size={9} /> {item.date}
                                        </span>
                                        <span className="text-[10px] text-blue-600 font-medium">{item.programme}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Footer ────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-200 pt-4">
                <span>Last updated: {lastUpdated} · Data covers: <span className="font-bold text-gray-600">1,247 students</span> across 5 programmes</span>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 hover:text-gray-600 transition-colors font-medium">
                        <Download size={11} /> Download Dashboard Report (PDF)
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-gray-600 transition-colors font-medium">
                        <Bell size={11} /> Schedule Email Report
                    </button>
                </div>
            </div>

            {/* ── Add Intervention Modal ─────────────────────────────────── */}
            {showAddIntervention && <AddInterventionModal onClose={() => setShowAddIntervention(false)} />}
        </div>
    );
}
