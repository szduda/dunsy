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
        "redy-light": "#EE4F2F",

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
        sway: {
          "0%, 100%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
        dundun: {
          "0%": { transform: "scale(1)" },
          "12.5%": { transform: "scale(0.975)" },
          "25%": { transform: "scale(1)" },
          "37.5%": { transform: "scale(0.98)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
        djembe: {
          "0%": { transform: "rotate(-4deg)" },
          "6.25%": { transform: "rotate(0)" },
          "31.25%": { transform: "rotate(0)" },
          "37.5%": { transform: "rotate(4deg)" },
          "50%": { transform: "rotate(-4deg)" },
          "56.25%": { transform: "rotate(0)" },
          "68.75%": { transform: "rotate(0)" },
          "75%": { transform: "rotate(-5deg)" },
          "87.5%": { transform: "rotate(5deg)" },
          "100%": { transform: "rotate(-4deg)" },
        },
        dance: {
          "0, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(-1, 1)" },
        },
      },
      animation: {
        shake: "wiggle 500ms ease-in-out infinite",
        dundun: "dundun 1s ease-in infinite",
        djembe: "djembe 2s ease-in infinite",
        sway: "sway 2s ease-in-out infinite",
        "sway-fast": "sway 1s ease-in-out infinite",
        screw: "spin 800ms ease-in-out infinite",
        dance: "dance 1s ease-in-out infinite",
        "spin-once": "spin 1s ease-in-out",
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
