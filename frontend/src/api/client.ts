import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiErrorBody } from '../types/api'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000'

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
})

let accessToken: string | null = null

export function setAccessToken(token: string | null) {
    accessToken = token
}

export function getAccessToken() {
    return accessToken
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

export class ApiError extends Error {
    status: number
    fieldErrors?: { field: string; message: string }[]

    constructor(status: number, message: string, fieldErrors?: { field: string; message: string }[]) {
        super(message)
        this.status = status
        this.fieldErrors = fieldErrors
    }
}

export function toApiError(err: unknown): ApiError {
    if (err instanceof AxiosError) {
        const body = err.response?.data as ApiErrorBody | undefined
        if (body && typeof body.message === 'string') {
            return new ApiError(body.status ?? 500, body.message, body.fieldErrors)
        }
        if (err.response) {
            return new ApiError(err.response.status, err.response.statusText || 'Request failed')
        }
        return new ApiError(0, 'Network error. Is the backend running?')
    }
    return new ApiError(500, 'Unexpected error')
}