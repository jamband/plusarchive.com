/** @type import("tailwindcss").Config */
module.exports = {
  content: ["./src/**/*.tsx"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "8rem",
      },
    },
    fontSize: {
      xxs: ["0.675rem"],
      xs: ["0.8125rem"],
      sm: ["0.9375rem"],
      base: ["1.0625rem", "1.85rem"],
      "3xl": ["1.65rem", "2.0rem"],
      "4xl": ["2rem", "2.5rem"],
    },
    extend: {
      colors: {
        gray: {
          100: "#eceff4",
          200: "#dbdee5",
          300: "#c8c5d8",
          400: "#b7b4c7",
          500: "#777483",
          600: "#46444d",
          700: "#24222b",
          800: "#13111a",
          900: "#020009",
        },
        rose: {
          500: "#c45c65",
        },
      },
      animation: {
        loading: "fadeIn 0.5s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
};
