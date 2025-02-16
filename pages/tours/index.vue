<template>
  <v-btn class="top-5 left-5 mb-5" @click="goBack" icon>
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  <v-container class="flex flex-col items-center h-full gap-3">
    <v-date-picker 
      height="500"
      v-model="selectedDate"
      color="primary"
      text-color="black"
      elevation="2"
    >
    <!-- <template #header>
      <div style="padding: 16px;">
        <p style="margin-bottom: 8px; font-size: 14px; color: gray;">
          Bokningar måste göras senast kl. 15:00 för leverans imorgon (vardagar).
        </p>
        <h3 class="text-3xl text-black">Välj datum</h3>
      </div>
    </template> -->
    </v-date-picker>
    <div class="w-full sm:w-auto flex gap-2">
      <v-text-field
        label="Earliest"
        v-model="earliestDate"
        variant="outlined"
        width="50%"
        type="date"
        density="comfortable"
        @change="fetchTours"
      />

    <v-text-field
      label="Latest"
      v-model="latestDate"
      variant="outlined"
      width="50%"
      type="date"
      density="comfortable"
      @change="fetchTours"
    />

    </div>
    <v-data-table-server
      v-model:items-per-page="tourData.length"
      :headers="headers"
      :items="tourData"
      :loading="loading"
      :total-items="tourData.length"
      :server-items-length="tourData.length"
      :server-items="fetchTours"
      :items-length="tourData.length"
      @click:row="onRowClick"
    >
      <template #item.customers.length="{ item }: { item: { customers: [] } }">
				<span><span :class="item.customers.length < 3 ? 'text-primary' : ''">{{item.customers.length}}</span>/{{maxTourists}}</span>
			</template>
      <template #item.attractions="{ item }: { item: { attractions: string[] } }">
				<div class="flex gap-2">
          <v-chip v-for="attraction in item.attractions">{{ attraction }}</v-chip>
        </div>
			</template>
    </v-data-table-server>
  </v-container>
</template>

<script lang="ts" setup>
const router = useRouter()
const config = useRuntimeConfig()
const url = config.public.baseURL
const tourData = ref([])
const loading = ref(true)
const today = new Date().toISOString().split("T")[0];
const earliestDate = ref(today);
const latestDate = ref("");
const { token } = useAuth()
const maxTourists = 15;



const fetchTours = async () => {
  try {
    const params = new URLSearchParams();
    if (earliestDate.value) params.append("earliest", earliestDate.value);
    if (latestDate.value) params.append("latest", latestDate.value);

    console.log(token.value)

    const response = await fetch(`${url}/tours?${params.toString()}`, {
      headers: {
        "Authorization": `${token.value}`,
        "Content-Type": "application/json",

      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); 
    tourData.value = data; 
  } catch (error) {
    console.error('Error fetching tours:', error);
  } finally {
    loading.value = false; 
  }
};

fetchTours();

const goBack = () => {
  router.go(-1);
};

const onRowClick = (event: Event, row: any) => {
	router.push(`/tours/${row.item.date}`)
}
const selectedDate = ref()

watch(selectedDate, (newDate) => {
  if (newDate) {
    const formattedDate = newDate instanceof Date
      ? new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Luanda' }).format(newDate)
      : newDate;
      
    router.push(`/tours/${formattedDate}`)
  }
});

const headers = [
  { title: 'Date', value: 'date' },
  { title: 'Tourists', value: 'customers.length' },
  { title: 'Time', value: 'time' },
  { title: 'Attractions', value: 'attractions' },
];

</script>

<style>

</style>