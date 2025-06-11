module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        gradient: 'gradient 8s ease infinite',
        parallax: 'parallax 3s ease-in-out infinite alternate'
      },
      colors: {
        neon: {
          blue: '#00f0ff',
          pink: '#ff00e6'
        }
      }
    }
  },
  plugins: []
};