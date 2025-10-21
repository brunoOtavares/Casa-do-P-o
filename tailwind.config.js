/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f3',
          100: '#f9ede3',
          200: '#f2d9c4',
          300: '#e8bf9a',
          400: '#dda270', // Marrom caramelo quente
          500: '#d48850',
          600: '#c87344',
          700: '#a75e3a',
          800: '#854d33',
          900: '#6d402b',
        },
        secondary: {
          50: '#fefbf5',
          100: '#fdf6e8',
          200: '#faebcc',
          300: '#f6dda3',
          400: '#f0c96d', // Dourado creme quente
          500: '#e8b647',
          600: '#d49f2f',
          700: '#b18228',
          800: '#8f6826',
          900: '#765623',
        },
        accent: {
          50: '#faf7f3',
          100: '#f5ede5',
          200: '#e9d7c6',
          300: '#dabca0',
          400: '#c89d75', // Creme bege
          500: '#b8865a',
          600: '#a6724e',
          700: '#8a5e42',
          800: '#704e39',
          900: '#5c4130',
        },
        warm: {
          cream: '#FFF8F0', // Creme claro
          sand: '#F5E6D3',  // Areia
          toast: '#E8D5C4', // Torrada
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
