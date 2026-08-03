/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        display: ['Orbitron', 'system-ui', 'sans-serif'],
      },
      colors: {
        neon: {
          cyan: '#00f0ff',
          purple: '#bf00ff',
          green: '#39ff14',
          pink: '#ff003c',
          yellow: '#fcee0a',
        },
        ink: {
          900: '#070710',
          800: '#0d0d1a',
          700: '#141425',
          600: '#1c1c33',
          500: '#262644',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00f0ff, 0 0 20px rgba(0,240,255,0.35)',
        'neon-purple': '0 0 5px #bf00ff, 0 0 20px rgba(191,0,255,0.35)',
        'neon-green': '0 0 5px #39ff14, 0 0 20px rgba(57,255,20,0.3)',
        'neon-pink': '0 0 5px #ff003c, 0 0 20px rgba(255,0,60,0.35)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
