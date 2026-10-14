import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import './AppShell.css'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-brand">
          Real-Time Code Editor
        </Link>
        <div className="app-header-right">
          {user && (
            <>
              <span className="app-user">{user.name}</span>
              <button className="btn btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  )
}
