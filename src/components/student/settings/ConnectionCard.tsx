"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";

interface ConnectionCardProps {
    provider: 'GitHub' | 'LinkedIn';
    connected: boolean;
    username?: string;
    onAction: () => void;
}

export function ConnectionCard({ provider, connected, username, onAction }: ConnectionCardProps) {
    return (
        <GlassCard className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${provider === 'GitHub' ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
                    }`}>
                    {provider === 'GitHub' ? 'G' : 'in'}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {provider}
                        {connected ? <CheckCircle2 size={14} className="text-green-500" /> : <XCircle size={14} className="text-gray-500" />}
                    </h4>
                    <p className="text-xs text-gray-400">
                        {connected ? `Connected as ${username}` : "Not connected"}
                    </p>
                </div>
            </div>

            <button
                onClick={onAction}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${connected
                        ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                        : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                    }`}
            >
                {connected ? "Disconnect" : "Connect"}
            </button>
        </GlassCard>
    );
}
