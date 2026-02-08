import { StudentProfile } from "@/types/profile";
import { SkillBadge } from "./SkillBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, User } from "lucide-react";

interface SkillsTabProps {
    profile: StudentProfile;
}

export function SkillsTab({ profile }: SkillsTabProps) {
    const verifiedSkills = profile.skills.filter((s) => s.verified);
    const manualSkills = profile.skills.filter((s) => !s.verified);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Verified Skills */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-blue-500/10">
                        <CheckCircle2 size={18} className="text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Verified Skills</h3>
                    <span className="text-sm text-gray-400 font-medium">
                        ({verifiedSkills.length})
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {verifiedSkills.map((skill) => (
                        <SkillBadge key={skill.name} skill={skill} />
                    ))}
                </div>
            </section>

            {/* Self-Reported Skills */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gray-500/10">
                        <User size={18} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Self-Reported</h3>
                    <span className="text-sm text-gray-400 font-medium">
                        ({manualSkills.length})
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {manualSkills.map((skill) => (
                        <SkillBadge key={skill.name} skill={skill} />
                    ))}

                    {/* Add New Skill CTA */}
                    <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-gray-700 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors group">
                        <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 border border-white/5 group-hover:border-white/10 transition-colors">
                            +
                        </span>
                        <span className="text-sm font-medium">Add Skill</span>
                    </button>
                </div>
            </section>

            <GlassCard className="p-4 bg-blue-500/5 border-blue-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">Want to verify your self-reported skills?</h4>
                        <p className="text-xs text-blue-200/80">Link a GitHub repository or upload a project to get verified.</p>
                    </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors">
                    Verify Now
                </button>
            </GlassCard>
        </div>
    );
}
