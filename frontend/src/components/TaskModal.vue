<!-- frontend/src/components/TaskModal.vue -->
<template>
  <transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 bg-task-modal-backdrop bg-opacity-50 flex items-center justify-center z-50"
      @click.self="$emit('close')">
      <div class="bg-white rounded-lg p-6 w-full max-w-md m-4 transform transition-all" @click.stop>
        <h2 class="text-xl font-bold text-black mb-4">{{ isEdit ? 'Edit Task' : 'Add Task' }}</h2>
        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-black">Title</label>
            <input v-model="localTask.title" id="title" type="text"
              class="mt-1 w-full p-2 border rounded-lg text-black focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Task title" />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-black">Description</label>
            <textarea v-model="localTask.description" id="description"
              class="mt-1 w-full p-2 border rounded-lg text-black focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Task description" rows="4" ></textarea>
          </div>
          <div class="flex justify-end space-x-2 gap-2">
            <button type="submit"
              class="px-4 py-2 bg-task-button text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
              {{ isEdit ? 'Update Task' : 'Add Task' }}
            </button>
            <button type="button" @click="$emit('close')"
              class="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { TOAST_CLASSES } from '../constants/toast';
import { Task } from '../composables/useTasks';

export default defineComponent({
  name: 'TaskModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object as PropType<Partial<Task>>,
      default: () => ({ title: '', description: '' }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    close: null,
    save: (task: Partial<Task>) => true,
  },
  setup(props, { emit }) {
    const localTask = ref<Partial<Task>>({ ...props.task });

    // Sync localTask with prop changes
    watch(
      () => props.task,
      (newTask) => {
        localTask.value = { ...newTask };
      },
      { deep: true }
    );

    // Show toast when modal opens/closes
    // watch(
    //   () => props.isOpen,
    //   (isOpen) => {
    //     if (isOpen) {
    //       toast.info(props.isEdit ? `Editing task: ${props.task.title || 'Task'}` : 'Opened add task modal', {
    //         className: TOAST_CLASSES.INFO,
    //       });
    //     } else {
    //       toast.info('Modal closed', { className: TOAST_CLASSES.INFO });
    //     }
    //   }
    // );

    const save = () => {
      emit('save', localTask.value);
    };

    return {
      localTask,
      save,
    };
  },
});
</script>

<style scoped>
.bg-task-modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-task-button {
  background-color: #00c0ff;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .transform,
.modal-leave-active .transform {
  transition: transform 0.3s ease;
}

.modal-enter-from .transform,
.modal-leave-to .transform {
  transform: scale(0.95);
}
</style>