<template>
  <div class="row justify-content-center w-100">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create order</h6>
      </div>
      <div class="row">
        <div class="col-6">
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
        </div>
        <div class="col-6">
          <div class="block p-3 mb-3">
            <h6>Bundles</h6>
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
        </div>
      </div>
      <div class="block p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <h6>Customer</h6>
          <a
            href="#"
            v-if="!customer"
            v-on:click.prevent="
              !customer && $root.$emit('bv::show::modal', 'create-order-modal')
            "
            >Add customer</a
          >
        </div>
        <div v-if="!customer">
          <div class="d-flex align-items-center position-relative">
            <BIconSearch class="search-icon d-flex position-absolute" />
            <input
              v-model="customer"
              type="text"
              placeholder="Search customer"
              class="bg-grey py-1 w-100"
            />
          </div>
          <select v-if="customers.length" multiple :size="1" class="w-100">
            <option
              :value="customer.id"
              v-for="customer in customers"
              :key="customer.id"
              class="row"
            >
              <div class="col-6">{{ getCustomerName(customer) }}</div>
              <div class="col-6">{{ customer.email }}</div>
            </option>
          </select>
        </div>
        <div v-else class="row">
          <div class="col-11">
            <p>{{ getCustomerName(customer) }}</p>
            <p>{{ customer.email }}</p>
            <p>{{ customer.address1 && customer.address2 }}</p>
            <p>{{ customer.state.name }}</p>
            <p>{{ customer.zip }}</p>
            <p>{{ customer.cellphone }}</p>
          </div>
          <div class="col-1 d-flex align-items-start justify-content-center">
            <BIconX v-on:click="customer = ''" />
          </div>
        </div>
      </div>
      <div class="block p-3 mb-3">
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
      <button class="btn btn-success w-100" v-on:click="submit">
        Create order
      </button>
      <AddCustomerModal v-on:addCustomer="addCustomer" />
    </div>
  </div>
</template>

<script>
import PreloaderImage from "~/components/common/PreloaderImage.vue";
import AddCustomerModal from "./AddCustomerModal.vue";

export default {
  name: "CreateOrder",
  components: { PreloaderImage, AddCustomerModal },
  data: () => ({
    product: "",
    customer: "",
    bundle: "",
    products: [],
    bundles: [],
    customers: [],
    order: {},
  }),
  watch: {
    product: function () {
      this.searchProduct();
    },
    bundle: function () {
      this.searchBundle();
    },
  },
  methods: {
    searchProduct: async function () {
      const products = await this.$strapi.$http.$get(
        `/products?title=${this.product}`
      );
      console.log(products);
    },
    searchBundle: async function () {
      const bundles = await this.$strapi.$http.$get(
        `/bundles?title=${this.bundle}`
      );
      console.log(bundles);
    },
    searchCustomer: async function () {
      const customers = await this.$strapi.$http.$get(
        `/orders?firstName=${this.customer}&lastName=${this.customer}`
      );
      console.log(customers);
    },
    getCustomerName: function (customer) {
      const { firstName, lastName } = customer;
      return `${firstName} ${lastName}`;
    },
    addCustomer: function (customer) {
      this.customer = customer;
      console.log(customer);
    },
    submit: function () {
      const data = { ...this.order, ...customer };
      console.log(data);
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