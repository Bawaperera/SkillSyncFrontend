"use client";

import { JobPosting, JobMatchAndAnalysis } from "@/types/jobs";
import { GlassCard } from "@/components/ui/GlassCard";
import { MapPin, Clock, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
    job: JobPosting;
    match?: JobMatchAndAnalysis;
}

export function JobCard({ job, match }: JobCardProps) {
    // Determine badge color based on match score
    const matchScore = match?.matchScore ?? 0;
    const isHighMatch = matchScore >= 80;
    const matchColor = isHighMatch ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200";

    return (
        <Link href={`/student/jobs/${job.id}`}>
            <GlassCard className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700">
                            {job.logo ? <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-xl" /> : job.company.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <Building2 size={14} />
                                {job.company}
                            </div>
                        </div>
                    </div>

                    <div className={`px-3 py-1 rounded-full border text-xs font-bold ${matchColor}`}>
                        {matchScore}% Match
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
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {job.type}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">{job.salaryRange}</span>
                    <span className="text-sm font-bold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                        View Details <ArrowRight size={14} />
                    </span>
                </div>
            </GlassCard>
        </Link>
    );
}
