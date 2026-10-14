import { api, toApiError } from './client'
import type { CreateFilePayload, ProjectFile } from '../types/api'

export async function listFiles(projectId: number): Promise<ProjectFile[]> {
    try {
        const { data } = await api.get<ProjectFile[]>(`/api/projects/${projectId}/files`)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function createFile(projectId: number, payload: CreateFilePayload): Promise<ProjectFile> {
    try {
        const { data } = await api.post<ProjectFile>(`/api/projects/${projectId}/files`, payload)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function getFile(fileId: number): Promise<ProjectFile> {
    try {
        const { data } = await api.get<ProjectFile>(`/api/files/${fileId}`)
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function updateFileContent(fileId: number, content: string): Promise<ProjectFile> {
    try {
        const { data } = await api.patch<ProjectFile>(`/api/files/${fileId}`, { content })
        return data
    } catch (err) {
        throw toApiError(err)
    }
}

export async function deleteFile(fileId: number): Promise<void> {
    try {
        await api.delete(`/api/files/${fileId}`)
    } catch (err) {
        throw toApiError(err)
    }
}