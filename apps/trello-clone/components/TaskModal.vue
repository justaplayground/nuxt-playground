<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">Edit Task</h2>
        <button
          class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          @click="$emit('close')"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-4">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              id="title"
              ref="titleInput"
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task title..."
            >
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter task description..."
            />
          </div>

          <!-- Metadata -->
          <div class="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <span class="font-medium">Created:</span>
              {{ formatDate(task.createdAt) }}
            </div>
            <div>
              <span class="font-medium">Updated:</span>
              {{ formatDate(task.updatedAt) }}
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
          <button
            type="button"
            class="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
            @click="handleDelete"
          >
            Delete Task
          </button>
          
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              :disabled="!form.title.trim()"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types'

interface Props {
  task: Task
  listId: string
}

interface Emits {
  close: []
  update: [updates: Partial<Task>]
  delete: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const titleInput = ref<HTMLInputElement>()

const form = reactive({
  title: props.task.title,
  description: props.task.description || ''
})

const handleSubmit = () => {
  if (!form.title.trim()) return

  const updates: Partial<Task> = {
    title: form.title.trim(),
    description: form.description.trim() || undefined
  }

  emit('update', updates)
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this task?')) {
    emit('delete')
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Focus title input when modal opens
onMounted(() => {
  nextTick(() => {
    titleInput.value?.focus()
    titleInput.value?.select()
  })
})

// Handle escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
