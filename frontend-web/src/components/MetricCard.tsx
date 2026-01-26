import { type LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface MetricCardProps {
    label: string
    value: string
    trend: string
    trendUp?: boolean
    icon: LucideIcon
}

export default function MetricCard({ label, value, trend, trendUp = true, icon: Icon }: MetricCardProps) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                    <Icon className="w-5 h-5 text-slate-400" />
                </div>
                <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                    {trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {trend}
                </div>
            </div>
            <div>
                <div className="text-slate-400 text-sm font-medium mb-1">{label}</div>
                <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
            </div>
        </div>
    )
}
