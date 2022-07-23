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
      <div v-if="step === 1" class="d-flex flex-lg-row flex-column">
        <ShippingInf
          :isShipping="isShipping"
          v-on:nextStep="step = step + 1"
          :class="
            isShipping && (order_items.length || order_bundles.length) && 'open'
          "
        />
        <FirstStep
          :isShipping="isShipping"
          v-on:isShipping="isShipping = !isShipping"
        />
      </div>
      <SecondStep v-if="step === 2" v-on:firstStep="firstStep" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep.vue";
import ShippingInf from "./ShippingInf";

export default {
  components: {
    FirstStep,
    SecondStep,
    ShippingInf,
  },
  props: ["isOpen"],
  data: () => ({ isShipping: false, step: 1 }),
  computed: {
    ...mapGetters({
      order_items: "order/getOrderItems",
      order_bundles: "order/getBundleItems",
    }),
  },
  methods: {
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