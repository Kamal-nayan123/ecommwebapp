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
          50: '#FFFFFF',
          100: '#F2F2F2',
          200: '#E6E6E6',
          300: '#D9D9D9',
          400: '#CCCCCC',
          500: '#BFBFBF',
          600: '#B3B3B3',
          700: '#A6A6A6',
          800: '#999999',
          900: '#8C8C8C',
        },
        secondary: {
          50: '#F5F5F5',
          100: '#EBEBEB',
          200: '#DCDCDC',
          300: '#C2C2C2',
          400: '#A8A8A8',
          500: '#8E8E8E',
          600: '#747474',
          700: '#5A5A5A',
          800: '#404040',
          900: '#262626',
        },
        accent: {
          50: '#FFF5E6',
          100: '#FFEBCC',
          200: '#FFE0B3',
          300: '#FFD699',
          400: '#FFCC80',
          500: '#FFC266',
          600: '#FFB84D',
          700: '#FFAE33',
          800: '#FFA31A',
          900: '#FF9900',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}