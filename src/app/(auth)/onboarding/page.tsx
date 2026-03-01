"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles, Upload, Github, Linkedin, Target,
    CheckCircle2, ArrowRight, ArrowLeft, SkipForward,
    FileText, Code2, Briefcase, X, Loader2, GraduationCap
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { GlassButton } from "@/components/ui/GlassButton";
import { useAuth } from "@/lib/auth/AuthContext";
import { uploadCV, connectGitHub, connectLinkedIn, setTargetRole, completeOnboarding } from "@/lib/api/auth-api";
import { cn } from "@/lib/utils";
import type { CVUploadResponse, GitHubConnectResponse, LinkedInConnectResponse } from "@/types/user";

// ============================================================
// Step Configuration
// ============================================================
const STEPS = [
    { id: "welcome", label: "Welcome", icon: Sparkles },
    { id: "cv", label: "Upload CV", icon: FileText },
    { id: "github", label: "GitHub", icon: Github },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin },
    { id: "target-role", label: "Target Role", icon: Target },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const TARGET_ROLES = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cloud Architect",
    "Mobile Developer",
    "UI/UX Designer",
    "Product Manager",
    "QA Engineer",
    "Cybersecurity Analyst",
    "Business Analyst",
];

// ============================================================
// Slide animation variants
// ============================================================
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
    }),
};

// ============================================================
// Main Onboarding Page
// ============================================================
export default function OnboardingPage() {
    const router = useRouter();
    const { user, refreshUser } = useAuth();

    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isFinishing, setIsFinishing] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);

    // Step-specific state
    const [cvData, setCvData] = useState<CVUploadResponse | null>(null);
    const [cvUploading, setCvUploading] = useState(false);
    const [cvDragActive, setCvDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [githubData, setGithubData] = useState<GitHubConnectResponse | null>(null);
    const [githubConnecting, setGithubConnecting] = useState(false);

    const [linkedinData, setLinkedinData] = useState<LinkedInConnectResponse | null>(null);
    const [linkedinConnecting, setLinkedinConnecting] = useState(false);

    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [roleSearchQuery, setRoleSearchQuery] = useState("");
    const [roleSaving, setRoleSaving] = useState(false);

    // Pre-populate from existing user data
    useEffect(() => {
        if (user) {
            if (user.onboarding.cvUploaded && user.cvFileName) {
                setCvData({ success: true, cvId: user.cvId || "", fileName: user.cvFileName, extractedData: { skills: [], experience: [], education: [], projects: [] } });
            }
            if (user.onboarding.githubConnected && user.githubUsername) {
                setGithubData({ success: true, githubUsername: user.githubUsername, reposCount: 0, commitsLast6Months: 0, detectedSkills: [] });
            }
            if (user.onboarding.linkedinConnected && user.linkedinId) {
                setLinkedinData({ success: true, linkedinId: user.linkedinId, importedData: { experience: [], certifications: [] } });
            }
            if (user.onboarding.targetRoleSelected && user.targetRole) {
                setSelectedRole(user.targetRole);
            }
        }
    }, [user]);

    // Navigation
    const goNext = useCallback(() => {
        if (currentStep < STEPS.length - 1) {
            setDirection(1);
            setCurrentStep((s) => s + 1);
        }
    }, [currentStep]);

    const goPrev = useCallback(() => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep((s) => s - 1);
        }
    }, [currentStep]);

    // Finish onboarding (called from last step or skip)
    const finishOnboarding = useCallback(async () => {
        setIsFinishing(true);
        try {
            await completeOnboarding();
            await refreshUser();
            setShowCompletion(true);
        } catch {
            // Still navigate — onboarding is skippable
            router.push("/student/dashboard");
        } finally {
            setIsFinishing(false);
        }
    }, [refreshUser, router]);

    // Skip to dashboard directly
    const skipToDashboard = useCallback(async () => {
        setIsFinishing(true);
        try {
            await completeOnboarding();
            await refreshUser();
        } catch { /* continue anyway */ }
        router.push("/student/dashboard");
    }, [refreshUser, router]);

    // ============================================================
    // CV Upload Handlers
    // ============================================================
    const handleCVFile = useCallback(async (file: File) => {
        if (!file || !file.name.match(/\.(pdf|docx?)$/i)) return;
        if (!user) return;

        setCvUploading(true);
        try {
            const result = await uploadCV(file, user.id);
            setCvData(result);
            await refreshUser();
        } catch {
            // Show error inline if needed
        } finally {
            setCvUploading(false);
        }
    }, [user, refreshUser]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setCvDragActive(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setCvDragActive(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setCvDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) handleCVFile(file);
    }, [handleCVFile]);

    // ============================================================
    // GitHub Connect
    // ============================================================
    const handleGitHubConnect = useCallback(async () => {
        setGithubConnecting(true);
        try {
            const result = await connectGitHub();
            setGithubData(result);
            await refreshUser();
        } catch {
            // Handle error
        } finally {
            setGithubConnecting(false);
        }
    }, [refreshUser]);

    // ============================================================
    // LinkedIn Connect
    // ============================================================
    const handleLinkedInConnect = useCallback(async () => {
        setLinkedinConnecting(true);
        try {
            const result = await connectLinkedIn();
            setLinkedinData(result);
            await refreshUser();
        } catch {
            // Handle error
        } finally {
            setLinkedinConnecting(false);
        }
    }, [refreshUser]);

    // ============================================================
    // Target Role
    // ============================================================
    const handleSelectRole = useCallback(async (role: string) => {
        setSelectedRole(role);
        setRoleSaving(true);
        try {
            await setTargetRole(role);
            await refreshUser();
        } catch {
            // Silent fail — role is not critical
        } finally {
            setRoleSaving(false);
        }
    }, [refreshUser]);

    const filteredRoles = TARGET_ROLES.filter((r) =>
        r.toLowerCase().includes(roleSearchQuery.toLowerCase())
    );

    // ============================================================
    // Completion Screen
    // ============================================================
    if (showCompletion) {
        const completedSteps = [
            cvData && "CV uploaded",
            githubData && "GitHub connected",
            linkedinData && "LinkedIn connected",
            selectedRole && `Target: ${selectedRole}`,
        ].filter(Boolean);

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-lg w-full text-center space-y-8"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </div>
                    </motion.div>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">
                            You&apos;re All Set{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}!
                        </h1>
                        <p className="text-gray-500 text-lg">
                            Your profile is ready. Let&apos;s find you the perfect opportunity.
                        </p>
                    </div>

                    {/* What was completed */}
                    {completedSteps.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 relative overflow-hidden text-left"
                        >
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Profile Summary</h3>
                            {completedSteps.map((step, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                    <span className="text-gray-700">{step}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <GlassButton
                            variant="primary"
                            onClick={() => router.push("/student/dashboard")}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white border-none font-bold text-base shadow-lg shadow-blue-500/20 inline-flex items-center justify-center gap-2"
                        >
                            Go to Dashboard <ArrowRight size={18} />
                        </GlassButton>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    // ============================================================
    // Main Onboarding UI
    // ============================================================
    const currentStepConfig = STEPS[currentStep];
    const isLastStep = currentStep === STEPS.length - 1;
    const completedCount = [cvData, githubData, linkedinData, selectedRole].filter(Boolean).length;
    const progressPercent = ((currentStep) / STEPS.length) * 100;

    return (
        <div className="h-screen bg-[#FAFBFF] relative overflow-hidden flex flex-col items-center">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none" />

            {/* Stepper Header (Floating Pill Design) */}
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-4 relative z-10">
                <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl px-5 py-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                    {/* Progress Fill (Subtle background progress) */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100 rounded-b-3xl overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center">
                        {/* Logo — fixed width */}
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 shrink-0 mr-6">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                                <GraduationCap size={16} strokeWidth={2.5} />
                            </div>
                            SkillSync
                        </Link>

                        {/* Stepper — fills remaining space, evenly distributed */}
                        <div className="flex-1 flex items-center justify-center min-w-0">
                            {STEPS.map((step, idx) => {
                                const isCompleted = idx < currentStep;
                                const isCurrent = idx === currentStep;

                                return (
                                    <div key={step.id} className="flex items-center">
                                        <div className={cn(
                                            "flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-all duration-300 shrink-0",
                                            isCompleted ? "bg-indigo-50 text-indigo-600 border border-indigo-200" :
                                                isCurrent ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border-none scale-110 relative z-10" :
                                                    "bg-white border border-slate-200 text-slate-400"
                                        )}>
                                            {isCompleted ? <CheckCircle2 size={13} /> : idx + 1}
                                        </div>

                                        <span className={cn(
                                            "ml-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-300",
                                            isCurrent ? "text-slate-900 font-bold" :
                                                isCompleted ? "text-slate-600" : "text-slate-400"
                                        )}>
                                            {step.label}
                                        </span>

                                        {idx < STEPS.length - 1 && (
                                            <div className="w-6 lg:w-10 h-px bg-slate-200 mx-2 lg:mx-3 shrink-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Skip button — fixed width */}
                        <button
                            onClick={skipToDashboard}
                            disabled={isFinishing}
                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 shrink-0 whitespace-nowrap ml-6"
                        >
                            <SkipForward size={13} />
                            Skip to Dashboard
                        </button>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-900">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                                    <GraduationCap size={14} strokeWidth={2.5} />
                                </div>
                                SkillSync
                            </Link>
                            <button
                                onClick={skipToDashboard}
                                disabled={isFinishing}
                                className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
                            >
                                <SkipForward size={14} />
                                Skip
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-900 tracking-tight">Step {currentStep + 1} of {STEPS.length}</span>
                            <span className="text-sm text-slate-500 font-medium">{STEPS[currentStep].label}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="w-full max-w-4xl mx-auto px-4 pb-4 relative z-10 flex-1 flex flex-col justify-center overflow-y-auto">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStepConfig.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* =================== STEP: WELCOME =================== */}
                        {currentStepConfig.id === "welcome" && (
                            <WelcomeStep
                                userName={user?.fullName?.split(" ")[0] || "there"}
                                onNext={goNext}
                                onSkip={skipToDashboard}
                            />
                        )}

                        {/* =================== STEP: CV UPLOAD =================== */}
                        {currentStepConfig.id === "cv" && (
                            <CVUploadStep
                                cvData={cvData}
                                isUploading={cvUploading}
                                dragActive={cvDragActive}
                                fileInputRef={fileInputRef}
                                onFileSelect={handleCVFile}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onNext={goNext}
                                onBack={goPrev}
                            />
                        )}

                        {/* =================== STEP: GITHUB =================== */}
                        {currentStepConfig.id === "github" && (
                            <GitHubStep
                                githubData={githubData}
                                isConnecting={githubConnecting}
                                onConnect={handleGitHubConnect}
                                onNext={goNext}
                                onBack={goPrev}
                            />
                        )}

                        {/* =================== STEP: LINKEDIN =================== */}
                        {currentStepConfig.id === "linkedin" && (
                            <LinkedInStep
                                linkedinData={linkedinData}
                                isConnecting={linkedinConnecting}
                                onConnect={handleLinkedInConnect}
                                onNext={goNext}
                                onBack={goPrev}
                            />
                        )}

                        {/* =================== STEP: TARGET ROLE =================== */}
                        {currentStepConfig.id === "target-role" && (
                            <TargetRoleStep
                                selectedRole={selectedRole}
                                isSaving={roleSaving}
                                searchQuery={roleSearchQuery}
                                filteredRoles={filteredRoles}
                                onSearch={setRoleSearchQuery}
                                onSelect={handleSelectRole}
                                onFinish={finishOnboarding}
                                onBack={goPrev}
                                isFinishing={isFinishing}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

// ============================================================
// STEP COMPONENTS
// ============================================================

function StepCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("bg-white border border-gray-200 rounded-2xl p-6 shadow-sm", className)}>
            {children}
        </div>
    );
}

function StepNav({
    onBack,
    onNext,
    nextLabel = "Continue",
    nextDisabled: disabled = false,
    showSkip = true,
    onSkipLabel = "Skip this step",
}: {
    onBack?: () => void;
    onNext: () => void;
    nextLabel?: string;
    nextDisabled?: boolean;
    showSkip?: boolean;
    onSkipLabel?: string;
}) {
    return (
        <div className="flex items-center justify-between mt-4">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-100"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="flex items-center gap-4">
                {showSkip && (
                    <button
                        onClick={onNext}
                        className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors px-4 py-2"
                    >
                        Skip
                    </button>
                )}
                <GlassButton
                    variant="primary"
                    onClick={onNext}
                    disabled={disabled}
                    className="py-2.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-[0_8px_16px_-6px_rgba(79,70,229,0.4)] hover:shadow-[0_12px_20px_-8px_rgba(79,70,229,0.5)] border-none font-bold inline-flex flex-row-reverse items-center gap-2 rounded-xl transition-all"
                >
                    <ArrowRight size={18} />
                    {nextLabel}
                </GlassButton>
            </div>
        </div>
    );
}

// ============================================================
// WELCOME STEP
// ============================================================
function WelcomeStep({ userName, onNext, onSkip }: { userName: string; onNext: () => void; onSkip: () => void }) {
    const quickActions = [
        { icon: FileText, label: "Upload your CV", desc: "Auto-extract skills from your resume", color: "blue" },
        { icon: Github, label: "Connect GitHub", desc: "Showcase your real projects", color: "gray" },
        { icon: Linkedin, label: "Connect LinkedIn", desc: "Import your professional profile", color: "blue" },
        { icon: Target, label: "Set target role", desc: "Get personalized job matches", color: "purple" },
    ];

    return (
        <div className="space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 relative overflow-hidden text-center"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border border-white relative z-10">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2 relative z-10">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SkillSync</span>
                </h1>

                <p className="text-slate-500 text-base max-w-lg mx-auto mb-6 leading-relaxed relative z-10 font-medium">
                    Let&apos;s build your dynamic skill profile. We&apos;ll analyze your background to match you with top tech employers based on actual capabilities, not just keywords.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto relative z-10 text-left">
                    {[
                        { icon: FileText, title: "Resume Parsing", desc: "Automated skill extraction" },
                        { icon: Code2, title: "GitHub Sync", desc: "Verify coding capabilities" },
                        { icon: Briefcase, title: "LinkedIn Import", desc: "Sync professional history" },
                        { icon: Target, title: "Role Matching", desc: "Personalized job alerts" },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="flex items-start gap-3 p-3.5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
                        >
                            <div className="w-9 h-9 rounded-lg bg-blue-50/50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors text-blue-600">
                                <feature.icon size={18} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 text-sm mb-0.5">{feature.title}</h3>
                                <p className="text-xs text-slate-500">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="flex items-center justify-center mt-4">
                <GlassButton
                    variant="primary"
                    onClick={onNext}
                    className="py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-[0_8px_16px_-6px_rgba(79,70,229,0.4)] hover:shadow-[0_12px_20px_-8px_rgba(79,70,229,0.5)] border-none font-bold inline-flex items-center gap-2 rounded-xl text-base transition-all"
                >
                    Get Started <ArrowRight size={18} />
                </GlassButton>
            </div>
        </div>
    );
}

// ============================================================
// CV UPLOAD STEP
// ============================================================
function CVUploadStep({
    cvData,
    isUploading,
    dragActive,
    fileInputRef,
    onFileSelect,
    onDragOver,
    onDragLeave,
    onDrop,
    onNext,
    onBack,
}: {
    cvData: CVUploadResponse | null;
    isUploading: boolean;
    dragActive: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onFileSelect: (file: File) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    return (
        <div className="space-y-4">
            <StepCard>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Upload your Resume/CV</h2>
                    <p className="text-slate-500 font-medium">
                        We&apos;ll automatically extract your skills, education, and experience to build your profile base.
                    </p>
                </div>

                {!cvData ? (
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        className={cn(
                            "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 group cursor-pointer overflow-hidden",
                            dragActive
                                ? "border-blue-500 bg-blue-50/80"
                                : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                        )}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {/* Interactive Background Glow on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className={cn(
                                "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 shadow-sm",
                                dragActive ? "bg-blue-100 text-blue-600 scale-110" : "bg-white text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                            )}>
                                {isUploading ? (
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                ) : (
                                    <Upload className="w-8 h-8" />
                                )}
                            </div>

                            <p className="text-lg font-bold text-slate-700 mb-2">
                                {dragActive ? "Drop your CV here" : "Click or drag your CV here"}
                            </p>
                            <p className="text-sm text-slate-500 font-medium">
                                Supports PDF, DOCX (Max 5MB)
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            ref={fileInputRef as any}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onFileSelect(file);
                            }}
                            disabled={isUploading}
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Success Banner */}
                        <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                            <div>
                                <p className="font-semibold text-green-800">CV Uploaded Successfully</p>
                                <p className="text-sm text-green-600">{cvData.fileName}</p>
                            </div>
                        </div>

                        {/* Extracted Data */}
                        {cvData.extractedData.skills.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wider">Extracted Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {cvData.extractedData.skills.map((skill) => (
                                        <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {cvData.extractedData.projects.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wider">Projects Found</h4>
                                <div className="space-y-2">
                                    {cvData.extractedData.projects.map((project) => (
                                        <div key={project.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Code2 size={16} className="text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{project.name}</p>
                                                <p className="text-xs text-gray-500">{project.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </StepCard>

            <StepNav
                onBack={onBack}
                onNext={onNext}
                nextLabel={cvData ? "Continue" : "Skip this step"}
                showSkip={!!cvData}
            />
        </div>
    );
}

// ============================================================
// GITHUB STEP
// ============================================================
function GitHubStep({
    githubData,
    isConnecting,
    onConnect,
    onNext,
    onBack,
}: {
    githubData: GitHubConnectResponse | null;
    isConnecting: boolean;
    onConnect: () => void;
    onNext: () => void;
    onBack: () => void;
}) {
    return (
        <div className="space-y-4">
            <StepCard>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Connect GitHub</h2>
                    <p className="text-slate-500 font-medium">
                        Verify your coding skills by linking your GitHub account. We&apos;ll analyze your repositories and commit history.
                    </p>
                </div>

                {!githubData ? (
                    <div className="text-center space-y-4 p-6 border border-slate-100 rounded-2xl bg-slate-50/50">
                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-slate-900/10 border border-slate-800 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Github className="w-8 h-8 text-white relative z-10" />
                        </div>

                        <div className="space-y-3">
                            <p className="text-slate-600 font-medium">What we&apos;ll analyze:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {["Languages used", "Commit frequency", "Repository topics", "Code complexity"].map((item) => (
                                    <span key={item} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium shadow-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <GlassButton
                            onClick={onConnect}
                            disabled={isConnecting}
                            className="py-3.5 px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 border-none font-bold inline-flex items-center gap-3 mx-auto mt-4 rounded-xl transition-all"
                        >
                            {isConnecting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Github size={20} />
                            )}
                            {isConnecting ? "Connecting..." : "Connect GitHub"}
                        </GlassButton>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="text-emerald-600" size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-emerald-900">GitHub Connected Successfully</p>
                                <p className="text-sm font-medium text-emerald-700 mt-1">
                                    @{githubData.githubUsername} &middot; {githubData.reposCount} repos &middot; {githubData.commitsLast6Months} commits (6m)
                                </p>
                            </div>
                        </div>

                        {githubData.detectedSkills.length > 0 && (
                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Detected Technical Skills</h4>
                                <div className="space-y-3">
                                    {githubData.detectedSkills.map((item) => (
                                        <div key={item.skill} className="flex items-center gap-4">
                                            <span className="text-sm font-semibold text-slate-700 w-28">{item.skill}</span>
                                            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.confidence * 100}%` }}
                                                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 w-12 text-right">{Math.round(item.confidence * 100)}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </StepCard>

            <StepNav
                onBack={onBack}
                onNext={onNext}
                nextLabel={githubData ? "Continue" : "Skip this step"}
                showSkip={!!githubData}
            />
        </div>
    );
}

// ============================================================
// LINKEDIN STEP
// ============================================================
function LinkedInStep({
    linkedinData,
    isConnecting,
    onConnect,
    onNext,
    onBack,
}: {
    linkedinData: LinkedInConnectResponse | null;
    isConnecting: boolean;
    onConnect: () => void;
    onNext: () => void;
    onBack: () => void;
}) {
    return (
        <div className="space-y-4">
            <StepCard>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Connect LinkedIn</h2>
                    <p className="text-slate-500 font-medium">
                        Import your professional experience and certifications to complete your profile context.
                    </p>
                </div>

                {!linkedinData ? (
                    <div className="text-center space-y-4 p-6 border border-slate-100 rounded-2xl bg-slate-50/50">
                        <div className="w-16 h-16 bg-[#0A66C2] rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-[#0A66C2]/20 border border-[#0A66C2] relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Linkedin className="w-8 h-8 text-white relative z-10" />
                        </div>

                        <div className="space-y-3">
                            <p className="text-slate-600 font-medium">What we&apos;ll import:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {["Work experience", "Certifications", "Education", "Skills endorsements"].map((item) => (
                                    <span key={item} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium shadow-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <GlassButton
                            onClick={onConnect}
                            disabled={isConnecting}
                            className="py-3.5 px-8 bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg shadow-[#0A66C2]/20 border-none font-bold inline-flex items-center gap-3 mx-auto mt-4 rounded-xl transition-all"
                        >
                            {isConnecting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Linkedin size={20} />
                            )}
                            {isConnecting ? "Connecting..." : "Connect LinkedIn"}
                        </GlassButton>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="text-emerald-600" size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-emerald-900">LinkedIn Connected Successfully</p>
                                <p className="text-sm font-medium text-emerald-700 mt-1">Profile imported and verified</p>
                            </div>
                        </div>

                        {linkedinData.importedData.experience.length > 0 && (
                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Professional Experience</h4>
                                <div className="space-y-3">
                                    {linkedinData.importedData.experience.map((exp, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                                                <Briefcase size={18} className="text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-slate-900">{exp.title}</p>
                                                <p className="text-sm font-medium text-slate-500 mt-0.5">{exp.company} &middot; {exp.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {linkedinData.importedData.certifications.length > 0 && (
                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Certifications</h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {linkedinData.importedData.certifications.map((cert) => (
                                        <span key={cert} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100/50">
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </StepCard>

            <StepNav
                onBack={onBack}
                onNext={onNext}
                nextLabel={linkedinData ? "Continue" : "Skip this step"}
                showSkip={!!linkedinData}
            />
        </div>
    );
}

// ============================================================
// TARGET ROLE STEP
// ============================================================
function TargetRoleStep({
    selectedRole,
    isSaving,
    searchQuery,
    filteredRoles,
    onSearch,
    onSelect,
    onFinish,
    onBack,
    isFinishing,
}: {
    selectedRole: string | null;
    isSaving: boolean;
    searchQuery: string;
    filteredRoles: string[];
    onSearch: (q: string) => void;
    onSelect: (role: string) => void;
    onFinish: () => void;
    onBack: () => void;
    isFinishing: boolean;
}) {
    return (
        <div className="space-y-4">
            <StepCard>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">What Role Are You Targeting?</h2>
                    <p className="text-slate-500 font-medium">
                        This helps us personalize your job recommendations and calculate your skill gap accurately.
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search for roles (e.g. Frontend Developer)..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full h-14 px-5 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm font-medium"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearch("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Role Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[250px] overflow-y-auto custom-scrollbar pr-2 pb-2">
                    {filteredRoles.map((role) => {
                        const isSelected = selectedRole === role;
                        return (
                            <button
                                key={role}
                                onClick={() => onSelect(role)}
                                disabled={isSaving}
                                className={cn(
                                    "p-4 rounded-2xl border-2 text-left transition-all text-[13px] font-bold group",
                                    isSelected
                                        ? "border-blue-500 bg-blue-50/80 text-blue-700 shadow-[0_4px_12px_-2px_rgba(59,130,246,0.2)]"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="line-clamp-2 pr-2">{role}</span>
                                    {isSelected ? (
                                        <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-slate-200 group-hover:border-blue-300 shrink-0 transition-colors" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {filteredRoles.length === 0 && (
                    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
                        <Target className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">No matching roles found.</p>
                        <p className="text-sm text-slate-400 mt-1">Try searching for a different keyword.</p>
                    </div>
                )}
            </StepCard>

            {/* Final step: Finish button instead of Continue */}
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-100"
                >
                    <ArrowLeft size={16} /> Back
                </button>
                <div className="flex items-center gap-4">
                    {!selectedRole && (
                        <button
                            onClick={onFinish}
                            disabled={isFinishing}
                            className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors px-4 py-2"
                        >
                            Skip & Finish
                        </button>
                    )}
                    <GlassButton
                        variant="primary"
                        onClick={onFinish}
                        disabled={isFinishing}
                        className="py-3.5 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-[0_8px_16px_-6px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_20px_-8px_rgba(16,185,129,0.5)] border-none font-bold inline-flex items-center gap-3 rounded-xl transition-all"
                    >
                        {isFinishing ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Complete Setup <CheckCircle2 size={18} />
                            </>
                        )}
                    </GlassButton>
                </div>
            </div>
        </div>
    );
}
