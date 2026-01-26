import { ArrowUpRight, ArrowDownLeft, Download } from 'lucide-react'
import { RECENT_TRANSACTIONS } from '../data/mock-financials'

export default function TransactionTable() {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-semibold text-white">Recent Transactions</h3>
                <button className="text-sm text-slate-400 hover:text-white flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium">Type</th>
                            <th className="px-6 py-4 font-medium text-right">Amount</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {RECENT_TRANSACTIONS.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-slate-400 font-mono">{tx.date}</td>
                                <td className="px-6 py-4 text-white font-medium">{tx.desc}</td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center ${tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-400'}`}>
                                        {tx.type === 'credit' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownLeft className="w-3 h-3 mr-1" />}
                                        {tx.type === 'credit' ? 'Income' : 'Expert'}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 text-right font-mono font-bold ${tx.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}>
                                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
