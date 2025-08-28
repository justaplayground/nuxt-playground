<template>
  <div class="w-80">
    <!-- Add List Button -->
    <button
      v-if="!isAdding"
      class="w-full p-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
      @click="startAdding"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      Add another list
    </button>

    <!-- Add List Form -->
    <div v-else class="bg-gray-100 rounded-lg p-4">
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <input
          ref="titleInput"
          v-model="title"
          type="text"
          placeholder="Enter list title..."
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >

        <div class="flex items-center gap-2">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            :disabled="!title.trim()"
          >
            Add List
          </button>
          <button
            type="button"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors"
            @click="cancelAdding"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  addList: [title: string]
}

const emit = defineEmits<Emits>()

const isAdding = ref(false)
const title = ref('')
const titleInput = ref<HTMLInputElement>()

const startAdding = () => {
  isAdding.value = true
  nextTick(() => {
    titleInput.value?.focus()
  })
}

const cancelAdding = () => {
  isAdding.value = false
  title.value = ''
}

const handleSubmit = () => {
  if (!title.value.trim()) return

  emit('addList', title.value.trim())
  title.value = ''
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
