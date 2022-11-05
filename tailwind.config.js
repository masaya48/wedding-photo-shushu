/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-main': '/bg-main.JPG'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
