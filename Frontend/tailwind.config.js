/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        'ls': '1000px',
        'ms': '950px',
        'mk': '900px',
        'ma': '850px',
        'mq': '700px',
        'mm': '500px',
        'sd': '450px',
        'sk': '400px',
        'sr': '350px',
      }
    },
  },
  plugins: [],
}