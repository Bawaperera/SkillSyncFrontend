"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Briefcase, Users, MailOpen, Target, ArrowRight,
    ChevronLeft, ChevronRight, Clock, Video, MapPin, Plus
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer
} from "recharts";

const DISMISS_KEY = "recruiter_greeting_dismissed";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}


// Static constants — safe at module scope
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Pipeline colors — static, safe at module scope

const PIPELINE_COLORS: Record<string, string> = {
    Screening: "#93C5FD",
    Qualified: "#A78BFA",
    Interviews: "#6EE7B7",
    Offer: "#FCA5A5",
    Hired: "#34D399",
    Rejected: "#F87171",
};

function HiringPipelineChart() {
    const allKeys = Object.keys(PIPELINE_COLORS) as (keyof typeof PIPELINE_COLORS)[];
    const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set(allKeys));
    const [mounted, setMounted] = useState(false);

    // Generate data only on client after mount to avoid hydration mismatch
    const pipelineData = useMemo(() => {
        if (!mounted) return []; // Return empty during SSR
        const now = new Date();
        return Array.from({ length: 30 }, (_, i) => {
            const d = new Date(now);
            d.setDate(now.getDate() - (29 - i));
            const label = `${d.getDate()}/${d.getMonth() + 1}`;
            const Screening = Math.floor(Math.random() * 15) + 5;
            const Qualified = Math.floor(Screening * (0.5 + Math.random() * 0.3));
            const Interviews = Math.floor(Qualified * (0.4 + Math.random() * 0.3));
            const Offer = Math.floor(Interviews * (0.3 + Math.random() * 0.3));
            const Hired = Math.floor(Offer * (0.5 + Math.random() * 0.4));
            const Rejected = Screening - Qualified;
            return { date: label, Screening, Qualified, Interviews, Offer, Hired, Rejected };
        });
    }, [mounted]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggle = (key: string) => {
        setActiveKeys(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                if (next.size === 1) return prev; // keep at least one
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const totalEvents = pipelineData.reduce((sum: number, d: typeof pipelineData[0]) =>
        allKeys.reduce((s: number, k) => activeKeys.has(k) ? s + (d[k as keyof typeof d] as number) : s, sum), 0
    );

    const activeArr = allKeys.filter(k => activeKeys.has(k));
    const topKey = activeArr[activeArr.length - 1];

    if (!mounted) {
        return (
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">Hiring Pipeline</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Loading data...</p>
                    </div>
                </div>
                <div className="h-[190px] flex items-center justify-center text-gray-400">
                    <div className="animate-pulse">Loading chart...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h2 className="text-sm font-semibold text-gray-900">Hiring Pipeline</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{totalEvents} total events &mdash; last 30 days</p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end max-w-[66%]">
                    {allKeys.map((label) => {
                        const isActive = activeKeys.has(label);
                        return (
                            <button
                                key={label}
                                onClick={() => toggle(label)}
                                className={`flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full border transition-all font-medium select-none
                                    ${isActive
                                        ? "border-gray-200 text-gray-700 bg-white shadow-sm"
                                        : "border-transparent text-gray-400 bg-gray-100"}`}
                            >
                                <span
                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{ background: isActive ? PIPELINE_COLORS[label] : "#D1D5DB" }}
                                />
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="h-[190px] overflow-x-auto">
                <div style={{ minWidth: `${30 * 28}px`, height: "100%" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={pipelineData}
                            barSize={18}
                            barCategoryGap="28%"
                            margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9CA3AF" }} axisLine={false} tickLine={false} interval={2} />
                            <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: "rgba(99,102,241,0.06)" }}
                                content={({ active, payload, label: lbl }) => {
                                    if (!active || !payload?.length) return null;
                                    return (
                                        <div className="bg-gray-900 text-white rounded-lg px-3 py-2.5 shadow-xl text-[11px] min-w-[140px]">
                                            <p className="font-semibold text-gray-300 mb-1.5">{lbl}</p>
                                            {payload.map((entry) => (
                                                <div key={entry.dataKey as string} className="flex items-center justify-between gap-4 py-0.5">
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="w-2 h-2 rounded-full" style={{ background: entry.fill as string }} />
                                                        <span className="text-gray-300">{entry.dataKey}:</span>
                                                    </span>
                                                    <span className="font-bold text-white">{entry.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }}
                            />
                            {allKeys.map((key) =>
                                activeKeys.has(key) ? (
                                    <Bar
                                        key={key}
                                        dataKey={key}
                                        stackId="pipeline"
                                        fill={PIPELINE_COLORS[key]}
                                        radius={key === topKey ? [3, 3, 0, 0] : [0, 0, 0, 0]}
                                    />
                                ) : null
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

// Mock schedule data keyed by ISO date string
// Using a function to avoid server/client mismatch
function getSchedule(): Record<string, { time: string; title: string; type: "zoom" | "office" | "call"; detail: string }[]> {
    const todayKey = new Date().toISOString().split("T")[0];
    return {
        [todayKey]: [
            { time: "9:00 AM", title: "Candidate Interview", type: "zoom", detail: "Full-Stack Developer role" },
            { time: "11:30 AM", title: "Team Sync", type: "office", detail: "Weekly hiring update" },
            { time: "2:00 PM", title: "HR Review Call", type: "call", detail: "Shortlist discussion" },
        ],
    };
}

function GreetingBanner({ onDismiss }: { onDismiss: () => void }) {
    const router = useRouter();
    const handleReview = () => { onDismiss(); router.push("/recruiter/applications"); };

    return (
        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-blue-700 to-blue-500 p-7 flex items-center justify-between shadow-md mb-5">
            <div className="absolute right-40 top-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2" />
            <div className="absolute right-20 bottom-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2" />
            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-1" suppressHydrationWarning>{getGreeting()}, Sarah! 👋</h2>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                    You have <span className="font-bold text-white">6 new applications</span>. It is a lot of work for today! So let's start.
                </p>
                <button onClick={handleReview} className="px-5 py-2 bg-white text-blue-700 text-sm font-semibold rounded-md hover:bg-blue-50 transition-colors shadow-sm">
                    Review it
                </button>
            </div>
            <div className="relative z-10 hidden md:flex items-end justify-center w-36 h-28 flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                    <Users size={40} className="text-white/60" />
                </div>
            </div>
        </div>
    );
}

function MiniCalendar({ onSelectDate }: { onSelectDate: (date: Date | null) => void }) {
    const [offset, setOffset] = useState(0); // offset in 5-day pages
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const schedule = getSchedule();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate 10 days starting from (offset * 5) days relative to today
    const startIndex = offset * 5;
    const days = Array.from({ length: 10 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + startIndex + i);
        return d;
    });

    const rows = [days.slice(0, 5), days.slice(5, 10)];

    const handleClick = (d: Date) => {
        const isAlreadySelected = selectedDate?.toISOString().split("T")[0] === d.toISOString().split("T")[0];
        const next = isAlreadySelected ? null : d;
        setSelectedDate(next);
        onSelectDate(next);
    };

    const monthLabel = (() => {
        const first = days[0];
        const last = days[days.length - 1];
        if (first.getMonth() === last.getMonth()) return `${MONTHS[first.getMonth()]} ${first.getFullYear()}`;
        return `${MONTHS[first.getMonth()]} – ${MONTHS[last.getMonth()]} ${last.getFullYear()}`;
    })();

    return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900">{monthLabel}</span>
                <div className="flex gap-1">
                    <button
                        onClick={() => setOffset(o => o - 1)}
                        disabled={offset === 0}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={15} className="text-gray-600" />
                    </button>
                    <button
                        onClick={() => setOffset(o => o + 1)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                    >
                        <ChevronRight size={15} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Day grid — 2 rows of 5 */}
            <div className="space-y-1.5">
                {rows.map((row, ri) => (
                    <div key={ri} className="grid grid-cols-5 gap-1">
                        {row.map((d, di) => {
                            const isoKey = d.toISOString().split("T")[0];
                            const isToday = d.getTime() === today.getTime();
                            const isSelected = selectedDate?.toISOString().split("T")[0] === isoKey;
                            const hasEvents = !!schedule[isoKey];

                            return (
                                <button
                                    key={di}
                                    onClick={() => handleClick(d)}
                                    className={`flex flex-col items-center py-1.5 px-0.5 rounded-md transition-all text-center cursor-pointer
                                        ${isSelected ? "bg-blue-600 text-white shadow-sm" :
                                            isToday ? "bg-blue-50 text-blue-700 border border-blue-200" :
                                                "hover:bg-gray-50 text-gray-700"}`}
                                >
                                    <span className={`text-[10px] font-medium ${isSelected ? "text-blue-100" : "text-gray-400"}`}>
                                        {DAYS[d.getDay()]}
                                    </span>
                                    <span className="text-sm font-bold mt-0.5">{d.getDate()}</span>
                                    {hasEvents && (
                                        <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? "bg-white" : "bg-blue-500"}`} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

function SchedulePanel({ date }: { date: Date }) {
    const schedule = getSchedule();
    const isoKey = date.toISOString().split("T")[0];
    const events = schedule[isoKey] || [];
    const displayDate = `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;

    const typeIcon = (type: string) => {
        if (type === "zoom") return <Video size={13} className="text-blue-500" />;
        if (type === "office") return <MapPin size={13} className="text-green-600" />;
        return <Clock size={13} className="text-amber-500" />;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-4 py-3 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Schedule — {displayDate}</h3>
                <span className="text-xs text-gray-400">{events.length} event{events.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="p-0">
                {events.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">No events scheduled</div>
                ) : (
                    events.map((ev, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                            <div className="flex-shrink-0 mt-0.5">{typeIcon(ev.type)}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{ev.title}</p>
                                <p className="text-xs text-gray-500 truncate">{ev.detail}</p>
                            </div>
                            <span className="text-xs text-gray-400 flex-shrink-0">{ev.time}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function RecruiterDashboard() {
    const [showBanner, setShowBanner] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        const dismissed = sessionStorage.getItem(DISMISS_KEY);
        if (!dismissed) setShowBanner(true);
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem(DISMISS_KEY, "true");
        setShowBanner(false);
    };

    return (
        <div className="space-y-5">
            {/* Greeting Banner / Header */}
            {showBanner ? (
                <GreetingBanner onDismiss={handleDismiss} />
            ) : (
                <h1 className="text-xl font-bold text-gray-900" suppressHydrationWarning>{getGreeting()}, Sarah 👋</h1>
            )}

            {/* Main 2-Column Layout */}
            <div className="flex gap-5 items-start">

                {/* ── LEFT COLUMN ─────────────────────────────── */}
                <div className="flex-1 min-w-0 space-y-5">

                    {/* KPI Row — 4 compact cards */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                        {/* Active Jobs */}
                        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Jobs</p>
                                <Briefcase size={14} className="text-blue-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">5</p>
                            <span className="text-[11px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">+1 this week</span>
                        </div>

                        {/* Total Candidates */}
                        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Candidates</p>
                                <Users size={14} className="text-indigo-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">127</p>
                            <span className="text-[11px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">+12 this week</span>
                        </div>

                        {/* New Applications */}
                        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">New Applicants</p>
                                <MailOpen size={14} className="text-amber-600" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">23</p>
                            <span className="text-[11px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Needs review</span>
                        </div>

                        {/* Conversion Rate */}
                        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Conversion</p>
                                <Target size={14} className="text-teal-600" />
                            </div>
                            <div className="space-y-1.5 mt-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Views</span>
                                    <span className="font-semibold text-gray-900">0</span>
                                </div>
                                <div className="w-full h-px bg-gray-100" />
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Applied</span>
                                    <span className="font-semibold text-gray-900">0</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hiring Pipeline Chart */}
                    <HiringPipelineChart />

                    {/* Active Job Postings Table */}
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                        <div className="border-b border-gray-200 px-5 py-3.5 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-sm font-semibold text-gray-900">Active Job Postings</h2>
                            <div className="flex items-center gap-3">
                                <Link href="/recruiter/jobs" className="text-xs font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1">
                                    View All <ArrowRight size={13} />
                                </Link>
                                <Link
                                    href="/recruiter/jobs"
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
                                >
                                    <Plus size={13} /> Post New Job
                                </Link>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 text-[11px] uppercase tracking-wider">
                                    <tr>
                                        <th className="px-5 py-2.5 font-medium">Role</th>
                                        <th className="px-4 py-2.5 font-medium">Dept.</th>
                                        <th className="px-4 py-2.5 font-medium">Applicants</th>
                                        <th className="px-4 py-2.5 font-medium">Status</th>
                                        <th className="px-4 py-2.5 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {[
                                        { role: "Full-Stack Developer", dept: "Engineering", apps: 15, hot: true, status: "Active" },
                                        { role: "Backend Developer", dept: "Engineering", apps: 8, hot: false, status: "Active" },
                                        { role: "Frontend Intern", dept: "Product", apps: 23, hot: true, status: "Draft" },
                                    ].map((job) => (
                                        <tr key={job.role} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                <span className="flex items-center gap-2">
                                                    <Briefcase size={13} className="text-gray-400" /> {job.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{job.dept}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="flex items-center gap-1.5">
                                                    {job.apps}
                                                    {job.hot && <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border
                                                    ${job.status === "Active" ? "bg-green-50 text-green-800 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                                <button className="text-blue-700 hover:text-blue-900 text-[11px] font-medium border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 transition-colors">
                                                    Review
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ─────────────────────────────── */}
                <div className="w-[240px] flex-shrink-0 space-y-4">

                    {/* Mini Calendar */}
                    <MiniCalendar onSelectDate={setSelectedDate} />

                    {/* Schedule or Top Matches */}
                    {selectedDate ? (
                        <SchedulePanel date={selectedDate} />
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                            <div className="border-b border-gray-200 px-4 py-3 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="text-sm font-semibold text-gray-900">Top Matches</h3>
                                <button className="text-[11px] font-medium text-blue-700 hover:underline">See all</button>
                            </div>
                            <div>
                                {[94, 93, 92].map((score, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-medium text-gray-900 truncate">Candidate {i + 1}</p>
                                            <p className="text-[11px] text-gray-500 truncate">React • Node.js</p>
                                        </div>
                                        <span className="text-[11px] font-bold bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded flex-shrink-0">
                                            {score}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
