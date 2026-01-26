import { useRef, useEffect, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { Play, Pause, Loader2 } from 'lucide-react'
import { Button } from './ui/Button'

interface WaveformPlayerProps {
    url: string
    height?: number
    color?: string
}

export default function WaveformPlayer({ url, height = 64, color = '#6366f1' }: WaveformPlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const wavesurfer = useRef<WaveSurfer | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (!containerRef.current) return

        wavesurfer.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#334155', // Slate 700
            progressColor: color,
            cursorColor: '#f8fafc',
            barWidth: 2,
            barGap: 3,
            responsive: true,
            height: height,
            barRadius: 3,
        })

        // Mock audio load since we don't have a backend file server yet
        // In production: wavesurfer.current.load(url)
        // For demo: Generate silence or load a mock remote file if available.
        // We will simulate loading for the UI effect.

        // Attempting to load a real sample URL for demo purposes or fallback
        const demoUrl = 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav'
        wavesurfer.current.load(demoUrl)

        wavesurfer.current.on('ready', () => {
            setIsReady(true)
        })

        wavesurfer.current.on('finish', () => {
            setIsPlaying(false)
        })

        return () => {
            wavesurfer.current?.destroy()
        }
    }, [url, height, color])

    const togglePlay = () => {
        if (wavesurfer.current) {
            if (isPlaying) {
                wavesurfer.current.pause()
            } else {
                wavesurfer.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <div className="flex items-center space-x-4 bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <Button
                size="icon"
                onClick={togglePlay}
                disabled={!isReady}
                className="rounded-full w-12 h-12 flex-shrink-0"
            >
                {!isReady ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                ) : (
                    <Play className="w-5 h-5 fill-current ml-1" />
                )}
            </Button>

            <div className="flex-1 w-full" ref={containerRef} />

            {isReady && wavesurfer.current && (
                <div className="text-xs font-mono text-slate-400">
                    {formatTime(wavesurfer.current.getDuration())}
                </div>
            )}
        </div>
    )
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}
