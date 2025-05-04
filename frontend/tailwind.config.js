/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#90AFC5",
        secondary:"#505160"

      },
      container:{
        center:true,
        padding:{
          DEFAULT: '1rem',
          sm:'2rem',
          lg:'4rem',
          xl:'5rem' , 
          '2x1':'6rem'
        }
      }
    },
  },
  plugins: [],
}
