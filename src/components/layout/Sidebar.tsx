"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, BarChart2, BookOpen, Briefcase, Send, MessageSquare, User, Settings, LogOut } from "lucide-react";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart2, label: "Analysis", href: "/analysis" },
    { icon: BookOpen, label: "Learning Path", href: "/learning" },
    { icon: Briefcase, label: "Jobs", href: "/jobs" },
    { icon: Send, label: "Applications", href: "/applications" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: User, label: "Profile", href: "/profile" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-panel flex flex-col pt-20 pb-6 z-40">
            <div className="px-6 mb-8">
                <div className="h-px w-full bg-white/10" />
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary/20 text-white shadow-lg shadow-primary/10 border border-primary/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "group-hover:text-blue-400 transition-colors")} />
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full blur-[2px]" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="px-4 mt-auto">
                <Link href="/settings">
                    <div className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200",
                        pathname === "/settings" && "bg-primary/20 text-white"
                    )}>
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                    </div>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 mt-2">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
