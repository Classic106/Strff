<template>
  <div class="d-flex flex-column px-5">
    <div class="d-flex justify-content-center">
      <h1 class="text-uppercase px-4 mr-2 text-nowrap">{{ parseDay() }}</h1>
      <p class="text-uppercase p-2 text-nowrap">{{ showDate() }}</p>
    </div>
    <button class="text-center text-uppercase p-4 mt-4">
      <span>shedule this appointment</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseMonth } from "@/helpers";

export default {
  name: "AppointmentThirdStep",
  computed: {
    ...mapGetters({
      date: "appointment/getAppointmentDate",
    }),
  },
  methods: {
    parseMonth,
    showDate: function () {
      const date = new Date(this.date);
      const day = date.toLocaleString("en-us", { weekday: "long" }).slice(0, 3);
      const mount = parseMonth(date.getMonth());
      const year = date.getFullYear();

      return `${day}, ${mount} ${year}`;
    },
    parseDay: function () {
      const day = "" + new Date(this.date).getDate();
      if (day.length === 1) {
        return `0${day}`;
      }
      return day;
    },
  },
};
</script>

<style scoped>
h1,
p {
  background: #8a8a8a;
}

p {
  height: max-content;
  font-size: 2.4rem;
}

button {
  border: none;
  color: #fff;
  background: #43ac6a;
}
</style>