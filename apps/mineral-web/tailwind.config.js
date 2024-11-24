const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./components/**/*.{js,tsx}', './pages/**/*.{js,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', ...fontFamily.sans],
      mono: ['var(--font-my-mono)', ...fontFamily.mono],
      sans2: ['var(--font-sans-2)'],
      sans3: ['var(--font-sans-3)'],
      sans4: ['var(--font-sans-4)'],
    },
    extend: {
      colors: {
        primary: {
          100: '#F3F4F6',
        },
        gray: colors.neutral,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
