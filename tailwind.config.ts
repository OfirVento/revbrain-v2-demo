/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        severity: {
          info: 'hsl(var(--severity-info))',
          low: 'hsl(var(--severity-low))',
          medium: 'hsl(var(--severity-medium))',
          high: 'hsl(var(--severity-high))',
          critical: 'hsl(var(--severity-critical))',
        },
        confidence: {
          high: 'hsl(var(--confidence-high))',
          medium: 'hsl(var(--confidence-medium))',
          low: 'hsl(var(--confidence-low))',
          manual: 'hsl(var(--confidence-manual))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        hero: ['24px', { lineHeight: '1.5', fontWeight: '400' }],
        section: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.6' }],
        code: ['14px', { lineHeight: '1.6' }],
      },
      spacing: {
        '4.5': '18px',
        '18': '72px',
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '8px',
        xl: '12px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
