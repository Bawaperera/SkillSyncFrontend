"use client";

import { useState } from "react";
import { CVProfile, CVTemplate } from "@/types/cv";
import { CVUploader } from "@/components/student/cv/CVUploader";
import { CVAnalysisDashboard } from "@/components/student/cv/CVAnalysisDashboard";
import { CVBuilder } from "@/components/student/cv/CVBuilder";
import { FileText, PenTool } from "lucide-react";

export default function CVPage() {
    const [mode, setMode] = useState<"auditor" | "architect">("auditor");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Initial State: User hasn't uploaded anything or chosen to build
    // If they upload -> Auditor Mode
    // If they click "Create New" -> Architect Mode

    const handleUpload = (file: File) => {
        setUploadedFile(file);
        setMode("auditor");
    };

    const handleReset = () => {
        setUploadedFile(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0B] p-4 md:p-8 pb-24">
            {/* Mode Toggle Header */}
            <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Career Optimization Station</h1>
                    <p className="text-gray-500 dark:text-gray-400">Analyze your existing CV or build a perfect one from scratch.</p>
                </div>

                <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
                    <button
                        onClick={() => setMode("auditor")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${mode === "auditor" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                    >
                        <FileText size={16} /> Auditor
                    </button>
                    <button
                        onClick={() => setMode("architect")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${mode === "architect" ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
                    >
                        <PenTool size={16} /> Architect
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {mode === "auditor" ? (
                    uploadedFile ? (
                        <CVAnalysisDashboard file={uploadedFile} onReset={handleReset} />
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                            <CVUploader onUpload={handleUpload} />
                            <div className="flex items-center gap-4 w-full max-w-md">
                                <div className="h-px bg-white/10 flex-1" />
                                <span className="text-gray-500 text-sm font-medium">OR</span>
                                <div className="h-px bg-white/10 flex-1" />
                            </div>
                            <button
                                onClick={() => setMode("architect")}
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold shadow-xl shadow-purple-500/20 transition-all transform hover:scale-105"
                            >
                                Create CV from Scratch
                            </button>
                        </div>
                    )
                ) : (
                    <CVBuilder />
                )}
            </div>
        </div>
    );
}
