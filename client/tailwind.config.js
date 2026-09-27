/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F6F2',
        ink: '#181B22',
        navy: {
          DEFAULT: '#1F3A5F',
          dark: '#152A47',
          light: '#3A5A82',
        },
        amber: {
          DEFAULT: '#F2A03D',
          dark: '#D98826',
        },
        mist: '#E4E1D9',
        emerald: {
          DEFAULT: '#2D6A4F',
          light: '#40916C',
          dark: '#1B4332',
        },
        rose: {
          DEFAULT: '#E76F51',
          dark: '#C0503A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(242,160,61,0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(242,160,61,0.4)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 10px rgba(242,160,61,0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(242,160,61,0.6)' },
        },
      },
    },
  },
  plugins: [],
};