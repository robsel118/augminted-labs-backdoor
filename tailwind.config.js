module.exports = {
  mode: "jit",
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        sorashima: 'url("/src/assets/sorashima.gif")',
        'gradient-black': 'linear-gradient(180deg,#000 0,#000 15vh,rgba(0,0,0,.212) 80vh,rgba(255,0,0,0) 100vh)'
      },
      fontFamily: {
        glitch: 'Hacked, serif'
      },
      colors: {
        "redioactive": "#ed3823",
        "green-corrosive": "#2bf586",
        color: '#858194'
      },
      backgroundColor: {
        panel: 'rgba(42,39,53,0.75)',
        "panel-brighter": '#3e3a498f'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
