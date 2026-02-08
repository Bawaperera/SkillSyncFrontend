"use client";

import { Zap } from "lucide-react";

interface SmartReplyProps {
    onSelect: (reply: string) => void;
}

const SUGGESTIONS = [
    "Yes, I am available.",
    "Could we please reschedule?",
    "Here is my portfolio link.",
    "Thank you for the update!"
];

export function SmartReply({ onSelect }: SmartReplyProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 scrollbar-thin scrollbar-thumb-gray-700">
            <div className="flex items-center gap-1 text-yellow-400 shrink-0 px-2">
                <Zap size={14} fill="currentColor" />
                <span className="text-[10px] font-bold uppercase">Quick Reply</span>
            </div>
            {SUGGESTIONS.map((reply, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(reply)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
                >
                    {reply}
                </button>
            ))}
        </div>
    );
}
