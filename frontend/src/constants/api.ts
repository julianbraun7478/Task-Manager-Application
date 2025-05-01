// frontend/src/constants/api.ts
export const API_ENDPOINTS = {
    TASKS: '/api/tasks',
    TASK: (id: number) => `/api/tasks/${id}`,
} as const;