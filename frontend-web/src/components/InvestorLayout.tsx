import { Outlet, useLocation, Link } from 'react-router-dom'
import { PieChart, TrendingUp, FileText, LogOut, Music4 } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { cn } from '../lib/utils'

export default function InvestorLayout() {
    const location = useLocation()
    const logout = useAuthStore((state) => state.setLogout)

    const navItems = [
        { label: 'Portfolio Overview', icon: PieChart, path: '/investor' },
        { label: 'Growth Metrics', icon: TrendingUp, path: '/investor/growth' },
        { label: 'Reports', icon: FileText, path: '/investor/reports' },
    ]

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col">
                <div className="p-6 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center">
                        <Music4 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <span className="font-bold text-lg tracking-tight block">Growth Stars</span>
                        <span className="text-xs text-indigo-400 tracking-wider">INVESTOR PORTAL</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === item.path
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => logout()}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950">
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/30 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-sm font-medium text-slate-400">
                        Welcome, Investor
                    </h2>
                    <div className="w-8 h-8 rounded-full bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center text-emerald-500 text-xs font-bold">
                        IV
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
