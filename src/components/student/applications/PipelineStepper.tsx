"use client";

import { Check, Circle } from "lucide-react";
import { ApplicationStep } from "@/types/applications";

interface PipelineStepperProps {
    steps: ApplicationStep[];
}

export function PipelineStepper({ steps }: PipelineStepperProps) {
    // Mobile View: Badge
    const currentStep = steps.find(s => s.status === 'current') || steps[steps.length - 1];
    const stepIndex = steps.indexOf(currentStep) + 1;

    return (
        <>
            {/* Mobile: Simple Status Badge */}
            <div className="md:hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    {currentStep.label} (Step {stepIndex}/{steps.length})
                </div>
            </div>

            {/* Desktop: Full Stepper */}
            <div className="hidden md:flex items-center justify-between w-full relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -z-0"></div>

                {steps.map((step, i) => {
                    const isCompleted = step.status === 'completed';
                    const isCurrent = step.status === 'current';

                    return (
                        <div key={i} className="relative z-10 flex flex-col items-center gap-2 bg-[#121212] px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted ? "bg-green-500 border-green-500 text-black" :
                                    isCurrent ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] scale-110" :
                                        "bg-gray-800 border-gray-600 text-gray-400"
                                }`}>
                                {isCompleted ? <Check size={14} strokeWidth={3} /> : <span className="text-xs font-bold">{i + 1}</span>}
                            </div>
                            <span className={`text-xs font-medium ${isCurrent ? "text-white" : "text-gray-500"}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
