/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textShadow: {
        md: '2px 2px 4px rgb(0 0 0 / 45%);',
      },
      backgroundImage: {
        'gradient-to-b':
          'linear-gradient(to bottom,rgba(20,20,20, .65) 29%,rgba(20,20,20,.70) 44%,#141414 68%,#141414 100%);',
      },
    },
  },
  plugins: [require('tailwindcss-textshadow'), require('tailwind-scrollbar')],
};
