<template>
  <div class="col">
    <Attendance />
    <Cities />
  </div>
</template>

<script>
import Attendance from "./Attendance.vue";
import Cities from "./Cities.vue";

export default {
  name: "Visitors",
  components: { Attendance, Cities },
};
</script>

<style scoped>
</style>