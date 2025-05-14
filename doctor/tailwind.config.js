/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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