/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('/Images/background-place.jpg')",
      },
      fontFamily: {
        'heading': ['ArticulatCF-Medium', 'Arial', 'sans-serif'],
        'body': ['ArticulatCF-Regular', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
