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
        hpLightkBlack: '#3E3E3E',
        hpBlack: '#000000',
        hpRed: '#C4002F',
        hpLightRed: '#C4002F',
        hpHoverLightGray: '#E9E9E9',
        hpClickedWhiteBlue: '#6ED1DE',
      },
    },
  },
  plugins: [],
};
