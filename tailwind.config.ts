import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        glysa: ["Glysa", "sans-serif"],
        lexend: ["Lexend Deca", "sans-serif"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "48px" }],
        h2: ["24px", { lineHeight: "40px" }],
        "body-lg": ["16px", { lineHeight: "24px", letterSpacing: "0.1em" }],
        "body-md": ["14px", { lineHeight: "20px", letterSpacing: "0.1em" }],
        "body-sm": ["12px", { lineHeight: "12px", letterSpacing: "0.1em" }],
      },
      colors: {
        Grey: {
          100: "#141414",
          90: "#191919",
          80: "#1E1E1E",
          70: "#232323",
          60: "#282828",
          50: "#2D2D2D",
          40: "#323232",
          30: "#373737",
          20: "#3C3C3C",
          10: "#414141",
        },
      },
      opacity: {
        "32": "0.32",
        "56": "0.56",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
