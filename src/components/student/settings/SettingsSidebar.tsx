"use client";

import { UserCircle, Bell, Shield, Key } from "lucide-react";

interface SettingsSidebarProps {
    activeTab: string;
    onSelect: (tab: string) => void;
}

const TABS = [
    { id: 'account', label: 'My Account', icon: UserCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Data', icon: Shield },
    { id: 'security', label: 'Login & Security', icon: Key },
];

export function SettingsSidebar({ activeTab, onSelect }: SettingsSidebarProps) {
    return (
        <nav className="space-y-1">
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onSelect(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeTab === tab.id
                            ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                >
                    <tab.icon size={18} />
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}
