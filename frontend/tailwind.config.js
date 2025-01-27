/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "rgb(95 111 255)",
        "primary-pink": "#FF70AB",
        "secondary-pink": "rgb(255 112 171 / 10%)"
      },
       
      fontFamily: {
        "outfit":["Outfit",'sans-serif']
      }
    },
  },
  plugins: [],
  variants: {
    scrollbar: ['rounded']
  },
}