// AUTO-GENERATED BY @sidebase/nuxt-auth
declare module '#auth' {
  const { getServerSession, getToken, NuxtAuthHandler }: typeof import('/Users/daigoro/Dev/daigoroCode/ImaTrip/ImaTripAdmin/node_modules/@sidebase/nuxt-auth/dist/runtime/server/services')
interface SessionData {
  user: {
    id: string
    email: string
    roles: string[]
    firstName: string
    lastName: string
    fullName: string
  }
  id: string | number
}
}
