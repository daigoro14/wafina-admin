import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@sidebase/nuxt-auth`
     */
    ["auth"]: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@sidebase/nuxt-auth`
     */
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@sidebase/nuxt-auth`
     * @see https://www.npmjs.com/package/@sidebase/nuxt-auth
     */
    ["auth"]: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@sidebase/nuxt-auth`
     * @see https://www.npmjs.com/package/@sidebase/nuxt-auth
     */
    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },
  }
  interface PublicRuntimeConfig {
   baseURL: string,

   auth: {
      isEnabled: boolean,

      baseURL: string,

      disableInternalRouting: boolean,

      disableServerSideAuth: boolean,

      originEnvKey: string,

      sessionRefresh: {
         enablePeriodically: number,

         enableOnWindowFocus: boolean,

         handler: any,
      },

      globalAppMiddleware: boolean,

      provider: {
         type: string,

         session: {
            dataType: {
               user: {
                  id: string,

                  email: string,

                  roles: string,

                  firstName: string,

                  lastName: string,

                  fullName: string,
               },

               id: string,
            },

            dataResponsePointer: string,
         },

         endpoints: {
            signIn: {
               path: string,

               method: string,
            },

            getSession: {
               path: string,

               method: string,
            },

            signOut: {
               path: string,

               method: string,
            },

            signUp: {
               path: string,

               method: string,
            },
         },

         pages: {
            login: string,
         },

         token: {
            signInResponseTokenPointer: string,

            type: string,

            cookieName: string,

            headerName: string,

            maxAgeInSeconds: number,

            sameSiteAttribute: string,

            secureCookieAttribute: boolean,

            httpOnlyCookieAttribute: boolean,

            cookieDomain: string,
         },

         refresh: {
            isEnabled: boolean,

            endpoint: {
               path: string,

               method: string,
            },

            refreshOnlyToken: boolean,

            token: {
               signInResponseRefreshTokenPointer: string,

               refreshRequestTokenPointer: string,

               cookieName: string,

               maxAgeInSeconds: number,

               sameSiteAttribute: string,

               secureCookieAttribute: boolean,

               httpOnlyCookieAttribute: boolean,

               cookieDomain: string,

               refreshResponseTokenPointer: string,
            },
         },
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }