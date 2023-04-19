/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  purge: {
    enabled: true,
    content: ["./**/*.html"],
  },
  theme: {
    extend: {
      fontSize: {
        sagenormal: `1rem`,
        sageheading: `2rem`,
        sagesubHeading: `1.5rem`,
      },
      colors: {
        sagewhite: "#f3f3f3",
        sageoffWhite: "#f8f8f8",
        sageblue: "#011f5b",
        sageblueHue: "#011f5bc9",
        sagered: "#9b0000",
        sageerrorRed: "#9b0000e0",
        sagesuccessText: "#00a300db",
        sagegreen: "#00a300",
      },
      fontFamily: {
        Lato: ["Quicksand", "sans-serif"],
        Gilroy: ["Gilroy", "sans-serif"],
      },
      padding: {
        normalPd: `1.5rem 2.5rem`,
        btnPd: `13px 35px`,
      },
      borderRadius: {
        btnBR: `4px`,
      },
    },
  },
  plugins: [require("daisyui")],
};
