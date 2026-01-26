import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    // In a real app we would check role here too, but for MVP checking token presence is step 1.
    // We handle role redirection in Login. Ideally we store role in store too.

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
