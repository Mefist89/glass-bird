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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          card: '#1e293b',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      // Добавляем кастомные стили для компонентов
      container: {
        center: true,
        padding: '1rem',
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.glass-effect': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': '16px',
        },
        '.input-glass': {
          'background': 'rgba(255, 255, 255, 0.05)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'border-radius': '12px',
          'padding': '12px 16px',
          'color': 'white',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.08)',
            'border-color': 'rgba(255, 255, 255, 0.3)',
          },
          '&:focus': {
            'outline': 'none',
            'border-color': 'rgba(59, 130, 246, 0.5)',
            'box-shadow': '0 0 0 3px rgba(59, 130, 246, 0.2)',
          }
        },
        '.btn-primary': {
          'background': 'linear-gradient(to right, #3b82f6, #2563eb)',
          'border': 'none',
          'border-radius': '12px',
          'color': 'white',
          'padding': '12px 24px',
          'font-weight': '600',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'transform': 'scale(1.02)',
            'box-shadow': '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
          },
          '&:disabled': {
            'opacity': '0.5',
            'cursor': 'not-allowed',
          }
        }
      })
    }
  ],
}