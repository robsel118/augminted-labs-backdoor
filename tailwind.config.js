module.exports = {
  mode: "jit",
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundImage: {
      sorashima: 'url("/src/assets/sorashima.gif")',
      'gradient-black': 'linear-gradient(180deg,#000 0,#000 15vh,rgba(0,0,0,.212) 80vh,rgba(255,0,0,0) 100vh)'
    },
    extend: {
      colors: {
        "red": "#ed3823"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
