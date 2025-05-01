<!-- frontend/src/App.vue -->
<template>
  <div class="min-h-screen bg-task-bg transition-colors duration-300">
    <!-- Header -->
    <header class="bg-white shadow sticky top-0 z-10">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-task-title">Task Manager</h1>
        <button
          @click="openAddModal"
          class="inline-flex items-center px-4 py-2 bg-task-button text-white rounded-lg hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto py-6">
      <TaskList
        :tasks="tasks"
        @toggle="toggleTask"
        @edit="openEditModal"
        @delete="openDeleteModal"
        @update:truncation="checkTruncation"
      />
    </main>

    <!-- Add/Edit Task Modal -->
    <TaskModal
      :is-open="showAddModal || showEditModal"
      :task="currentTask"
      :is-edit="showEditModal"
      @close="closeModal"
      @save="saveTask"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteModal
      :is-open="showDeleteModal"
      :task="deleteTask"
      @close="closeDeleteModal"
      @confirm="deleteTaskConfirmed"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue';
import { PlusIcon } from 'lucide-vue-next';
import TaskList from './components/TaskList.vue';
import TaskModal from './components/TaskModal.vue';
import DeleteModal from './components/DeleteModal.vue';
import { useTasks } from './composables/useTasks';
import { useTruncation } from './composables/useTruncation';
import { Task } from './composables/useTasks';

export default defineComponent({
  name: 'App',
  components: { PlusIcon, TaskList, TaskModal, DeleteModal },
  setup() {
    // Task management
    const { tasks, fetchTasks, saveTask, toggleTask, deleteTask, clearToasts } = useTasks();
    const { checkAllTruncations } = useTruncation();

    // Modal states
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const currentTask = ref<Partial<Task>>({ title: '', description: '' });
    const deleteTaskRef = ref<Task | null>(null);

    // Store task description elements for truncation
    const taskElements = ref<Record<number, HTMLElement | null>>({});

    // Fetch tasks on mount
    fetchTasks();

    // Re-check truncation when tasks change
    watch(
      tasks,
      async () => {
        await nextTick();
        await checkAllTruncations(tasks.value, (taskId) => taskElements.value[taskId] || null);
      },
      { immediate: true }
    );

    // Modal handlers
    const openAddModal = () => {
      currentTask.value = { title: '', description: '' };
      clearToasts();
      showAddModal.value = true;
    };

    const openEditModal = (task: Task) => {
      currentTask.value = { ...task };
      clearToasts();
      showEditModal.value = true;
    };

    const openDeleteModal = (task: Task) => {
      deleteTaskRef.value = task;
      clearToasts();
      showDeleteModal.value = true;
    };

    const closeModal = () => {
      showAddModal.value = false;
      showEditModal.value = false;
      currentTask.value = { title: '', description: '' };
      clearToasts();
    };

    const closeDeleteModal = () => {
      showDeleteModal.value = false;
      deleteTaskRef.value = null;
      clearToasts();
    };

    // Task handlers
    const saveTaskHandler = (task: Partial<Task>) => {
      saveTask(task, showEditModal.value);
      closeModal();
    };

    const deleteTaskConfirmed = () => {
      if (deleteTaskRef.value) {
        deleteTask(deleteTaskRef.value.id);
      }
      closeDeleteModal();
    };

    // Update task elements for truncation
    const checkTruncation = ({ taskId, element }: { taskId: number; element: HTMLElement | null }) => {
      taskElements.value[taskId] = element;
    };

    return {
      tasks,
      showAddModal,
      showEditModal,
      showDeleteModal,
      currentTask,
      deleteTask: deleteTaskRef,
      openAddModal,
      openEditModal,
      openDeleteModal,
      closeModal,
      closeDeleteModal,
      saveTask: saveTaskHandler,
      toggleTask,
      deleteTaskConfirmed,
      checkTruncation,
    };
  },
});
</script>

<style scoped>
.bg-task-modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
.bg-task-bg {
  background-color: #f0f8ff;
}
.text-task-title {
  color: #0a69b5;
}
.bg-task-button {
  background-color: #00c0ff;
}
</style>