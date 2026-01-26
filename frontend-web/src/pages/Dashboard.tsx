import { useState } from 'react'
import { TrendingUp, Users, AlertTriangle, Activity, DollarSign, Bell, ArrowRight, Music, Zap, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { FINANCIAL_METRICS } from '../data/mock-financials'

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Centro de Comando</h1>
                    <p className="text-slate-400">Resumen ejecutivo en tiempo real.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>SISTEMA ACTIVO</span>
                    </div>
                </div>
            </div>

            {/* 1. GLOBAL PULSE (Metric Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Ingresos (Mes)"
                    value={`$${FINANCIAL_METRICS.totalLiquidity.toLocaleString()}`}
                    trend="+12.5% vs mes ant."
                    icon={DollarSign}
                    color="emerald"
                />
                <MetricCard
                    label="Nuevos Fans (CDP)"
                    value="1,240"
                    trend="+85 hoy"
                    icon={Users}
                    color="indigo"
                />
                <MetricCard
                    label="Campañas Activas"
                    value="3"
                    trend="2 finalizando"
                    icon={Zap}
                    color="purple"
                />
                <MetricCard
                    label="Riesgo de Churn"
                    value="850"
                    trend="Usuarios en Alerta"
                    icon={AlertTriangle}
                    color="rose"
                    alert
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 2. ACTION CENTER (Prioritized Tasks) */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-indigo-400" />
                        Acciones Requeridas
                    </h2>

                    <div className="space-y-3">
                        {/* High Priority Alert */}
                        <ActionCard
                            priority="high"
                            title="Riesgo de Churn Crítico: Luna Eclipse"
                            desc="850 super fans no han escuchado música en 28 días. Lanza una campaña de reactivación ahora."
                            action="Lanzar Campaña"
                            link="/admin/campaigns"
                        />
                        {/* Information Item */}
                        <ActionCard
                            priority="medium"
                            title="Oportunidad Viral: TikTok"
                            desc="El sonido de 'Midnight Love' está trending (+45% uso). Sugiere crear contenido orgánico."
                            action="Ver Detalles"
                            link="/admin/artist/1"
                        />
                        <ActionCard
                            priority="low"
                            title="Revisión de Regalías"
                            desc="Se han procesado $12,400 en regalías de Spotify. Aprobar distribución."
                            action="Ir a Tesorería"
                            link="/admin/treasury"
                        />
                    </div>
                </div>

                {/* 3. LIVE FEED (Ticker) */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <Bell className="w-5 h-5 mr-2 text-slate-400" />
                        Live Feed
                    </h2>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 h-[400px] overflow-hidden relative">
                        {/* Fading overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />

                        <div className="space-y-6">
                            <FeedItem time="2m" title="Nuevo Superfan Identificado" desc="Carlos M. (México) ha desbloqueado el nivel 'Visionario'." icon={Users} color="indigo" />
                            <FeedItem time="15m" title="Venta de Merch" desc="Pedido #4920: Vinilo Edición Limitada ($45.00)" icon={DollarSign} color="emerald" />
                            <FeedItem time="32m" title="Campaña Finalizada" desc="Blast WhatsApp 'Bogotá VIP' alcanzó 98% open rate." icon={Zap} color="purple" />
                            <FeedItem time="1h" title="Nueva Playlist" desc="'Midnight Love' agregada a 'Novedades Indie' (Spotify)." icon={Music} color="green" />
                            <FeedItem time="2h" title="Alerta de Sistema" desc="Sincronización de regalías completada con éxito." icon={CheckCircle} color="slate" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MetricCard({ label, value, trend, icon: Icon, color, alert }: any) {
    const colors: any = {
        emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    }

    return (
        <div className={`p-6 rounded-xl border bg-slate-900/50 backdrop-blur-sm ${alert ? 'border-rose-500/50 bg-rose-500/5' : 'border-slate-800'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</div>
                    <div className="text-2xl font-bold text-white mt-1">{value}</div>
                </div>
                <div className={`p-2 rounded-lg ${colors[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className={`text-xs flex items-center ${alert ? 'text-rose-400 font-bold' : 'text-slate-500'}`}>
                {alert && <AlertTriangle className="w-3 h-3 mr-1" />}
                {trend}
            </div>
        </div>
    )
}

function ActionCard({ priority, title, desc, action, link }: any) {
    return (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all group flex items-start gap-4">
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 
                ${priority === 'high' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : ''}
                ${priority === 'medium' ? 'bg-amber-500' : ''}
                ${priority === 'low' ? 'bg-slate-500' : ''}
            `} />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{title}</h3>
                    <div className="text-[10px] text-slate-500 uppercase border border-slate-800 px-2 py-0.5 rounded">
                        {priority === 'high' ? 'Urgente' : priority}
                    </div>
                </div>
                <p className="text-slate-400 text-sm mt-1 mb-3">{desc}</p>
                <Button variant="outline" className="h-8 text-xs px-3" onClick={() => window.location.href = link}>
                    {action} <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
            </div>
        </div>
    )
}

function FeedItem({ time, title, desc, icon: Icon, color }: any) {
    const colors: any = {
        indigo: "text-indigo-400",
        emerald: "text-emerald-400",
        purple: "text-purple-400",
        green: "text-[#1DB954]",
        slate: "text-slate-400"
    }
    return (
        <div className="flex items-start gap-3 relative pb-6 border-l border-slate-800 pl-6 last:border-0">
            <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600" />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-bold ${colors[color]}`}>{title}</span>
                    <span className="text-[10px] text-slate-500">{time}</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
