import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { Alert } from '../components/ui/Alert'
import { Spinner } from '../components/ui/Spinner'
import { ApiError } from '../api/client'
import * as roomsApi from '../api/rooms'
import type { Room } from '../types/api'
import './DashboardPage.css'

export function DashboardPage() {
    const [rooms, setRooms] = useState<Room[] | null>(null)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [showCreate, setShowCreate] = useState(false)
    const [showJoin, setShowJoin] = useState(false)

    async function refresh() {
        setLoadError(null)
        try {
            const data = await roomsApi.listRooms()
            setRooms(data)
        } catch (err) {
            setLoadError(err instanceof ApiError ? err.message : 'Failed to load rooms')
        }
    }

    useEffect(() => {
        refresh()
    }, [])

    return (
        <AppShell>
            <div className="container dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Your rooms</h1>
                    <div className="dashboard-actions">
                        <button className="btn btn-secondary" onClick={() => setShowJoin(true)}>
                            Join room
                        </button>
                        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                            New room
                        </button>
                    </div>
                </div>

                {loadError && <Alert variant="error">{loadError}</Alert>}

                {rooms === null ? (
                    <Spinner />
                ) : rooms.length === 0 ? (
                    <div className="dashboard-empty card">
                        <h3>No rooms yet</h3>
                        <p>Create your first room to start collaborating, or join one with an invitation code.</p>
                    </div>
                ) : (
                    <div className="dashboard-grid">
                        {rooms.map((room) => (
                            <Link key={room.id} to={`/rooms/${room.id}`} className="room-card card card-elevated">
                                <div className="room-card-header">
                                    <h3 className="room-card-name">{room.name}</h3>
                                    <span className={`room-role room-role-${room.role.toLowerCase()}`}>
                    {room.role}
                  </span>
                                </div>
                                {room.description && <p className="room-card-desc">{room.description}</p>}
                                <div className="room-card-meta">
                                    <span>Code: {room.invitationCode}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {showCreate && (
                <CreateRoomDialog
                    onClose={() => setShowCreate(false)}
                    onCreated={() => { setShowCreate(false); refresh() }}
                />
            )}

            {showJoin && (
                <JoinRoomDialog
                    onClose={() => setShowJoin(false)}
                    onJoined={() => { setShowJoin(false); refresh() }}
                />
            )}
        </AppShell>
    )
}

function CreateRoomDialog({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [busy, setBusy] = useState(false)

    async function submit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setBusy(true)
        try {
            await roomsApi.createRoom({ name, description: description || undefined })
            onCreated()
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed')
        } finally {
            setBusy(false)
        }
    }

    return (
        <Modal title="New room" onClose={onClose}>
            {error && <Alert variant="error">{error}</Alert>}
            <form onSubmit={submit} className="modal-form">
                <label className="auth-label">
                    Room name
                    <input className="input" required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="auth-label">
                    Description (optional)
                    <input className="input" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={busy}>
                        {busy ? 'Creating…' : 'Create'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

function JoinRoomDialog({ onClose, onJoined }: { onClose: () => void; onJoined: () => void }) {
    const [code, setCode] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [busy, setBusy] = useState(false)

    async function submit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setBusy(true)
        try {
            await roomsApi.joinRoom(code.trim().toUpperCase())
            onJoined()
        } catch (err) {
            setError(err instanceof ApiError ? err.message : 'Failed')
        } finally {
            setBusy(false)
        }
    }

    return (
        <Modal title="Join a room" onClose={onClose}>
            {error && <Alert variant="error">{error}</Alert>}
            <form onSubmit={submit} className="modal-form">
                <label className="auth-label">
                    Invitation code
                    <input
                        className="input"
                        required
                        minLength={4}
                        maxLength={32}
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder="ABCD1234"
                        style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}
                    />
                </label>
                <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={busy}>
                        {busy ? 'Joining…' : 'Join'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal card" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">{title}</h2>
                {children}
            </div>
        </div>
    )
}