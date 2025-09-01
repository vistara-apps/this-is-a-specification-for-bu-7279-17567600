module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(216, 12%, 10%)',
        'bg-lighter': 'hsl(216, 12%, 13%)',
        accent: 'hsl(120, 60%, 50%)',
        'accent-light': 'hsl(120, 60%, 60%)',
        'accent-dark': 'hsl(120, 60%, 40%)',
        primary: 'hsl(210, 80%, 50%)',
        'primary-light': 'hsl(210, 80%, 60%)',
        'primary-dark': 'hsl(210, 80%, 40%)',
        surface: 'hsl(216, 12%, 14%)',
        'surface-light': 'hsl(216, 12%, 18%)',
        'surface-dark': 'hsl(216, 12%, 12%)',
        'text-primary': 'hsl(0, 0%, 95%)',
        'text-secondary': 'hsl(0, 0%, 75%)',
        'text-tertiary': 'hsl(0, 0%, 55%)',
        error: 'hsl(0, 70%, 60%)',
        warning: 'hsl(40, 80%, 60%)',
        success: 'hsl(120, 60%, 50%)',
      },
      spacing: {
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '1rem',       // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '2.5rem',    // 40px
        '3xl': '3rem',      // 48px
      },
      borderRadius: {
        'xs': '0.125rem',   // 2px
        'sm': '0.25rem',    // 4px
        'md': '0.5rem',     // 8px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 12%, 8%, 0.1)',
        'card-hover': '0 6px 16px hsla(210, 12%, 8%, 0.15)',
        'dropdown': '0 8px 24px hsla(210, 12%, 8%, 0.2)',
        'button': '0 2px 6px hsla(210, 12%, 8%, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'slide-down': 'slideDown 200ms ease-in-out',
        'slide-in-right': 'slideInRight 200ms ease-in-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 1s ease-in-out infinite',
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
        'slow': '300ms',
      },
      maxWidth: {
        'container': '36rem',
        'container-sm': '30rem',
        'container-lg': '42rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
    },
  },
  plugins: [],
}
