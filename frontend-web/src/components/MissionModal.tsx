import { useState } from 'react'
import { X, Calendar, CheckCircle } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

interface MissionModalProps {
    isOpen: boolean
    onClose: () => void
    artistName: string
}

export default function MissionModal({ isOpen, onClose, artistName }: MissionModalProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [submitted, setSubmitted] = useState(false)

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock API call
        setTimeout(() => {
            setSubmitted(true)
            setTimeout(() => {
                setSubmitted(false)
                onClose()
                setTitle('')
                setDescription('')
            }, 1500)
        }, 500)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-1">New Mission</h2>
                <p className="text-slate-400 text-sm mb-6">Assign a task to <span className="text-indigo-400 font-medium">{artistName}</span>.</p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Mission Title</label>
                            <Input
                                placeholder="e.g. Upload Demo Track"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Description</label>
                            <textarea
                                className="flex w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                                placeholder="Details about the mission..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Deadline</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                <Input type="date" className="pl-10 text-slate-300" />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <Button type="button" variant="ghost" onClick={onClose} className="w-auto">Cancel</Button>
                            <Button type="submit" className="w-auto">Assign Mission</Button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Mission Assigned!</h3>
                        <p className="text-slate-400">The artist has been notified.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
