/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d5fe',
          300: '#a4b8fc',
          400: '#8093f7',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#1e2a5a',
          900: '#121a36',
          950: '#070b14',
        },
        graphite: {
          50: '#f8f9fb',
          100: '#f1f3f7',
          200: '#e4e8ef',
          300: '#cdd4df',
          400: '#9aa3b5',
          500: '#6b7385',
          600: '#4f5668',
          700: '#3d4352',
          800: '#2a2f3a',
          900: '#1a1e27',
          950: '#0f1218',
        },
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        accent: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        premium: '0 24px 64px -12px rgba(15, 23, 42, 0.18)',
        glow: '0 0 0 1px rgba(6, 182, 212, 0.08), 0 8px 32px -8px rgba(6, 182, 212, 0.35)',
        'glow-sm': '0 0 0 1px rgba(6, 182, 212, 0.12), 0 4px 16px -4px rgba(6, 182, 212, 0.25)',
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.08)',
        'card-dark': '0 1px 2px rgba(0, 0, 0, 0.2), 0 12px 32px -12px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0891b2 0%, #6366f1 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(8,145,178,0.12) 0%, rgba(99,102,241,0.12) 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(6,182,212,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(99,102,241,0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(8,145,178,0.08) 0px, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.45s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
