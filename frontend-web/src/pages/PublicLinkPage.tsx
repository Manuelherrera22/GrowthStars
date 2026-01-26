import { useState, useEffect } from 'react'
import { Music, CheckCircle, Share2, MessageCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function PublicLinkPage() {
    const [step, setStep] = useState<'presave' | 'passport'>('presave')
    const [timeOnPage, setTimeOnPage] = useState(0)
    const [scrollDepth, setScrollDepth] = useState(0)

    // Behavioral Pixel Logic: Track Time
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeOnPage(prev => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // Behavioral Pixel Logic: Track Scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrolled = (scrollTop / docHeight) * 100
            setScrollDepth(Math.max(scrollDepth, Math.round(scrolled))) // Only keep max depth
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrollDepth])

    // Log tracking data (Simulating Pixel Ping)
    useEffect(() => {
        if (timeOnPage % 5 === 0) { // Ping every 5 seconds
            console.log(`[Pixel Ping] Time: ${timeOnPage}s | Depth: ${scrollDepth}% | State: ${step}`)
        }
    }, [timeOnPage, scrollDepth, step])

    const handleConnect = () => {
        // Simulate OAuth Delay
        setTimeout(() => {
            setStep('passport')
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">

            {/* Background Visuals */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

            <div className="relative z-10 w-full max-w-md text-center">

                {step === 'presave' ? (
                    <div className="animate-in fade-in zoom-in duration-500 space-y-8">
                        <img
                            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop"
                            alt="Album Art"
                            className="w-64 h-64 mx-auto rounded-xl shadow-2xl shadow-indigo-500/20 ring-1 ring-white/10"
                        />

                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter">MIDNIGHT LOVE</h1>
                            <p className="text-slate-400 text-lg">Luna Eclipse</p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={handleConnect}
                                className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-4 rounded-full flex items-center justify-center text-lg transition-transform active:scale-95"
                            >
                                <Music className="w-6 h-6 mr-3" />
                                Pre-save on Spotify
                            </button>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Unlock exclusive access</p>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-1 rounded-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-slate-900 rounded-xl p-8 border border-white/10 relative overflow-hidden">
                                {/* Badge Visuals */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

                                <div className="uppercase tracking-widest text-xs font-bold text-white/50 mb-4">Official Fan Passport</div>

                                <div className="flex items-center justify-between mb-8">
                                    <div className="text-left">
                                        <div className="text-sm text-indigo-300">Fan ID</div>
                                        <div className="text-3xl font-mono font-bold text-white">#00342</div>
                                    </div>
                                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-indigo-500 flex items-center justify-center">
                                        <span className="text-xl">😎</span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase">Rank</div>
                                        <div className="font-bold text-white text-lg flex items-center">
                                            Visionary
                                            <CheckCircle className="w-4 h-4 text-emerald-400 ml-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase">Prediction</div>
                                        <div className="text-emerald-400 font-medium">Early Adopter (Top 1%)</div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-end">
                                    <div className="text-left">
                                        <div className="text-[10px] text-slate-500">Artist</div>
                                        <div className="text-sm font-bold text-white">Luna Eclipse</div>
                                    </div>
                                    <div className="bg-white p-1 rounded">
                                        <div className="w-8 h-8 bg-black" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-white font-bold text-lg">You are on the list! 🎉</div>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-12 border-slate-700 hover:bg-slate-800">
                                    <Share2 className="w-5 h-5 mr-2" />
                                    Share Story
                                </Button>
                                <Button className="h-12 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold border-none">
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Join WhatsApp
                                </Button>
                            </div>
                        </div>

                    </div>
                )}

                <div className="mt-12">
                    <div className="flex items-center justify-center space-x-2 text-slate-600 text-xs">
                        <span>Powered by</span>
                        <span className="font-bold text-slate-500">Growth Stars</span>
                    </div>
                </div>

                {/* Behavioral Pixel Debug Badge */}
                <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur text-[10px] text-slate-500 p-2 rounded border border-slate-800 font-mono z-50">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span>REC</span>
                    </div>
                    <div>Time: {timeOnPage}s</div>
                    <div>Scroll: {scrollDepth}%</div>
                </div>
            </div>
        </div>
    )
}
