"use client";

import { JobMatch } from "@/types/analysis";
import { X, Building2, MapPin, DollarSign, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JobDrawerProps {
    job: JobMatch | null;
    onClose: () => void;
}

export function JobDrawer({ job, onClose }: JobDrawerProps) {
    return (
        <AnimatePresence>
            {job && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0A0A0B] border-l border-white/10 z-50 shadow-2xl overflow-y-auto"
                    >
                        <div className="p-6">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="mt-8">
                                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-2xl">
                                    {job.logo ? <img src={job.logo} className="w-full h-full object-cover rounded-xl" /> : "🏢"}
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-1">{job.title}</h2>
                                <div className="flex items-center gap-2 text-blue-400 font-medium mb-4">
                                    <Building2 size={16} />
                                    {job.company}
                                </div>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-medium flex items-center gap-1.5">
                                        <DollarSign size={14} /> {job.salary}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 text-sm">
                                        Full-Time
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 text-sm flex items-center gap-1.5">
                                        <MapPin size={14} /> Remote / Hybrid
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Description</h3>
                                        <p className="text-gray-300 leading-relaxed text-sm">
                                            {job.description}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                        <h4 className="font-bold text-blue-400 mb-2 text-sm">Why you're a match ({job.matchScore}%)</h4>
                                        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-2">
                                            <div className="h-full bg-blue-500 w-[85%]" />
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            You have 8/10 required skills. Missing: Docker, AWS.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 p-6 bg-[#0A0A0B]/80 backdrop-blur-xl border-t border-white/10 flex gap-4">
                            <button className="flex-1 py-3 is-loading rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 transition-colors">
                                Save Job
                            </button>
                            <button className="flex-[2] py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                                Apply Now <ExternalLink size={16} />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
