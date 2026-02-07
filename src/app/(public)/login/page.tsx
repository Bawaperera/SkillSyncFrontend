"use client";

import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { ArrowRight, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <GlassCard className="w-full max-w-md p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to continue your journey</p>
                </div>

                <form className="space-y-4">
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

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                            <input type="checkbox" className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-400 hover:text-blue-300">Forgot password?</a>
                    </div>

                    <Link href="/dashboard">
                        <GlassButton variant="primary" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 mt-4">
                            Sign In
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </GlassButton>
                    </Link>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign up
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
}
