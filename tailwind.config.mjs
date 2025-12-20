/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      // Configuración de accesibilidad
      screens: {
        'reduce-motion': { 'raw': '(prefers-reduced-motion: reduce)' },
        'high-contrast': { 'raw': '(prefers-contrast: high)' },
      },
      // Colores con mejor contraste
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        }
      },
      // Transiciones que respetan reduced motion
      transitionDuration: {
        'reduced': '0.01ms',
      },
      // Focus ring personalizado
      ringWidth: {
        'focus': '2px',
      },
      ringColor: {
        'focus': '#ffffff',
      },
      ringOffsetWidth: {
        'focus': '2px',
      },
    },
  },
  plugins: [
    // Plugin personalizado para accesibilidad
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.focus-visible': {
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.white')}`,
            outlineOffset: '2px',
          },
        },
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        },
        '.not-sr-only': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: 'inherit',
          margin: 'inherit',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
        // Utilidades para motion reducido
        '@media (prefers-reduced-motion: reduce)': {
          '.motion-reduce': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
          },
        },
        // Utilidades para alto contraste
        '@media (prefers-contrast: high)': {
          '.high-contrast': {
            '--tw-border-opacity': '1',
            borderColor: 'rgb(255 255 255 / var(--tw-border-opacity))',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}