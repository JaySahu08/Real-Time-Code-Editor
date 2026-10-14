export interface User {
    id: number
    name: string
    email: string
    createdAt: string
}

export interface AuthResponse {
    accessToken: string
    expiresInSeconds: number
    user: User
}

export interface RegisterPayload {
    name: string
    email: string
    password: string
}

export interface LoginPayload {
    email: string
    password: string
}

export interface Room {
    id: number
    name: string
    description: string | null
    invitationCode: string
    ownerId: number
    role: 'OWNER' | 'EDITOR' | 'VIEWER'
    createdAt: string
    updatedAt: string
}

export interface CreateRoomPayload {
    name: string
    description?: string
}

export interface UpdateRoomPayload {
    name?: string
    description?: string
}

export interface Member {
    userId: number
    name: string
    email: string
    role: 'OWNER' | 'EDITOR' | 'VIEWER'
    joinedAt: string
}

export interface Project {
    id: number
    roomId: number
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
}

export interface CreateProjectPayload {
    name: string
    description?: string
}

export interface ProjectFile {
    id: number
    projectId: number
    name: string
    path: string
    content: string
    createdAt: string
    updatedAt: string
}

export interface CreateFilePayload {
    name: string
    path: string
    content?: string
}

export interface ApiErrorBody {
    timestamp: string
    status: number
    message: string
    path: string
    fieldErrors?: { field: string; message: string }[]
}