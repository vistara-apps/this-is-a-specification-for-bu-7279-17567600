module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(216, 12%, 10%)',
        accent: 'hsl(120, 60%, 50%)',
        primary: 'hsl(210, 80%, 50%)',
        surface: 'hsl(216, 12%, 14%)',
        'text-primary': 'hsl(0, 0%, 95%)',
        'text-secondary': 'hsl(0, 0%, 75%)',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 12%, 8%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
        'slow': '300ms',
      },
      maxWidth: {
        'container': '36rem',
      },
    },
  },
  plugins: [],
}
