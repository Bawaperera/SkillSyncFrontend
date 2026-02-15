"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
    LayoutDashboard,
    UserCircle,
    FileText,
    BarChart2,
    Briefcase,
    Send,
    BookOpen,
    MessageSquare,
    Settings,
    LogOut

} from "lucide-react";

interface StudentSidebarProps {
    className?: string;
    disabled?: boolean;
}

const NAV_ITEMS = [
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Profile", href: "/student/profile", icon: UserCircle },
    { label: "My CV", href: "/student/cv", icon: FileText },
    { label: "Skill Analysis", href: "/student/analysis", icon: BarChart2 },
    { label: "Find Jobs", href: "/student/jobs", icon: Briefcase },
    { label: "Applications", href: "/student/applications", icon: Send },
    { label: "Learning Path", href: "/student/learning-path", icon: BookOpen },
    { label: "Messages", href: "/student/messages", icon: MessageSquare },
    { label: "Settings", href: "/student/settings", icon: Settings },
];

export function StudentSidebar({ className, disabled = false }: StudentSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Clear any local storage or session state here if needed
        router.push('/login');
    };

    return (
        <aside className={cn(
            "w-[280px] h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 -translate-x-full md:translate-x-0",
            disabled && "pointer-events-none opacity-50",
            className
        )}>
            {/* Logo Area */}
            <div className="h-20 flex items-center px-6 border-b border-gray-200">
                <Link href="/student/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
                        SS
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        SkillSync
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-r-full" />
                            )}
                            <item.icon size={20} className={cn("transition-colors", isActive ? "text-white" : "text-gray-400 group-hover:text-gray-900")} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Log Out</span>
                </button>

                {/* Mini User Profile */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        BP
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">Bawantha Perera</p>
                        <p className="text-xs text-gray-500 truncate">Student Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
