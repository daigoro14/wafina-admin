<template>
  <v-date-picker
    v-model="selectedDate"
    height="500"
    elevation="2"
    :min="minDate"
    :day-class="getDayClass"
  >
  </v-date-picker>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
      specialDates: [
        '2025-02-14', // Valentine's Day
        '2025-02-25', // Custom date
      ],
    };
  },
  methods: {
    // Define allowed dates (if necessary)
    // isDateAllowed(date) {
    //   return true; // This could be expanded to restrict certain dates
    // },

    // Add a custom class to highlight specific dates
    getDayClass(date) {
      // Format date as 'YYYY-MM-DD' to compare with special dates
      const formattedDate = date.toISOString().substr(0, 10);
      if (this.specialDates.includes(formattedDate)) {
        return 'highlighted-day'; // Return a custom class for special dates
      }
      return '';
    },
  },
};
</script>

<style scoped>
/* Highlight specific dates */
.highlighted-day {
  background-color: #ff6347; /* Red background */
  color: white;
  font-weight: bold;
  border-radius: 50%;
}
</style>
