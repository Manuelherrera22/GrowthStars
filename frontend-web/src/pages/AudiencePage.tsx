import { Filter, Download, Search } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function AudiencePage() {
    const fans = [
        { id: 1, name: 'Maria Perez', email: 'ma***@gmail.com', score: 85, status: 'Super Fan', source: 'Pre-save (Midnight)', platform: 'Spotify', location: 'Bogotá, CO' },
        { id: 2, name: 'John Doe', email: 'jo***@yahoo.com', score: 45, status: 'Casual', source: 'Merch Store', platform: 'Apple Music', location: 'Mexico City, MX' },
        { id: 3, name: 'Alex Smith', email: 'al***@icloud.com', score: 92, status: 'Visionary', source: 'WhatsApp VIP', platform: 'Spotify', location: 'Madrid, ES' },
        { id: 4, name: 'Sofia G.', email: 'so***@outlook.com', score: 60, status: 'Engaged', source: 'Instagram DM', platform: 'Spotify', location: 'Buenos Aires, AR' },
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Audience CDP</h1>
                    <p className="text-slate-400">Unified identity resolution. 5,420 total identified fans.</p>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by email, name or location..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4 font-medium">Fan Identity</th>
                                <th className="px-6 py-4 font-medium">Score</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Source (Trap)</th>
                                <th className="px-6 py-4 font-medium">Location</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {fans.map((fan) => (
                                <tr key={fan.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-white font-medium">{fan.name}</div>
                                        <div className="text-slate-500 text-xs flex items-center">
                                            <span className={`w-2 h-2 rounded-full mr-1.5 ${fan.platform === 'Spotify' ? 'bg-[#1DB954]' : 'bg-pink-500'}`} />
                                            {fan.platform} • {fan.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{fan.score}</div>
                                        <div className="text-[10px] text-slate-500">Points</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 rounded-full border ${fan.status === 'Visionary' || fan.status === 'Super Fan'
                                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                            : 'bg-slate-800 text-slate-300 border-slate-700'
                                            }`}>
                                            {fan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {fan.source}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {fan.location}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
