<!-- frontend/src/components/DeleteModal.vue -->
<template>
    <transition name="modal">
        <div v-if="isOpen"
            class="fixed inset-0 bg-task-modal-backdrop bg-opacity-50 flex items-center justify-center z-50"
            @click.self="$emit('close')">
            <div class="bg-white rounded-lg p-6 w-full max-w-md m-4 transform transition-all" @click.stop>
                <h2 class="text-xl font-bold text-black mb-4 text-center">Delete Task</h2>
                <p class="text-black mb-4 text-center">
                    Are you sure you want to delete "{{ task?.title }}"?
                </p>
                <div class="flex justify-end pt-2 space-x-2 gap-2">
                    <button @click="$emit('confirm')"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Delete
                    </button>
                    <button @click="$emit('close')"
                        class="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { TOAST_CLASSES } from '../constants/toast';
import { Task } from '../composables/useTasks';

export default defineComponent({
    name: 'DeleteModal',
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        task: {
            type: Object as PropType<Task | null>,
            default: null,
        },
    },
    emits: {
        close: null,
        confirm: null,
    },
    setup(props) {
        // Show toast when modal opens/closes
        watch(
            () => props.isOpen,
            (isOpen) => {
                if (isOpen && props.task) {
                    toast.info(`Confirm deletion for task: ${props.task.title}`, {
                        toastClassName: TOAST_CLASSES.INFO,
                    });
                } else if (!isOpen) {
                    toast.info('Modal closed', { toastClassName: TOAST_CLASSES.INFO });
                }
            }
        );

        return {};
    },
});
</script>

<style scoped>
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