# 📋 TaMa - Task Management App

A modern, responsive ClickUp-like task management application built with Nuxt 3, Vue 3, and Tailwind CSS. Features drag-and-drop functionality, local storage persistence, and a beautiful modern UI.

![TaMa](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js&logoColor=white) ![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎯 **Core Functionality**
- **📝 Task Management**: Create, edit, delete, and organize tasks
- **📋 List Management**: Create multiple lists to organize your workflow
- **🎯 Drag & Drop**: Intuitive drag-and-drop interface for moving tasks between lists
- **💾 Data Persistence**: All data is automatically saved to localStorage
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 **User Interface**
- **Modern Design**: Clean, professional interface inspired by TaMa
- **Smooth Animations**: Polished transitions and hover effects
- **Modal Editing**: Full-featured task editing with title and description
- **Visual Feedback**: Clear indicators during drag operations
- **Custom Scrollbars**: Enhanced scrolling experience

### 🛠️ **Technical Features**
- **TypeScript**: Full type safety throughout the application
- **Component-Based**: Modular Vue 3 components for maintainability
- **Client-Side Only**: No authentication required, pure frontend app
- **Hot Reload**: Fast development with Vite and Nuxt 3

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd tama
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` (or `http://localhost:3001` if port 3000 is busy)

## 🎮 How to Use

### Getting Started
1. **First Visit**: The app loads with a sample board containing example tasks
2. **Add Tasks**: Click the "+ Add a task" button in any list
3. **Edit Tasks**: Click on any task card to open the edit modal
4. **Move Tasks**: Drag and drop tasks between different lists
5. **Manage Lists**: Click on list titles to edit them, or use the delete button

### Task Management
- **Create**: Use the "Add a task" button at the bottom of any list
- **Edit**: Click on any task to open the detailed edit modal
- **Delete**: Use the delete button in the task modal or task card
- **Move**: Drag tasks between lists for workflow management

### List Management
- **Create**: Click "Add another list" to create new columns
- **Edit**: Click on any list title to rename it
- **Delete**: Use the delete button in the list header

## 🏗️ Project Structure

```
tama/
├── app/
│   ├── assets/css/main.css          # Global styles and Tailwind config
│   └── app.vue                      # Root application component
├── components/
│   ├── TaMaList.vue              # List container with drag-drop
│   ├── TaMaTask.vue              # Individual task card
│   ├── TaskModal.vue               # Task editing modal
│   ├── AddTaskForm.vue             # Task creation form
│   └── AddListForm.vue             # List creation form
├── composables/
│   └── useTaMaStore.ts           # State management and localStorage
├── pages/
│   └── index.vue                   # Main board page
├── types/
│   └── index.ts                    # TypeScript type definitions
├── nuxt.config.ts                  # Nuxt configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── package.json                    # Dependencies and scripts
```

## 🛠️ Built With

### Core Technologies
- **[Nuxt 3](https://nuxt.com/)** - The Intuitive Vue Framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript Framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type Safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-First CSS Framework

### Key Libraries
- **[SortableJS](https://sortablejs.github.io/Sortable/)** - Drag and drop functionality
- **[VueUse](https://vueuse.org/)** - Vue composition utilities
- **[@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)** - Form styling
- **[@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)** - Typography utilities

## 📦 Available Scripts

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm generate     # Generate static site
```

### Maintenance
```bash
pnpm postinstall  # Prepare Nuxt (runs automatically after install)
```

## 🎨 Customization

### Styling
- **Colors**: Modify the gradient background in `pages/index.vue`
- **Components**: Update component styles in individual `.vue` files
- **Global Styles**: Edit `app/assets/css/main.css` for global changes
- **Tailwind Config**: Customize `tailwind.config.js` for theme modifications

### Functionality
- **Data Structure**: Modify types in `types/index.ts`
- **Storage Logic**: Update `composables/useTaMaStore.ts` for different storage solutions
- **Drag Behavior**: Customize SortableJS options in `components/TaMaList.vue`

## 🔧 Configuration

### Nuxt Configuration
The app is configured for client-side rendering to support localStorage:
```typescript
export default defineNuxtConfig({
  ssr: false, // Required for localStorage
  css: ['@/assets/css/main.css'],
  modules: ['@vueuse/nuxt']
})
```

### Tailwind Configuration
Custom configuration includes forms and typography plugins for enhanced styling.

## 🚀 Deployment

### Static Generation
```bash
pnpm generate
```
Deploy the `dist/` folder to any static hosting service.

### Server Deployment
```bash
pnpm build
```
Deploy the `.output/` folder to any Node.js hosting service.

### Recommended Platforms
- **Netlify** - Perfect for static deployment
- **Vercel** - Excellent for both static and server deployment
- **GitHub Pages** - Free static hosting
- **Railway** - Simple server deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] **User Authentication** - Add user accounts and board sharing
- [ ] **Real-time Collaboration** - Multiple users editing simultaneously
- [ ] **Due Dates** - Add deadline tracking for tasks
- [ ] **Labels & Tags** - Categorize tasks with colored labels
- [ ] **File Attachments** - Attach files to tasks
- [ ] **Board Templates** - Pre-built board layouts
- [ ] **Dark Mode** - Theme switching capability
- [ ] **Mobile App** - Native mobile applications
- [ ] **API Integration** - Backend service for data persistence
- [ ] **Export/Import** - Backup and restore functionality

## 🐛 Known Issues

- CSS warnings during build (cosmetic only, doesn't affect functionality)
- PostCSS config warning (can be safely ignored)

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Nuxt 3 documentation](https://nuxt.com/docs)
2. Review the [Vue 3 documentation](https://vuejs.org/guide/)
3. Create an issue in this repository

---

**Happy Task Managing! 🎉**

Built with ❤️ using Nuxt 3, Vue 3, and Tailwind CSS.