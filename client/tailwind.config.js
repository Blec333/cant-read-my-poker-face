module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://prodimages.everythingneon.com/giant/l100-0657-casino-led-sign.gif')",
      },
    },
  },
  plugins: [require("daisyui")],
};
