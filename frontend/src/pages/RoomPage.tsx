import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { Spinner } from '../components/ui/Spinner'
import { Alert } from '../components/ui/Alert'
import { ApiError } from '../api/client'
import * as roomsApi from '../api/rooms'
import * as projectsApi from '../api/projects'
import type { Project, Room } from '../types/api'
import './RoomPage.css'

export function RoomPage() {
  const { roomId: roomIdStr } = useParams<{ roomId: string }>()
  const roomId = Number(roomIdStr)

  const [room, setRoom] = useState<Room | null>(null)
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!Number.isFinite(roomId)) return
    setError(null)
    Promise.all([roomsApi.getRoom(roomId), projectsApi.listProjects(roomId)])
      .then(([r, p]) => { setRoom(r); setProjects(p) })
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Failed to load room'))
  }, [roomId])

  if (error) {
    return (
      <AppShell>
        <div className="container" style={{ paddingTop: 32 }}>
          <Alert variant="error">{error}</Alert>
          <p style={{ marginTop: 16 }}><Link to="/">← Back to dashboard</Link></p>
        </div>
      </AppShell>
    )
  }

  if (!room || projects === null) {
    return (
      <AppShell>
        <Spinner />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="container room-page">
        <div className="room-header">
          <div>
            <h1 className="room-name">{room.name}</h1>
            {room.description && <p className="room-desc">{room.description}</p>}
          </div>
          <span className={`room-role room-role-${room.role.toLowerCase()}`}>{room.role}</span>
        </div>

        <div className="room-info card">
          <div className="room-info-row">
            <span className="room-info-label">Invitation code</span>
            <code className="room-info-value">{room.invitationCode}</code>
          </div>
        </div>

        <h2 className="room-section-title">Projects</h2>
        {projects.length === 0 ? (
          <div className="card" style={{ padding: 32, textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            No projects yet. Full workspace with editor and chat coming in the next phase.
          </div>
        ) : (
          <ul className="project-list">
            {projects.map((p) => (
              <li key={p.id} className="card project-item">
                <span className="project-name">{p.name}</span>
                {p.description && <span className="project-desc">{p.description}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  )
}
