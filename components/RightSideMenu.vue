<template>
  <div
    class="menu h-100 w-100 position-fixed d-flex justify-content-end"
    :class="isOpen && 'open'"
    v-on:click.self="close"
  >
    <div class="container d-flex col-12 col-lg-6 m-0 p-0">
      <div class="content d-flex flex-column" :class="isOpen && 'open'">
        <div v-if="username && link !== 'signin' && link !== 'signup'">
          <div class="close d-flex justify-content-end">
            <span
              class="p-4 text-center close-button"
              v-on:click.self="close"
              >+</span
            >
          </div>
          <Sign :isMenu="true" :isUp="true" />
        </div>
        <Appointment v-else :isOpen="isOpen" v-on:isRightSide="close" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Sign from "@/components/Sign";
import Appointment from "@/components/Appointment";

export default {
  name: "RightSideMenu",
  components: { Sign, Appointment },
  props: ["isOpen"],
  data: () => ({ link: "" }),
  computed: {
    ...mapGetters({
      username: "auth/username",
      appointmentId: "appointment/getAppointment",
    }),
  },
  methods: {
    ...mapMutations({
      clearAll: "appointment/clearAll",
    }),
    close: function () {
      this.clearAll();
      this.$emit("isRightSide");
    },
  },
  mounted() {
    this.link = this.$route.name;
  },
};
</script>

<style scoped>
.menu {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0;
  background: rgba(0, 0, 0, 0.9);
  transition: all 0.5s ease-in-out;
}

.menu.open {
  z-index: 5;
  opacity: 1;
}

.container {
  height: 100%;
}

.close > span {
  color: #fff;
  font-size: 3rem;
  transform: rotate(45deg);
}

.content {
  width: 100%;
  margin-left: 100%;
  height: 100%;
  color: #fff;
  background: #333333;
  transition: all 0.5s ease-in-out;
}

.content.open {
  margin-left: 0;
}
</style>