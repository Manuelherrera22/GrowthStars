import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Play, Sparkles, Heart, MessageCircle, Wallet, Crown, Star } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function Landing() {
    const navigate = useNavigate()

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-rose-500/30 overflow-x-hidden">

            {/* Background Aurora Effects (Warmer/Gold tones for "Stardom") */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-600/10 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[120px] mix-blend-screen opacity-30" />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030712]/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20">
                            <Star className="w-5 h-5 text-rose-400" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">Growth Stars</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Button
                            onClick={() => navigate('/login')}
                            className="bg-white text-black hover:bg-slate-200 border-0 rounded-full px-6 font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                            Entrar al Backstage
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-5xl mx-auto text-center"
                >
                    <motion.div variants={fadeIn} className="inline-flex items-center px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-medium mb-8 backdrop-blur-md">
                        <Crown className="w-3 h-3 mr-2 text-rose-400" />
                        <span className="tracking-wide uppercase">Tu Música. Tu Imperio.</span>
                    </motion.div>

                    <motion.h1 variants={fadeIn} className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                        Haz que el Mundo <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-200 to-white animate-text">
                            Te Escuche.
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeIn} className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                        Deja de perseguir likes y empieza a construir <span className="text-white font-medium">Leyendas</span>.
                        La plataforma secreta que usan los managers top para convertir oyentes en <span className="text-rose-400 font-medium">Superfans</span>.
                    </motion.p>

                    <motion.div variants={fadeIn} className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                        <Button onClick={() => navigate('/login')} className="h-14 px-10 text-lg rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/25 transition-all duration-300 w-full md:w-auto">
                            Reclama tu Acceso
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button variant="outline" className="h-14 px-10 text-lg rounded-full border-slate-700 hover:bg-white/5 text-slate-300 hover:text-white w-full md:w-auto">
                            <Play className="w-4 h-4 mr-2" />
                            Ver el Manifiesto
                        </Button>
                    </motion.div>
                </motion.div>
            </section>

            {/* The 3 Pillars (Emotionally Driven) */}
            <section id="features" className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">Domina el Juego</h2>
                        <p className="text-slate-400 text-lg">Todo lo que necesitas para llenar estadios, no solo playlists.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* 1. CAPTURE -> FANBASE */}
                        <FeatureCard
                            icon={Heart}
                            title="Construye tu Tribu"
                            desc="Tus fans quieren pertenecer. Dales un 'Pasaporte Viral' exclusivo. Conoce quiénes son, dónde viven y qué aman. No más oyentes anónimos."
                            color="rose"
                        />

                        {/* 2. ANALYZE -> STRATEGY */}
                        <FeatureCard
                            icon={Sparkles}
                            title="El Sexto Sentido"
                            desc="Imagina saber qué canción va a explotar antes de lanzarla. Nuestro radar te dice dónde enfocar tu energía para volverte viral."
                            color="amber"
                        />

                        {/* 3. EXECUTE -> DIRECT CONNECTION */}
                        <FeatureCard
                            icon={MessageCircle}
                            title="Conexión Directa"
                            desc="¿Merch nuevo? ¿Gira sorpresa? Envía un WhatsApp directo a tus fans más leales en Bogotá o CDMX y haz Sold Out en minutos."
                            color="emerald"
                        />
                    </div>
                </div>
            </section>

            {/* Treasury Section (Financial Freedom) */}
            <section className="py-24 bg-slate-900/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                            Libertad Financiera
                        </div>
                        <h2 className="text-4xl font-bold text-white">Cobra lo que Vales.</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Tu arte es un negocio. Visualiza tus ganancias en tiempo real.
                            Sin intermediarios oscuros. Sin esperas eternas.
                            Control total sobre tu dinero para que puedas invertir en tu próximo hit.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                                <Wallet className="w-6 h-6 text-emerald-400 mb-2" />
                                <div className="text-2xl font-bold text-white">$2.4M</div>
                                <div className="text-xs text-slate-500">Disponible para Invertir</div>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                                <Crown className="w-6 h-6 text-amber-400 mb-2" />
                                <div className="text-2xl font-bold text-white">#1</div>
                                <div className="text-xs text-slate-500">Posición Global</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        {/* Abstract UI Representation */}
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
                        <div className="relative bg-[#0a0f1e] border border-slate-800 rounded-2xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-800">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-emerald-500/30">
                                        <Zap className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg">Futuros Ingresos</div>
                                        <div className="text-sm text-emerald-400 flex items-center">
                                            <Sparkles className="w-3 h-3 mr-1" />
                                            Creciendo ahora mismo
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Regalías de Spotify</span>
                                    <span className="text-white font-mono font-bold">+$12,450</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Venta de Entradas</span>
                                    <span className="text-white font-mono font-bold">+$45,200</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Merch Exclusivo</span>
                                    <span className="text-white font-mono font-bold">+$8,100</span>
                                </div>
                                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                                    <span className="text-slate-300 font-bold">Total este mes</span>
                                    <span className="text-emerald-400 font-mono font-bold text-xl">+$65,750</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 relative z-10 bg-[#02040a]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/20">
                        <Star className="w-6 h-6 text-white" />
                    </div>

                    <div className="text-sm text-slate-600 mb-8 max-w-md mx-auto">
                        Growth Stars es la plataforma secreta detrás de los artistas independientes más exitosos del mundo. Únete a la revolución.
                    </div>

                    <div className="text-xs text-slate-800">
                        © 2026 Growth Stars Inc.
                    </div>
                </div>
            </footer>

        </div>
    )
}

function FeatureCard({ icon: Icon, title, desc, color }: any) {
    const colorClasses: any = {
        rose: "bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:border-rose-500/50",
        amber: "bg-amber-500/10 border-amber-500/20 text-amber-400 group-hover:border-amber-500/50",
        emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:border-emerald-500/50",
    }

    return (
        <div className={`p-8 rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-sm group hover:bg-slate-900 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-2`}>
            {/* Hover Glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity ${colorClasses[color].split(' ')[0].replace('/10', '')}`} />

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${colorClasses[color].split(' ')[1]} ${colorClasses[color].split(' ')[0]}`}>
                <Icon className={`w-7 h-7 ${colorClasses[color].split(' ')[2]}`} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-base font-medium">
                {desc}
            </p>
        </div>
    )
}
