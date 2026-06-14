/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      minHeight: {
        touch: '44px',
        'input-mobile': '48px',
      },
      colors: {
        /* Violeta Zola — primária (#6D5DFB) e secundária (#8B7DFF) */
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#8B7DFF',
          500: '#7a68fa',
          600: '#6D5DFB',
          700: '#5D4FE8',
          800: '#4c3ec4',
          900: '#3f349f',
          950: '#252055',
        },
        /* Lilás suave — estados positivos / verificado */
        sage: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a594ff',
          500: '#8B7DFF',
          600: '#7a68fa',
          700: '#6D5DFB',
          800: '#5D4FE8',
          900: '#4c3ec4',
        },
        /* Secundária / CTAs alternativos */
        accent: {
          50: '#f0eeff',
          100: '#e0dcff',
          200: '#c9bcff',
          300: '#a594ff',
          400: '#8B7DFF',
          500: '#7a68fa',
          600: '#6D5DFB',
          700: '#5D4FE8',
        },
        /* Superfícies claras */
        cream: {
          DEFAULT: '#FFFFFF',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
        },
        /* Textos — slate */
        ink: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
          light: '#94A3B8',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        graphite: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        navy: {
          900: '#1e1b4b',
          950: '#0f0d24',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        premium: '0 24px 64px -16px rgba(109, 93, 251, 0.18)',
        glow: '0 8px 32px -8px rgba(109, 93, 251, 0.28)',
        'glow-sm': '0 4px 20px -6px rgba(109, 93, 251, 0.22)',
        card: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(109, 93, 251, 0.1)',
        'card-hover': '0 12px 40px -12px rgba(109, 93, 251, 0.2)',
        warm: '0 8px 32px -8px rgba(139, 125, 255, 0.35)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6D5DFB 0%, #8B7DFF 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, rgba(109,93,251,0.08) 0%, rgba(139,125,255,0.12) 100%)',
        'gradient-hero-vivid': 'linear-gradient(135deg, #6D5DFB 0%, #8B7DFF 50%, #a594ff 100%)',
        'gradient-sage': 'linear-gradient(135deg, #8B7DFF 0%, #a594ff 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7a68fa 0%, #8B7DFF 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        'gradient-mesh':
          'radial-gradient(at 15% 20%, rgba(109,93,251,0.12) 0px, transparent 45%), radial-gradient(at 85% 15%, rgba(139,125,255,0.15) 0px, transparent 40%), radial-gradient(at 70% 80%, rgba(165,148,255,0.1) 0px, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        float: 'float 6s ease-in-out infinite',
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
