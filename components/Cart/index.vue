<template>
  <div class="container d-flex m-0 p-0">
    <div class="content d-flex flex-column" :class="isOpen && 'open'">
      <div class="header d-flex align-items-center justify-content-end">
        <span
          class="p-4 text-center close-button"
          v-on:click.self="$emit('close')"
          >+</span
        >
      </div>
      <div>
        <FirstStep v-if="step === 1" :nextStep="nextStep" />
        <SecondStep v-if="step === 2" v-on:firstStep="firstStep" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep.vue";

export default {
  components: {
    FirstStep,
    SecondStep,
  },
  props: ["isOpen"],
  data: () => ({
    step: 1,
    settings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      order_items: "order/getOrderItems",
      order_bundles: "order/getBundleItems",
    }),
  },
  methods: {
    nextStep: function () {
      this.step = this.step + 1;
    },
    firstStep: function () {
      setTimeout(() => {
        this.isShipping = false;
        this.step = 1;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: max-content;
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
  cursor: pointer;
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