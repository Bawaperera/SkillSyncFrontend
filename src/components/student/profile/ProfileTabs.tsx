"use client";

import { StudentProfile } from "@/types/profile";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillsTab } from "./SkillsTab";
import { ProjectsTab } from "./ProjectsTab";
import { ExperienceTab } from "./ExperienceTab";
import { EducationTab } from "./EducationTab";

interface ProfileTabsProps {
    profile: StudentProfile;
}

const TABS = [
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "personal", label: "Personal" },
];

export function ProfileTabs({ profile }: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState("skills");
    const [isSticky, setIsSticky] = useState(false);
    const tabsRef = useRef<HTMLDivElement>(null);

    // Sticky Tabs Logic
    useEffect(() => {
        const handleScroll = () => {
            if (tabsRef.current) {
                setIsSticky(tabsRef.current.getBoundingClientRect().top <= 80); // Adjust based on Top Nav height
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Sticky Tab Nav */}
            <div
                ref={tabsRef}
                className={`sticky top-[72px] z-40 transition-all duration-300 ${isSticky
                        ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg -mx-6 px-6 md:-mx-8 md:px-8"
                        : "py-6 bg-transparent"
                    }`}
            >
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${isActive
                                        ? "text-white bg-white/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 rounded-full border border-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-4 pb-20">
                <AnimatePresence mode="wait">
                    {activeTab === "skills" && (
                        <motion.div key="skills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                            <SkillsTab profile={profile} />
                        </motion.div>
                    )}
                    {activeTab === "projects" && (
                        <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                            <ProjectsTab profile={profile} />
                        </motion.div>
                    )}
                    {activeTab === "experience" && (
                        <motion.div key="experience" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                            <ExperienceTab profile={profile} />
                        </motion.div>
                    )}
                    {activeTab === "education" && (
                        <motion.div key="education" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                            <EducationTab profile={profile} />
                        </motion.div>
                    )}
                    {activeTab === "personal" && (
                        <div className="flex items-center justify-center h-48 text-gray-500">
                            Personal details tab content placeholder
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
