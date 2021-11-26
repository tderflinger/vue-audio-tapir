module.exports = {
  purge: ['./src/**/*.{js,jsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        50: '50%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
