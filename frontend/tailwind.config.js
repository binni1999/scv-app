module.exports = {
  content: ["./src/**/*.{html,js}", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'dark': "#1E293B",

      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
