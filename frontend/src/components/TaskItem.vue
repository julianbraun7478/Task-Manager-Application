<!-- frontend/src/components/TaskItem.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-4 col-span-3 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start pb-2">
      <h3
        :class="{ 'line-through text-gray-500': task.is_completed }"
        class="text-lg font-bold text-[#0a69b5]"
      >
        {{ task.title }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <button
          @click="$emit('toggle', task)"
          :class="{ 'bg-red-200 text-red-700 focus:ring-red-500 hover:bg-red-200': !task.is_completed }"
          class="px-3 py-1 flex gap-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        >
          <CheckCircleIcon v-if="task.is_completed" class="w-5 h-5" />
          <CircleIcon v-else class="w-5 h-5" />
          {{ task.is_completed ? 'Complete' : 'Pending' }}
        </button>
        <button
          @click="$emit('edit', task)"
          class="px-3 py-1 bg-blue-100 flex gap-1 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <EditIcon class="w-5 h-5" />
          Edit
        </button>
        <button
          @click="$emit('delete', task)"
          class="px-3 py-1 bg-red-100 flex gap-1 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        >
          <TrashIcon class="w-5 h-5" />
          Delete
        </button>
      </div>
    </div>
    <div class="mt-2 flex items-end text-black relative">
      <p
        ref="descriptionRef"
        :class="{ 'line-clamp-2': !expandedTasks[task.id] }"
        class="description flex-1"
      >
        {{ task.description }}
      </p>
      <a
        v-if="isTruncated[task.id] && !expandedTasks[task.id]"
        href="#"
        @click.prevent="toggleDescription(task.id)"
        class="text-blue-600 hover:underline text-sm ml-2"
      >
        more
      </a>
      <a
        v-if="isTruncated[task.id] && expandedTasks[task.id]"
        href="#"
        @click.prevent="toggleDescription(task.id)"
        class="text-blue-600 hover:underline text-sm ml-2"
      >
        less
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, onMounted, nextTick } from 'vue';
import { CheckCircleIcon, CircleIcon, EditIcon, TrashIcon } from 'lucide-vue-next';
import { useTruncation } from '../composables/useTruncation';
import { Task } from '../composables/useTasks';

export default defineComponent({
  name: 'TaskItem',
  components: { CheckCircleIcon, CircleIcon, EditIcon, TrashIcon },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  emits: {
    toggle: (task: Task) => true,
    edit: (task: Task) => true,
    delete: (task: Task) => true,
    'update:truncation': (payload: { taskId: number; element: HTMLElement | null }) => true,
  },
  setup(props, { emit }) {
    const descriptionRef = ref<HTMLElement | null>(null);
    const { expandedTasks, isTruncated, checkTruncation, toggleDescription } = useTruncation();

    // Check truncation on mount
    onMounted(async () => {
      await nextTick();
      await checkTruncation(props.task.id, descriptionRef.value);
      emit('update:truncation', { taskId: props.task.id, element: descriptionRef.value });
    });

    // Re-check truncation when task changes
    watch(
      () => props.task,
      async () => {
        await nextTick();
        await checkTruncation(props.task.id, descriptionRef.value);
        emit('update:truncation', { taskId: props.task.id, element: descriptionRef.value });
      },
      { deep: true }
    );

    return {
      descriptionRef,
      expandedTasks,
      isTruncated,
      toggleDescription,
    };
  },
});
</script>

<style scoped>
.description + a {
  margin-left: 0.5rem;
}
</style>