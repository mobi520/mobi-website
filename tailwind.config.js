/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tea: {
          '50':  '#faf8f5',
          '100': '#f0ede6',
          '200': '#e0d9cb',
          '300': '#c8b9a3',
          '400': '#a08860',
          '500': '#8a7350',
          '600': '#6b5a3f',
          '700': '#554631',
          '800': '#453928',
          '900': '#3a2f21',
        },
        ink: {
          '50':  '#f4f4f5',
          '100': '#e2e2e6',
          '200': '#c5c5cd',
          '300': '#9f9fad',
          '400': '#7a7a8c',
          '500': '#5f5f6e',
          '600': '#4a4a56',
          '700': '#3a3a45',
          '800': '#2a2a35',
          '900': '#1a1a24',
        },
        warm: {
          'bg':    'var(--warm-bg)',
          'light': 'var(--warm-light)',
          'dark':  'var(--warm-dark)',
          'darker':'var(--warm-darker)',
          'mid':   'var(--warm-mid)',
          'gray':  'var(--warm-gray)',
          'muted': 'var(--warm-muted)',
          'warm':  'var(--warm-warm)',
          'warm-light': 'var(--warm-warm-light)',
          'accent': 'var(--warm-accent)',
        }
      },
      fontFamily: {
        sans: [
          'Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"',
          '"SF Pro Text"', '"PingFang SC"', '"Helvetica Neue"',
          'Helvetica', 'Arial', 'sans-serif'
        ],
        serif: [
          '"Cormorant Garamond"', '"Noto Serif SC"', '"Times New Roman"',
          'Georgia', 'ui-serif', 'serif'
        ],
        display: [
          '"Cormorant Garamond"', '"Noto Serif SC"', '"Times New Roman"',
          'Georgia', 'ui-serif', 'serif'
        ],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'magazine': '0.12em',
      },
      maxWidth: {
        'page': '1700px',
        'prose': '65ch',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
