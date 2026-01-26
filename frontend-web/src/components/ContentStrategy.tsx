import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Video, Zap } from 'lucide-react'

const data = [
    { name: 'Reels (15s)', retention: 85, color: '#10b981' }, // High
    { name: 'TikTok (30s)', retention: 60, color: '#f59e0b' }, // Medium
    { name: 'YouTube (Long)', retention: 40, color: '#6366f1' }, // Lower
]

export default function ContentStrategy() {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col h-full">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <Video className="w-5 h-5 mr-2 text-emerald-400" />
                Format Intelligence
            </h3>
            <p className="text-xs text-slate-400 mb-6">Retention Rate comparison by content type.</p>

            <div className="flex-1 min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis dataKey="name" type="category" width={90} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                            cursor={{ fill: '#1e293b', opacity: 0.4 }}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                            formatter={(value: any) => [`${value}%`, 'Retention']}
                        />
                        <Bar dataKey="retention" radius={[0, 4, 4, 0]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-start">
                <Zap className="w-4 h-4 text-emerald-400 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Insight:</span> Prioritize 15s Reels. They retain <span className="font-bold text-white">40% more</span> audience than long formats.
                </div>
            </div>
        </div>
    )
}
