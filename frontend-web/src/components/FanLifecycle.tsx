import { FunnelChart, Funnel, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { AlertTriangle, Users } from 'lucide-react'

const data = [
    { value: 10000, name: 'Casual Listeners', fill: '#6366f1' },
    { value: 4500, name: 'Engaged Fans', fill: '#8b5cf6' },
    { value: 1200, name: 'Super Fans', fill: '#ec4899' },
]

export default function FanLifecycle() {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-indigo-400" />
                    Fan Lifecycle
                </h3>
                <div className="flex items-center text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Churn Risk: 15%
                </div>
            </div>

            <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <FunnelChart>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Funnel
                            dataKey="value"
                            data={data}
                            isAnimationActive
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Funnel>
                    </FunnelChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-400">
                <div>
                    <div className="font-bold text-white text-base">10k</div>
                    Casual
                </div>
                <div>
                    <div className="font-bold text-white text-base">4.5k</div>
                    Engaged
                </div>
                <div>
                    <div className="font-bold text-white text-base">1.2k</div>
                    Super Fans
                </div>
            </div>
        </div>
    )
}
