import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { ApiError } from '../api/client'
import { Alert } from '../components/ui/Alert'
import './AuthPages.css'

export function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setSubmitting(true)
        try {
            await login({ email, password })
            navigate('/')
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Login failed')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card card card-elevated">
                <h1 className="auth-title">Sign in</h1>
                <p className="auth-subtitle">Welcome back to your collaborative editor.</p>

                {error && <Alert variant="error">{error}</Alert>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <label className="auth-label">
                        Email
                        <input
                            className="input"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="auth-label">
                        Password
                        <input
                            className="input"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button className="btn btn-primary auth-submit" type="submit" disabled={submitting}>
                        {submitting ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>

                <p className="auth-footer">
                    No account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    )
}