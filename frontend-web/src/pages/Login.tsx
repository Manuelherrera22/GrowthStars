import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Music4, Loader2 } from 'lucide-react'

export default function Login() {
    const navigate = useNavigate()
    const setLogin = useAuthStore((state) => state.setLogin)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // REAL SUAPBASE LOGIN
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            if (data.session) {
                setLogin(data.session.access_token)
                // In a real app, query 'profiles' to get the role.
                // For now, defaulting to admin logic based on email convention or just letting them in.
                navigate('/admin')
            }
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
                        <Music4 className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Growth Stars</h1>
                    <p className="text-slate-400 text-sm mt-1">Intelligence Platform (Mock Mode)</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <Input
                            type="email"
                            placeholder="admin@growthstars.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <Button type="submit" disabled={loading} className="w-full mt-6">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    )
}
