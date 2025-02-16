<template>
  <v-container class="h-screen flex flex-col justify-center items-center">
							<span class="text-5xl md:text-7xl p-4">WAFINA🇦🇴</span>

      <v-card class="pa-4 w-[300px] sm:w-[400px]">
        <v-card-item class="pt-0 pl-2 pb-4">
          <template v-slot:title>
            <div>Admin Login</div>
          </template>
        </v-card-item>
				<v-form @submit.prevent="handleSignIn">
					<ClearableTextField
            v-model="email"
            label="Email"
            customClass="!inline-block"
            width="100%"
					/>
          <ClearableTextField
            v-model="password"
            label="Password"
            customClass="!inline-block"
            width="100%"
            :password="true"
					/>
					<v-btn
						:loading="isLoading"
						class="w-full"
						color="primary"
						type="submit"
					>
						Login
					</v-btn>
				</v-form>
			</v-card>
		</v-container>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: false,
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: '/tours',
	},
})

const { signIn } = useAuth()

const email = ref('')
const password = ref('')
const forgotPassword = ref(false)
const errorResponse = ref('')
const isLoading = ref(false)

const handleSignIn = async () => {
	try {
		isLoading.value = true
		await signIn(
			{
				email: email.value,
				password: password.value,
			},
			{
				callbackUrl: '/tours',
			}
		)
	} catch (error: any) {
		errorResponse.value = error.response
		console.error('Login failed!!', errorResponse.value)
	} finally {
		isLoading.value = false
	}
}
</script>

<style>

</style>