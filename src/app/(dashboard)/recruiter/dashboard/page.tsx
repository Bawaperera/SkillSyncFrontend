import { Briefcase, Users, MailOpen, Target, ArrowRight, AlertCircle, Plus } from "lucide-react";

export default function RecruiterDashboard() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, Sarah. Here's what's happening at Tech Innovations Ltd today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
                        Generate Report
                    </button>
                    <button className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 shadow-sm transition-colors flex items-center gap-2">
                        <Plus size={16} /> Post New Job
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI 1 */}
                <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                        <Briefcase size={16} className="text-blue-600" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-900">5</p>
                        <span className="text-xs font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">+1 this week</span>
                    </div>
                </div>

                {/* KPI 2 */}
                <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Total Candidates</p>
                        <Users size={16} className="text-indigo-600" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-900">127</p>
                        <span className="text-xs font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">+12 this week</span>
                    </div>
                </div>

                {/* KPI 3 */}
                <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">New Applications</p>
                        <MailOpen size={16} className="text-amber-600" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-900">23</p>
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Needs review</span>
                    </div>
                </div>

                {/* KPI 4 */}
                <div className="bg-white border border-gray-200 rounded-md p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Avg. Match Score</p>
                        <Target size={16} className="text-teal-600" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-900">85%</p>
                        <span className="text-xs font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">+2% vs last month</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Jobs Data Table */}
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                        <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-base font-semibold text-gray-900">Active Job Postings</h2>
                            <button className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1">
                                View All <ArrowRight size={14} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Role</th>
                                        <th className="px-5 py-3 font-medium">Department</th>
                                        <th className="px-5 py-3 font-medium">Applicants</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 font-medium text-gray-900 flex items-center gap-2">
                                            <Briefcase size={14} className="text-gray-400" /> Full-Stack Developer
                                        </td>
                                        <td className="px-5 py-3">Engineering</td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2">
                                                <span>15</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <button className="text-blue-700 hover:text-blue-900 font-medium text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 transition-colors">Review</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 font-medium text-gray-900 flex items-center gap-2">
                                            <Briefcase size={14} className="text-gray-400" /> Backend Developer
                                        </td>
                                        <td className="px-5 py-3">Engineering</td>
                                        <td className="px-5 py-3">8</td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <button className="text-blue-700 hover:text-blue-900 font-medium text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 transition-colors">Review</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3 font-medium text-gray-900 flex items-center gap-2">
                                            <Briefcase size={14} className="text-gray-400" /> Frontend Intern
                                        </td>
                                        <td className="px-5 py-3">Product</td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2">
                                                <span>23</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                                Draft
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <button className="text-blue-700 hover:text-blue-900 font-medium text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 transition-colors">Review</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="space-y-6">
                    {/* Action Needed Card */}
                    <div className="bg-white border border-amber-200 rounded-md shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                        <div className="p-5 pl-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="text-amber-500 mt-0.5" size={20} />
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Action Needed</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        <strong className="text-gray-900">5 new applications</strong> require your review for the Full-Stack Developer role.
                                    </p>
                                    <button className="mt-4 w-full px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-colors">
                                        Review Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Matches Preview */}
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                        <div className="border-b border-gray-200 px-5 py-4 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-gray-900">Top Matches</h3>
                            <button className="text-xs font-medium text-blue-700 hover:underline">See all</button>
                        </div>
                        <div className="p-0">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">Candidate Name {i}</p>
                                        <p className="text-xs text-gray-500 truncate">React • Node.js • TypeScript</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                            {95 - i}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
