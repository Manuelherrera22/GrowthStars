import { useState, useEffect } from 'react'
import { TrendingUp, Users, AlertTriangle, Activity, DollarSign, Bell, Music, Zap, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        revenue: '$0',
        revenueTrend: '+0%',
        fans: '0',
        activeCampaigns: '0'
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                // 1. Fetch Revenue (Sum of credit transactions)
                const { data: txs } = await supabase
                    .from('transactions')
                    .select('amount, type')

                const totalRevenue = txs
                    ?.filter(t => t.type === 'credit')
                    .reduce((acc, curr) => acc + Number(curr.amount), 0) || 0

                // 2. Fetch Fans Count
                const { count: fanCount } = await supabase
                    .from('fans')
                    .select('*', { count: 'exact', head: true })

                // 3. Fetch Campaigns Count (Active)
                const { count: campCount } = await supabase
                    .from('campaigns')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'Active')

                // Update State
                setMetrics({
                    revenue: `$${totalRevenue.toLocaleString()}`,
                    revenueTrend: '+12% vs last month', // Hardcoded calculation for now
                    fans: fanCount?.toLocaleString() || '0',
                    activeCampaigns: campCount?.toString() || '0'
                })

            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Command Center</h1>
                    <p className="text-slate-400">Welcome back, Manager. Here is your empire's pulse.</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" className="relative">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </Button>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0">
                        <Zap className="w-4 h-4 mr-2" />
                        Quick Action
                    </Button>
                </div>
            </div>

            {/* 1. GLOBAL PULSE (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Revenue Card directly integrated */}
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-12 h-12 text-emerald-500" />
                    </div>
                    <div className="text-sm font-medium text-slate-400 mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-white mb-2">{loading ? '...' : metrics.revenue}</div>
                    <div className="text-xs font-medium text-emerald-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metrics.revenueTrend}
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-12 h-12 text-indigo-500" />
                    </div>
                    <div className="text-sm font-medium text-slate-400 mb-1">Total Fans</div>
                    <div className="text-2xl font-bold text-white mb-2">{loading ? '...' : metrics.fans}</div>
                    <div className="text-xs font-medium text-emerald-400 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +5.2% this week
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-12 h-12 text-purple-500" />
                    </div>
                    <div className="text-sm font-medium text-slate-400 mb-1">Active Campaigns</div>
                    <div className="text-2xl font-bold text-white mb-2">{loading ? '...' : metrics.activeCampaigns}</div>
                    <div className="text-xs font-medium text-slate-500">
                        Avg. Open Rate: 42%
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Music className="w-12 h-12 text-pink-500" />
                    </div>
                    <div className="text-sm font-medium text-slate-400 mb-1">Top Track</div>
                    <div className="text-lg font-bold text-white mb-2">Neon Nights</div>
                    <div className="text-xs font-medium text-emerald-400">
                        125k streams
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 2. ACTION CENTER (Priority Tasks) - Static for now, could be dynamic later */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                        Action Center (Prioritized)
                    </h2>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 border-l-4 border-l-red-500 hover:bg-slate-800/80 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Alta Prioridad</span>
                                    <span className="text-slate-400 text-xs">Riesgo de Churn Detectado</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Recuperar 1,200 Fans de "Solaris"</h3>
                                <p className="text-slate-400 text-sm">El engagement cayó un 15% la semana pasada. Lanza una "Demo Secreta" para reactivarlos.</p>
                            </div>
                            <Button>Lanzar Recuperación</Button>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 border-l-4 border-l-indigo-500 hover:bg-slate-800/80 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Oportunidad</span>
                                    <span className="text-slate-400 text-xs">Tendencia Viral</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Match TikTok: "Retro Wave"</h3>
                                <p className="text-slate-400 text-sm">Tu track "Neon Nights" encaja con esta tendencia. Crea un clip de 15s ahora.</p>
                            </div>
                            <Button variant="outline">Ver Plantilla</Button>
                        </div>
                    </div>
                </div>

                {/* 3. LIVE FEED (Real-time Ticker) - Mocked for visual effect still, hard to seed real-time events */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-full">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-emerald-500 animate-pulse" />
                        Live Empire Feed
                    </h2>
                    <div className="space-y-6 relative">
                        {/* Line connector */}
                        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-800" />

                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                                <DollarSign className="w-3 h-3 text-emerald-500" />
                            </div>
                            <p className="text-sm text-white"><span className="font-bold text-emerald-400">+$124.50</span> Venta Merch (Hoodie)</p>
                            <span className="text-xs text-slate-500">Ahora mismo • Mexico City</span>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
                                <Users className="w-3 h-3 text-indigo-500" />
                            </div>
                            <p className="text-sm text-white"><span className="font-bold text-indigo-400">+5 Nuevos Superfans</span> identificados</p>
                            <span className="text-xs text-slate-500">Hace 2 min • Spotify Algorithm</span>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                                <CheckCircle className="w-3 h-3 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-300">Campaña "Pre-save Blast" completada</p>
                            <span className="text-xs text-slate-500">Hace 15 min • 45% Open Rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
