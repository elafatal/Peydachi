/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        iran: ["iran"],
      },
      colors: {
        background: {
          light: 'oklch(0.985 0.002 247.839)',
          dark: '#030712',
        },
        titles: {
          light: '#fafafa',
          dark: '#030712',
        },
        text: {
          light: '#fafafa',
          dark: '#030712',
          gray: '#374151',
        },
        icons: {
          light: '#44403c',
          dark: '#115e59',
        },
        nav: {
          light: '#99f6e4',
          dark: '#115e59',
        },
      },
      lineHeight: {
        relaxed: '1.25',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
    require('daisyui'), 
  ],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: "class", // Ensure this is 'class' for dark mode via class
//   theme: {
//     extend: {
//       fontFamily: {
//         iran: ["iran"], 
//       },
//       colors: {
//         background: {
//           light: 'oklch(0.985 0.002 247.839);',
//           dark: '#030712',
          
//         },
//         titles:{
//           light:  '#fafafa',
//           dark: '#030712',
//         },
//         text: {
//           light:  '#fafafa',
//           dark: '#030712',
//           gray:'#374151'
//         },
//         icons:{
//           light:  '#44403c',
//           dark: '#115e59',
//         },
//         nav:{
//           light:  '#99f6e4',
//           dark: '#115e59',
//         }
//       }
//     },
  
//     lineHeight: {
//       'relaxed': '1.25',
//     },
//   },
//   plugins: [
//     () => import('tailwindcss-rtl')
//   ],
//   darkMode: "class",
// }

// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         iran: ['iran'],
//       },
//     },
//   },
// }
