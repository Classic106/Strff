<template>
  <div class="row w-100 mb-2 m-0">
    <ProductCard class="col-9 mx-0 p-0" :product="product" />
    <div
      class="col-2 d-flex flex-column px-1 justify-content-center align-items-center"
    >
      <div class="number-input">
        <button v-on:click.prevent="minus"></button>
        <input
          class="quantity"
          min="1"
          name="quantity"
          :value="quantity"
          type="number"
        />
        <button v-on:click.prevent="plus" class="plus"></button>
      </div>
    </div>
    <div
      class="col-1 d-flex justify-content-end align-items-start p-0"
      v-on:click="deleteProduct"
    >
      <BIconX />
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductQuantityItem",
  components: { ProductCard },
  props: {
    product: Object,
  },
  data: () => ({
    quantity: 1,
    total: 0,
  }),
  methods: {
    deleteProduct: function () {
      const { id } = this.product;

      this.$emit("deleteProduct", id);
    },
    plus: function () {
      const { price } = this.product;

      this.quantity = this.quantity + 1;
      this.total = this.quantity * price;

      const { quantity, product, total } = this;

      this.$emit("updateProduct", { product, quantity, total });
    },
    minus: function () {
      const { price } = this.product;

      if (this.quantity > 1) {
        this.quantity = this.quantity - 1;
        this.total = this.quantity * price;

        const { quantity, product, total } = this;

        this.$emit("updateProduct", { product, quantity, total });
      }
    },
  },
  beforeMount() {
    this.total = this.product.price;
  },
};
</script>

<style scoped>
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.number-input {
  border: 2px solid #ddd;
  display: inline-flex;
}

.number-input,
.number-input * {
  box-sizing: border-box;
}

.number-input button {
  outline: none;
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 100%;
  cursor: pointer;
  margin: 0;
  position: relative;
}

.number-input button:before,
.number-input button:after {
  display: inline-block;
  position: absolute;
  content: "";
  width: 0.5rem;
  height: 2px;
  background-color: #212121;
  transform: translate(-50%, -50%);
}
.number-input button.plus:after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.number-input input[type="number"] {
  font-family: sans-serif;
  max-width: 2rem;
  padding: 0.5rem;
  border: solid #ddd;
  border-width: 0 2px;
  font-size: 1rem;
  height: 1.5rem;
  font-weight: bold;
  text-align: center;
}
</style>