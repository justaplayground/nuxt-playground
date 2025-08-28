<template>
  <div
    :data-task-id="task.id"
    class="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-gray-300"
    @click="openModal"
  >
    <h3 class="font-medium text-gray-900 mb-2">{{ task.title }}</h3>
    <p v-if="task.description" class="text-sm text-gray-600 line-clamp-3">
      {{ task.description }}
    </p>
    <div class="flex items-center justify-between mt-3 text-xs text-gray-500">
      <span>{{ formatDate(task.updatedAt) }}</span>
      <button
        class="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-gray-100"
        @click.stop="$emit('deleteTask')"
        title="Delete task"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.5 1.5H3.5L5 11.5V5zM6 5v6.5a.5.5 0 00.146.354L7.293 13h5.414l1.147-1.146A.5.5 0 0014 11.5V5H6z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Task Detail Modal -->
    <TaskModal
      v-if="showModal"
      :task="task"
      :list-id="listId"
      @close="showModal = false"
      @update="handleUpdate"
      @delete="$emit('deleteTask')"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types'

interface Props {
  task: Task
  listId: string
  index: number
}

interface Emits {
  updateTask: [updates: Partial<Task>]
  deleteTask: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const handleUpdate = (updates: Partial<Task>) => {
  emit('updateTask', updates)
  showModal.value = false
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
