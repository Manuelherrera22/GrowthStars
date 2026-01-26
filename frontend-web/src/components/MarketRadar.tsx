import { Radar, Radio, TrendingUp, Globe2 } from 'lucide-react'

export default function MarketRadar() {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            {/* Scanning Animation Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />

            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Radio className="w-5 h-5 mr-2 text-emerald-400 animate-pulse" />
                Market Radar
            </h3>

            <div className="space-y-3">
                {/* Alert 1 */}
                <div className="bg-slate-800/40 border border-l-4 border-l-emerald-500 border-slate-700/50 rounded-r-lg p-3 hover:bg-slate-800 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            <Globe2 className="w-3 h-3 mr-1" />
                            Window Detected: Mexico
                        </div>
                        <span className="text-[10px] text-slate-500">2m ago</span>
                    </div>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                        Rising demand for "Synthwave" in Mexico City. Launch ad campaign now.
                    </p>
                </div>

                {/* Alert 2 */}
                <div className="bg-slate-800/40 border-l-4 border-l-indigo-500 border-slate-700/50 rounded-r-lg p-3 hover:bg-slate-800 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center text-xs font-bold text-indigo-400 uppercase tracking-wider">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Viral Format
                        </div>
                        <span className="text-[10px] text-slate-500">1h ago</span>
                    </div>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                        "Transitions" are trending on TikTok for your genre. <a href="#" className="underline decoration-indigo-500/50 underline-offset-2">View Template</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
