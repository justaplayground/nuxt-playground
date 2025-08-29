<template>
  <div class="w-72">
    <!-- Add List Button -->
    <button
      v-if="!isAdding"
      class="w-full p-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
      @click="startAdding"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      Add another list
    </button>

    <!-- Add List Form -->
    <div v-else class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <input
          ref="titleInput"
          v-model="title"
          type="text"
          placeholder="Enter list title..."
          required
          class="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
        >

        <div class="flex items-center gap-2">
          <button
            type="submit"
            class="px-3 py-1.5 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
            :disabled="!title.trim()"
          >
            Add List
          </button>
          <button
            type="button"
            class="px-3 py-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded text-sm transition-colors"
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
