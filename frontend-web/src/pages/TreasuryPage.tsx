import { Wallet, TrendingUp, TrendingDown, Building2 } from 'lucide-react'
import TransactionTable from '../components/TransactionTable'

export default function TreasuryPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Treasury & Finance</h1>
                    <p className="text-slate-400">Manage liquidity, royalties, and investor payouts.</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                    <Building2 className="w-4 h-4" />
                    <span>Growth Stars Inc. (US Delaware Corp)</span>
                </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/20 rounded-xl p-6">
                    <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Liquidity</div>
                    <div className="text-3xl font-bold text-white mb-1">$84,250.00</div>
                    <div className="text-emerald-400 text-xs flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12% projected next month
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Pending Royalties</div>
                    <div className="text-3xl font-bold text-white mb-1">$12,400.00</div>
                    <div className="text-slate-500 text-xs">Arriving via DistroKid</div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Monthly Burn Rate</div>
                    <div className="text-3xl font-bold text-white mb-1">$3,200.00</div>
                    <div className="text-red-400 text-xs flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        Under control (-5% vs budget)
                    </div>
                </div>
            </div>

            <TransactionTable />
        </div>
    )
}
