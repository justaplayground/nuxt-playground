<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="max-w-full">
        <h1 class="text-xl font-semibold text-gray-900">
          {{ store.getBoardTitle }}
        </h1>
      </div>
    </header>

    <!-- Board Content -->
    <main class="p-4">
      <div class="max-w-full">
        <div v-if="store.board" class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          <!-- Lists -->
          <TaMaList
            v-for="list in store.getLists"
            :key="list.id"
            :list="list"
            @add-task="handleAddTask"
            @update-task="handleUpdateTask"
            @delete-task="handleDeleteTask"
            @update-list="handleUpdateList"
            @delete-list="handleDeleteList"
          />

          <!-- Add List Button -->
          <div class="flex-shrink-0">
            <AddListForm @add-list="handleAddList" />
          </div>
        </div>

        <div v-else class="flex items-center justify-center h-64">
          <div class="text-white text-lg">Loading board...</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { List } from '~/types'
import { useHead } from 'nuxt/app'
import { onMounted } from 'vue'
import { useBoardStore } from '~/stores/board'

const store = useBoardStore()

// Initialize the board on mount
onMounted(() => {
  store.loadBoard()
})

const handleAddTask = (listId: string, title: string, description?: string) => {
  store.addTask(listId, title, description)
}

const handleUpdateTask = (listId: string, taskId: string, updates: any) => {
  store.updateTask(listId, taskId, updates)
}

const handleDeleteTask = (listId: string, taskId: string) => {
  store.deleteTask(listId, taskId)
}

const handleAddList = (title: string) => {
  store.addList(title)
}

const handleUpdateList = (listId: string, updates: Partial<List>) => {
  store.updateList(listId, updates)
}

const handleDeleteList = (listId: string) => {
  store.deleteList(listId)
}

useHead({
  title: 'TaMa - Task Management',
  meta: [
    {
      name: 'description',
      content: 'A modern ClickUp clone built with Nuxt v4.0, Vue 3, and Tailwind CSS',
    },
  ],
})
</script>
