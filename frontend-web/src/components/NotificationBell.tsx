import { create } from 'zustand'
import { Bell } from 'lucide-react'
import { useState } from 'react'

// --- STORE ---
interface Notification {
    id: string
    title: string
    time: string
    read: boolean
}

interface NotificationState {
    notifications: Notification[]
    addNotification: (n: Omit<Notification, 'id' | 'read'>) => void
    markAllRead: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [
        { id: '1', title: 'Luna Eclipse uploaded "Midnight"', time: '2m ago', read: false },
        { id: '2', title: 'New Investor Report generated', time: '1h ago', read: false },
        { id: '3', title: 'Payment received: $450.00', time: '5h ago', read: true },
    ],
    addNotification: (n) => set((state) => ({
        notifications: [{ ...n, id: Math.random().toString(), read: false }, ...state.notifications]
    })),
    markAllRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
    }))
}))

// --- COMPONENT ---
export default function NotificationBell() {
    const { notifications, markAllRead } = useNotificationStore()
    const [isOpen, setIsOpen] = useState(false)
    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <div className="relative">
            <button
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                        <h3 className="font-semibold text-white text-sm">Notifications</h3>
                        <button onClick={markAllRead} className="text-xs text-indigo-400 hover:text-indigo-300">
                            Mark all read
                        </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-slate-500 text-sm">No notifications</div>
                        ) : (
                            notifications.map(n => (
                                <div key={n.id} className={`p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${!n.read ? 'bg-indigo-500/5' : ''}`}>
                                    <div className="text-sm text-slate-200 mb-1">{n.title}</div>
                                    <div className="text-xs text-slate-500">{n.time}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Backdrop to close */}
            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
        </div>
    )
}
