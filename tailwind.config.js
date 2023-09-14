/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        redy: "#ED3C19",
        "redy-dark": "#BD2C0F",

        orangey: "#D95D39",
        "orangey-dark": "#AB3F21",
        "orangey-light": "#DE7254",

        yellowy: "#F9C926",
        "yellowy-dark": "#DBA906",
        "yellowy-light": "#FBD760",

        greeny: "#2E8269",
        "greeny-dark": "#205A4A",
        "greeny-darkest": "#0f2723",
        "greeny-darker": "#142926",
        "greeny-light": "#35977A",
        "greeny-lighter": "#69A197",

        whitey: "#D0DCDB",
        blacky: "#121211",
        "graye-lighter": "#D0DCDB",
        "graye-light": "#7DA19E",
        graye: "#455F5D",
        "graye-dark": "#2B3B3A",
        "graye-darker": "#242A2A",
        "graye-darkest": "#20221F",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
      },
      animation: {
        shake: "wiggle 500ms ease-in-out infinite",
      },
      backgroundImage: {
        guard: "url('/guard.avif')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
