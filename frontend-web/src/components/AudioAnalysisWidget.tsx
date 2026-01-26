import { useState } from 'react'
import { UploadCloud, Activity, Zap, Loader2 } from 'lucide-react'
import { Button } from './ui/Button'
import WaveformPlayer from './WaveformPlayer'

export default function AudioAnalysisWidget() {
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleUpload = () => {
        setAnalyzing(true)
        // Simulate analysis delay
        setTimeout(() => {
            setResult({
                bpm: 124,
                key: 'C Minor',
                energy: 'High (0.85)',
                mood: 'Energetic/Dance'
            })
            setAnalyzing(false)
        }, 2000)
    }

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-indigo-400" />
                Quick Audio Analysis
            </h3>

            {!result ? (
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:bg-slate-800/30 transition-colors cursor-pointer" onClick={handleUpload}>
                    {analyzing ? (
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                            <p className="text-slate-300 font-medium">Processing Audio...</p>
                            <p className="text-slate-500 text-sm">Extracting BPM & Key</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <UploadCloud className="w-6 h-6 text-slate-400" />
                            </div>
                            <p className="text-slate-300 font-medium mb-1">Click to Upload Track</p>
                            <p className="text-slate-500 text-sm">Supports .mp3, .wav</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    {/* New Waveform Player */}
                    <div className="mb-4">
                        <WaveformPlayer url="" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">BPM</div>
                            <div className="text-2xl font-bold text-white">{result.bpm}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Key</div>
                            <div className="text-2xl font-bold text-indigo-400">{result.key}</div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
                        <div>
                            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Energy Score</div>
                            <div className="text-lg font-medium text-white">{result.energy}</div>
                        </div>
                        <Zap className="w-6 h-6 text-yellow-400" />
                    </div>

                    <Button variant="outline" onClick={() => setResult(null)} className="w-full">
                        Analyze Another
                    </Button>
                </div>
            )}
        </div>
    )
}
