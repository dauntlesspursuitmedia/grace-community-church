/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        '"DM Sans Variable",ui-sans-serif, system-ui',
        {
          fontVariationSettings: "'opsz' 16",
        },
      ],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: "#595656",
      green: {
        DEFAULT: "#007C7C",
        dark: "#1E4141",
        light: "##00a8a5",
      },
      yellow: {
        DEFAULT: "#C7A700",
        lighter: "#efdb03",
        darker: "#a47d04",
      },
      cream: {
        DEFAULT: "#FBF6EE",
        dark: "#FFEDD3",
        darker: "##ce8341",
      },
      text: {
        light: "#fff",
        DEFAULT: "#595656",
        dark: "#000",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

