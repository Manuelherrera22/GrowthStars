import { Music2, CheckCircle2 } from 'lucide-react'

export default function PitchingWidget() {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Music2 className="w-5 h-5 mr-2 text-purple-400" />
                Algorithmic Pitching
                <span className="ml-auto text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/20">
                    AI Match: 85%
                </span>
            </h3>

            <div className="mb-4">
                <div className="text-sm text-slate-400 mb-2">Analysis Result:</div>
                <div className="flex space-x-2">
                    <Badge label="124 BPM" />
                    <Badge label="C Minor" />
                    <Badge label="Energetic" color="text-yellow-400 bg-yellow-400/10 border-yellow-400/20" />
                </div>
            </div>

            <div className="space-y-3">
                <div className="text-xs font-mono text-slate-500 uppercase">Recommended Playlists</div>

                <PlaylistItem
                    name="Verano Hits 2026"
                    platform="Spotify"
                    match={92}
                />
                <PlaylistItem
                    name="Gym Motivation"
                    platform="Apple Music"
                    match={88}
                />
                <PlaylistItem
                    name="Club Radar"
                    platform="Spotify"
                    match={74}
                />
            </div>
        </div>
    )
}

function Badge({ label, color = "text-slate-300 bg-slate-800 border-slate-700" }: { label: string, color?: string }) {
    return (
        <span className={`text-xs px-2.5 py-1 rounded-md border font-medium ${color}`}>
            {label}
        </span>
    )
}

function PlaylistItem({ name, platform, match }: { name: string, platform: string, match: number }) {
    return (
        <div className="flex items-center justify-between p-2 hover:bg-slate-800/50 rounded-lg transition-colors group cursor-pointer">
            <div className="flex items-center">
                <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold mr-3 ${platform === 'Spotify' ? 'bg-[#1DB954]/20 text-[#1DB954]' : 'bg-[#FA233B]/20 text-[#FA233B]'}`}>
                    {platform[0]}
                </div>
                <div>
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white">{name}</div>
                    <div className="text-[10px] text-slate-500">{platform}</div>
                </div>
            </div>
            <div className="flex items-center">
                <div className="text-right mr-3">
                    <div className="text-xs font-bold text-white">{match}%</div>
                    <div className="text-[10px] text-slate-500">Fit</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-slate-600 group-hover:text-emerald-500 transition-colors" />
            </div>
        </div>
    )
}
