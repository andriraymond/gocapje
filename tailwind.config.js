/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // jika pakai App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // jika pakai Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // komponen umum
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
