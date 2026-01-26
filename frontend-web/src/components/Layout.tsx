import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Target, Wallet, LogOut, Music4, Send, Menu, X, Smartphone } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { cn } from '../lib/utils'
import NotificationBell from './NotificationBell'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Layout() {
    const location = useLocation()
    const logout = useAuthStore((state) => state.setLogout)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navItems = [
        { label: 'Resumen', icon: LayoutDashboard, path: '/admin' },
        { label: 'Artistas', icon: Users, path: '/admin/artists' },
        { label: 'Campañas', icon: Send, path: '/admin/campaigns' },
        { label: 'Audiencia', icon: Users, path: '/admin/audience' },
        { label: 'Smart Links', icon: Target, path: '/admin/smart-links' },
        { label: 'Misiones', icon: Target, path: '/admin/missions' },
        { label: 'Tesorería', icon: Wallet, path: '/admin/treasury' },
        { label: 'Vista App Artista', icon: Smartphone, path: '/admin/artist-view' }, // Simulator
    ]

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-4 fixed top-0 w-full z-50 backdrop-blur-md">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center">
                        <Music4 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Growth Stars</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex-col">
                <div className="p-6 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center">
                        <Music4 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Growth Stars</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
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
                        onClick={() => {
                            logout()
                            window.location.href = '/login'
                        }}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 z-50 lg:hidden flex flex-col pt-16"
                        >
                            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
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
                                    onClick={() => {
                                        logout()
                                        window.location.href = '/login'
                                    }}
                                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Cerrar Sesión</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-16 lg:pt-0">
                <header className="hidden lg:flex h-16 border-b border-slate-800 items-center justify-between px-8 bg-slate-900/30 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="text-sm font-medium text-slate-400">
                        Bienvenido, Manager
                    </h2>
                    <div className="flex items-center space-x-4">
                        <NotificationBell />
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700" />
                    </div>
                </header>
                <div className="p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
