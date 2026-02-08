"use client";

import { StudentProfile } from "@/types/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { TrustBadge } from "./TrustBadge";
import { AvailabilityToggle } from "./AvailabilityToggle";
import { MapPin, Link as LinkIcon, Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
    profile: StudentProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    return (
        <GlassCard className="p-6 md:p-8 relative overflow-hidden group">
            {/* Background Gradient Mesh */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/15 transition-colors duration-500" />

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                        <img
                            src={profile.avatarUrl}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {profile.isVerifiedStudent && (
                        <div className="absolute -bottom-2 -right-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                            <TrustBadge type="verified_student" className="!bg-blue-500/20 !text-blue-400 !border-none !px-0 !py-0 !gap-0" />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                    {profile.name}
                                </h1>
                                {profile.isVerifiedStudent && <TrustBadge type="verified_student" />}
                            </div>
                            <p className="text-lg text-gray-300 mt-1 font-medium">{profile.title}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                <MapPin size={14} className="text-blue-400" />
                                {profile.location}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/preview" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-gray-300 transition-colors">
                                👀 Preview Public
                            </Link>
                        </div>
                    </div>

                    {/* Socials & Availability */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-2">
                        <div className="flex gap-3">
                            {profile.socials.github && (
                                <Link
                                    href={profile.socials.github}
                                    target="_blank"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 border border-white/10 transition-colors"
                                >
                                    <Github size={18} />
                                </Link>
                            )}
                            {profile.socials.linkedin && (
                                <Link
                                    href={profile.socials.linkedin}
                                    target="_blank"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 border border-white/10 transition-colors"
                                >
                                    <Linkedin size={18} />
                                </Link>
                            )}
                            {profile.socials.website && (
                                <Link
                                    href={profile.socials.website}
                                    target="_blank"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 border border-white/10 transition-colors"
                                >
                                    <Globe size={18} />
                                </Link>
                            )}
                        </div>

                        <AvailabilityToggle initialStatus={profile.availability} />
                    </div>
                </div>
            </div>

            {/* Profile Strength Nudge */}
            <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-400">Profile Strength:</span>
                        <span className={`text-sm font-bold ${profile.profileStrength > 80 ? 'text-green-400' : profile.profileStrength > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {profile.profileStrength > 80 ? 'All-Star' : profile.profileStrength > 50 ? 'Intermediate' : 'Beginner'} ({profile.profileStrength}%)
                        </span>
                    </div>
                    <span className="text-xs text-blue-300 font-medium hidden md:block">
                        Add 2 Projects to reach 'All-Star' status
                    </span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profile.profileStrength}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${profile.profileStrength > 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            profile.profileStrength > 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                'bg-gradient-to-r from-red-500 to-pink-500'
                            }`}
                    />
                </div>
                <span className="text-xs text-blue-300 font-medium mt-2 block md:hidden">
                    Add 2 Projects to reach 'All-Star' status
                </span>
            </div>
        </GlassCard>
    );
}
