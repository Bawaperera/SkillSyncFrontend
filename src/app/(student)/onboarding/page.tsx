"use client";

import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { AnimatePresence, motion } from "framer-motion";
import { Upload, Github, CheckCircle, ArrowRight, Code } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isGithubConnected, setIsGithubConnected] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const handleFileUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 200);
    };

    const handleGithubConnect = () => {
        setIsGithubConnected(true);
    };

    return (
        <div className="max-w-3xl mx-auto py-12">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">Set Up Your Profile</h1>
                    <span className="text-gray-400">Step {step} of 3</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <GlassCard className="p-8">
                            <h2 className="text-2xl font-bold mb-2">Upload Your CV</h2>
                            <p className="text-gray-400 mb-8">We&apos;ll extract your skills automatically.</p>

                            <div
                                className={cn(
                                    "border-2 border-dashed border-white/20 rounded-2xl p-12 text-center transition-colors cursor-pointer",
                                    uploadProgress === 100 ? "border-green-500/50 bg-green-500/10" : "hover:border-blue-500/50 hover:bg-blue-500/5"
                                )}
                                onClick={handleFileUpload}
                            >
                                {uploadProgress === 100 ? (
                                    <div className="text-green-400">
                                        <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                                        <p className="font-bold">CV Uploaded Successfully</p>
                                        <p className="text-sm opacity-80">skills_v1.pdf</p>
                                    </div>
                                ) : (
                                    <div className="text-gray-400">
                                        <Upload className="w-12 h-12 mx-auto mb-4" />
                                        <p className="font-bold text-white mb-2">Drag & Drop your PDF here</p>
                                        <p className="text-sm">or click to browse</p>
                                    </div>
                                )}
                            </div>

                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            )}

                            <div className="mt-8 flex justify-end">
                                <GlassButton
                                    disabled={uploadProgress < 100}
                                    onClick={() => setStep(2)}
                                    className={cn(uploadProgress === 100 && "glass-button-primary")}
                                >
                                    Continue
                                </GlassButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <GlassCard className="p-8">
                            <h2 className="text-2xl font-bold mb-2">Connect GitHub</h2>
                            <p className="text-gray-400 mb-8">Verify your code quality and repositories.</p>

                            <div className="flex flex-col items-center justify-center p-12 border border-white/10 rounded-2xl bg-black/20">
                                <Github className="w-16 h-16 text-white mb-6" />
                                {!isGithubConnected ? (
                                    <GlassButton onClick={handleGithubConnect} className="bg-[#24292e] hover:bg-[#2f363d] text-white border-none py-3 px-6 text-lg">
                                        Connect GitHub Account
                                    </GlassButton>
                                ) : (
                                    <div className="text-center">
                                        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full mb-4">
                                            <CheckCircle className="w-4 h-4" />
                                            Connected as @bawanthap
                                        </div>
                                        <p className="text-gray-400 text-sm">Found 25 Repositories</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex justify-between">
                                <GlassButton variant="ghost" onClick={() => setStep(1)}>Back</GlassButton>
                                <GlassButton
                                    disabled={!isGithubConnected}
                                    onClick={() => setStep(3)}
                                    className={cn(isGithubConnected && "glass-button-primary")}
                                >
                                    Continue
                                </GlassButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <GlassCard className="p-8">
                            <h2 className="text-2xl font-bold mb-2">Select Target Role</h2>
                            <p className="text-gray-400 mb-8">What job are you aiming for?</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Full Stack Developer", "Frontend Engineer", "Backend Developer",
                                    "DevOps Engineer", "Data Scientist", "Mobile Developer"
                                ].map((role) => (
                                    <div
                                        key={role}
                                        className={cn(
                                            "p-4 rounded-xl border cursor-pointer transition-all",
                                            selectedRole === role
                                                ? "bg-blue-500/20 border-blue-500 text-white"
                                                : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                                        )}
                                        onClick={() => setSelectedRole(role)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Code className="w-5 h-5 opacity-70" />
                                                <span className="font-medium">{role}</span>
                                            </div>
                                            {selectedRole === role && <CheckCircle className="w-5 h-5 text-blue-400" />}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-between">
                                <GlassButton variant="ghost" onClick={() => setStep(2)}>Back</GlassButton>
                                <Link href="/dashboard">
                                    <GlassButton
                                        disabled={!selectedRole}
                                        className={cn(selectedRole && "glass-button-primary")}
                                    >
                                        Finish Setup
                                    </GlassButton>
                                </Link>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
