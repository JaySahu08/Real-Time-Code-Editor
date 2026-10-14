import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import * as authApi from '../api/auth'
import { setAccessToken } from '../api/client'
import type { LoginPayload, RegisterPayload, User } from '../types/api'

interface AuthContextValue {
    user: User | null
    loading: boolean
    login: (payload: LoginPayload) => Promise<void>
    register: (payload: RegisterPayload) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // On boot: token is in memory, so nothing persists across reload.
    // We don't have refresh endpoint yet, so just stop loading.
    useEffect(() => {
        setLoading(false)
    }, [])

    const login = useCallback(async (payload: LoginPayload) => {
        const res = await authApi.login(payload)
        setAccessToken(res.accessToken)
        setUser(res.user)
    }, [])

    const register = useCallback(async (payload: RegisterPayload) => {
        const res = await authApi.register(payload)
        setAccessToken(res.accessToken)
        setUser(res.user)
    }, [])

    const logout = useCallback(() => {
        setAccessToken(null)
        setUser(null)
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}