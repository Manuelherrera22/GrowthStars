import { useState } from 'react'
import { Link2, Plus, Copy, BarChart2, MessageCircle, Music } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function SmartLinksPage() {
    const [links] = useState([
        { id: 1, name: 'Midnight Single - Pre-save', url: 'growthstars.io/l/midnight-presave', clicks: 1240, converts: 856, type: 'Pre-save' },
        { id: 2, name: 'Exclusive Merch Drop', url: 'growthstars.io/l/merch-drop-vip', clicks: 540, converts: 120, type: 'Discount' },
    ])

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Smart Links Generator</h1>
                    <p className="text-slate-400">Create "Data Traps" to capture fans across Spotify, Instagram, and TikTok.</p>
                </div>
                <Button>
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Campaign
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {links.map((link) => (
                    <div key={link.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-center justify-between hover:border-slate-700 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                                <Link2 className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{link.name}</h3>
                                <div className="flex items-center space-x-3 text-sm text-slate-500 mt-1">
                                    <span className="flex items-center"><Music className="w-3 h-3 mr-1" /> {link.type}</span>
                                    <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                    <a href="#" className="hover:text-indigo-400 truncate max-w-[200px]">{link.url}</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-8">
                            <div className="text-center">
                                <div className="text-xl font-bold text-white">{link.clicks}</div>
                                <div className="text-xs text-slate-500 uppercase">Clicks</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-emerald-400">{link.converts}</div>
                                <div className="text-xs text-slate-500 uppercase">Captures</div>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline" className="h-8 w-8 p-0">
                                    <BarChart2 className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" className="h-8 w-8 p-0">
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex items-start space-x-4">
                <MessageCircle className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-white mb-1">Viral Feature Active: WhatsApp Passthrough</h4>
                    <p className="text-sm text-slate-300">
                        Your active links are currently configured to ask for WhatsApp after the Spotify conversion.
                        <span className="text-indigo-400 font-medium ml-1">Current Open Rate: 98%</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
