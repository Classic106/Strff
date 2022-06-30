<template>
  <div>
    <h6 class="px-5 py-3">Appointments</h6>
    <ul>
      <li
        v-for="appointment in appointments"
        :key="appointment.id"
        v-on:click="chosedAppoinment(appointment.id)"
      >
        <p>{{ appointment.name }}</p>
        <p>{{ appointment.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "AppointmentFirstStep",
  data: () => ({
    appointments: [{ id: 1, name: "name", description: "description" }],
  }),
  methods: {
    ...mapMutations({
      setAppointment: "appointment/setAppointment",
    }),
    chosedAppoinment: function (id) {
      this.setAppointment(id);
      this.$emit("nextStep");
    },
  },
  async mounted() {
    try {
      //this.appointments = await this.$strapi.find("appointments");
    } catch (error) {
      this.error = error;
    }
  },
};
</script>

<style>
</style>