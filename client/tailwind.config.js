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
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-5px)' },
          '40%': { transform: 'translateX(5px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        floatScale: {
          '0%, 100%': { transform: 'translateY(0) scale(1.1)' },
          '50%': { transform: 'translateY(-3%) scale(1.1)' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
        'float-scale': 'floatScale 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

