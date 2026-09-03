// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add this line to include your source files
  ],
  theme: {
    extend: {
      fontFamily: {
        preahvihear: ['var(--font-preahvihear)', 'sans-serif'],
      },
    },
  },
};

