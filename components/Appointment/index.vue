<template>
  <div class="d-flex flex-column">
    <div class="close d-flex pr-3 align-items-center justify-content-between">
      <span class="m-4 icon icon-reply" v-on:click="backStep"></span>
      <span
        class="p-4 text-center close-button"
        v-on:click.self="isOpen = false"
        >+</span
      >
    </div>
    <FirstStep v-if="step === 1" v-on:nextStep="nextStep" />
    <SecondStep v-if="step === 2" v-on:nextStep="nextStep" />
  </div>
</template>

<script>
import FirstStep from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";

export default {
  components: { FirstStep, SecondStep },
  data: () => ({ step: 1 }),
  methods: {
    nextStep: function () {
      console.log("sdf");
      if (this.step < 5) {
        this.step = this.step + 1;
      }
    },
    backStep: function () {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
  },
  created() {
    this.$nuxt.$on("rightSideMenu", () => (this.step = 1));
  },
};
</script>

<style scoped >
.icon-reply {
  background-image: url("@/assets/icons/reply-solid.svg");
}

.close > .close-button {
  color: #fff;
  font-size: 3rem;
  transform: rotate(45deg);
}
</style>