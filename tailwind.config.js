/** @type {import('tailwindcss').Config} */
const tokens = require('./src/theme/design-tokens.json');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.radii,
      boxShadow: {
        sm: tokens.shadows.sm,
        md: tokens.shadows.md,
        lg: tokens.shadows.lg,
      },
      fontFamily: {
        sans: tokens.fontFamilies.base,
        heading: tokens.fontFamilies.heading,
      },
      fontSize: tokens.fontSizes,
      fontWeight: tokens.fontWeights,
      lineHeight: tokens.lineHeights,
    },
  },
  plugins: [
    // inject global base styles
    function ({ addBase }) {
      addBase({
        'html, :host': {
          '-webkit-text-size-adjust': '100%',
          'text-size-adjust': '100%',
        },
      });
    }
  ],
};
