/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./components/**/*.{html,js}",
  ],
  theme: {
    colors: {
      Light: "hsl(0, 0%, 98%)",
      Dark: "hsl(207, 26%, 17%)",
      white: "hsl(0, 0%, 100%)",
      blue: "hsl(209, 23%, 22%)",
      darkBlue: "hsl(200, 15%, 8%)",
      darkGrey: " hsl(0, 0%, 52%)",
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
    },
    fontSize: {
      bigTitle: "2rem",
      smallTitle: "1.6rem",
      normal: "1rem",
    },
    fontWeight: {
      bold: 800,
      regular: 600,
      light: 300,
    },
    extend: {},
  },
  plugins: [],
};
