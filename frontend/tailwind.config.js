/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', // Path to your source files
    './frontend/index.html', 
  ],
  theme: {
    extend: {
      colors: {
        primary: '',
        secondary: {
          100: '',
          200: '',
        }
      }
    },
  },
  plugins: [],
}

