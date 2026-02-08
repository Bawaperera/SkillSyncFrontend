"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    UserCircle,
    FileText,
    BarChart2,
    Briefcase,
    Send,
    Map, // Using map icon for Learning Path or similar
    MessageSquare,
    Settings,
    LogOut,
    GraduationCap,
    BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";


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
    { label: "Learning Path", href: "/student/learning", icon: BookOpen },
    { label: "Messages", href: "/student/messages", icon: MessageSquare },
];

export function StudentSidebar({ className, disabled = false }: StudentSidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 h-screen w-[250px] z-40 transition-all duration-500",
                "bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col",
                disabled && "opacity-50 pointer-events-none grayscale",
                className
            )}
        >
            {/* Logo Area */}
            <div className="h-20 flex items-center px-6 border-b border-white/5">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    <GraduationCap className="text-blue-400" />
                    SkillSync
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-4 mb-4">
                    Menu
                </div>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-blue-600/10 border border-blue-500/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
                            )}
                            <item.icon size={20} className={cn("transition-colors", isActive ? "text-blue-400" : "text-gray-500 group-hover:text-white")} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <Link
                    href="/student/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    <Settings size={20} />
                    <span className="font-medium text-sm">Settings</span>
                </Link>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Log Out</span>
                </button>

                {/* Mini User Profile */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        JD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">John Doe</p>
                        <p className="text-xs text-gray-500 truncate">Student Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
