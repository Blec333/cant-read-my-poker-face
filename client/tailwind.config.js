module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://i.ytimg.com/vi/s_gDdqqp3H0/maxresdefault.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
