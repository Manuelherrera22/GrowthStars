import { useState } from 'react'

import { MoreHorizontal, CheckCircle2 } from 'lucide-react'

// Mock Data
const INITIAL_TASKS = {
    todo: [
        { id: 't1', title: 'Upload Demo Track', artist: 'Luna Eclipse', priority: 'High' },
        { id: 't2', title: 'Sign Contract', artist: 'Solaris', priority: 'Critical' },
    ],
    inProgress: [
        { id: 't3', title: 'Review Metadata', artist: 'Velvet Freq.', priority: 'Medium' },
    ],
    done: [
        { id: 't4', title: 'Submit to Spotify', artist: 'The Void', priority: 'High' },
    ]
}

export default function MissionKanban() {
    const [columns] = useState(INITIAL_TASKS)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
            <Column title="To Do" tasks={columns.todo} color="bg-slate-800/50" />
            <Column title="In Progress" tasks={columns.inProgress} color="bg-indigo-900/20 border-indigo-500/20" />
            <Column title="Completed" tasks={columns.done} color="bg-emerald-900/20 border-emerald-500/20" />
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

            <div className="flex-1 space-y-3 overflow-y-auto">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-slate-900 border border-slate-700 rounded-lg p-4 shadow-sm hover:border-slate-500 transition-colors cursor-grab active:cursor-grabbing group">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded
                                ${task.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : ''}
                                ${task.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : ''}
                                ${task.priority === 'Medium' ? 'bg-blue-500/20 text-blue-400' : ''}
                            `}>
                                {task.priority}
                            </span>
                            <button className="text-slate-500 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                        <h4 className="text-sm font-medium text-white mb-1">{task.title}</h4>
                        <div className="flex items-center justify-between mt-3">
                            <div className="text-xs text-slate-400 flex items-center">
                                <div className="w-4 h-4 rounded-full bg-slate-700 mr-2" />
                                {task.artist}
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
