/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#1E40AF", // Use your desired blue color here
        "primary-pink": "#FF70AB",
        "secondary-pink": "rgb(255 112 171 / 10%)",
      },

      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
  variants: {
    scrollbar: ["rounded"],
  },
};
