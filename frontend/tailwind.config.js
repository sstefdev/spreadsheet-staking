/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: [
        {
          'main-color': '#fe4465',
          'secondary-color': '#d43954',
          'dark-red': '#7f2233',
          'darker-red': '#551722',
          'dark-grey': '#2a0b11',
          black: '0d0d0d',
        },
      ],
    },
  },
  plugins: [],
}
