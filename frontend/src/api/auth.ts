import { api, toApiError } from './client'
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/api'

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
        const { data } = await api.post<AuthResponse>('/api/auth/register', payload)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
    try {
        const { data } = await api.post<AuthResponse>('/api/auth/login', payload)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function me(): Promise<User> {
    try {
        const { data } = await api.get<User>('/api/auth/me')
        return data
    } catch (err) {
        throw toApiError(err)
    }
}