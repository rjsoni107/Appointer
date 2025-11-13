/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', //class or 'media'
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a2842",
        secondary: "#3b82f6",
        orange: "#ff6b36",
        green: "#28a645",
        lightGreen: "#00ff84",
        purple: "#6d5de8",
        offBlue: "#fafafa",
        lemon: "#ffee75",
        headingColor: "#0c256b",
        upperHeadingColor: "#4742c9",
        cyna: "#20c997",
        topHeaderColor: "#2b4066",
        lightNavyBlue: '#2d569f',
        darkNavyBlue: '#1e3a6c',
        'soft-blue': '#f5f7fb',
        'soft-peach': '#fff2df',
        'light-sea-green': '#43B3AE',
        'green-50': '#f0fdf4',
        'green-100': '#d1fae5',
        'green-200': '#a7f3d0',
        'green-300': '#6ee7b7',
        'green-400': '#34d399',
        'green-500': '#10b981',
        'green-600': '#059669',
        'green-700': '#047857',
        'green-800': '#065f46',
        'green-900': '#064e3b',
        'green-light': '#52c41a',
        'orange-600': '#ff9a36',
        'orange-50': '#fff2df',
      },
      height: {
        '15': '60px'
      },
      fontSize: {
        heading: {
          xs: '1.25rem',      // Small screens
          sm: '1.5rem',       // Small-medium screens
          md: '2.6875rem',    // 43px for medium screens (your laptop)
          lg: '2.25rem',      // Large screens (adjust as needed)
          xl: '2.6875rem',    // 43px for extra large screens
        },
        subHeading: {
          xs: '0.9rem',      
          sm: '1.05rem',
          md: '1.2rem',
          lg: '1.3rem',
          xl: '1.5rem',
        },
        paragraph: {
          xs: '0.78rem',    
          sm: '0.88rem',  
          md: '0.93rem',  
          lg: '0.95rem',  
          xl: '0.9375rem',
        },
        cardsTextpara: {
          xs: '0.7rem',    
          sm: '0.75rem',  
          md: '0.8rem',  
          lg: '0.82rem',  
          xl: '0.85rem',
        },
        button: {
          xs: '0.75rem',
          sm: '0.85rem',
          md: '0.9rem',
          lg: '1rem',
          xl: '1.1rem',
        },
      },
    },
  },
  plugins: [],
};