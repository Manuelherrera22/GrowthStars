import MissionKanban from '../components/MissionKanban'
import { Plus } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function MissionsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Mission Control</h1>
                    <p className="text-slate-400">Manage artist objectives and track progress.</p>
                </div>
                <Button>
                    <Plus className="w-5 h-5 mr-2" />
                    New Mission
                </Button>
            </div>

            <MissionKanban />
        </div>
    )
}
