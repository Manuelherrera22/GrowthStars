import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Target, Wallet, LogOut, Music4, Send } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { cn } from '../lib/utils'
import NotificationBell from './NotificationBell'

export default function Layout() {
    const location = useLocation()
    const logout = useAuthStore((state) => state.setLogout)

    const navItems = [
        { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
        { label: 'Artists', icon: Users, path: '/admin/artists' },
        { label: 'Campaigns', icon: Send, path: '/admin/campaigns' }, // New Action Layer
        { label: 'Audience CDP', icon: Users, path: '/admin/audience' }, // New
        { label: 'Smart Links', icon: Target, path: '/admin/smart-links' }, // New
        { label: 'Missions', icon: Target, path: '/admin/missions' },
        { label: 'Treasury', icon: Wallet, path: '/admin/treasury' },
    ]

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col">
                <div className="p-6 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center">
                        <Music4 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Growth Stars</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === item.path
                                    ? "bg-indigo-500/10 text-indigo-400"
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
            <main className="flex-1 overflow-auto">
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/30 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-sm font-medium text-slate-400">
                        Welcome back, Admin
                    </h2>
                    <div className="flex items-center space-x-4">
                        <NotificationBell />
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700" />
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
