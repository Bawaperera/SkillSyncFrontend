import { Sidebar } from "@/components/layout/Sidebar";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <Sidebar />
            <main className="pl-64 min-h-screen">
                <div className="container-custom py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
