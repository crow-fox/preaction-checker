/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: {
          light: "#C8C8C8",
          DEFAULT: "#222222",
        },
        gray: {
          DEFAULT: "#F0F0F0",
          2: "A0A0A0",
          dark: "#505050",
        },
        red: {
          DEFAULT: "#F0C8C8",
          dark: "#502828",
        },
        green: {
          DEFAULT: "#C8F0C8",
          dark: "#285028",
        },
        blue: {
          DEFAULT: "#C8F0F0",
          dark: "#285050",
        },
        yellow: {
          DEFAULT: "#F0F0C8",
          dark: "#505028",
        },
        pink: {
          DEFAULT: "#F0C8F0",
          dark: "#502850",
        },
      },
      maxWidth: {
        container: "45rem",
      },
    },
  },
  plugins: [],
};
