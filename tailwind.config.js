/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '120vh': '120vh',  // Add custom height of 120vh
      },
    },
  },
  plugins: [],
}