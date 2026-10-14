import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'
import { Spinner } from '../components/ui/Spinner'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <Spinner fullscreen />
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />
    return <>{children}</>
}