import { api, toApiError } from './client'
import type { CreateProjectPayload, Project } from '../types/api'

export async function listProjects(roomId: number): Promise<Project[]> {
    try {
        const { data } = await api.get<Project[]>(`/api/rooms/${roomId}/projects`)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function createProject(roomId: number, payload: CreateProjectPayload): Promise<Project> {
    try {
        const { data } = await api.post<Project>(`/api/rooms/${roomId}/projects`, payload)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function getProject(projectId: number): Promise<Project> {
    try {
        const { data } = await api.get<Project>(`/api/projects/${projectId}`)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}