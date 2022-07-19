<template>
  <div class="container d-flex col-12 col-lg-6 m-0 p-0">
    <div class="content d-flex flex-column" :class="isOpen && 'open'">
      <div
        class="header d-flex align-items-center"
        :class="
          step > 1 && step !== 4
            ? 'justify-content-between'
            : 'justify-content-end'
        "
      >
        <span
          class="m-4 icon-share"
          v-if="step > 1 && step !== 4"
          v-on:click="backStep"
        ></span>
        <span
          class="p-4 text-center close-button"
          v-on:click.self="$emit('close')"
          >+</span
        >
      </div>
      <div>
        <FirstStep v-if="step === 1" v-on:nextStep="nextStep" />
        <SecondStep
          v-if="step === 2"
          v-on:nextStep="$emit('nextStep')"
          v-on:backStep="$emit('backStep')"
        />
        <ThirdStep
          v-if="step === 3"
          v-on:nextStep="$emit('nextStep')"
          v-on:backStep="$emit('backStep')"
        />
        <FouthStep v-if="step === 4" />
      </div>
    </div>
  </div>
</template>

<script>
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep.vue";
import FouthStep from "./FouthStep.vue";

export default {
  components: { FirstStep, SecondStep, ThirdStep, FouthStep },
  props: ["isOpen"],
  data: () => ({ step: 1 }),
  watch: {
    isOpen: function () {
      if (this.isOpen === false) {
        setTimeout(() => (this.step = 1), 1000);
      }
    },
  },
  methods: {
    nextStep: function () {
      if (this.step < 4) {
        this.step = this.step + 1;
      }
    },
    backStep: function () {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}

.header > span {
  color: #fff;
  font-size: 3rem;
}

.content {
  min-width: 100%;
  margin-left: 100%;
  height: 100%;
  color: #fff;
  background: #333333;
  transition: all 1s ease-in-out;
}

.content.open {
  margin-left: 0;
}

.close-button {
  transform: rotate(45deg);
}

.icon-share {
  display: inline-block;
  width: 30px;
  height: 30px;
  filter: brightness(0) invert(1);
  transform: rotate(180deg);
  background-size: cover;
  background-image: url("../../assets/icons/share-solid.svg");
}
</style>