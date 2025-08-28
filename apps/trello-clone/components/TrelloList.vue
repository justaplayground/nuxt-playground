<template>
  <div class="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0 max-h-[calc(100vh-200px)] flex flex-col">
    <!-- List Header -->
    <div class="flex items-center justify-between mb-4">
      <h2 
        v-if="!isEditingTitle"
        class="font-semibold text-gray-800 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
        @click="startEditingTitle"
      >
        {{ list.title }}
      </h2>
      <input
        v-else
        ref="titleInput"
        v-model="editTitle"
        class="font-semibold text-gray-800 bg-white border border-blue-300 rounded px-2 py-1 flex-1 mr-2"
        @blur="saveTitle"
        @keyup.enter="saveTitle"
        @keyup.escape="cancelEditTitle"
      >
      
      <div class="flex items-center gap-1">
        <button
          class="text-gray-500 hover:text-red-600 p-1 rounded hover:bg-gray-200"
          @click="$emit('deleteList', list.id)"
          title="Delete list"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Tasks Container -->
    <div class="flex-1 overflow-y-auto custom-scrollbar">
      <div ref="tasksContainer" class="space-y-3 min-h-2">
        <TrelloTask
          v-for="(task, index) in list.tasks"
          :key="task.id"
          :task="task"
          :list-id="list.id"
          :index="index"
          @update-task="$emit('updateTask', list.id, task.id, $event)"
          @delete-task="$emit('deleteTask', list.id, task.id)"
        />
      </div>
    </div>

    <!-- Add Task Form -->
    <div class="mt-4">
      <AddTaskForm
        :list-id="list.id"
        @add-task="$emit('addTask', list.id, $event.title, $event.description)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { List } from '~/types'
import Sortable from 'sortablejs'

interface Props {
  list: List
}

interface Emits {
  addTask: [listId: string, title: string, description?: string]
  updateTask: [listId: string, taskId: string, updates: any]
  deleteTask: [listId: string, taskId: string]
  updateList: [listId: string, updates: Partial<List>]
  deleteList: [listId: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { moveTask } = useTrelloStore()

// Title editing
const isEditingTitle = ref(false)
const editTitle = ref('')
const titleInput = ref<HTMLInputElement>()

const startEditingTitle = () => {
  isEditingTitle.value = true
  editTitle.value = props.list.title
  nextTick(() => {
    titleInput.value?.focus()
    titleInput.value?.select()
  })
}

const saveTitle = () => {
  if (editTitle.value.trim() && editTitle.value.trim() !== props.list.title) {
    emit('updateList', props.list.id, { title: editTitle.value.trim() })
  }
  isEditingTitle.value = false
}

const cancelEditTitle = () => {
  isEditingTitle.value = false
  editTitle.value = props.list.title
}

// Drag and Drop
const tasksContainer = ref<HTMLElement>()

onMounted(() => {
  if (tasksContainer.value) {
    new Sortable(tasksContainer.value, {
      group: 'tasks',
      animation: 150,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      onEnd: (evt) => {
        const { item, to, from, oldIndex, newIndex } = evt
        
        if (oldIndex === undefined || newIndex === undefined) return
        
        const taskId = item.getAttribute('data-task-id')
        const fromListId = from.getAttribute('data-list-id')
        const toListId = to.getAttribute('data-list-id')
        
        if (taskId && fromListId && toListId) {
          moveTask(taskId, fromListId, toListId, newIndex)
        }
      }
    })
  }
})

// Set data attribute for sortable
onMounted(() => {
  if (tasksContainer.value) {
    tasksContainer.value.setAttribute('data-list-id', props.list.id)
  }
})
</script>
