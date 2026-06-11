/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Azul Petróleo — confiança */
        brand: {
          50: '#eef3f9',
          100: '#d9e4f2',
          200: '#b3c9e5',
          300: '#8aadc8',
          400: '#5d89ae',
          500: '#3d6894',
          600: '#2B4C7E',
          700: '#243f68',
          800: '#1e3558',
          900: '#172a47',
          950: '#0f1c30',
        },
        /* Verde Sálvia — bem-estar */
        sage: {
          50: '#f2f8f3',
          100: '#e0efe1',
          200: '#c3dfc5',
          300: '#9bc49e',
          400: '#7BAE7F',
          500: '#5f9163',
          600: '#4a7550',
          700: '#3d5f42',
          800: '#334d37',
          900: '#2b402f',
        },
        /* Amarelo Suave — CTA */
        accent: {
          50: '#fef9e8',
          100: '#fdf0c4',
          200: '#fbe596',
          300: '#f7d666',
          400: '#F2C94C',
          500: '#e0b428',
          600: '#c4921a',
          700: '#a37418',
        },
        /* Off-white acolhedor */
        cream: {
          DEFAULT: '#F7F2E8',
          50: '#FDFBF7',
          100: '#F7F2E8',
          200: '#EBE4D8',
          300: '#DDD4C4',
        },
        /* Textos */
        ink: {
          DEFAULT: '#2D3748',
          muted: '#4A5568',
          light: '#718096',
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1a202c',
          900: '#171923',
        },
        /* Legado — compat dark mode */
        graphite: {
          50: '#f7fafc',
          100: '#edf2f7',
          200: '#e2e8f0',
          300: '#cbd5e0',
          400: '#a0aec0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1a202c',
          900: '#171923',
        },
        navy: {
          900: '#172a47',
          950: '#0f1c30',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        premium: '0 24px 64px -16px rgba(43, 76, 126, 0.18)',
        glow: '0 8px 32px -8px rgba(43, 76, 126, 0.25)',
        'glow-sm': '0 4px 20px -6px rgba(43, 76, 126, 0.2)',
        card: '0 1px 3px rgba(43, 76, 126, 0.06), 0 8px 24px -8px rgba(43, 76, 126, 0.1)',
        'card-hover': '0 12px 40px -12px rgba(43, 76, 126, 0.18)',
        warm: '0 8px 32px -8px rgba(242, 201, 76, 0.35)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #2B4C7E 0%, #3d6894 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(43,76,126,0.08) 0%, rgba(123,174,127,0.12) 100%)',
        'gradient-hero-vivid':
          'linear-gradient(135deg, #2B4C7E 0%, #3d6894 45%, #5f9163 100%)',
        'gradient-sage': 'linear-gradient(135deg, #7BAE7F 0%, #9bc49e 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F2C94C 0%, #f7d666 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(247,242,232,0) 0%, rgba(247,242,232,1) 100%)',
        'gradient-mesh':
          'radial-gradient(at 15% 20%, rgba(123,174,127,0.35) 0px, transparent 45%), radial-gradient(at 85% 15%, rgba(242,201,76,0.25) 0px, transparent 40%), radial-gradient(at 70% 80%, rgba(43,76,126,0.2) 0px, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
