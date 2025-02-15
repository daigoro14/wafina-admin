// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  css: [
    '@/assets/css/main.css', // Ensure Tailwind loads first
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE,
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@sidebase/nuxt-auth'
  ],
  auth: {
    isEnabled: true,
    baseURL: `${process.env.API_BASE}/auth`,
    globalAppMiddleware: true,
    originEnvKey: process.env.NUXT_YOUR_ORIGIN,
    sessionRefresh: {
      enableOnWindowFocus: false,
      enablePeriodically: 60000, // 1 minute
    },
    provider: {
      type: 'local',
      session: {
        dataType: {
          user: {
            id: 'string',
            email: 'string',
            roles: 'string[]',
            firstName: 'string',
            lastName: 'string',
            fullName: 'string',
          },
        },
      },
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        // refreshToken: { path: 'refresh-token', method: 'post' },
        // signOut: { path: '/logout', method: 'post' },
        // signUp: { path: '/register', method: 'post' },
        getSession: { path: '/session', method: 'get' },
      },
      pages: {
        login: '/login',
      },
      token: {
        signInResponseTokenPointer: '/accessToken',
        type: 'Bearer',
        cookieName: 'auth.access-token',
        headerName: 'Authorization',
        maxAgeInSeconds: 5 * 24 * 60 * 60,
        sameSiteAttribute: 'lax',
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
        cookieDomain: process.env.NUXT_PUBLIC_COOKE_DOMAIN,
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: 'refreshToken', method: 'post' },
        refreshOnlyToken: false,
        token: {
          signInResponseRefreshTokenPointer: '/refreshToken',
          refreshRequestTokenPointer: '/refreshToken',
          cookieName: 'auth.refresh-token',
          maxAgeInSeconds: 5 * 24 * 60 * 60, // 5 days ,
          sameSiteAttribute: 'lax',
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: false,
          cookieDomain: process.env.NUXT_PUBLIC_COOKE_DOMAIN,
        },
      },
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
})
