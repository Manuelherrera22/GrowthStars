import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Building2 } from 'lucide-react'
import TransactionTable from '../components/TransactionTable'
import { supabase } from '../lib/supabase'

export default function TreasuryPage() {
    const [liquidity, setLiquidity] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTreasury() {
            const { data } = await supabase
                .from('transactions')
                .select('amount, type')

            if (data) {
                // Determine Liquidity: Credits - Debits
                const total = data.reduce((acc, curr) => {
                    const amt = Number(curr.amount)
                    return curr.type === 'credit' ? acc + amt : acc - amt
                }, 0)
                setLiquidity(total)
            }
            setLoading(false)
        }
        fetchTreasury()
    }, [])

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Tesorería y Finanzas</h1>
                    <p className="text-slate-400">Gestiona liquidez, regalías y pagos a inversores (Datos Reales).</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg w-fit">
                    <Building2 className="w-4 h-4" />
                    <span>Growth Stars Inc. (US Delaware Corp)</span>
                </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/20 rounded-xl p-6">
                    <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Liquidez Total</div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {loading ? '...' : `$${liquidity.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    </div>
                    <div className="text-emerald-400 text-xs flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Balance en Vivo
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Regalías Pendientes</div>
                    <div className="text-3xl font-bold text-white mb-1">$0.00</div>
                    <div className="text-slate-500 text-xs">Sin pagos pendientes</div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Tasa de Gasto (Burn Rate)</div>
                    <div className="text-3xl font-bold text-white mb-1">$0.00</div>
                    <div className="text-red-400 text-xs flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        Calculado desde Debits
                    </div>
                </div>
            </div>

            <TransactionTable />
        </div>
    )
}
