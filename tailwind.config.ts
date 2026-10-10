import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * Nexzy dark glassmorphic theme.
 * If your existing config already extends fonts, plugins or content paths,
 * merge those entries into this file instead of replacing them.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B0F19',
          900: '#111827',
          800: '#18212F',
          700: '#243044',
          600: '#334155',
        },
        neon: {
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          glow: '#2CFF9A',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'app-gradient':
          'linear-gradient(160deg, #0B0F19 0%, #111827 52%, #0B0F19 100%)',
        'hero-aurora':
          'radial-gradient(60% 80% at 15% 20%, rgba(16,185,129,0.38) 0%, rgba(16,185,129,0) 60%), radial-gradient(50% 70% at 85% 10%, rgba(52,211,153,0.22) 0%, rgba(52,211,153,0) 60%), linear-gradient(135deg, #0B0F19 0%, #0f1f1d 55%, #111827 100%)',
        'hero-fade':
          'linear-gradient(180deg, rgba(11,15,25,0.25) 0%, rgba(11,15,25,0.55) 55%, rgba(11,15,25,0.92) 100%)',
        'glass-sheen':
          'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0) 100%)',
        'neon-sweep': 'linear-gradient(90deg, #10B981 0%, #34D399 55%, #A7F3D0 100%)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '18px',
        'glass-lg': '32px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        glow: '0 0 18px rgba(52, 211, 153, 0.55)',
        'glow-lg': '0 0 42px rgba(16, 185, 129, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(52, 211, 153, 0.0)' },
          '50%': { boxShadow: '0 0 28px 2px rgba(52, 211, 153, 0.35)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.glass-card': {
          backgroundColor: 'rgba(17, 24, 39, 0.55)',
          backgroundImage: theme('backgroundImage.glass-sheen'),
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: theme('borderRadius.2xl'),
          boxShadow: theme('boxShadow.glass'),
        },
        '.glass-strong': {
          backgroundColor: 'rgba(11, 15, 25, 0.78)',
          backdropFilter: 'blur(32px) saturate(150%)',
          WebkitBackdropFilter: 'blur(32px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
        },
        '.text-neon-gradient': {
          backgroundImage: theme('backgroundImage.neon-sweep'),
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        },
      });
    }),
  ],
};

export default config;
