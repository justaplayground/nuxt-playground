import type { Board, List, Task } from '~/types'

const STORAGE_KEY = 'trello-board'

export const useTrelloStore = () => {
  const board = ref<Board | null>(null)

  // Initialize board with default data
  const initializeBoard = () => {
    const defaultBoard: Board = {
      id: 'board-1',
      title: 'My Trello Board',
      lists: [
        {
          id: 'list-1',
          title: 'To Do',
          tasks: [
            {
              id: 'task-1',
              title: 'Welcome to Trello Clone!',
              description: 'This is your first task. You can edit, delete, or drag it around.',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: 'task-2',
              title: 'Add more tasks',
              description: 'Click the + button to add more tasks to your lists.',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'list-2',
          title: 'In Progress',
          tasks: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'list-3',
          title: 'Done',
          tasks: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    board.value = defaultBoard
    saveBoard()
  }

  // Load board from localStorage
  const loadBoard = () => {
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
              updatedAt: new Date(task.updatedAt)
            }))
          }))
          board.value = parsedBoard
        } catch (error) {
          console.error('Error parsing stored board:', error)
          initializeBoard()
        }
      } else {
        initializeBoard()
      }
    }
  }

  // Save board to localStorage
  const saveBoard = () => {
    if (process.client && board.value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board.value))
    }
  }

  // Add new task to a list
  const addTask = (listId: string, title: string, description?: string) => {
    if (!board.value) return

    const list = board.value.lists.find(l => l.id === listId)
    if (!list) return

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    list.tasks.push(newTask)
    list.updatedAt = new Date()
    board.value.updatedAt = new Date()
    saveBoard()
  }

  // Update task
  const updateTask = (listId: string, taskId: string, updates: Partial<Task>) => {
    if (!board.value) return

    const list = board.value.lists.find(l => l.id === listId)
    if (!list) return

    const task = list.tasks.find(t => t.id === taskId)
    if (!task) return

    Object.assign(task, updates, { updatedAt: new Date() })
    list.updatedAt = new Date()
    board.value.updatedAt = new Date()
    saveBoard()
  }

  // Delete task
  const deleteTask = (listId: string, taskId: string) => {
    if (!board.value) return

    const list = board.value.lists.find(l => l.id === listId)
    if (!list) return

    const taskIndex = list.tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) return

    list.tasks.splice(taskIndex, 1)
    list.updatedAt = new Date()
    board.value.updatedAt = new Date()
    saveBoard()
  }

  // Move task between lists
  const moveTask = (taskId: string, fromListId: string, toListId: string, newIndex: number) => {
    if (!board.value) return

    const fromList = board.value.lists.find(l => l.id === fromListId)
    const toList = board.value.lists.find(l => l.id === toListId)
    
    if (!fromList || !toList) return

    const taskIndex = fromList.tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) return

    const task = fromList.tasks.splice(taskIndex, 1)[0]
    task.updatedAt = new Date()
    
    toList.tasks.splice(newIndex, 0, task)
    
    fromList.updatedAt = new Date()
    toList.updatedAt = new Date()
    board.value.updatedAt = new Date()
    saveBoard()
  }

  // Add new list
  const addList = (title: string) => {
    if (!board.value) return

    const newList: List = {
      id: `list-${Date.now()}`,
      title,
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    board.value.lists.push(newList)
    board.value.updatedAt = new Date()
    saveBoard()
  }

  // Update list
  const updateList = (listId: string, updates: Partial<List>) => {
    if (!board.value) return

    const list = board.value.lists.find(l => l.id === listId)
    if (!list) return

    Object.assign(list, updates, { updatedAt: new Date() })
    board.value.updatedAt = new Date()
    saveBoard()
  }

  // Delete list
  const deleteList = (listId: string) => {
    if (!board.value) return

    const listIndex = board.value.lists.findIndex(l => l.id === listId)
    if (listIndex === -1) return

    board.value.lists.splice(listIndex, 1)
    board.value.updatedAt = new Date()
    saveBoard()
  }

  // Initialize on first load
  onMounted(() => {
    loadBoard()
  })

  return {
    board: readonly(board),
    loadBoard,
    saveBoard,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addList,
    updateList,
    deleteList
  }
}
