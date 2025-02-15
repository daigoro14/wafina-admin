/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.vue',      // Include all Vue files in pages
    './components/**/*.vue', // Include all Vue files in components
    './layouts/**/*.vue',    // Include all Vue files in layouts
    './composables/**/*.js', // Include JavaScript files (if needed)
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Lilita One"', 'serif'], // Set Lilita One as the default font
      },
    },
  },
  plugins: [],
}

