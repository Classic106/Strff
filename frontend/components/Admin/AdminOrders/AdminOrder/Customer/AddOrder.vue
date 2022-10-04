<template>
  <div class="row justify-content-center w-100">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('closeCreateOrder')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create order</h6>
      </div>
      <div>
        <div class="block p-3 mb-3">
          <h6>Products</h6>
          <div class="d-flex align-items-center position-relative">
            <BIconSearch class="search-icon d-flex position-absolute" />
            <input
              v-model="product"
              type="text"
              placeholder="Search product"
              class="bg-grey py-1 w-100"
            />
          </div>
          <select v-if="products.length" multiple :size="1" class="w-100">
            <option
              :value="product.id"
              v-for="product in products"
              :key="product.id"
              class="row"
            >
              <div class="col-2">
                <PreloaderImage :image="product.image[0].url" />
              </div>
              <div class="text-ellipsis col-8 d-flex align-items-center">
                {{ product.title }}
              </div>
              <div class="col-2 d-flex align-items-center text-nowrap">
                $ {{ product.price }}
              </div>
            </option>
          </select>
        </div>
        <div class="d-flex flex-column">
          <div class="block mb-3 d-flex flex-column p-3">
            <h6>Customer</h6>
            <p>{{ selected.email }}</p>
            <p>{{ getCustomerName() }}</p>
            <p>{{ selected.address1 && selected.address2 }}</p>
            <p>{{ selected.state }}</p>
            <p>{{ selected.cellphone }}</p>
          </div>
        </div>
        <div class="block p-3">
          <h6>Payment</h6>
          <div class="d-flex justify-content-between">
            <p>Subtotal</p>
            <p>$ 00.00</p>
          </div>
          <div class="d-flex justify-content-between">
            <p>Total</p>
            <p>$ 00.00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { states_hashes } from "@/data";

import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "AddOrder",
  components: { PreloaderImage },
  data: () => ({
    product: "",
    products: [],
    states_hashes,
  }),
  watch: {
    product: function () {
      this.searchProduct();
    },
  },
  computed: {
    ...mapGetters({
      selected: "admin_orders/selected",
    }),
  },
  methods: {
    searchProduct: async function () {
      const products = await this.$strapi.$http.$get(
        `/products?title=${this.text}`
      );
      console.log(products);
    },
    getCustomerName: function () {
      const { first_name, last_name } = this.selected;

      return `${first_name} ${last_name}`;
    },
    send: function () {
      /*
      this.saved = true;
      this.setUserInfo(this.userInfo);
      this.$emit("setUserInfo", this.userInfo);*/
    },
  },
};
</script>

<style scoped>
input {
  position: relative;
  border: 1px solid #000;
  border-radius: 5px;
  padding-left: 30px;
}

.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}

.search-icon {
  z-index: 1;
  left: 6px;
}
</style>