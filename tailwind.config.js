/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Azul oscuro
        secondary: "#3B82F6", // Azul claro
        background: "#F3F4F6", // Gris claro
      },
    },
  },
  plugins: [],
};
