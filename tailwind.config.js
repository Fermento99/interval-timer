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
        exercise: {
          green: '#629460',
          red: '#ED254E',
        },
        text: {
          primary: '#000000',
          secondary: '#757575',
        },
      },
      fontFamily: {
        monospace: ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
