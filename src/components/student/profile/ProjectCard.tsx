import { Project } from "@/types/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { Github, Globe, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <GlassCard className="p-0 overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-300 group">
            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 max-w-sm leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {project.repoUrl && (
                            <Link
                                href={project.repoUrl}
                                target="_blank"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <Github size={18} />
                            </Link>
                        )}
                        {project.demoUrl && (
                            <Link
                                href={project.demoUrl}
                                target="_blank"
                                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <ExternalLink size={18} />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-gray-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Project DNA */}
                <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                        <Code2 size={14} className="text-purple-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                            Project DNA (AI Analysis)
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">
                                Complexity
                            </span>
                            <span
                                className={`text-sm font-semibold ${project.dna.complexity === "High"
                                        ? "text-red-400"
                                        : project.dna.complexity === "Medium"
                                            ? "text-yellow-400"
                                            : "text-green-400"
                                    }`}
                            >
                                {project.dna.complexity}
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">
                                Code Quality
                            </span>
                            <span className="text-sm font-semibold text-green-400">
                                Grade {project.dna.quality}
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">
                                Top Lang
                            </span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-blue-400">
                                    {project.dna.topLanguage}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {project.dna.topLanguagePercentage}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
