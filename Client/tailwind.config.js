/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
          "dark-brown":"#65483D",
          "light-brown": "#9E8279",
          "gold":"#FDBF6E",
          "dull-grey":"#564C55",
          "mystic":"#FF0490"
      }
    },
  },
  plugins: [],
}