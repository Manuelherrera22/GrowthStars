import { useEffect, useState } from 'react'
import { CheckCircle, Wallet, Music, Home, Upload, DollarSign, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { cn } from '../lib/utils'
import { supabase } from '../lib/supabase'

export default function ArtistDashboard() {
    const [activeTab, setActiveTab] = useState('home')
    const [notification, setNotification] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    // Real Data States
    const [stats, setStats] = useState({ streams: 0, fans: 0, balance: 0 })
    const [missions, setMissions] = useState<any[]>([])
    const [transactions, setTransactions] = useState<any[]>([])
    const [artistName, setArtistName] = useState('Artista')

    useEffect(() => {
        fetchRealData()
    }, [])

    const fetchRealData = async () => {
        try {
            setLoading(true)

            // 1. Get Current User / Profile
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                // Try to get artist profile name, fallback to email prefix
                setArtistName(user.email?.split('@')[0] || 'Artista')
            }

            // 2. Fetch Wallet/Transactions (Real Sum)
            // Assuming transactions are linked to user somehow, or just getting all for demo if admin
            const { data: txs } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })

            if (txs) {
                setTransactions(txs.slice(0, 5)) // Recent 5
                const balance = txs.reduce((acc, curr) => {
                    const amt = Number(curr.amount)
                    return curr.type === 'credit' ? acc + amt : acc - amt
                }, 0)
                setStats(prev => ({ ...prev, balance }))
            }

            // 3. Fetch Missions (Real)
            const { data: missionData } = await supabase
                .from('missions')
                .select('*')
                .eq('status', 'pending') // Only pending

            if (missionData) {
                setMissions(missionData)
            }

            // 4. Mock Streams/Fans (Hardcoded until we have an 'analytics' table)
            setStats(prev => ({ ...prev, streams: 125000, fans: 2400 }))

        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    const simulateAction = (msg: string) => {
        setNotification(msg)
        setTimeout(() => setNotification(null), 3000)
    }

    return (
        <div className="flex justify-center bg-zinc-950 p-4 min-h-[85vh] font-sans items-center">
            {/* Toast Notification Simulator */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-8 z-50 bg-indigo-600 text-white px-6 py-2 rounded-full shadow-2xl text-sm font-bold flex items-center"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {notification}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Simulator Frame */}
            <div className="w-full max-w-sm bg-black border border-zinc-800 rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col h-[800px]">

                {/* Status Bar Mock */}
                <div className="h-10 bg-black flex justify-between items-center px-6 text-[12px] text-white font-medium z-20 shrink-0">
                    <span>9:41</span>
                    <div className="flex space-x-1.5">
                        <div className="w-4 h-2.5 bg-white rounded-[2px]"></div>
                        <div className="w-0.5 h-2.5 bg-white/30 rounded-full"></div>
                    </div>
                </div>

                {/* Main Content Area with AnimatePresence */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative bg-black">
                    <AnimatePresence mode="wait">
                        {activeTab === 'home' && (
                            <motion.div
                                key="home"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                {/* Header */}
                                <header className="px-6 pt-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h2 className="text-zinc-400 text-sm">Bienvenido,</h2>
                                            <h1 className="text-2xl font-bold text-white tracking-tight capitalize">
                                                {loading ? '...' : artistName}
                                            </h1>
                                        </div>
                                        <div className="relative cursor-pointer" onClick={() => simulateAction("Perfil de Usuario")}>
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                                <span className="text-white font-bold uppercase">{artistName.substring(0, 2)}</span>
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-black rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Level Card */}
                                    <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl p-5 border border-zinc-800 relative overflow-hidden group cursor-pointer" onClick={() => simulateAction("Detalle de Nivel: +15 XP")}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Nivel 3: Rising Star</span>
                                            <span className="text-xs text-zinc-400">850 / 1,000 XP</span>
                                        </div>
                                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '85%' }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                            />
                                        </div>
                                        <p className="text-[10px] text-zinc-500 mt-2 text-right">¡Solo 150 XP para "Icon"!</p>
                                    </div>
                                </header>

                                {/* Stats Carousel */}
                                <div className="flex space-x-4 px-6 overflow-x-auto no-scrollbar snap-x pb-4">
                                    {[
                                        { label: 'Streams', val: stats.streams.toLocaleString(), icon: Music, color: 'text-emerald-500', name: 'Streams' },
                                        { label: 'Fans', val: stats.fans.toLocaleString(), icon: CheckCircle, color: 'text-indigo-500', name: 'Fans' },
                                        { label: 'Wallet', val: `$${stats.balance.toLocaleString()}`, icon: DollarSign, color: 'text-white', name: 'Wallet' }
                                    ].map((stat, i) => (
                                        <div key={i} className="min-w-[110px] bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 snap-center flex flex-col justify-between h-24 hover:border-zinc-600 transition-colors cursor-pointer">
                                            <div className="text-zinc-500 text-xs font-medium">{stat.label}</div>
                                            <div className={`text-xl font-bold ${stat.color} flex items-center`}>
                                                {stat.name === 'Streams' && <stat.icon className="w-3.5 h-3.5 mr-1.5" />}
                                                {stat.name === 'Wallet' && <span className="mr-0.5" />}
                                                {stat.val}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Cards */}
                                <div className="px-6">
                                    <h3 className="text-white font-bold mb-4 text-sm flex items-center">
                                        Tu Enfoque de Hoy
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="bg-gradient-to-br from-indigo-900/30 to-zinc-900 border border-indigo-500/30 p-5 rounded-2xl relative overflow-hidden active:scale-95 transition-transform cursor-pointer" onClick={() => simulateAction("¡Subiendo Demo...")}>
                                            <div className="absolute top-0 right-0 p-3 opacity-20"><Upload className="w-12 h-12 text-indigo-500" /></div>
                                            <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 inline-block">URGENTE</span>
                                            <h4 className="text-white font-bold text-lg mb-1">Subir Demo "Solaris"</h4>
                                            <p className="text-zinc-400 text-xs w-3/4">Tu manager necesita el master antes de las 5PM.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'missions' && (
                            <motion.div
                                key="missions"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="px-6 pt-4 space-y-6"
                            >
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold text-white">Misiones</h1>
                                    <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-1 rounded-full">{missions.length} Activas</span>
                                </div>
                                <div className="space-y-4">
                                    {loading && <div className="text-zinc-500 text-center py-4">Cargando misiones...</div>}

                                    {!loading && missions.length === 0 && (
                                        <div className="text-zinc-500 text-center py-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                                            <p>¡Todo al día! No hay misiones pendientes.</p>
                                        </div>
                                    )}

                                    {missions.map((m) => (
                                        <div key={m.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center space-x-4 active:bg-zinc-800 transition-colors cursor-pointer" onClick={() => simulateAction(`Misión "${m.title}" iniciada`)}>
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                                <CheckCircle className="text-zinc-600 w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium text-sm">{m.title}</h4>
                                                <p className="text-zinc-500 text-xs">+{m.xp_reward || 50} XP • {m.type || 'General'}</p>
                                            </div>
                                            <ChevronRight className="text-zinc-600 w-4 h-4" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'wallet' && (
                            <motion.div
                                key="wallet"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="px-6 pt-8 text-center"
                            >
                                <h2 className="text-zinc-400 text-sm mb-2">Saldo Total</h2>
                                <div className="text-4xl font-bold text-white mb-8">
                                    ${stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <Button onClick={() => simulateAction("Solicitud de Retiro Enviada")} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-12 rounded-xl">Retirar</Button>
                                    <Button variant="outline" className="border-zinc-700 h-12 rounded-xl hover:bg-zinc-800 text-zinc-300">Historial</Button>
                                </div>

                                <div className="text-left">
                                    <h3 className="text-white font-bold mb-4 text-sm">Movimientos Recientes</h3>
                                    <div className="space-y-3">
                                        {loading && <div className="text-zinc-500 text-center">Cargando...</div>}

                                        {!loading && transactions.map((tx) => (
                                            <div key={tx.id} className="flex justify-between items-center py-3 border-b border-zinc-900">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                                                        <DollarSign className={`w-4 h-4 ${tx.type === 'credit' ? 'text-emerald-500' : 'text-red-500'}`} />
                                                    </div>
                                                    <div>
                                                        <div className="text-white text-sm line-clamp-1">{tx.description}</div>
                                                        <div className="text-zinc-500 text-[10px]">{new Date(tx.date || tx.created_at).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                                <span className={`font-medium text-sm ${tx.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}>
                                                    {tx.type === 'credit' ? '+' : '-'}${Number(tx.amount).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Blur Overlay for Content fade */}
                <div className="absolute bottom-[70px] left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

                {/* Bottom Tab Bar */}
                <div className="absolute bottom-0 w-full h-[85px] bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/50 flex justify-around items-start pt-4 px-2 z-20">
                    <button onClick={() => setActiveTab('home')} className="group flex flex-col items-center w-16">
                        <div className={cn("p-1.5 rounded-xl transition-all duration-300", activeTab === 'home' ? 'bg-indigo-500/20 scale-110' : '')}>
                            <Home className={cn("w-6 h-6 transition-colors", activeTab === 'home' ? 'text-indigo-500' : 'text-zinc-500 group-hover:text-zinc-300')} />
                        </div>
                        <span className={cn("text-[10px] mt-1 font-medium transition-colors", activeTab === 'home' ? 'text-indigo-500' : 'text-zinc-600')}>Inicio</span>
                    </button>
                    <button onClick={() => setActiveTab('missions')} className="group flex flex-col items-center w-16">
                        <div className="relative">
                            {/* Notification Dot */}
                            {missions.length > 0 && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black z-10 animate-pulse"></div>}
                            <div className={cn("p-1.5 rounded-xl transition-all duration-300", activeTab === 'missions' ? 'bg-indigo-500/20 scale-110' : '')}>
                                <CheckCircle className={cn("w-6 h-6 transition-colors", activeTab === 'missions' ? 'text-indigo-500' : 'text-zinc-500 group-hover:text-zinc-300')} />
                            </div>
                        </div>
                        <span className={cn("text-[10px] mt-1 font-medium transition-colors", activeTab === 'missions' ? 'text-indigo-500' : 'text-zinc-600')}>Misiones</span>
                    </button>
                    <button onClick={() => setActiveTab('wallet')} className="group flex flex-col items-center w-16">
                        <div className={cn("p-1.5 rounded-xl transition-all duration-300", activeTab === 'wallet' ? 'bg-indigo-500/20 scale-110' : '')}>
                            <Wallet className={cn("w-6 h-6 transition-colors", activeTab === 'wallet' ? 'text-indigo-500' : 'text-zinc-500 group-hover:text-zinc-300')} />
                        </div>
                        <span className={cn("text-[10px] mt-1 font-medium transition-colors", activeTab === 'wallet' ? 'text-indigo-500' : 'text-zinc-600')}>Wallet</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
