/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        catanRed: '#632828',
        catanRedHover: '#470A02',
        cream: '#FAEBD7',
        parchment: '#F7D98C',
        lightRed: '#B33C2E',
        goldYellow: '#FFD369',
      },
      fontFamily: {
        yatra: ['"Yatra One"', 'cursive'],
      }
    },
  },
  plugins: [],
}

