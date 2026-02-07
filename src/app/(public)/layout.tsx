import { Navbar } from "@/components/layout/Navbar";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-20">
                {children}
            </main>
            <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
                <div className="container mx-auto px-6">
                    <p>© {new Date().getFullYear()} SkillSync. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
