"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
    LayoutDashboard,
    Briefcase,
    Search,
    Send,
    MessageSquare,
    BarChart2,
    Building2,
    Settings,
    LogOut
} from "lucide-react";

interface RecruiterSidebarProps {
    className?: string;
    disabled?: boolean;
}

const NAV_ITEMS = [
    { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
    { label: "My Jobs", href: "/recruiter/jobs", icon: Briefcase },
    { label: "Find a Talent", href: "/recruiter/talent", icon: Search },
    { label: "Applications", href: "/recruiter/applications", icon: Send },
    { label: "Messages", href: "/recruiter/messages", icon: MessageSquare },
    { label: "Analytics", href: "/recruiter/analytics", icon: BarChart2 },
    { label: "Company Profile", href: "/recruiter/company", icon: Building2 },
    { label: "Settings", href: "/recruiter/settings", icon: Settings },
];

export function RecruiterSidebar({ className, disabled = false }: RecruiterSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        <aside className={cn(
            "w-[260px] h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40",
            className
        )}>
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <Link href="/recruiter/dashboard" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-700 flex items-center justify-center font-bold text-white shadow-sm rounded-sm">
                        SS
                    </div>
                    <span className="text-lg font-bold text-gray-900 tracking-tight">
                        SkillSync
                    </span>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 ml-1">
                        B2B
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</h3>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 transition-all duration-200 group text-sm font-medium rounded-md",
                                isActive
                                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-l-4 border-transparent"
                            )}
                        >
                            <item.icon size={18} className={cn("transition-colors", isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-600")} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3 p-2 rounded-md bg-white border border-gray-200 mb-3 shadow-sm">
                    <div className="w-8 h-8 rounded bg-blue-700 flex items-center justify-center text-white font-bold text-xs">
                        SJ
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">Sarah Jenkins</p>
                        <p className="text-xs text-gray-500 truncate">Tech Innovations Ltd</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all text-sm font-medium"
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
