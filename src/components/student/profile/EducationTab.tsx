import { StudentProfile } from "@/types/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";

interface EducationTabProps {
    profile: StudentProfile;
}

export function EducationTab({ profile }: EducationTabProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-green-500/10">
                        <GraduationCap size={18} className="text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Education</h3>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors">
                    + Add Education
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {profile.education.map((edu) => (
                    <GlassCard key={edu.id} className="p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-green-500/10 transition-colors" />

                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 relative z-10">
                            <div>
                                <h4 className="text-lg font-bold text-white">{edu.institution}</h4>
                                <div className="text-blue-400 font-medium">{edu.degree}</div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1.5 text-sm text-gray-400 justify-end">
                                    <Calendar size={14} />
                                    {edu.year}
                                </div>
                                {edu.grade && (
                                    <div className="text-sm font-semibold text-green-400 mt-1">
                                        {edu.grade}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen size={14} className="text-gray-500" />
                                <span className="text-xs uppercase font-bold tracking-wider text-gray-500">Key Modules</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {edu.modules.map((module) => (
                                    <span
                                        key={module}
                                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300 group-hover:border-green-500/20 group-hover:text-gray-200 transition-colors cursor-default"
                                    >
                                        {module}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
