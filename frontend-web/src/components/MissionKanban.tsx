import { useEffect, useState } from 'react'
import { MoreHorizontal, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function MissionKanban() {
    const [tasks, setTasks] = useState<{ todo: any[], inProgress: any[], done: any[] }>({
        todo: [],
        inProgress: [],
        done: []
    })
    const [loading, setLoading] = useState(true)

    const fetchMissions = async () => {
        try {
            setLoading(true)
            const { data } = await supabase.from('missions').select('*').order('created_at', { ascending: false })

            if (data) {
                const todo = data.filter(t => t.status === 'pending')
                const inProgress = data.filter(t => t.status === 'in_progress')
                const done = data.filter(t => t.status === 'completed')
                setTasks({ todo, inProgress, done })
            }
        } catch (error) {
            console.error('Error fetching missions:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMissions()

        // Realtime subscription
        const subscription = supabase
            .channel('missions_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'missions' }, () => {
                fetchMissions()
            })
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    if (loading) return <div className="h-[500px] flex items-center justify-center text-zinc-500"><Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading Missions...</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
            <Column title="To Do" tasks={tasks.todo} color="bg-slate-800/50" />
            <Column title="In Progress" tasks={tasks.inProgress} color="bg-indigo-900/20 border-indigo-500/20" />
            <Column title="Completed" tasks={tasks.done} color="bg-emerald-900/20 border-emerald-500/20" />
        </div>
    )
}

function Column({ title, tasks, color }: { title: string, tasks: any[], color: string }) {
    return (
        <div className={`rounded-xl p-4 flex flex-col h-full border border-slate-800 ${color}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-200">{title}</h3>
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{tasks.length}</span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                {tasks.length === 0 && (
                    <div className="text-zinc-500 text-xs text-center py-4 italic">No missions</div>
                )}
                {tasks.map((task) => (
                    <div key={task.id} className="bg-slate-900 border border-slate-700 rounded-lg p-4 shadow-sm hover:border-slate-500 transition-colors cursor-grab active:cursor-grabbing group">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded
                                ${task.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : ''}
                                ${task.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : ''}
                                ${task.priority === 'Medium' || !task.priority ? 'bg-blue-500/20 text-blue-400' : ''}
                            `}>
                                {task.priority || 'Medium'}
                            </span>
                            <button className="text-slate-500 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                        <h4 className="text-sm font-medium text-white mb-1">{task.title}</h4>
                        <div className="flex items-center justify-between mt-3">
                            <div className="text-xs text-slate-400 flex items-center">
                                <span className="text-emerald-500 font-bold">+{task.xp_reward || 0} XP</span>
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
