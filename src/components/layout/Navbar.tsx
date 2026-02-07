"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassButton } from "@/components/ui/GlassButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const isScrolled = false; // TODO: Add scroll listener

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/50 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          SkillSync
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
          <Link href="#universities" className="text-gray-300 hover:text-white transition-colors">Universities</Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <GlassButton variant="ghost">Log In</GlassButton>
          </Link>
          <Link href="/register">
            <GlassButton variant="primary" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Get Started
            </GlassButton>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
