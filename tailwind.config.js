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
      animation: {
        tilt: 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
      },
      fontFamily: {
        glitch: 'Hacked, serif'
      },
      colors: {
        "redioactive": "#ed3823",
        "green-corrosive": "#2bf586"
      },
      backgroundColor: {
        panel: 'rgba(42,39,53,0.75)'
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
