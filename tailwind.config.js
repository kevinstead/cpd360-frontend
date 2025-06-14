/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { /* …your theme…*/ },
  plugins: [
    function({ addBase }) {
      addBase({
        'html, :host': {
          '-webkit-text-size-adjust': '100%',
          'text-size-adjust':         '100%',
        },
      });
    }
  ],
};
