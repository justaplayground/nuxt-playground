<template>
  <div>
    <!-- Add Task Button -->
    <button
      v-if="!isAdding"
      class="w-full p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
      @click="startAdding"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      Add a task
    </button>

    <!-- Add Task Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-3">
      <div>
        <input
          ref="titleInput"
          v-model="form.title"
          type="text"
          placeholder="Enter task title..."
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
      </div>
      
      <div>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Enter task description (optional)..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div class="flex items-center gap-2">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          :disabled="!form.title.trim()"
        >
          Add Task
        </button>
        <button
          type="button"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          @click="cancelAdding"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  listId: string
}

interface Emits {
  addTask: [task: { title: string; description?: string }]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isAdding = ref(false)
const titleInput = ref<HTMLInputElement>()

const form = reactive({
  title: '',
  description: ''
})

const startAdding = () => {
  isAdding.value = true
  nextTick(() => {
    titleInput.value?.focus()
  })
}

const cancelAdding = () => {
  isAdding.value = false
  resetForm()
}

const resetForm = () => {
  form.title = ''
  form.description = ''
}

const handleSubmit = () => {
  if (!form.title.trim()) return

  emit('addTask', {
    title: form.title.trim(),
    description: form.description.trim() || undefined
  })

  resetForm()
  isAdding.value = false
}

// Handle escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isAdding.value) {
    cancelAdding()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
