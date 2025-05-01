<!-- frontend/src/components/TaskList.vue -->
<template>
    <div v-if="tasks.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="emit('toggle', $event)"
        @edit="emit('edit', $event)"
        @delete="emit('delete', $event)"
        @update:truncation="emit('update:truncation', $event)"
      />
    </div>
    <div v-else class="text-center text-black py-8">
      No tasks found. Add a task to get started!
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import TaskItem from './TaskItem.vue';
  import { Task } from '../composables/useTasks';
  
  export default defineComponent({
    name: 'TaskList',
    components: { TaskItem },
    props: {
      tasks: {
        type: Array as PropType<Task[]>,
        required: true,
      },
    },
    emits: {
      toggle: (task: Task) => true,
      edit: (task: Task) => true,
      delete: (task: Task) => true,
      'update:truncation': (payload: { taskId: number; element: HTMLElement | null }) => true,
    },
    setup(_, { emit }) {
      return { emit };
    },
  });
  </script>
