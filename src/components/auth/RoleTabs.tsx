"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Building2 } from "lucide-react";

export type UserRole = "student" | "recruiter" | "university";

interface RoleTabsProps {
    activeRole: UserRole;
    onRoleChange: (role: UserRole) => void;
}

export function RoleTabs({ activeRole, onRoleChange }: RoleTabsProps) {
    const tabs = [
        { id: "student", label: "Student", icon: GraduationCap },
        { id: "recruiter", label: "Recruiter", icon: Briefcase },
        { id: "university", label: "University", icon: Building2 },
    ] as const;

    return (
        <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex relative mb-8">
            {tabs.map((tab) => {
                const isActive = activeRole === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onRoleChange(tab.id)}
                        className={`
                            relative z-10 flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors duration-300
                            ${isActive ? "text-white" : "text-gray-400 hover:text-white/70"}
                        `}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white/10 rounded-xl shadow-lg border border-white/5"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <tab.icon size={18} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
