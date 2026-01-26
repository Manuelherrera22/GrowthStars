import { Users, DollarSign, PlayCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import MetricCard from '../components/MetricCard'

// New Intelligent Widgets
import ContractWidget from '../components/ContractWidget'
import FanLifecycle from '../components/FanLifecycle'
import ContentStrategy from '../components/ContentStrategy'
import MarketRadar from '../components/MarketRadar'
import PitchingWidget from '../components/PitchingWidget'

export default function ArtistDetail() {
    // ...
    // Finding a place to insert. I will add it in a new row at the bottom for Legal.

    // const { id } = useParams()

    // In a real app, useQuery to fetch artist by ID
    const artist = {
        name: 'Luna Eclipse',
        genre: 'Synthwave / Pop',
        status: 'Rising Star',
        totalStreams: '1.2M',
        monthlyListeners: '450k'
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg ring-4 ring-slate-900">
                        LE
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{artist.name}</h1>
                        <div className="flex items-center space-x-2 text-slate-400 text-sm">
                            <span>{artist.genre}</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span className="text-emerald-400 font-medium">{artist.status}</span>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline">Download Report</Button>
                    <Button>Assign New Mission</Button>
                </div>
            </div>

            {/* KPI Grid (Top Level Metrics) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    label="Total Streams"
                    value={artist.totalStreams}
                    trend="+12% vs last month"
                    icon={PlayCircle}
                />
                <MetricCard
                    label="Monthly Listeners"
                    value={artist.monthlyListeners}
                    trend="+5.4% this week"
                    icon={Users}
                />
                <MetricCard
                    label="Est. Revenue (YTD)"
                    value="$48,500"
                    trend="+22% vs 2025"
                    icon={DollarSign}
                />
            </div>

            {/* METHODOLOGY ROW 1: Audience & Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
                {/* Methodology #1 & #2: Fan Lifecycle (Churn Risk) */}
                <FanLifecycle />

                {/* Methodology #3: Content Intelligence (Retention) */}
                <ContentStrategy />
            </div>

            {/* METHODOLOGY ROW 2: Market & Audio */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Methodology #4: Market Radar (Timing) */}
                <div className="lg:col-span-2">
                    <MarketRadar />
                </div>

                {/* Methodology #5: Audio Pitching (Actionable) */}
                <div className="lg:col-span-1">
                    <PitchingWidget />
                </div>
            </div>

            {/* METHODOLOGY ROW 3: Legal & Compliance */}
            <div className="grid grid-cols-1 gap-6">
                <ContractWidget />
            </div>
        </div>
    )
}
