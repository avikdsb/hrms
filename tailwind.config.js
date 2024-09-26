/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      // for mobile screen => 512px and wider screen
      xs: "512px",

      // for tablet screen => 640px and wider screen
      sm: "640px",

      // large tablet screen => 768px and wider screen
      md: "900px",

      // Laptop screen => 1024px and wider screen
      lg: "1024px",

      // Desktop screen => 1280px and wider screen
      xl: "1280px",

      // Extra large screen => 1536px and wider
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        title: ["Audiowide", "Arial", "sans-serif"],
        subtitle: ["Roboto", "serif"],
        // mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        xs: "1rem",
        sm: "1.25rem",
        base: "1.5rem",
        lg: "1.75rem",
        xl: "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        "4xl": "3.5rem",
        "5xl": "4rem",
        "6xl": "4.5rem",
        "7xl": "5rem",
        "8xl": "5.5rem",
        "9xl": "6rem",
        "10xl": "6.5rem",
        "11xl": [
          "7rem",
          {
            letterSpacing: "-0.02em",
            lineHeight: "100px",
          },
        ],
      },
    },
  },
  plugins: [],
};
