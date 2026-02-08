"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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
    LogOut,
    Sun,
    Moon
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
            "w-[280px] h-screen bg-[#0A0A0B] border-r border-white/10 flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 md:translate-x-0",
            disabled && "pointer-events-none opacity-50",
            className
        )}>
            {/* Logo Area */}
            <div className="h-20 flex items-center px-6 border-b border-white/5">
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
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-r-full" />
                            )}
                            <item.icon size={20} className={cn("transition-colors", isActive ? "text-white" : "text-gray-500 group-hover:text-white")} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-3">
                        <Sun size={20} className="hidden dark:block" />
                        <Moon size={20} className="block dark:hidden" />
                        <span className="font-medium text-sm">Theme</span>
                    </div>
                    <ThemeToggle />
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Log Out</span>
                </button>

                {/* Mini User Profile */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        BP
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Bawantha Perera</p>
                        <p className="text-xs text-gray-500 truncate">Student Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
