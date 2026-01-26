import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { ShieldCheck, FileText } from 'lucide-react'

const data = [
    { name: 'Artist (Luna)', value: 50, color: '#6366f1' },
    { name: 'Manager', value: 20, color: '#10b981' },
    { name: 'Label/Investor', value: 30, color: '#f59e0b' },
]

export default function ContractWidget() {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-indigo-400" />
                Smart Contract & Splits
            </h3>

            <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                            />
                            <Pie
                                data={data}
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/2 space-y-3">
                    {data.map((entry, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-slate-300">
                                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                                {entry.name}
                            </div>
                            <div className="font-bold text-white">{entry.value}%</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 uppercase tracking-widest">Compliance Status</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        KYC Verified
                    </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                    <div className="flex items-center">
                        <FileText className="w-4 h-4 text-slate-400 mr-3" />
                        <div>
                            <div className="text-xs font-medium text-white">360 Deal Agreement.pdf</div>
                            <div className="text-[10px] text-slate-500">Signed on Jan 10, 2026</div>
                        </div>
                    </div>
                    <div className="text-xs text-indigo-400">View</div>
                </div>
            </div>
        </div>
    )
}
