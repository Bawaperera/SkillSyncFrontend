"use client";

import { useState } from "react";
import { ChatList } from "@/components/student/messages/ChatList";
import { JobContextBar } from "@/components/student/messages/JobContextBar";
import { MessageBubble } from "@/components/student/messages/MessageBubble";
import { SmartReply } from "@/components/student/messages/SmartReply";
import { SafetyWarning } from "@/components/student/messages/SafetyWarning";
import { Conversation, Message } from "@/types/messages";
import { Send, Paperclip, Smile } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

// Mock Data
const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: "1",
        recruiterId: "r1",
        recruiterName: "Sarah Jenkins",
        jobContext: {
            id: "j1",
            title: "Full-Stack Developer",
            company: "Tech Innovations Ltd",
            status: "Interview Scheduled"
        },
        unreadCount: 1,
        lastMessageAt: new Date().toISOString(),
        messages: [
            { id: "m1", text: "Application Viewed", sender: "system", type: "system_event", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), isRead: true },
            { id: "m2", text: "Hi Bawantha, thanks for applying. Your GitHub profile is impressive.", sender: "recruiter", type: "text", timestamp: new Date(Date.now() - 86400000).toISOString(), isRead: true },
            { id: "m3", text: "Are you free for a quick call tomorrow at 10 AM?", sender: "recruiter", type: "text", timestamp: new Date().toISOString(), isRead: false },
        ]
    },
    {
        id: "2",
        recruiterId: "r2",
        recruiterName: "Mike Donovan",
        jobContext: {
            id: "j2",
            title: "Frontend Engineer",
            company: "Virtusa",
            status: "Applied"
        },
        unreadCount: 0,
        lastMessageAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        messages: [
            { id: "m5", text: "Application Submitted", sender: "system", type: "system_event", timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), isRead: true },
        ]
    }
];

export default function MessagesPage() {
    const [activeId, setActiveId] = useState<string>(MOCK_CONVERSATIONS[0].id);
    const [inputText, setInputText] = useState("");

    const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeId) || MOCK_CONVERSATIONS[0];

    const handleSend = () => {
        if (!inputText.trim()) return;
        // Mock send logic would go here
        setInputText("");
    };

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden bg-gray-50 flex">
            {/* Sidebar - Chat List */}
            <div className="w-full md:w-[320px] lg:w-[380px] h-full shrink-0 border-r border-gray-200 hidden md:block bg-white">
                <ChatList
                    conversations={MOCK_CONVERSATIONS}
                    activeId={activeId}
                    onSelect={setActiveId}
                />
            </div>

            {/* Main Chat Window */}
            <div className="flex-1 flex flex-col h-full relative bg-gray-50">
                {/* Context Bar */}
                <JobContextBar
                    context={activeConversation.jobContext}
                    onViewDetails={() => console.log("View Details")}
                />

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                    <SafetyWarning />

                    {activeConversation.messages.map(msg => (
                        <MessageBubble key={msg.id} message={msg as Message} />
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200">
                    <SmartReply onSelect={(text) => setInputText(text)} />

                    <div className="flex items-end gap-2 bg-white border border-gray-200 rounded-2xl p-2 focus-within:border-blue-500 transition-colors shadow-sm">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                            <Paperclip size={20} />
                        </button>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-none py-2 max-h-[120px] scrollbar-hide"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                            <Smile size={20} />
                        </button>
                        <button
                            onClick={handleSend}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                        >
                            <Send size={18} fill="white" className="translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
