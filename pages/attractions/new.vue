<template>
  <v-btn class="top-5 left-5 mb-5" @click="goBack" icon>
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  <v-container>
    <v-card>
      <v-card-title>
        <h2>New Attraction</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="flex flex-col" @submit.prevent>
          <v-row class="mb-4">
                        <v-col
              cols="12"
              sm="3"
              class="flex flex-col gap-4 items-center"
            >
              <div class="border-dashed border-2 relative">
                <v-btn @click="deleteImage" color="red" class="!absolute right-0 z-10 m-1 ">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <input
                  type="file"
                  @change="handleFileUpload"
                  accept="image/*"
                  class="hidden"
                  ref="fileInput"
                />
              <!-- <button @click="triggerFileInput" class="p-2 mb-4 w-32 h-32 rounded bg-gray-200 border">
                <v-icon>mdi-plus</v-icon>
              </button> -->
                <v-img
                  :src="previewUrl || ''"
                  aspect-ratio="1"
                  min-width="200"
                  class="!w-full flex items-center justify-center text-center"
                  cover
                >
                  {{previewUrl ? "" : "No image"}}
                </v-img>
               </div>
              <v-btn @click="triggerFileInput" color="gray" class="mb-[0px] w-full">
                Upload photo
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="9"
            >
              <v-text-field
                label="Name"
                v-model="name"
                variant="outlined"
                density="comfortable"
              />
              <v-select
                v-model="selectCity"
                variant="outlined"
                label="City"
                :items="cities"
                >
              </v-select>
              <v-select
                v-model="selectTag"
                variant="outlined"
                label="Tags"
                multiple
                :items="tags"
                chips
              >
              </v-select>
              <v-textarea
                class=""
                v-model="description"
                label="Description"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>
          <v-btn
            color="primary"
            @click="createAttraction"
          >
            Create
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  const config = useRuntimeConfig()
  const url = config.public.baseURL
  const name = ref('')
  const description = ref('')
  const fileInput = ref<HTMLInputElement | null>(null);
  const previewUrl = ref("");
  const router = useRouter()
  const selectCity = ref('');
  const selectTag = ref<string[]>([]);
  
  const tags = [
    "Beach",
    "Museum",
    "Nature",

  ];

  const cities = [
    "Luanda",
    "Benguela",
    "Huambo",
    "Lobito",
    "Lubango",
    "Kuito",
    "Malanje",
    "Namibe",
    "Soyo",
    "Uíge",
    "Cabinda",
    "Sum"
  ];

  const goBack = () => {
    router.go(-1);
  };

  const triggerFileInput = () => {
    fileInput.value?.click(); // Use optional chaining to prevent null error
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed!");
      return;
    }

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = (e.target?.result as string) || "";
    };
    reader.readAsDataURL(file);
  };

  const deleteImage = () => {
  previewUrl.value = ""; // Reset preview image
  if (fileInput.value) {
    fileInput.value.value = ""; // Reset file input
  }
};

  const createAttraction = async () => {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("city", selectCity.value); // Append selected city
    formData.append("tags", selectTag.value.join(",")); // Convert tags array to string
    if (fileInput.value?.files?.[0]) {
      formData.append("image", fileInput.value.files[0]); // Append image if available
    }

    try {
      console.log("FormData Content:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await fetch(`${url}/attractions`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Attraction created successfully!");
        name.value = "";
        description.value = "";
        previewUrl.value = "";
        selectCity.value = "";
        selectTag.value = [];
      } else {
        alert("Failed to create attraction!");
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>

<style>
</style>