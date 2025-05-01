// frontend/src/composables/useTruncation.ts
import { ref, nextTick } from 'vue';
import { toast } from 'vue3-toastify';
import { TOAST_CLASSES } from '../constants/toast';

export function useTruncation() {
  const expandedTasks = ref<Record<number, boolean>>({});
  const isTruncated = ref<Record<number, boolean>>({});

  // Check if a task's description is truncated (exceeds two lines)
  const checkTruncation = async (taskId: number, element: HTMLElement | null) => {
    await nextTick(); // Wait for DOM to render
    if (!element) {
      console.warn(`Description element for task ${taskId} not found`);
      isTruncated.value[taskId] = false;
      return;
    }

    const wasClamped = element.classList.contains('line-clamp-2');
    if (wasClamped) {
      element.classList.remove('line-clamp-2');
    }

    const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 20;
    const twoLineHeight = lineHeight * 2;
    const truncated = element.scrollHeight > twoLineHeight;

    if (wasClamped && !expandedTasks.value[taskId]) {
      element.classList.add('line-clamp-2');
    }

    isTruncated.value[taskId] = truncated;
    console.log(
      `Task ${taskId}: isTruncated=${truncated}, scrollHeight=${element.scrollHeight}, twoLineHeight=${twoLineHeight}, wasClamped=${wasClamped}`
    );
  };

  // Toggle between truncated and full description
  const toggleDescription = (taskId: number) => {
    expandedTasks.value[taskId] = !expandedTasks.value[taskId];
    console.log(`Toggled description for task ${taskId}: expanded=${expandedTasks.value[taskId]}`);
    // toast.info(expandedTasks.value[taskId] ? 'Expanded description' : 'Collapsed description', {
    //   toastClassName: TOAST_CLASSES.INFO,
    // });
  };

  // Force truncation check for all tasks
  const checkAllTruncations = async (tasks: { id: number }[], getElement: (taskId: number) => HTMLElement | null) => {
    await nextTick();
    for (const task of tasks) {
      const element = getElement(task.id);
      await checkTruncation(task.id, element);
    }
  };

  return {
    expandedTasks,
    isTruncated,
    checkTruncation,
    toggleDescription,
    checkAllTruncations,
  };
}