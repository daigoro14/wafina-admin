<template>
  <div>
    <!-- Parallax Image Container -->
    <div
      ref="parallaxContainer"
      class="relative h-[300px] w-full"
      :style="containerStyle"
    >
      <!-- Blurred Background Image -->
      <img
        ref="parallaxImage"
        src="~/assets/images/samakaka.jpeg"
        alt="Parallax Image"
        class="parallax-image parallax-blurred"
        :style="imageStyle"
      />

      <!-- Non-blurred Foreground Image -->
      <img
        ref="nonBlurredImage"
        src="~/assets/images/samakaka.jpeg"
        alt="Non-blurred Image"
        class="parallax-second"
        :style="nonBlurredImageStyle"
      />

      <!-- Text Overlay -->
      <div class="parallax-overlay">
        <h1 class="text-white text-5xl font-bold">Welcome</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';

// Refs for container and images
const parallaxContainer = ref<HTMLElement | null>(null);
const parallaxImage = ref<HTMLImageElement | null>(null);
const nonBlurredImage = ref<HTMLImageElement | null>(null);

// Style objects for the images and container
const imageStyle = reactive<Record<string, any>>({
  transform: 'translate3d(0, 0, 0)', // Initial state: no movement
  transition: 'transform 0s', // Disable transitions for smooth scroll
  filter: 'blur(5px)', // Apply static blur to the image
});

const nonBlurredImageStyle = reactive<Record<string, any>>({
  transform: 'translate3d(0, 30%, 0) translateX(-50%)', // Center the image from the start
  transition: 'transform 0s', // Disable transitions for smooth scroll
});

const containerStyle = reactive<Record<string, any>>({
  position: 'relative',
  height: '300px',  // Set desired height for the container
  width: '100%',
  overflow: 'hidden',
  willChange: 'transform', // Tell browser that transform will be used
});

let lastKnownScrollPosition = 0;

const onScroll = () => {
  const currentScrollPosition = window.scrollY;

  // Only update if scroll position changes
  if (currentScrollPosition !== lastKnownScrollPosition) {
    lastKnownScrollPosition = currentScrollPosition;

    // The scroll distance to move the image from the initial position to the top
    const scrollDistance = 300;

    // Calculate the percentage of the scroll relative to the scroll distance
    let scrollPercentage = currentScrollPosition / scrollDistance;

    // Ensure the scroll percentage stays between 0 and 1
    if (scrollPercentage > 1) scrollPercentage = 1;
    if (scrollPercentage < 0) scrollPercentage = 0;

    // Adjusting the movement for both images
    const movement = scrollPercentage * 100; // Calculate how far to move the image

    // Start 30% above the bottom and stop 30% from the top
    const offset = 30; // Start 30% above the bottom and end 30% from the top
    const adjustedMovement = movement * (1 - offset / 100) + offset;

    // Apply translation for the blurred image
    if (parallaxImage.value) {
      parallaxImage.value.style.transform = `translate3d(0, ${adjustedMovement}%, 0)`;
    }

    // Apply translation for the non-blurred image
    if (nonBlurredImage.value) {
      // Combine both transforms (centering and parallax movement)
      nonBlurredImage.value.style.transform = `translate3d(0, ${adjustedMovement}%, 0) translateX(-50%)`;
    }
  }
};

// Throttle the scroll event listener to optimize performance
let timeoutId: ReturnType<typeof setTimeout> | null = null;
const throttleScroll = () => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(onScroll, 10); // Adjust the interval as needed for better performance
};

// Reset the image position on page load
onMounted(() => {
  if (parallaxImage.value) {
    imageStyle.transform = 'translate3d(0, 30%, 0)'; // Start 30% above the bottom
  }
  if (nonBlurredImage.value) {
    // Apply the correct transform immediately on page load
    nonBlurredImage.value.style.transform = 'translate3d(0, 30%, 0) translateX(-50%)'; // Start 30% above the bottom
  }
  window.addEventListener('scroll', throttleScroll);
});
</script>

<style scoped>

/* The image itself (first image with blur) */
.parallax-image {
  width: 100%; /* Stretch image width to 100% of container */
  height: auto;
  position: absolute;
  bottom: 30%; /* Start with the image 30% above the bottom */
  left: 0;
  will-change: transform; /* Hint to the browser that the image's transform will change */
}

/* The blurred image */
.parallax-blurred {
  filter: blur(5px); /* Apply blur effect to this image */
}

/* The second non-blurred image (on top) */
.parallax-second {
  width: 868px; /* Set width of the second image */
  height: auto;
  position: absolute;
  bottom: 0; /* Align it with the bottom of the container */
  left: 50%; /* Center horizontally using left: 50% */
  transform: translateX(-50%) translate3d(0, 0, 0); /* Ensure the image is centered */
  will-change: transform; /* Hint to the browser that the image's transform will change */
  z-index: 2; /* Ensure the non-blurred image is in front */
  mask-image: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 1) 98%, rgba(0, 0, 0, 0) 100%); /* Even shorter fade effect */
  -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 2%, rgba(0, 0, 0, 1) 98%, rgba(0, 0, 0, 0) 100%); /* Safari */
}

/* Overlay for text */
.parallax-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3; /* Ensure overlay content appears above the image */
  text-align: center;
  color: white;
}

.parallax-overlay h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add a dark shadow */
  font-size: 3rem; /* Adjust the font size as needed */
  font-weight: bold; /* Ensure the text is bold and readable */
}
</style>






