/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/javascript/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    theme: ["light", "dark"],
  },
};
