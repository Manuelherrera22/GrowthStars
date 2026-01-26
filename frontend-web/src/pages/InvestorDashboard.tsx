import MetricCard from '../components/MetricCard'
import { DollarSign, TrendingUp, Users, Activity, Download } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { FINANCIAL_METRICS, REVENUE_HISTORY } from '../data/mock-financials'

export default function InvestorDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header with Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Portfolio Performance</h1>
                    <p className="text-slate-400">Real-time financial and growth insights.</p>
                </div>
                <Button variant="outline" className="w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Download Q1 Report
                </Button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    label="Total Investment"
                    value={`$${(FINANCIAL_METRICS.totalInvestment / 1000).toFixed(1)}M`} // Mocking scale for impact
                    trend="+12% vs last month"
                    icon={DollarSign}
                />
                <MetricCard
                    label="Portfolio Valuation"
                    value={`$${(FINANCIAL_METRICS.portfolioLegitimization / 1000000).toFixed(1)}M`}
                    trend="+8.5% this week"
                    icon={TrendingUp}
                />
                <MetricCard
                    label="Active Artists"
                    value={FINANCIAL_METRICS.activeArtists.toString()}
                    trend="+2 New Signings"
                    icon={Users}
                />
                <MetricCard
                    label="Avg. Artist ROI"
                    value="24.3%"
                    trend="-1.2% correction"
                    trendUp={false}
                    icon={Activity}
                />
            </div>

            {/* Main Chart Area (Connected to Data) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-96 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-6">Revenue Growth (Consolidated)</h3>
                    {/* Visual Chart utilizing Date */}
                    <div className="flex-1 flex items-end justify-between space-x-2 px-4 pb-4 border-b border-l border-slate-700/50">
                        {REVENUE_HISTORY.map((item, i) => {
                            const height = (item.revenue / 100000) * 100; // Scaling
                            return (
                                <div key={i} className="w-full bg-emerald-500/20 hover:bg-emerald-500/40 rounded-t-sm transition-all group relative" style={{ height: `${height}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        ${(item.revenue / 1000).toFixed(1)}k
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-500 uppercase tracking-wider">
                        {REVENUE_HISTORY.map(h => <span key={h.month}>{h.month}</span>)}
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-96">
                    <h3 className="text-lg font-semibold text-white mb-6">Top Performers</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Luna Eclipse', growth: '+124%', color: 'bg-indigo-500' },
                            { name: 'Velvet Freq.', growth: '+89%', color: 'bg-purple-500' },
                            { name: 'The Void', growth: '+45%', color: 'bg-cyan-500' },
                            { name: 'Solaris', growth: '+32%', color: 'bg-emerald-500' },
                        ].map((artist, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-2 h-2 rounded-full ${artist.color}`} />
                                    <span className="text-sm font-medium text-slate-300">{artist.name}</span>
                                </div>
                                <span className="text-sm font-bold text-white">{artist.growth}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-slate-800/30 rounded-lg">
                        <div className="text-xs text-slate-400 mb-2">Insight</div>
                        <p className="text-sm text-slate-300">
                            <span className="text-white font-medium">Luna Eclipse</span> is outperforming projections by 2.4x driven by recent viral "Midnight" campaign.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
