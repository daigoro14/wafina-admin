<template>
  <v-btn class="top-5 left-5 mb-5" @click="goBack" icon>
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  <v-container>
    <v-card elevation="3">
      <v-card-title>
        <h2 class="text-2xl">Tour Details - {{ uid }}</h2>
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="selectAttraction"
          variant="outlined"
          label="Attractions"
          multiple
          :items="attractions"
          chips
        >
      </v-select>
      <ClearableTextField        
        v-model="time"
        label="Time"
        customClass="!inline-block"
        width="100%"
      />
      <v-textarea
        v-model="description"
        label="Description"
        variant="outlined"
        customClass="!inline-block"
        width="100%"
      />
      <div class="flex justify-end gap-2">
        <v-btn c @click="deleteTour">Delete<v-icon>mdi-delete</v-icon></v-btn>
        <v-btn color="primary" @click="handleTourAction">{{tourData ? 'Update' : 'Create'}}</v-btn>
      </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  interface ITour extends Document {
    attractions: string[];
    description: string;
    time: string;
    date: string;
  }

  const { token } = useAuth()
  const config = useRuntimeConfig()
  const url = config.public.baseURL
  const router = useRouter()
  const route = useRoute()
  const selectAttraction = ref<string[]>([]);
  const description = ref('');
  const time = ref('');
  const errorResponse = ref('')
  const loading = ref(false);
  const tourData = ref<null | ITour>(null)

  const uid = route.params.uid as string;


  const goBack = () => {
    router.go(-1); 
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const fetchTour = async () => {
    try {
      const response = await fetch(`${url}/tours/${uid}`, {
        headers: {
          "Authorization": `${token.value}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {  
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tour details");
      }
      tourData.value = await response.json();
      if (tourData.value) {
        selectAttraction.value = tourData.value.attractions;
        description.value = tourData.value.description;
        time.value = tourData.value.time;
      }
    } catch (error: any) {
      errorResponse.value = error.message;
    }
  };

  fetchTour();

const createTour = async () => {
  const requestBody = {
    attractions: selectAttraction.value,
    description: description.value,
    time: time.value,
    date: uid,
  };

  if (!loading.value) {
    try {
      loading.value = true;
      const response = await fetch(`${url}/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save tour");
      }

      tourData.value = await response.json();

    } catch (error: any) {
      errorResponse.value = error.message;
    } finally {
      loading.value = false;
    }
  }
};


const deleteTour = async () => {
  try {
    const response = await fetch(`${url}/tours/${uid}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete tour");
    }

    selectAttraction.value = [];
    description.value = "";
    time.value = "";
    tourData.value = null;
    
  } catch (error: any) {
    errorResponse.value = error.message;
  }
};

const updateTour = async () => {
  if (!tourData.value) return;

  const requestBody = {
    attractions: selectAttraction.value,
    description: description.value,
    time: time.value,
    date: uid, 
  };

  try {
    loading.value = true;
    const response = await fetch(`${url}/tours/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update tour");
    }

    // Set tourData to the updated response
    tourData.value = await response.json();
  } catch (error: any) {
    errorResponse.value = error.message;
  } finally {
    loading.value = false;
  }
};

const handleTourAction = () => {
  if (tourData.value) {
    updateTour();
  } else {
    createTour();
  }
};
  
const attractions = [
  "Miradouro da Lua",
  "Cabo Ledo",
  "Kalandula Falls",
  "Kissama National Park",
  "Ilha de Luanda",
  "Fortaleza de São Miguel",
  "Cidade Alta",
  "Cidade Baixa",
  "Cidade do Kilamba",
  "Cidade do Sequele",
  "Cidade do Cacuaco",
  "Cidade do Cazenga",
  "Cidade do Viana",
  "Cidade do Belas",
  "Cidade do Talatona",
  "Cidade do Benfica",
  "Cidade do Rangel",
  "Cidade do Sambizanga",
  "Cidade do Prenda",
  ]

  const mockData = [
  {
    attractions: [
      {
        name: 'Miradouro da Lua',
        color: "orange"
      },
      {
        name: 'Cabo Ledo',
        color: "blue"
      },
      {
        name: 'Kalandula Falls',
        color: "green"
      },
    ],      
    date: new Date('2025-02-25'), 
    tourists: 2,
  },
  {
    attractions: [
      {
        name: 'Miradouro da Lua',
        color: "orange"
      },
      {
        name: 'Cabo Ledo',
        color: "blue"
      },
      {
        name: 'Kalandula Falls',
        color: "green"
      },
    ],
    date: new Date('2025-02-27'),  
    tourists: 5,
  },
  {
    attractions: [
      {
        name: 'Miradouro da Lua',
        color: "orange"
      },
      {
        name: 'Cabo Ledo',
        color: "blue"
      },
      {
        name: 'Kalandula Falls',
        color: "green"
      },
    ],
    date: new Date('2025-02-06'),  
    tourists: 12,
  },
    {
    attractions: [
      {
        name: 'Miradouro da Lua',
        color: "orange"
      },
      {
        name: 'Cabo Ledo',
        color: "blue"
      },
      {
        name: 'Kalandula Falls',
        color: "green"
      },
    ],
    date: new Date('2025-02-12'),
    tourists: 15,
  },
  ]

const filteredData = mockData.filter(tour => formatDate(tour.date) === uid);

</script>

<style>

</style>