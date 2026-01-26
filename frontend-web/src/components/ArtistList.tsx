import { TrendingUp } from 'lucide-react'
import { Button } from './ui/Button'

const MOCK_ARTISTS = [
    { id: 1, name: 'Luna Eclipse', email: 'luna@music.com', status: 'Rising', roi: '+124%', missions: 'Pending' },
    { id: 2, name: 'The Midnight Echo', email: 'echo@band.net', status: 'Stable', roi: '+12%', missions: 'Active' },
    { id: 3, name: 'Solaris', email: 'sol@aris.io', status: 'New', roi: '0%', missions: 'None' },
    { id: 4, name: 'Velvet Frequency', email: 'velvet@vibes.com', status: 'Rising', roi: '+45%', missions: 'Completed' },
]

interface ArtistListProps {
    onAssignMission: (artistName: string) => void
}

export default function ArtistList({ onAssignMission }: ArtistListProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Artist Roster</h1>
                    <p className="text-slate-400">Manage your talent portfolio.</p>
                </div>
                <Button className="w-auto">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                </Button>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-900 text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Artist</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">ROI (Est.)</th>
                            <th className="px-6 py-4">Current Mission</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                        {MOCK_ARTISTS.map((artist) => (
                            <tr key={artist.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="cursor-pointer group" onClick={() => window.location.href = `/admin/artists/${artist.id}`}>
                                        <div className="font-medium text-white group-hover:text-indigo-400 transition-colors">{artist.name}</div>
                                        <div className="text-slate-500 text-xs">{artist.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${artist.status === 'Rising' ? 'bg-indigo-500/10 text-indigo-400' : ''}
                    ${artist.status === 'Stable' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                    ${artist.status === 'New' ? 'bg-slate-700 text-slate-300' : ''}
                  `}>
                                        {artist.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-emerald-400">{artist.roi}</td>
                                <td className="px-6 py-4 text-slate-400">{artist.missions}</td>
                                <td className="px-6 py-4 text-right">
                                    <Button
                                        variant="outline"
                                        className="h-8 text-xs w-auto px-3"
                                        onClick={() => onAssignMission(artist.name)}
                                    >
                                        Assign Mission
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
