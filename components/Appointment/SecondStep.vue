<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <p>{{ minDate.toLocaleString("en-us", { weekday: "long" }) }}</p>
    <h1>{{ minDate.getDate() }}</h1>
    <h2>{{ months[minDate.getMonth()] }} {{ minDate.getFullYear() }}</h2>
    <DatePicker
      :min-date="minDate"
      :max-date="maxDate"
      :attributes="attributes"
      :first-day-of-week="2"
      is-dark
      v-model="date"
      class="col mt-3 mx-2"
    />
    <div class="d-flex justify-content-end w-50">
      <span
        class="text-uppercase p-2 cancel font-weight-bold"
        v-on:click="date = null"
        >cancel</span
      >
      <span class="text-uppercase p-2 apply font-weight-bold" v-on:click="apply"
        >apply</span
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { configCalendar } from "@/helpers";

export default {
  name: "AppointmentSecondStep",
  data: () => ({
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
    ...configCalendar(),
  }),
  computed: {
    date: {
      get: function () {
        return this.$store.getters["appointment/getAppointmentDate"];
      },
      set: function (date) {
        this.setAppointmentDate(date);
      },
    },
  },
  methods: {
    ...mapMutations({
      setAppointmentDate: "appointment/setAppointmentDate",
    }),
    apply: function () {
      if (this.date) {
        this.$emit("nextStep");
      }
    },
  },
};
</script>

<style scoped>
p,
h2,
.cancel {
  color: #8a8a8a;
}

.apply {
  color: #5f83a7;
}

h1::after {
  content: "";
  display: block;
  height: 2px;
  width: 100%;
  background: #8a8a8a;
}

.vc-container.vc-is-dark {
  border: none;
  background: none;
}
</style>