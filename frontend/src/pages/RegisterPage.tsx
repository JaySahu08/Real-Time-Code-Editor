import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { ApiError } from '../api/client'
import { Alert } from '../components/ui/Alert'
import './AuthPages.css'

export function RegisterPage() {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setSubmitting(true)
        try {
            await register({ name, email, password })
            navigate('/')
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Registration failed')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card card card-elevated">
                <h1 className="auth-title">Create account</h1>
                <p className="auth-subtitle">Start collaborating on code in seconds.</p>

                {error && <Alert variant="error">{error}</Alert>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <label className="auth-label">
                        Name
                        <input
                            className="input"
                            type="text"
                            autoComplete="name"
                            required
                            minLength={2}
                            maxLength={120}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

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
                            autoComplete="new-password"
                            required
                            minLength={8}
                            maxLength={72}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="auth-hint">At least 8 characters.</span>
                    </label>

                    <button className="btn btn-primary auth-submit" type="submit" disabled={submitting}>
                        {submitting ? 'Creating…' : 'Create account'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    )
}