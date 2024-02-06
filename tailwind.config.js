/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        hpDarkBlue: '#0082C4',
        hpWhiteBlue: '#BCF7FF',
        hpLightBlue: '#00A3FF',
        hpBlue: '#00A3FF',
        hpGray: '#BCBCBC',
        hpLightGray: '#F6F6F6',
        hpLightkGray: '#3E3E3E',
        hpBlack: '#000000',
        hpRed: '#C4002F',
        hpLightRed: '#C4002F',
      },
    },
  },
  plugins: [],
};
