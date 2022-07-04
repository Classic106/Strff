<template>
  <div>
    <div v-for="purchaseType in purchaseTypes" :key="purchaseType.title">
      <div class="d-flex align-items-center">
        <input
          name="push-notifications"
          type="radio"
          class="mt-2 align-self-start"
          :id="`${purchaseType.title} ${cart ? 'cart' : ''}`"
          :value="purchaseType.id"
          v-model="purchase_type"
          v-on:change="setOptions(purchaseType.id)"
        />
        <label
          :for="`${purchaseType.title} ${cart ? 'cart' : ''}`"
          class="w-100 ml-3 d-flex flex-column"
        >
          {{ purchaseType.title }}
          <p class="mt-1" v-if="purchaseType.description">
            {{ purchaseType.description }}
          </p>
        </label>
      </div>
    </div>
    <div class="mt-1 position-relative" v-if="options.length">
      <select
        class="position-relative w-100"
        v-model="subscription_type"
        v-on:change="change"
      >
        <option
          v-for="option in options"
          :value="option.id"
          :key="option.title"
        >
          {{ option.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    cart: {
      type: Boolean,
      required: false,
    },
    purType: {
      type: Number,
      required: false,
    },
    subType: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      options: [],
      purchase_type: this.purType ? this.purType : null,
      subscription_type: this.subType ? this.subType : null,
    };
  },
  computed: {
    ...mapGetters({
      purchaseTypes: "purchase-types/getTypes",
    }),
  },
  methods: {
    change: function (e) {
      const { selectedIndex } = e.target.options;

      if (selectedIndex > -1) {
        const { id } = this.options[selectedIndex];
        this.subscription_type = id;
        this.setTypes();
        return;
      }
      this.subscription_type = null;
      this.setTypes();
    },
    setOptions: function (purchaseTypeId) {
      const item = this.purchaseTypes.filter(
        (item) => item.id === purchaseTypeId
      )[0];

      if (item && item.subscription_types.length) {
        const { id } = item.subscription_types[0];

        this.subscription_type = id;
        this.options = [...item.subscription_types];
        this.setTypes();
        return;
      }
      this.subscription_type = null;
      this.options = [];
      this.setTypes();
    },
    setTypes: function () {
      this.$emit("setTypes", {
        purchase_type: this.purchase_type,
        subscription_type: this.subscription_type,
      });
    },
  },
};
</script>

<style scoped>
</style>