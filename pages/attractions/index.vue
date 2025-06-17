<template>
  <v-btn class="top-5 left-5 mb-5" @click="goBack" icon>
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  <v-container class="flex flex-col gap-3">
    <pre>{{ attractionData }}</pre>
    <div class="flex w-full items-center justify-between gap-2">
      <!-- <v-text-field
        label="Search"
        v-model="search"
        variant="outlined"
        width="50%"
        max-width="200"
        density="comfortable"
        @change="fetchTours"
      /> -->
      <v-btn to="/attractions/new">
        Add Attraction
      </v-btn>
    </div>
    <!-- <h1 class="text-6xl">Attractions</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h2>Attractions</h2>
          </v-card-title>
          <v-card-text>
            <p>
              Welcome to the Attractions page! Here you can find information about some of the most popular attractions in Angola. Whether you're looking for natural wonders, historical sites, or cultural landmarks, Angola has something to offer everyone. Explore the list below to learn more about the top attractions in Angola and start planning your next adventure today!
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
    <v-row class="!flex justify-start">
      <v-col
        v-for="n in 8"
        :key="n"
        class="flex justify-center"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <v-card width="300" height="500">
          <v-img
            src="https://live.staticflickr.com/7568/15797809290_49848a92e0_b.jpg"
            width="300"
            height="300"
            aspect-ratio="1"
            cover
          />
          <v-card-title>
            <h2>Miradouro da Lua</h2>
          </v-card-title>
          <v-card-text>
            <p class="truncated">
              Miradouro da Lua is a natural rock formation located in Angola. The name means "Viewpoint of the Moon" in Portuguese. The site is located in the Namibe Province, about 40 kilometers south of the capital city of Luanda. The landscape is characterized by its unique rock formations, which resemble the surface of the moon. Visitors can explore the area on foot and enjoy panoramic views of the surrounding desert landscape.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  const config = useRuntimeConfig()
  const url = config.public.baseURL
  const router = useRouter()
  const { token } = useAuth()
  const attractionData = ref([])
  const loading = ref(false)

  const goBack = () => {
    router.go(-1);
  };

  const fetchAttractions = async () => {
  try {

    const response = await fetch(`${url}/attractions`, {
      headers: {
        "Authorization": `${token.value}`,
        "Content-Type": "application/json",

      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); 
    console.log(data)
    attractionData.value = data.tours;
  } catch (error) {
    console.error('Error fetching tours:', error);
  } finally {
    loading.value = false; 
  }
};

fetchAttractions();
</script>

<style>
.truncated {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;         /* Still required for most browsers */
  -webkit-line-clamp: 6;        /* Fallback */
  -webkit-box-orient: vertical; /* Fallback */
  line-clamp: 6;                /* Standard property, may need a vendor prefix */
  box-orient: vertical;
}


</style>