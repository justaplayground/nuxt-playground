<template>
  <div>
    <!-- Add Task Button -->
    <button
      v-if="!isAdding"
      class="w-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors flex items-center justify-center gap-2 text-sm border border-dashed border-gray-300 hover:border-gray-400"
      @click="startAdding"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      Add a task
    </button>

    <!-- Add Task Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-2 p-2 bg-gray-50 rounded border border-gray-200">
      <div>
        <input
          ref="titleInput"
          v-model="form.title"
          type="text"
          placeholder="Enter task title..."
          required
          class="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
        >
      </div>
      
      <div>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Enter task description (optional)..."
          class="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-sm"
        />
      </div>

      <div class="flex items-center gap-2">
        <button
          type="submit"
          class="px-3 py-1.5 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
          :disabled="!form.title.trim()"
        >
          Add Task
        </button>
        <button
          type="button"
          class="px-3 py-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded text-sm transition-colors"
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
