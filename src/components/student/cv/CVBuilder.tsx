"use client";

import { useState } from "react";
import { CVProfile, CVTemplate } from "@/types/cv";
import { TemplateSelector } from "./TemplateSelector";
import { LiveCVPreview } from "./LiveCVPreview";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles, Save, Download } from "lucide-react";

const INITIAL_PROFILE: CVProfile = {
    fullName: "Bawantha Perera",
    title: "Full Stack Developer",
    summary: "Passionate Full-Stack Developer with a strong foundation in React and Node.js. Experienced in building scalable web applications and optimizing user experiences.",
    contact: {
        email: "bawantha@example.com",
        phone: "+94 77 123 4567",
        location: "Colombo, Sri Lanka",
        linkedin: "linkedin.com/in/bawantha",
        github: "github.com/bawantha",
        website: "bawantha.dev",
    },
    experience: [
        {
            id: "exp1",
            role: "Software Engineering Intern",
            company: "Tech Solutions Ltd",
            duration: "Jan 2024 - Present",
            description: "Developed responsive UI components using React.js. Collaborated with backend team to integrate RESTful APIs.",
            bullets: [],
        }
    ],
    education: [],
    skills: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "Express", "MongoDB"] }
    ],
    projects: []
};

export function CVBuilder() {
    const [profile, setProfile] = useState<CVProfile>(INITIAL_PROFILE);
    const [template, setTemplate] = useState<CVTemplate>("minimalist");
    const [activeSection, setActiveSection] = useState("experience");

    const handleInputChange = (field: keyof CVProfile['contact'] | 'fullName' | 'title' | 'summary', value: string) => {
        if (['fullName', 'title', 'summary'].includes(field)) {
            setProfile(prev => ({ ...prev, [field]: value }));
        } else {
            setProfile(prev => ({
                ...prev,
                contact: { ...prev.contact, [field]: value }
            }));
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
            {/* Left Column: Editor */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                <TemplateSelector selectedTemplate={template} onSelect={setTemplate} />

                {/* Editor Form */}
                <div className="space-y-6">
                    {/* Personal Info */}
                    <GlassCard className="p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    value={profile.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-400">Professional Title</label>
                                <input
                                    type="text"
                                    value={profile.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <label className="text-xs text-gray-400">Professional Summary</label>
                                <button className="text-xs text-purple-400 flex items-center gap-1 hover:text-purple-300">
                                    <Sparkles size={12} /> AI Generate
                                </button>
                            </div>
                            <textarea
                                value={profile.summary}
                                onChange={(e) => handleInputChange('summary', e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none h-24 resize-none"
                            />
                        </div>
                    </GlassCard>

                    {/* Experience (Simplified for Demo) */}
                    <GlassCard className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white">Experience</h3>
                            <button className="text-sm text-blue-400 font-bold">+ Add Role</button>
                        </div>
                        {profile.experience.map(exp => (
                            <div key={exp.id} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text" value={exp.role}
                                        className="bg-transparent border-b border-white/10 pb-1 text-white font-medium focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="text" value={exp.company}
                                        className="bg-transparent border-b border-white/10 pb-1 text-gray-400 text-right focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="relative group">
                                    <textarea
                                        value={exp.description}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm focus:border-blue-500 outline-none h-20 resize-none"
                                    />
                                    <button className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors opacity-0 group-hover:opacity-100">
                                        <Sparkles size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </GlassCard>
                </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="flex-1 lg:h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Live Preview</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 flex items-center gap-2">
                            <Save size={14} /> Save Draft
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2">
                            <Download size={14} /> Download PDF
                        </button>
                    </div>
                </div>
                <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    <LiveCVPreview profile={profile} template={template} />
                </div>
            </div>
        </div>
    );
}
