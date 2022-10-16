<template>
  <div class="d-flex flex-column align-items-center position-relative">
    <BIconSearch class="search-icon d-flex position-absolute" />
    <SelectWithSearch
      :data="products"
      :filter="filterProducts"
      :clickItem="addProduct"
      :placeholder="'Serch products'"
      class="mb-3"
    >
      <template v-slot:item="products">
        <ProductSearchItem :item="products.item" />
      </template>
    </SelectWithSearch>
    <div class="w-100" v-if="selectedProducts.length">
      <ul class="d-flex flex-column p-0">
        <li
          v-for="(item, index) in selectedProducts"
          :key="item.product.id"
          class="row w-100 mb-2 mx-auto justify-content-center"
        >
          <div class="wrap-img p-0 col-md-2 col-6 p-0 mb-md-0 mb-2">
            <PreloaderImage :image="item.product.image[0].url" />
          </div>
          <div
            class="
              text-ellipsis text-center
              col-md-3 col-12
              d-flex
              align-items-center
              mb-md-0 mb-2
            "
          >
            {{ item.product.title }}
          </div>
          <div
            class="
              col-md-2 col-12
              d-flex
              align-items-center
              justify-content-center
              text-nowrap
              mb-md-0 mb-2
            "
          >
            $ {{ item.product.price }}
          </div>
          <div
            class="
              col-md-4 col-12
              d-flex
              flex-column
              justify-content-center
              align-items-center
              mb-md-0 mb-2
            "
          >
            <div class="number-input">
              <button v-on:click="minus(index)"></button>
              <input
                class="quantity"
                min="1"
                name="quantity"
                :value="item.quantity"
                type="number"
              />
              <button v-on:click="plus(index)" class="plus"></button>
            </div>
          </div>
          <div
            class="
              col-1
              d-flex
              justify-content-center
              align-items-start
              p-0
              mb-md-0 mb-2
            "
            v-on:click="deleteProduct(index)"
          >
            <BIconX />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import PreloaderImage from "~/components/common/PreloaderImage.vue";
import ProductSearchItem from "./ProductSearchItem.vue";

export default {
  name: "ProductsBlock",
  components: { PreloaderImage, SelectWithSearch, ProductSearchItem },
  data: () => ({
    products: [],
    selectedProducts: [],
  }),
  methods: {
    filterProducts: function (text, data) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    },
    addProduct: function (item) {
      const index = this.selectedProducts.findIndex((p) => p.id === item.id);

      if (index === -1) {
        const obj = {
          total: item.price,
          price: item.price,
          product: item,
          quantity: 1,
        };
        this.selectedProducts.push(obj);
      }
      this.$emit("setProducts", this.selectedProducts);
    },
    deleteProduct: function (index) {
      this.selectedProducts.splice(index, 1);
      this.$emit("setProducts", this.selectedProducts);
    },
    plus: function (index) {
      const item = this.selectedProducts[index];

      item.quantity = item.quantity + 1;
      item.total = item.quantity * item.price;
      this.selectedProducts[index] = item;

      this.$emit("setProducts", this.selectedProducts);
    },
    minus: function (index) {
      const item = this.selectedProducts[index];

      if (item.quantity > 1) {
        item.quantity = item.quantity - 1;
        item.total = item.quantity * item.price;
        this.selectedProducts[index] = item;

        this.$emit("setProducts", this.selectedProducts);
      }
    },
  },
  async beforeMount() {
    this.products = await this.$strapi.find("products");
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
  width: 2rem;
  height: 2rem;
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
  height: 2rem;
  font-weight: bold;
  text-align: center;
}
</style>