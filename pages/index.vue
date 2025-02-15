<template>
  <div>
    <ParallaxImage
      src="~/assets/images/samakaka.jpeg"
      overlayText="Welcome"
    />
    <v-container class="flex flex-col items-center">
      <v-btn color="primary" size="x-large" to="/tours">
        Available tours
      </v-btn>
      <!-- <div class="my-10 flex flex-col">
        <span class="text-[40px] text-center">There's no reason for Angola not to be Africas greatest attraction.</span>
        <span class="text-[40px] text-center">WE ARE HERE TO PROVE IT!</span>
      </div> -->
      <div class="my-10 flex flex-col">
        <span class="text-[40px] text-center">Beaches, Rainforests, Waterfalls, Deserts you name it!</span>
        <span class="text-[40px] text-center">WE ARE HERE TO SHOW YOU IT ALL!</span>
      </div>
      <!-- <div class="flex gap-2 justify-between">
        <v-card v-for="(offerCard, index) in offerCards" class="w-96 !flex flex-col items-center" >
          <v-icon class="!text-[70px]">{{offerCard.icon}}</v-icon>
          <v-card-text>
            <span class="text-xl">{{offerCard.title}}</span>
          </v-card-text>
        </v-card>
      </div> -->
      <!-- <v-card height="500">hello</v-card> -->
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import ParallaxImage from '@/components/ParallaxComponent.vue';

const offerCards = [
  {
    icon: 'mdi-plane-car',
    title: 'AIRPORT PICKUP',
    description: 'We offer airport pickup services for all our guests. Our drivers are professional and will ensure that you arrive at your destination safely and on time.',
  },
  {
    icon: 'mdi-creation-outline',
    title: 'PROFESSIONALISM',
    description: 'We have a range of accommodation options to suit your needs. Whether you are looking for a luxury hotel or a budget guesthouse, we have something for everyone.',
  },
  {
    icon: 'mdi-food',
    title: 'MEALS',
    description: 'Enjoy delicious meals prepared by our talented chefs. We offer a variety of cuisines to suit your taste buds, from traditional Angolan dishes to international favorites.',
  },
];
</script>
