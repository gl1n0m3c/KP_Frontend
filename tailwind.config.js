/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)',
        },
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: {
          DEFAULT: 'var(--color-text)',
          light: 'var(--color-text-light)',
        },
      },
      backgroundColor: {
        'primary-10': 'var(--color-primary-10)',
        'primary-20': 'var(--color-primary-20)',
        'primary-30': 'var(--color-primary-30)',
        'surface-80': 'var(--color-surface-80)',
      },
      borderColor: {
        'primary-20': 'var(--color-primary-20)',
      },
    },
  },
  plugins: [],
}
