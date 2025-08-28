<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
    <!-- Header -->
    <header class="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-white">
          {{ board?.title || 'Loading...' }}
        </h1>
      </div>
    </header>

    <!-- Board Content -->
    <main class="p-6">
      <div class="max-w-7xl mx-auto">
        <div v-if="board" class="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
          <!-- Lists -->
          <TrelloList
            v-for="list in board.lists"
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

const { 
  board, 
  addTask, 
  updateTask, 
  deleteTask, 
  addList, 
  updateList, 
  deleteList 
} = useTrelloStore()

const handleAddTask = (listId: string, title: string, description?: string) => {
  addTask(listId, title, description)
}

const handleUpdateTask = (listId: string, taskId: string, updates: any) => {
  updateTask(listId, taskId, updates)
}

const handleDeleteTask = (listId: string, taskId: string) => {
  deleteTask(listId, taskId)
}

const handleAddList = (title: string) => {
  addList(title)
}

const handleUpdateList = (listId: string, updates: Partial<List>) => {
  updateList(listId, updates)
}

const handleDeleteList = (listId: string) => {
  deleteList(listId)
}

useHead({
  title: 'Trello Clone - Task Management',
  meta: [
    {
      name: 'description',
      content: 'A modern Trello clone built with Nuxt 3, Vue 3, and Tailwind CSS'
    }
  ]
})
</script>
