"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { CURRENT_STUDENT } from "@/lib/mockData";
import { MapPin, Mail, Github, Linkedin, Calendar, Edit2, Share2, CheckCircle, Code, Briefcase, Award } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const [isOpenToWork, setIsOpenToWork] = useState(true);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <GlassCard className="relative overflow-hidden p-0">
                <div className="h-32 bg-gradient-to-r from-blue-900 to-purple-900" />
                <div className="px-8 pb-8">
                    <div className="flex justify-between items-end -mt-12 mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 border-4 border-white text-white flex items-center justify-center text-3xl font-bold overflow-hidden shadow-lg">
                                {/* Avatar Placeholder */}
                                <div className="w-full h-full flex items-center justify-center">
                                    {CURRENT_STUDENT.name.substring(0, 2)}
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
                        </div>
                        <div className="flex gap-2">
                            <GlassButton variant="secondary" size="sm"><Share2 className="w-4 h-4 mr-2" /> Share</GlassButton>
                            <GlassButton variant="primary" size="sm"><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</GlassButton>
                        </div>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                                {CURRENT_STUDENT.name}
                                <CheckCircle className="w-5 h-5 text-blue-400" />
                            </h1>
                            <p className="text-lg text-gray-300 mb-2">{CURRENT_STUDENT.degree} at {CURRENT_STUDENT.university}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Colombo, Sri Lanka</span>
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Class of {CURRENT_STUDENT.graduationYear}</span>
                            </div>
                            <p className="text-gray-400 max-w-2xl leading-relaxed">{CURRENT_STUDENT.bio}</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center min-w-[160px]">
                            <span className="text-sm text-gray-400 mb-2">Open to Work</span>
                            <div
                                className={cn("w-12 h-6 rounded-full p-1 cursor-pointer transition-colors relative", isOpenToWork ? "bg-green-500" : "bg-gray-600")}
                                onClick={() => setIsOpenToWork(!isOpenToWork)}
                            >
                                <div className={cn("w-4 h-4 bg-white rounded-full shadow-md transition-transform", isOpenToWork ? "translate-x-6" : "translate-x-0")} />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <a href={`https://${CURRENT_STUDENT.github}`} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href={`https://${CURRENT_STUDENT.linkedin}`} target="_blank" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href={`mailto:${CURRENT_STUDENT.email}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </GlassCard>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Left Col */}
                <div className="md:col-span-2 space-y-6">
                    {/* Experience / Projects */}
                    <GlassCard>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-purple-400" /> Projects & Experience
                        </h2>

                        <div className="space-y-8 relative pl-6 border-l border-white/10">
                            <div className="relative">
                                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-black" />
                                <h3 className="font-bold text-lg">E-Commerce Platform (React & Node.js)</h3>
                                <p className="text-sm text-gray-400 mb-2">Academic Project • Jan 2023 - May 2023</p>
                                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                    Built a full-stack e-commerce application with secure payment gateway integration, user authentication, and an admin dashboard.
                                </p>
                                <div className="flex gap-2">
                                    <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">React</span>
                                    <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">Node.js</span>
                                    <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">MongoDB</span>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-gray-600 border-2 border-black" />
                                <h3 className="font-bold text-lg">Hackathon Winner - CodeFest 2022</h3>
                                <p className="text-sm text-gray-400 mb-2">University of Moratuwa • Dec 2022</p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Developed an AI-driven waste management solution using Flutter and TensorFlow Lite. Won 1st place out of 50 teams.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Right Col */}
                <div className="space-y-6">
                    <GlassCard>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-blue-400" /> Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {CURRENT_STUDENT.skills.map(skill => (
                                <div key={skill.id} className={cn(
                                    "px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2",
                                    skill.verified
                                        ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                                        : "bg-white/5 border-white/10 text-gray-400"
                                )}>
                                    {skill.name}
                                    {skill.verified && <CheckCircle className="w-3 h-3" />}
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-400" /> Certifications
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center font-bold text-xs text-yellow-500">AWS</div>
                                <div>
                                    <h4 className="font-bold text-sm">AWS Certified Cloud Practitioner</h4>
                                    <p className="text-xs text-gray-500">Issued Aug 2023</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center font-bold text-xs text-blue-500">meta</div>
                                <div>
                                    <h4 className="font-bold text-sm">Meta Front-End Developer</h4>
                                    <p className="text-xs text-gray-500">Issued May 2023</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
