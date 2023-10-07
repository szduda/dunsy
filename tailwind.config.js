/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ["Comic Sans MS", "Chalkboard SE", "Comic Neue", "sans-serif"],
      },
      boxShadow: {
        bright: "0 0 4px 4px #D0DCDB44",
      },
      colors: {
        browny: "#4A2317",

        redy: "#ED3C19",
        "redy-dark": "#BD2C0F",
        "redy-light": "#EE4F2F",

        orangey: "#D95D39",
        "orangey-dark": "#AB3F21",
        "orangey-light": "#DE7254",
        "orangey-lighter": "#E58E76",

        yellowy: "#F9C926",
        "yellowy-dark": "#DBA906",
        "yellowy-light": "#FBD760",

        greeny: "#2E8269",
        "greeny-dark": "#205A4A",
        "greeny-darkest": "#0a1a18",
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
          "0%, 100%": { transform: "rotate(4deg)" },
          "50%": { transform: "rotate(-4deg)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
        swaye: {
          "0%, 100%": { transform: "rotate(-30deg)" },
          "50%": { transform: "rotate(0deg)" },
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
        "spin-logo": {
          "0%": { transform: "rotate(-180deg)" },
          "100%": { transform: "rotate(-35deg)" },
        },
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        swing: {
          "0%, 100%": {
            transform: "translateY(-30%) translateX(5%) rotate(-30deg)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "25%, 50%": {
            transform: "translateY(-10%) translateX(5%) rotate(0deg)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
          "37.5%": {
            transform: "translateY(-46%) translateX(17%) rotate(60deg)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "62.5%": {
            transform: "translateY(-30%) translateX(20%) rotate(20deg)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
        bouncy: {
          "0%, 100%": {
            transform: "translateX(0) rotate(0deg)",
            animationTimingFunction: "cubic-bezier(0.1, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(20%) rotate(35deg)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
      animation: {
        shake: "wiggle 500ms ease-in-out infinite",
        dundun: "dundun 1.5s ease-in infinite",
        djembe: "djembe 2s ease-in infinite",
        swaye: "swaye 2s ease-in-out infinite",
        sway: "sway 2s ease-in-out infinite",
        "sway-fast": "sway 1s ease-in-out infinite",
        screw: "spin 800ms ease-in-out infinite",
        dance: "dance 1s ease-in-out infinite",
        fadein: "fadein 300ms ease-in-out",
        "spin-once": "spin 1s ease-in-out",
        "spin-logo-once": "spin-logo 500ms ease-out",
        "spin-logo": "spin 100ms ease-in-out 3s infinite",
        swing: "swing 2s infinite",
        stick: "bouncy 1s infinite",
        stick2: "bouncy 667ms infinite",
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
