/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Include the correct paths
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#8A2BE2', // Primary color for buttons
        'secondary-color': '#BF94E4', // Secondary gradient
      },
    },
  },
  plugins: [],
};