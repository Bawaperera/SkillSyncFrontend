import { RecruiterSidebar } from "@/components/layout/RecruiterSidebar";
import { Search, Bell } from "lucide-react";

export default function RecruiterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <RecruiterSidebar className="hidden md:flex" />

            {/* Main Content Area */}
            <main className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <h1 className="text-base font-semibold text-gray-800">Recruiter Portal</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Global Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search candidates, jobs..."
                                className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 w-64 text-gray-900"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative text-gray-500 hover:text-blue-600 transition-colors p-1">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6 md:p-8 flex-1 w-full max-w-[1400px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
