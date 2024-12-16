// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {
//       gridTemplateRows: {
//         '[auto,auto,1fr]': 'auto auto 1fr',
//       },
//     },
//   },
//   plugins: [
//     require('daisyui'),
//     require('@tailwindcss/forms'),
//     require('@tailwindcss/aspect-ratio')
//   ],
// }

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  daisyui: {
    themes: ["light"], 
  },
};
