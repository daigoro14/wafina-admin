import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VCalendar, // Register the VCalendar component here
    },
    theme: {
      defaultTheme: 'light', // You can set the default theme to 'dark' or 'light'
      themes: {
        light: {
          // Define the primary color here
          colors: {
            primary: '#E70010',  //Angolan flag red
          },
        },
        dark: {
          colors: {
            primary: '#E70010', // Dark theme primary color (example purple)
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})