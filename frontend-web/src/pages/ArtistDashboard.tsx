import { useState } from 'react'
import { CheckCircle, Wallet, Music, Home, Upload, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'

export default function ArtistDashboard() {
    const [activeTab, setActiveTab] = useState('home')

    return (
        <div className="flex justify-center bg-zinc-950 p-4 min-h-[85vh]">
            {/* Mobile Simulator Frame */}
            <div className="w-full max-w-sm bg-black border border-zinc-800 rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col">

                {/* Status Bar Mock */}
                <div className="h-8 bg-black flex justify-between items-center px-6 text-[10px] text-white font-medium">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                        <div className="w-4 h-2.5 bg-white rounded-sm"></div>
                        <div className="w-0.5 h-2.5 bg-white/30 rounded-full"></div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-20">

                    {/* Header */}
                    <header className="p-6 pt-2">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-zinc-400 text-sm">Bienvenido de vuelta,</h2>
                                <h1 className="text-2xl font-bold text-white">Luna Eclipse</h1>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
                                <span className="text-indigo-400 font-bold">LE</span>
                            </div>
                        </div>

                        {/* Level / Progress */}
                        <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 cursor-pointer hover:border-indigo-500/50 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Nivel 3: Estrella en Ascenso</span>
                                <span className="text-xs text-zinc-500">850 / 1,000 XP</span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[85%]" />
                            </div>
                        </div>
                    </header>

                    {/* Quick Stats (Horizontal Scroll) */}
                    <div className="flex space-x-4 px-6 overflow-x-auto no-scrollbar mb-8">
                        <div className="min-w-[100px] bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                            <div className="text-zinc-500 text-xs mb-1">Streams</div>
                            <div className="text-white font-bold text-lg flex items-center">
                                125k
                                <Music className="w-3 h-3 ml-1 text-emerald-500" />
                            </div>
                        </div>
                        <div className="min-w-[100px] bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                            <div className="text-zinc-500 text-xs mb-1">Fans</div>
                            <div className="text-white font-bold text-lg">2.4k</div>
                        </div>
                        <div className="min-w-[100px] bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                            <div className="text-zinc-500 text-xs mb-1">Wallet</div>
                            <div className="text-emerald-400 font-bold text-lg">$1,240</div>
                        </div>
                    </div>

                    {/* Missions (Kanban-lite) */}
                    <div className="px-6 mb-8">
                        <h3 className="text-white font-bold mb-4 flex items-center">
                            Misiones Activas
                            <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">2</span>
                        </h3>

                        <div className="space-y-3">
                            {/* Mission Card 1 */}
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-br from-indigo-900/20 to-zinc-900 border border-indigo-500/30 p-4 rounded-2xl relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded">URGENTE</span>
                                    <span className="text-emerald-400 text-xs font-bold">+500 XP</span>
                                </div>
                                <h4 className="text-white font-bold mb-1">Sube la Demo de "Solaris"</h4>
                                <p className="text-zinc-400 text-xs mb-3">Tu manager necesita el borrador antes del viernes.</p>
                                <Button className="w-full h-8 text-xs bg-indigo-600 hover:bg-indigo-500 border-0">
                                    <Upload className="w-3 h-3 mr-2" />
                                    Subir Archivo
                                </Button>
                            </motion.div>

                            {/* Mission Card 2 */}
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-zinc-700 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded">Diario</span>
                                    <span className="text-emerald-400 text-xs font-bold">+50 XP</span>
                                </div>
                                <h4 className="text-white font-bold mb-1">Publica una Historia</h4>
                                <p className="text-zinc-400 text-xs mb-3">Comparte tu proceso creativo en IG.</p>
                                <Button variant="outline" className="w-full h-8 text-xs border-zinc-700 hover:bg-zinc-800">
                                    Marcar Completado
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Recent Transactions Mini */}
                    <div className="px-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold">Wallet</h3>
                            <span className="text-indigo-400 text-xs">Ver todo</span>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-zinc-900/50 p-3 rounded-xl flex justify-between items-center border border-zinc-800/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <DollarSign className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-medium">Regalías Spotify</div>
                                        <div className="text-zinc-500 text-[10px]">Hoy, 10:00 AM</div>
                                    </div>
                                </div>
                                <div className="text-emerald-400 font-bold text-sm">+$124.50</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Tab Bar */}
                <div className="absolute bottom-0 w-full h-[70px] bg-black/80 backdrop-blur-xl border-t border-zinc-800 flex justify-around items-center px-2 pb-2">
                    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center p-2 ${activeTab === 'home' ? 'text-indigo-500' : 'text-zinc-600'}`}>
                        <Home className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-medium">Inicio</span>
                    </button>
                    <button onClick={() => setActiveTab('missions')} className={`flex flex-col items-center p-2 relative ${activeTab === 'missions' ? 'text-indigo-500' : 'text-zinc-600'}`}>
                        <span className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
                        <CheckCircle className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-medium">Misiones</span>
                    </button>
                    <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center p-2 ${activeTab === 'wallet' ? 'text-indigo-500' : 'text-zinc-600'}`}>
                        <Wallet className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-medium">Wallet</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
