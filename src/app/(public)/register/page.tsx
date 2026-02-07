"use client";

import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { ArrowRight, Mail, Lock, User, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <GlassCard className="w-full max-w-md p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">Create Account</h1>
                    <p className="text-gray-400">Start your career journey today</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <GlassButton variant="secondary" className="flex items-center gap-2 justify-center py-2.5">
                        <Github className="w-4 h-4" />
                        GitHub
                    </GlassButton>
                    <GlassButton variant="secondary" className="flex items-center gap-2 justify-center py-2.5">
                        <span className="font-bold text-blue-500">G</span>
                        Google
                    </GlassButton>
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0f172a] px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <GlassInput
                            type="text"
                            placeholder="Bawantha Perera"
                            icon={<User className="w-4 h-4" />}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <GlassInput
                            type="email"
                            placeholder="bawantha@example.com"
                            icon={<Mail className="w-4 h-4" />}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <GlassInput
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock className="w-4 h-4" />}
                        />
                    </div>

                    <Link href="/onboarding">
                        <GlassButton variant="primary" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 mt-4">
                            Create Account
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </GlassButton>
                    </Link>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign in
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
}
