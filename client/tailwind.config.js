module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://t3.ftcdn.net/jpg/04/96/77/34/360_F_496773440_LB7PaykdXR2IuouiWzF0EfWfEJBHHXwz.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
