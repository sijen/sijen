/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xdr: {
          bg: '#0A0F1A',
          'bg-alt': '#0A0F1A',
          panel: '#111827',
          border: '#1F2937',
          text: '#E5E7EB',
          muted: '#9CA3AF',
          critical: '#EF4444',
          high: '#F97316',
          medium: '#FACC15',
          low: '#22C55E',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'sev-pulse': 'sevPulse 2s infinite',
      },
      keyframes: {
        sevPulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};

