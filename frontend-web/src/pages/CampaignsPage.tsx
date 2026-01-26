import { useState } from 'react'
import { Plus, Send, TrendingUp, BarChart } from 'lucide-react'
import { Button } from '../components/ui/Button'
import CampaignWizard from '../components/CampaignWizard'

export default function CampaignsPage() {
    const [showWizard, setShowWizard] = useState(false)

    const campaigns = [
        { id: 1, name: 'Merch Drop - Close Friends', status: 'Completed', channel: 'WhatsApp', sent: 540, openRate: '92%', revenue: '$3,240' },
        { id: 2, name: 'Pre-save Reminder', status: 'Active', channel: 'Email', sent: 2100, openRate: '24%', revenue: '$150' },
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {showWizard && <CampaignWizard onClose={() => setShowWizard(false)} />}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Campaigns</h1>
                    <p className="text-slate-400">Turn audience data into revenue (WhatsApp/Email Blasts).</p>
                </div>
                <Button onClick={() => setShowWizard(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Campaign
                </Button>
            </div>

            {/* Campaigns List */}
            <div className="space-y-4">
                {campaigns.map((camp) => (
                    <div key={camp.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-center justify-between hover:border-slate-700 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${camp.status === 'Active' ? 'bg-green-500/10' : 'bg-slate-800'}`}>
                                <Send className={`w-5 h-5 ${camp.status === 'Active' ? 'text-green-400 animate-pulse' : 'text-slate-400'}`} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{camp.name}</h3>
                                <div className="flex items-center text-xs text-slate-500 mt-1 space-x-2">
                                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{camp.channel}</span>
                                    <span>• Sent to {camp.sent} fans</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-8">
                            <div className="text-center">
                                <div className="text-lg font-bold text-white">{camp.openRate}</div>
                                <div className="text-xs text-slate-500 uppercase">Open Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-emerald-400">{camp.revenue}</div>
                                <div className="text-xs text-slate-500 uppercase flex items-center justify-center">
                                    Revenue <TrendingUp className="w-3 h-3 ml-1" />
                                </div>
                            </div>
                            <Button variant="outline" className="h-8 w-8 p-0">
                                <BarChart className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
