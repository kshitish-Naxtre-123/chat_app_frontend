/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors : {
        primary : "#00acb4",
        secondary : "#058187",
        danger:"#FF003B",
        dangerBorder:"#FF4500",
        dangerHover:"#FF474C",
        success:"#4BB543"
      }
    },
  },
  plugins: [],
}

