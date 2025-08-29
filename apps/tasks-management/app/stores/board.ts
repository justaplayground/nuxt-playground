import { defineStore } from 'pinia'
import type { Board, List, Task } from '@/types'

const STORAGE_KEY = 'tama-board'

export const useBoardStore = defineStore('board', {
  state: () => ({
    board: null as Board | null,
  }),

  getters: {
    getBoardTitle: (state) => state.board?.title || 'Loading...',
    getLists: (state) => state.board?.lists || [],
    getListById: (state) => (listId: string) => state.board?.lists.find((list) => list.id === listId),
    getTaskById: (state) => (listId: string, taskId: string) => {
      const list = state.board?.lists.find((l) => l.id === listId)
      return list?.tasks.find((task) => task.id === taskId)
    },
  },

  actions: {
    // Initialize board with default data
    initializeBoard() {
      const defaultBoard: Board = {
        id: 'board-1',
        title: 'My TaMa Board',
        lists: [
          {
            id: 'list-1',
            title: 'To Do',
            tasks: [
              {
                id: 'task-1',
                title: 'Welcome to TaMa!',
                description: 'This is your first task. You can edit, delete, or drag it around.',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              {
                id: 'task-2',
                title: 'Add more tasks',
                description: 'Click the + button to add more tasks to your lists.',
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'list-2',
            title: 'In Progress',
            tasks: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'list-3',
            title: 'Done',
            tasks: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      this.board = defaultBoard
      this.saveBoard()
    },

    // Load board from localStorage
    loadBoard() {
      if (process.client) {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            const parsedBoard = JSON.parse(stored)
            // Convert date strings back to Date objects
            parsedBoard.createdAt = new Date(parsedBoard.createdAt)
            parsedBoard.updatedAt = new Date(parsedBoard.updatedAt)
            parsedBoard.lists = parsedBoard.lists.map((list: any) => ({
              ...list,
              createdAt: new Date(list.createdAt),
              updatedAt: new Date(list.updatedAt),
              tasks: list.tasks.map((task: any) => ({
                ...task,
                createdAt: new Date(task.createdAt),
                updatedAt: new Date(task.updatedAt),
              })),
            }))
            this.board = parsedBoard
          } catch (error) {
            console.error('Error parsing stored board:', error)
            this.initializeBoard()
          }
        } else {
          this.initializeBoard()
        }
      }
    },

    // Save board to localStorage
    saveBoard() {
      if (process.client && this.board) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.board))
      }
    },

    // Add new task to a list
    addTask(listId: string, title: string, description?: string) {
      if (!this.board) return

      const list = this.board.lists.find((l) => l.id === listId)
      if (!list) return

      const newTask: Task = {
        id: `task-${Date.now()}`,
        title,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      list.tasks.push(newTask)
      list.updatedAt = new Date()
      this.board.updatedAt = new Date()
      this.saveBoard()
    },

    // Update task
    updateTask(listId: string, taskId: string, updates: Partial<Task>) {
      if (!this.board) return

      const list = this.board.lists.find((l) => l.id === listId)
      if (!list) return

      const task = list.tasks.find((t) => t.id === taskId)
      if (!task) return

      Object.assign(task, updates, { updatedAt: new Date() })
      list.updatedAt = new Date()
      this.board.updatedAt = new Date()
      this.saveBoard()
    },

    // Delete task
    deleteTask(listId: string, taskId: string) {
      if (!this.board) return

      const list = this.board.lists.find((l) => l.id === listId)
      if (!list) return

      const taskIndex = list.tasks.findIndex((t) => t.id === taskId)
      if (taskIndex === -1) return

      list.tasks.splice(taskIndex, 1)
      list.updatedAt = new Date()
      this.board.updatedAt = new Date()
      this.saveBoard()
    },

    // Move task between lists
    moveTask(taskId: string, fromListId: string, toListId: string, newIndex: number) {
      if (!this.board) return

      const fromList = this.board.lists.find((l) => l.id === fromListId)
      const toList = this.board.lists.find((l) => l.id === toListId)

      if (!fromList || !toList) return

      const taskIndex = fromList.tasks.findIndex((t) => t.id === taskId)
      if (taskIndex === -1) return

      const [task] = fromList.tasks.splice(taskIndex, 1)
      if (!task) return

      task.updatedAt = new Date()
      toList.tasks.splice(newIndex, 0, task)

      fromList.updatedAt = new Date()
      toList.updatedAt = new Date()
      this.board.updatedAt = new Date()
      this.saveBoard()
    },

    // Add new list
    addList(title: string) {
      if (!this.board) return

      const newList: List = {
        id: `list-${Date.now()}`,
        title,
        tasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      this.board.lists.push(newList)
      this.board.updatedAt = new Date()
      this.saveBoard()
    },

    // Update list
    updateList(listId: string, updates: Partial<List>) {
      if (!this.board) return

      const list = this.board.lists.find((l) => l.id === listId)
      if (!list) return

      Object.assign(list, updates, { updatedAt: new Date() })
      this.board.updatedAt = new Date()
      this.saveBoard()
    },

    // Delete list
    deleteList(listId: string) {
      if (!this.board) return

      const listIndex = this.board.lists.findIndex((l) => l.id === listId)
      if (listIndex === -1) return

      this.board.lists.splice(listIndex, 1)
      this.board.updatedAt = new Date()
      this.saveBoard()
    },
  },
})
