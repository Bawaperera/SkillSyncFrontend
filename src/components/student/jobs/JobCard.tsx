"use client";

import { JobPosting, JobMatchAndAnalysis } from "@/types/jobs";
import { GlassCard } from "@/components/ui/GlassCard";
import { MapPin, Clock, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
    job: JobPosting;
    match: JobMatchAndAnalysis;
}

export function JobCard({ job, match }: JobCardProps) {
    // Determine badge color based on match score
    const isHighMatch = match.matchScore >= 80;
    const matchColor = isHighMatch ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

    return (
        <Link href={`/student/jobs/${job.id}`}>
            <GlassCard className="p-6 hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold text-white">
                            {job.logo ? <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-xl" /> : job.company.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                <Building2 size={14} />
                                {job.company}
                            </div>
                        </div>
                    </div>

                    <div className={`px-3 py-1 rounded-full border text-xs font-bold ${matchColor}`}>
                        {match.matchScore}% Match
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {job.postedAt}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                        {job.type}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-sm font-medium text-gray-300">{job.salaryRange}</span>
                    <span className="text-sm font-bold text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                        View Details <ArrowRight size={14} />
                    </span>
                </div>
            </GlassCard>
        </Link>
    );
}
