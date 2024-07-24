/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C0C0C',
        secondary: '#1c1c22',
      },
    },
    container: {
      center: true,
      padding: "15px",

    },
    keyframes: {
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      'spin-slow': 'spin 2s linear infinite',
    },
  },
  plugins: [],
}