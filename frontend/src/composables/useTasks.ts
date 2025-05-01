// frontend/src/composables/useTasks.ts
import { ref } from 'vue';
import axios, { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';
import { API_ENDPOINTS } from '../constants/api';
import { TOAST_CLASSES } from '../constants/toast';

interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
}

interface ErrorResponse {
  errors?: Record<string, string[]>;
  error?: string;
}

const defaultMessages: Record<string, string> = {
  fetch: 'Failed to fetch tasks. Please try again.',
  save: 'Failed to save task. Please try again.',
  toggle: 'Failed to update task status. Please try again.',
  delete: 'Failed to delete task. Please try again.',
};

export function useTasks() {
  const tasks = ref<Task[]>([]);
  const toastIds = ref<string[]>([]); // Track toast IDs

  // Handle API errors with toast notifications
  const handleApiError = (error: unknown, action: string) => {
    const message = defaultMessages[action] || 'An error occurred. Please try again.';
    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response;
      if (status === 422) {
        const errors = (data as ErrorResponse).errors;
        if (errors) {
          Object.values(errors).flat().forEach((err) => {
            const toastId = toast.error(err, { toastClassName: TOAST_CLASSES.ERROR });
            toastIds.value.push(toastId as string);
          });
        }
      } else if (status === 404) {
        const toastId = toast.error((data as ErrorResponse).error || `${action.charAt(0).toUpperCase() + action.slice(1)}: Resource not found`, {
          toastClassName: TOAST_CLASSES.ERROR,
        });
        toastIds.value.push(toastId as string);
      } else {
        const toastId = toast.error(message, { toastClassName: TOAST_CLASSES.ERROR });
        toastIds.value.push(toastId as string);
      }
    } else {
      const toastId = toast.error(`${action.charAt(0).toUpperCase() + action.slice(1)}: ${message}`, {
        toastClassName: TOAST_CLASSES.ERROR,
      });
      toastIds.value.push(toastId as string);
    }
    console.error(`Error during ${action}:`, error);
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(API_ENDPOINTS.TASKS);
      tasks.value = response.data;
    } catch (error) {
      handleApiError(error, 'fetch');
    }
  };

  // Save (create or update) a task
  const saveTask = async (task: Partial<Task>, isEdit: boolean) => {
    try {
      if (isEdit && task.id) {
        await axios.put(API_ENDPOINTS.TASK(task.id), task);
        const toastId = toast.success('Task updated successfully', { toastClassName: TOAST_CLASSES.SUCCESS });
        toastIds.value.push(toastId as string);
      } else {
        await axios.post(API_ENDPOINTS.TASKS, task);
        const toastId = toast.success('Task created successfully', { toastClassName: TOAST_CLASSES.SUCCESS });
        toastIds.value.push(toastId as string);
      }
      await fetchTasks();
    } catch (error) {
      handleApiError(error, 'save');
    }
  };

  // Toggle task completion status
  const toggleTask = async (task: Task) => {
    try {
      await axios.put(API_ENDPOINTS.TASK(task.id), {
        ...task,
        is_completed: !task.is_completed,
      });
      const toastId = toast.success('Task status updated', { toastClassName: TOAST_CLASSES.SUCCESS });
      toastIds.value.push(toastId as string);
      await fetchTasks();
    } catch (error) {
      handleApiError(error, 'toggle');
    }
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(API_ENDPOINTS.TASK(taskId));
      const toastId = toast.success('Task deleted successfully', { toastClassName: TOAST_CLASSES.SUCCESS });
      toastIds.value.push(toastId as string);
      await fetchTasks();
    } catch (error) {
      handleApiError(error, 'delete');
    }
  };

  // Clear all toasts
  const clearToasts = () => {
    toast.remove(); // Clears all toasts
  };

  return {
    tasks,
    fetchTasks,
    saveTask,
    toggleTask,
    deleteTask,
    clearToasts,
  };
}