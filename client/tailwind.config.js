/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "protest": ["Protest Revolution", "sans-serif"],
      },
      colors : {
        white: "#FFFFFF",
        black: "#24282f"
      }
    },
  },
  plugins: [],
}