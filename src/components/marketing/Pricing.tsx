"use client";

import { motion } from "framer-motion";

export function Pricing() {
    return (
        <section id="pricing" className="relative py-24 bg-background transition-colors duration-500 overflow-hidden font-sans">

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20 relative z-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary dark:text-white">Elevate your team</h2>
                    <p className="text-muted-foreground text-lg">Choose a plan that fits your scale.</p>
                </div>

                {/* Overlap Container */}
                <div className="relative isolate pt-12">
                    {/* Watermark: Background Logic (Behind Cards) */}
                    <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2 pointer-events-none select-none z-0">
                        <h1 className="text-[10rem] md:text-[14rem] font-black tracking-widest uppercase 
                                       text-black dark:text-white transition-colors duration-500
                                       whitespace-nowrap leading-none scale-y-125 opacity-80 dark:opacity-80">
                            Pricing
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">

                        {/* Free Plan */}
                        <div className="group relative p-8 rounded-[24px] transition-all duration-300 hover:-translate-y-2
                                        bg-white/90 dark:bg-white/5 
                                        backdrop-blur-[20px] 
                                        border border-white/20 dark:border-white/10
                                        shadow-lg dark:shadow-2xl">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block mb-4">Free Plan</span>
                            <div className="text-4xl font-bold mb-6 text-foreground">Free</div>
                            <ul className="space-y-4 mb-8 text-foreground/80">
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Up to 2 transfers / month</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Basic history</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Email support</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Limited currency support</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Basic security features</span></li>
                            </ul>
                            <button className="w-full py-3 rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors font-semibold text-foreground">
                                Get Started
                            </button>
                        </div>

                        {/* Standard Plan (Highlighted) */}
                        <div className="relative p-10 rounded-[24px] transition-all duration-300 hover:-translate-y-4 scale-105 z-20
                                        bg-white/95 dark:bg-white/5 
                                        backdrop-blur-[20px] 
                                        border border-primary/20 dark:border-white/20
                                        shadow-xl dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg">Most Popular</div>

                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block mb-4">Standard Plan</span>
                            <div className="text-5xl font-bold mb-6 text-foreground flex items-baseline gap-1">$9.99<span className="text-xl text-muted-foreground font-normal">/m</span></div>
                            <ul className="space-y-4 mb-8 text-foreground">
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">✓</div> <span className="text-sm font-medium">Unlimited transfers</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">✓</div> <span className="text-sm font-medium">Transaction history with export</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">✓</div> <span className="text-sm font-medium">Priority email support</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">✓</div> <span className="text-sm font-medium">Expanded currency support</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">✓</div> <span className="text-sm font-medium">Advanced security features</span></li>
                            </ul>
                            <button className="w-full py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]
                                               bg-primary text-primary-foreground">
                                Get Started
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="group relative p-8 rounded-[24px] transition-all duration-300 hover:-translate-y-2
                                        bg-white/90 dark:bg-white/5 
                                        backdrop-blur-[20px] 
                                        border border-white/20 dark:border-white/10
                                        shadow-lg dark:shadow-2xl">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block mb-4">Pro Plan</span>
                            <div className="text-4xl font-bold mb-6 text-foreground flex items-baseline gap-1">$19.99<span className="text-xl text-muted-foreground font-normal">/m</span></div>
                            <ul className="space-y-4 mb-8 text-foreground/80">
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Priority processing</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Comprehensive analytics</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">24/7 Priority support</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Full currency support</span></li>
                                <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">✓</div> <span className="text-sm">Enhanced security features</span></li>
                            </ul>
                            <button className="w-full py-3 rounded-full border border-foreground/10 hover:bg-foreground/5 transition-colors font-semibold text-foreground">
                                Get Started
                            </button>
                        </div>

                    </div>
                </div>

                {/* Billed Yearly Toggle */}
                <div className="mt-20 flex justify-center items-center gap-3">
                    <div className="w-12 h-6 rounded-full bg-muted border border-border relative p-1 cursor-pointer transition-colors hover:border-primary/50">
                        <div className="w-4 h-4 rounded-full bg-background shadow-sm transition-transform"></div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Billed Yearly</span>
                </div>

                {/* Plans Button */}
                <div className="mt-8 text-center">
                    <button className="px-6 py-2 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">See all features</button>
                </div>
            </div>
        </section>
    );
}
