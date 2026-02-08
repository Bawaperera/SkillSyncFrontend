"use client";

import { Message } from "@/types/messages";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isMine = message.sender === 'user';
    const isSystem = message.sender === 'system' || message.type === 'system_event';

    if (isSystem) {
        return (
            <div className="flex justify-center my-6">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs text-gray-400 flex items-center gap-2 shadow-sm">
                    <AlertCircle size={12} className="text-blue-400" />
                    {message.text}
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col mb-4 ${isMine ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${isMine
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-[#1A1A1C] border border-white/10 text-gray-200 rounded-bl-none'
                }`}>
                {message.text}
            </div>
            <span className="text-[10px] text-gray-500 mt-1 px-1">
                {format(new Date(message.timestamp), 'h:mm a')}
            </span>
        </div>
    );
}
