import { useEffect, useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, Filter, Download } from 'lucide-react'
import { Button } from './ui/Button'
import { supabase } from '../lib/supabase'

export default function TransactionTable() {
    const [transactions, setTransactions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTx() {
            const { data } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })

            if (data) setTransactions(data)
            setLoading(false)
        }
        fetchTx()
    }, [])

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-white">Recent Transactions</h3>
                <div className="flex space-x-2">
                    <Button variant="outline" className="h-8">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                    <Button variant="outline" className="h-8">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="bg-slate-900 text-xs uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Transaction</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr>}

                        {!loading && transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white flex items-center">
                                    <div className={`p-1.5 rounded-full mr-3 ${tx.type === 'credit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                    </div>
                                    {tx.description}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-xs border border-slate-700 bg-slate-800">
                                        {tx.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                        ${tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                                        ${tx.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : ''}    
                                    `}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(tx.date || tx.created_at).toLocaleDateString()}
                                </td>
                                <td className={`px-6 py-4 text-right font-bold ${tx.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}>
                                    {tx.type === 'credit' ? '+' : '-'}${Number(tx.amount).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
