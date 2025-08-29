import { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Using built-in emerald as our primary theme color
        // All components now use emerald-* classes directly
      }
    },
  },
  plugins: [],
}
