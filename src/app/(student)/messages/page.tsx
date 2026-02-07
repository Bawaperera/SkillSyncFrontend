"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { Search, MoreVertical, Paperclip, Send, Phone, Video } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MOCK_CHATS = [
    { id: 1, name: "Virtusa HR", lastMsg: "We received your application.", time: "10:30 AM", unread: 2, online: true },
    { id: 2, name: "Sysco LABS Talent", lastMsg: "Are you available for a call?", time: "Yesterday", unread: 0, online: false },
    { id: 3, name: "WSO2 Recruitment", lastMsg: "Thanks for the update.", time: "Oct 20", unread: 0, online: false },
];

const MOCK_MESSAGES = [
    { id: 1, sender: "Virtusa HR", text: "Hi Bawantha, thanks for applying to the Associate SE role.", time: "10:05 AM", isMe: false },
    { id: 2, sender: "Me", text: "Hi! Thank you for reviewing my profile. I'm very excited about the opportunity.", time: "10:15 AM", isMe: true },
    { id: 3, sender: "Virtusa HR", text: "We noticed you have strong React skills but lack AWS experience. Are you currently learning cloud technologies?", time: "10:30 AM", isMe: false },
];

export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);

    return (
        <div className="h-[calc(100vh-8rem)] flex items-stretch gap-6">
            {/* Sidebar List */}
            <GlassCard className="w-1/3 flex flex-col p-0 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold mb-4">Messages</h2>
                    <GlassInput
                        placeholder="Search messages..."
                        icon={<Search className="w-4 h-4" />}
                        className="bg-white/5"
                    />
                </div>

                <div className="flex-1 overflow-y-auto">
                    {MOCK_CHATS.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={cn(
                                "p-4 flex items-center gap-3 hover:bg-white/5 cursor-pointer border-b border-white/5 transition-colors",
                                activeChat.id === chat.id ? "bg-white/10 border-l-4 border-l-blue-500" : "border-l-4 border-l-transparent"
                            )}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                    {chat.name.substring(0, 2).toUpperCase()}
                                </div>
                                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-sm text-white truncate">{chat.name}</h3>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className="text-xs text-gray-400 truncate">{chat.lastMsg}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* Chat Area */}
            <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative">
                {/* Context Bar */}
                <div className="bg-blue-500/10 border-b border-blue-500/20 p-2 text-center text-xs text-blue-300">
                    Re: Associate Software Engineer Application • ID: #VIT-2023-88
                </div>

                {/* Header */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {activeChat.name.substring(0, 2).toUpperCase()}
                            </div>
                            {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-white">{activeChat.name}</h3>
                            <p className="text-xs text-gray-400">{activeChat.online ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Phone className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Video className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {MOCK_MESSAGES.map((msg) => (
                        <div key={msg.id} className={cn("flex", msg.isMe ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[70%] rounded-2xl p-4 relative",
                                msg.isMe
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-white/10 text-gray-200 rounded-bl-none border border-white/10"
                            )}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <span className={cn(
                                    "text-[10px]  mt-1 block text-right",
                                    msg.isMe ? "text-blue-200" : "text-gray-500"
                                )}>{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-500"
                            />
                        </div>
                        <button className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors shadow-lg shadow-blue-500/20">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
