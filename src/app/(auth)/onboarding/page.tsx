"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles, Upload, Github, Linkedin, Target,
    CheckCircle2, ArrowRight, ArrowLeft, SkipForward,
    FileText, Code2, Briefcase, X, Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";

import { GlassButton } from "@/components/ui/GlassButton";
import { useAuth } from "@/lib/auth/AuthContext";
import { uploadCV, connectGitHub, connectLinkedIn, setTargetRole, completeOnboarding } from "@/lib/api/auth-api";
import { cn } from "@/lib/utils";
import type { CVUploadResponse, GitHubConnectResponse, LinkedInConnectResponse } from "@/lib/types/user";

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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3 text-left"
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Top progress bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Header */}
            <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Step indicators */}
                        <div className="flex items-center gap-2">
                            {STEPS.map((step, i) => {
                                const Icon = step.icon;
                                const isActive = i === currentStep;
                                const isCompleted = i < currentStep || (
                                    (step.id === "cv" && !!cvData) ||
                                    (step.id === "github" && !!githubData) ||
                                    (step.id === "linkedin" && !!linkedinData) ||
                                    (step.id === "target-role" && !!selectedRole)
                                );
                                return (
                                    <div key={step.id} className="flex items-center gap-1">
                                        <button
                                            onClick={() => {
                                                setDirection(i > currentStep ? 1 : -1);
                                                setCurrentStep(i);
                                            }}
                                            className={cn(
                                                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                                                isActive && "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-110",
                                                !isActive && isCompleted && "bg-green-100 text-green-600",
                                                !isActive && !isCompleted && "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                            )}
                                            title={step.label}
                                        >
                                            {isCompleted && !isActive ? (
                                                <CheckCircle2 size={16} />
                                            ) : (
                                                <Icon size={16} />
                                            )}
                                        </button>
                                        {i < STEPS.length - 1 && (
                                            <div className={cn(
                                                "w-6 h-0.5 rounded",
                                                i < currentStep ? "bg-green-300" : "bg-gray-200"
                                            )} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Skip button */}
                    <button
                        onClick={skipToDashboard}
                        disabled={isFinishing}
                        className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
                    >
                        <SkipForward size={14} />
                        Skip to Dashboard
                    </button>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                    Step {currentStep + 1} of {STEPS.length} &mdash; <span className="text-gray-600 font-medium">{currentStepConfig.label}</span>
                </div>
            </div>

            {/* Step Content */}
            <div className="max-w-3xl mx-auto px-4 pb-12">
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
            </div>
        </div>
    );
}

// ============================================================
// STEP COMPONENTS
// ============================================================

function StepCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("bg-white border border-gray-200 rounded-2xl p-8 shadow-sm", className)}>
            {children}
        </div>
    );
}

function StepNav({
    onBack,
    onNext,
    nextLabel = "Continue",
    nextDisabled = false,
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
        <div className="flex items-center justify-between mt-8">
            {onBack ? (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} /> Back
                </button>
            ) : (
                <div />
            )}
            <div className="flex items-center gap-4">
                {showSkip && (
                    <button
                        onClick={onNext}
                        className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {onSkipLabel}
                    </button>
                )}
                <GlassButton
                    variant="primary"
                    onClick={onNext}
                    disabled={nextDisabled}
                    className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white border-none font-bold inline-flex items-center gap-2"
                >
                    {nextLabel} <ArrowRight size={16} />
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
        <div className="space-y-8">
            <StepCard className="text-center py-12">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30"
                >
                    <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Welcome, {userName}! 🎉
                </h1>
                <p className="text-gray-500 text-lg max-w-md mx-auto">
                    Let&apos;s set up your profile in a few quick steps. Every step is <strong className="text-gray-700">optional</strong> — you can always come back later.
                </p>
            </StepCard>

            <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, i) => (
                    <motion.div
                        key={action.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4"
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                            action.color === "blue" && "bg-blue-100 text-blue-600",
                            action.color === "gray" && "bg-gray-100 text-gray-600",
                            action.color === "purple" && "bg-purple-100 text-purple-600",
                        )}>
                            <action.icon size={20} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <button
                    onClick={onSkip}
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                    Skip for now
                </button>
                <GlassButton
                    variant="primary"
                    onClick={onNext}
                    className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white border-none font-bold inline-flex items-center gap-2"
                >
                    Let&apos;s Go <ArrowRight size={16} />
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
        <div className="space-y-6">
            <StepCard>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your CV</h2>
                <p className="text-gray-500 mb-8">
                    We&apos;ll automatically extract your skills, experience, and projects.
                </p>

                {!cvData ? (
                    <>
                        <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer",
                                dragActive && "border-blue-400 bg-blue-50 scale-[1.01]",
                                !dragActive && !isUploading && "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50",
                                isUploading && "border-blue-300 bg-blue-50 pointer-events-none"
                            )}
                        >
                            {isUploading ? (
                                <div className="space-y-4">
                                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto" />
                                    <p className="font-medium text-gray-700">Analyzing your CV...</p>
                                    <p className="text-sm text-gray-400">Extracting skills, experience & projects</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                                    <p className="font-bold text-gray-900">Drag & Drop your CV here</p>
                                    <p className="text-sm text-gray-400">or click to browse &middot; PDF, DOC, DOCX</p>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onFileSelect(file);
                            }}
                        />
                    </>
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
        <div className="space-y-6">
            <StepCard>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect GitHub</h2>
                <p className="text-gray-500 mb-8">
                    Show recruiters your real projects and coding activity.
                </p>

                {!githubData ? (
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto">
                            <Github className="w-10 h-10 text-white" />
                        </div>

                        <div className="space-y-2">
                            <p className="text-gray-600 font-medium">What we&apos;ll analyze:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {["Public repos", "Commit history", "Languages used", "Project complexity"].map((item) => (
                                    <span key={item} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <GlassButton
                            onClick={onConnect}
                            disabled={isConnecting}
                            className="py-3 px-8 bg-gray-900 hover:bg-gray-800 text-white border-none font-bold inline-flex items-center gap-2 mx-auto"
                        >
                            {isConnecting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Github size={18} />
                            )}
                            {isConnecting ? "Connecting..." : "Connect GitHub"}
                        </GlassButton>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                            <div>
                                <p className="font-semibold text-green-800">GitHub Connected</p>
                                <p className="text-sm text-green-600">@{githubData.githubUsername} &middot; {githubData.reposCount} repos &middot; {githubData.commitsLast6Months} commits (6m)</p>
                            </div>
                        </div>

                        {githubData.detectedSkills.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wider">Detected Skills</h4>
                                <div className="space-y-2">
                                    {githubData.detectedSkills.map((item) => (
                                        <div key={item.skill} className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-700 w-24">{item.skill}</span>
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.confidence * 100}%` }}
                                                    transition={{ delay: 0.1, duration: 0.5 }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-400 w-12 text-right">{Math.round(item.confidence * 100)}%</span>
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
        <div className="space-y-6">
            <StepCard>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect LinkedIn</h2>
                <p className="text-gray-500 mb-8">
                    Import your professional experience and certifications.
                </p>

                {!linkedinData ? (
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-[#0A66C2] rounded-2xl flex items-center justify-center mx-auto">
                            <Linkedin className="w-10 h-10 text-white" />
                        </div>

                        <div className="space-y-2">
                            <p className="text-gray-600 font-medium">What we&apos;ll import:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {["Work experience", "Certifications", "Education", "Skills endorsements"].map((item) => (
                                    <span key={item} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <GlassButton
                            onClick={onConnect}
                            disabled={isConnecting}
                            className="py-3 px-8 bg-[#0A66C2] hover:bg-[#004182] text-white border-none font-bold inline-flex items-center gap-2 mx-auto"
                        >
                            {isConnecting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Linkedin size={18} />
                            )}
                            {isConnecting ? "Connecting..." : "Connect LinkedIn"}
                        </GlassButton>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                            <div>
                                <p className="font-semibold text-green-800">LinkedIn Connected</p>
                                <p className="text-sm text-green-600">Profile imported successfully</p>
                            </div>
                        </div>

                        {linkedinData.importedData.experience.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wider">Experience</h4>
                                <div className="space-y-2">
                                    {linkedinData.importedData.experience.map((exp, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Briefcase size={16} className="text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{exp.title}</p>
                                                <p className="text-xs text-gray-500">{exp.company} &middot; {exp.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {linkedinData.importedData.certifications.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wider">Certifications</h4>
                                <div className="flex flex-wrap gap-2">
                                    {linkedinData.importedData.certifications.map((cert) => (
                                        <span key={cert} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
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
        <div className="space-y-6">
            <StepCard>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What Role Are You Targeting?</h2>
                <p className="text-gray-500 mb-6">
                    This helps us personalize your job recommendations and skill analysis.
                </p>

                {/* Search */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search roles..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Role Grid */}
                <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
                    {filteredRoles.map((role) => {
                        const isSelected = selectedRole === role;
                        return (
                            <button
                                key={role}
                                onClick={() => onSelect(role)}
                                disabled={isSaving}
                                className={cn(
                                    "p-4 rounded-xl border-2 text-left transition-all text-sm font-medium",
                                    isSelected
                                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md shadow-blue-500/10"
                                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{role}</span>
                                    {isSelected && <CheckCircle2 size={16} className="text-blue-500" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {filteredRoles.length === 0 && (
                    <p className="text-center text-gray-400 py-8">No matching roles found.</p>
                )}
            </StepCard>

            {/* Final step: Finish button instead of Continue */}
            <div className="flex items-center justify-between mt-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} /> Back
                </button>
                <div className="flex items-center gap-4">
                    {!selectedRole && (
                        <button
                            onClick={onFinish}
                            disabled={isFinishing}
                            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Skip this step
                        </button>
                    )}
                    <GlassButton
                        variant="primary"
                        onClick={onFinish}
                        disabled={isFinishing}
                        className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white border-none font-bold inline-flex items-center gap-2"
                    >
                        {isFinishing ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Finish Setup <CheckCircle2 size={16} />
                            </>
                        )}
                    </GlassButton>
                </div>
            </div>
        </div>
    );
}
