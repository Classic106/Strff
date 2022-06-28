<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <p>{{ currentDate.toLocaleString("en-us", { weekday: "long" }) }}</p>
    <h1>{{ currentDate.getDate() }}</h1>
    <h2>
      {{ months[currentDate.getMonth()] }} {{ currentDate.getFullYear() }}
    </h2>
   
  </div>
</template>

<script>
export default {
  name: "AppointmentSecondStep",
  data: () => ({
    currentDate: new Date(),
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  }),
};
</script>

<style scoped>
</style>