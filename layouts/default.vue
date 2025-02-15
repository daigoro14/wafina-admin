<template>
  <v-app>
    <v-navigation-drawer
      v-if="true"
      v-model="drawer"
      class="rounded-r-[50px] py-5"
      color="primary"
      dark
      :mobile-breakpoint="800"
      :width="250"
      fixed
      app
    >
      <h4 class="futura-lt-bold px-5 text-2xl text-white my-5">
        {{ data?.user.fullName }}
      </h4>
      <v-list>
        <v-list-item
          v-for="(item, i) in mainNavItemsPrimary"
          :key="i"
          :to="item.to"
          router
        >
          <div class="flex">
            <v-icon class="mr-[32px]">{{ item.icon }}</v-icon>
            <v-list-item-title v-text="item.title" />
          </div>
        </v-list-item>
      </v-list>
      <div class="d-flex mt-4 justify-center text-center">
        <v-divider color="white" class="mx-4"></v-divider>
      </div>
      <v-list>
        <v-list-item
          v-for="(item, i) in mainNavItemsSecondary"
          :key="i"
          @click="handleItemClick(item)"
        >
          <div class="flex">
            <v-icon class="mr-[32px]">{{ item.icon }}</v-icon>
            <v-list-item-title v-text="item.title" />
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar 
      height="80"         
    >
      <v-app-bar-nav-icon
        v-show="true"
        @click.stop="drawer = !drawer"
      />
      <v-spacer/>
      <!-- <v-toolbar-title v-show="true"> -->
				<NuxtLink to="/">
					<span class="text-5xl md:text-7xl p-4">WAFINA🇦🇴</span>
				</NuxtLink>
			<!-- </v-toolbar-title> -->
       <v-spacer/>
       <div class="hidden lg:block">

          <v-btn v-for="page in mainNavItemsPrimary" :to="page.to">{{ page.title }}</v-btn>
          <!-- <v-btn to="/attractions">Attractions</v-btn>
          <v-btn to="/FAQ">FAQ</v-btn>
          <v-btn to="/about">About</v-btn>
          <v-btn to="/contact">Contact</v-btn> -->
          <!-- <v-btn to="/hotels">Tour Guides</v-btn>
          <v-btn to="/about">Activities</v-btn>
          <v-btn to="/contact">Hotels</v-btn>
          <v-btn to="/contact">Food & Drinks</v-btn>
          <v-btn to="/contact">History & Culture</v-btn>
          <v-btn to="/contact">Health</v-btn> -->
      </div>
      <v-menu bottom left v-model="menu">
        <!-- Make sure you bind the activator props to the button -->
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>

        <v-list>
          <!-- Proper handling of @click event -->
          <v-list-item @click="onLogout">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
		<v-main class="grey lighten-4 pt-19">
				<NuxtPage />
		</v-main>
  </v-app>
</template>

<script lang="ts" setup>
const router = useRouter()
const drawer = ref(false)
const menu = ref(false)

const { signOut, data } = useAuth()

const onLogout = () => {
  signOut({ callbackUrl: '/login' })
  menu.value = false
}

type NavItem =
  | {
      icon: string
      title: string
      to: string
    }
  | {
      icon: string
      title: string
      action: string
    }

// const isPortalAdmin = computed(() => {
//   return data.value?.user?.roles?.includes('PortalCustomerAdmin')
// })

const mainNavItemsPrimary = [
  {
    icon: 'mdi-plus',
    title: 'TOURS',
    to: '/tours',
  },
  // {
  //   icon: 'mdi-play',
  //   title: 'ATTRACTIONS',
  //   to: '/attractions',
  // },
  // {
  //   icon: 'mdi-fast-forward',
  //   title: 'FAQ',
  //   to: '/bookings/upcoming',
  // },
  // {
  //   icon: 'mdi-rewind',
  //   title: 'ABOUT',
  //   to: '/bookings',
  // },
  //   {
  //   icon: 'mdi-rewind',
  //   title: 'CONTACT',
  //   to: '/bookings',
  // },
]

const mainNavItemsSecondary = computed(() => {
  const items: NavItem[] = [
    {
      icon: 'mdi-chat',
      title: 'Feedback',
      action: 'dialog',
    },
  ]

  // Conditionally add 'Användare' to the secondary navigation if the user is portalAdmin
  // if (isPortalAdmin.value) {
  //   items.unshift({
  //     icon: 'mdi-account-multiple',
  //     title: 'Användare',
  //     to: '/users',
  //   })
  // }

  return items
})

const handleItemClick = (item: any) => {
  if (item.to) {
    router.push(item.to)
  }
}
</script>

<style>

</style>