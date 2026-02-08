import { StudentProfile } from "@/types/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { Briefcase, Calendar, Building2 } from "lucide-react";

interface ExperienceTabProps {
    profile: StudentProfile;
}

export function ExperienceTab({ profile }: ExperienceTabProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-orange-500/10">
                        <Briefcase size={18} className="text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Work Experience</h3>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors">
                    + Add Role
                </button>
            </div>

            <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8 md:pl-10">
                {profile.experience.map((exp) => (
                    <div key={exp.id} className="relative group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-black border-4 border-gray-800 group-hover:border-blue-500 transition-colors" />

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                            <div>
                                <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                                <div className="flex items-center gap-2 text-sm text-blue-400 font-medium mt-1">
                                    <Building2 size={14} />
                                    <span>{exp.company}</span>
                                    <span className="w-1 h-1 rounded-full bg-blue-400/50" />
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <Calendar size={12} />
                                        {exp.duration}
                                    </span>
                                </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 w-fit">
                                {exp.type}
                            </span>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl">
                            {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {exp.skillsUsed.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
