/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./src/**/*.{html,js}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        special: {
          DEFAULT: '#ffd23f',
        },
      },
      fontFamily: {
        monospace: ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
