import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
        "2xl": "96rem",
      },
      fontFamily: {
        sans: ["var(--font-mona-sans)", "sans-serif"],
        poly: ["var(--font-poly-sans)", "sans-serif"],
      },
      colors: {
        primary: "#222222",
        "primary-light": "#535353",
        auxiliary: "#233840",
        "auxiliary-light": "#3E5D5D",
        light: "rgb(249, 252, 249)",
      },
    },
  },
  plugins: [],
};
export default config;
