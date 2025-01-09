/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'ls': '1000px',
        'ms': '950px',
        'mk': '900px',
        'ma': '850px',
        'mq': '700px',
        'mp': '600px',
        'mm': '500px',
        'sd': '450px',
        'sk': '400px',
        'sr': '350px',
      }
    },
  },
  plugins: [],
}

