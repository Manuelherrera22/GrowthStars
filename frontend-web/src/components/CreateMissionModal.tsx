import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { Button } from './ui/Button'
import { supabase } from '../lib/supabase'

interface CreateMissionModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function CreateMissionModal({ isOpen, onClose, onSuccess }: CreateMissionModalProps) {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [xp, setXp] = useState('50')
    const [type, setType] = useState('General')

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase
                .from('missions')
                .insert([
                    {
                        title,
                        xp_reward: parseInt(xp),
                        type,
                        status: 'pending',
                        priority: 'Medium' // Default
                    }
                ])

            if (error) throw error

            onSuccess()
            onClose()
            setTitle('')
        } catch (error) {
            console.error('Error creating mission:', error)
            alert('Error creating mission')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-white mb-4">Nueva Misión</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Título de la Misión</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: Subir Demo a SoundCloud"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">XP Recompensa</label>
                            <input
                                type="number"
                                required
                                value={xp}
                                onChange={(e) => setXp(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Tipo</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="General">General</option>
                                <option value="Content">Contenido</option>
                                <option value="Urgent">Urgente</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end space-x-3">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-500">
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Crear Misión
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
