import { api, toApiError } from './client'
import type {
    CreateRoomPayload,
    Member,
    Room,
    UpdateRoomPayload,
} from '../types/api'

export async function listRooms(): Promise<Room[]> {
    try {
        const { data } = await api.get<Room[]>('/api/rooms')
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function createRoom(payload: CreateRoomPayload): Promise<Room> {
    try {
        const { data } = await api.post<Room>('/api/rooms', payload)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function getRoom(roomId: number): Promise<Room> {
    try {
        const { data } = await api.get<Room>(`/api/rooms/${roomId}`)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function updateRoom(roomId: number, payload: UpdateRoomPayload): Promise<Room> {
    try {
        const { data } = await api.patch<Room>(`/api/rooms/${roomId}`, payload)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function deleteRoom(roomId: number): Promise<void> {
    try {
        await api.delete(`/api/rooms/${roomId}`)
    } catch (err) {
        throw toApiError(err)
    }
}

export async function joinRoom(invitationCode: string): Promise<{ roomId: number; name: string; role: string }> {
    try {
        const { data } = await api.post('/api/rooms/join', { invitationCode })
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function leaveRoom(roomId: number): Promise<void> {
    try {
        await api.delete(`/api/rooms/${roomId}/leave`)
    } catch (err) {
        throw toApiError(err)
    }
}

export async function listMembers(roomId: number): Promise<Member[]> {
    try {
        const { data } = await api.get<Member[]>(`/api/rooms/${roomId}/members`)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function changeMemberRole(
    roomId: number,
    userId: number,
    role: 'EDITOR' | 'VIEWER'
): Promise<Member> {
    try {
        const { data } = await api.patch<Member>(`/api/rooms/${roomId}/members/${userId}`, { role })
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function removeMember(roomId: number, userId: number): Promise<void> {
    try {
        await api.delete(`/api/rooms/${roomId}/members/${userId}`)
    } catch (err) {
        throw toApiError(err)
    }
}