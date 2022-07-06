<template>
  <div class="d-flex flex-column overflow-auto">
    <div
      v-if="!order_items.length && !order_bundles.length"
      class="cart p-4 d-flex justify-content-center align-items-center"
    >
      <h5 class="text-uppercase text-center">put something in the cart</h5>
    </div>
    <div v-else class="cart d-flex flex-column px-3">
      <h6 class="text-uppercase text-center mb-3">
        total price: {{ totalPrice | formatNumber }} $
      </h6>
      <ul v-if="order_items.length" class="p-0">
        <li v-for="item in order_items" :key="item.product.id" class="p-3 mb-3">
          <div class="d-flex flex-column">
            <div class="d-flex">
              <div class="w-25">
                <img
                  :src="`${getStrapiMedia(item.product.image.url)}`"
                  class="m-auto"
                />
              </div>
              <div class="d-flex flex-column px-3">
                <h6>{{ item.product.title }}</h6>
                <div>
                  <p class="mb-2 grey">
                    price {{ item.product.price | formatNumber }} $
                  </p>
                </div>
                <p v-if="item.quantity > 1">
                  total price
                  {{ (item.product.price * item.quantity) | formatNumber }} $
                </p>
              </div>
            </div>
            <div class="d-flex flex-column mt-3">
              <div class="d-flex">
                <p class="w-25 mb-2 grey">description</p>
                <p class="mb-2">{{ item.product.description }}</p>
              </div>
              <div class="d-flex">
                <p class="w-25 mb-2 grey">quantity</p>
                <div class="d-flex">
                  <button v-if="edit" v-on:click="quantityMinus(item.id)">
                    -
                  </button>
                  <p class="my-auto" :class="edit && 'mx-3'">
                    {{ item.quantity }}
                  </p>
                  <button v-if="edit" v-on:click="quantityPlus(item.id)">
                    +
                  </button>
                </div>
              </div>
              <div class="d-flex">
                <p class="w-25 mb-2 grey">category</p>
                <p
                  v-for="category in item.product.categories"
                  :key="category.id"
                  class="mr-2 mb-2"
                >
                  {{ category.name }}
                </p>
              </div>
              <div class="d-flex">
                <p class="w-25 mb-2 grey">Purchase</p>
                <p class="mb-2" v-if="!edit">
                  {{
                    purchaseTypes.filter(
                      (type) => item.purchase_type.id === type.id
                    )[0].title
                  }}
                </p>
                <PurchaseTypes
                  v-else
                  cart
                  :purType="item.purchase_type ? item.purchase_type.id : null"
                  :subType="
                    item.subscription_type ? item.subscription_type.id : null
                  "
                  v-on:setTypes="(types) => setTypes(types, item.id)"
                />
              </div>
            </div>
            <div class="w-100 d-flex justify-content-between">
              <div
                class="d-flex align-items-center pen"
                v-on:click="edit = !edit"
              >
                <span class="icon icon-pen m-2"></span>
                <p class="m-0 pl-1">{{ edit ? "save" : "edit" }}</p>
              </div>
              <span
                class="icon icon-trash m-2"
                v-on:click="removeProduct(item.id)"
              ></span>
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="order_bundles.length" class="p-0">
        <li
          v-for="(order_bundle, index) in order_bundles"
          :key="order_bundle.id"
          class="p-3 mb-3"
        >
          <div class="d-flex flex-column">
            <div class="d-flex row">
              <div v-if="(index - 1) % 2" class="col-4">
                <div
                  v-if="order_bundle.bundle.products[index + 1]"
                  class="row p-2"
                >
                  <div class="col-5 p-0">
                    <div class="m-auto p-2">
                      <img
                        :src="`${getStrapiMedia(
                          order_bundle.bundle.products[index].image.url
                        )}`"
                        class="m-auto"
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-between mt-3"
                    >
                      <span class="font-weight-light text-center">
                        {{ order_bundle.bundle.products[index].title }}
                      </span>
                      <span class="font-weight-light text-center grey">
                        ${{
                          order_bundle.bundle.products[index].price
                            | formatNumber
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="col-2 p-0 mx-auto mt-3">
                    <p class="text-center plus grey">+</p>
                  </div>
                  <div class="col-5 p-0">
                    <div class="m-auto p-2">
                      <img
                        :src="`${getStrapiMedia(
                          order_bundle.bundle.products[index + 1].image.url
                        )}`"
                        class="m-auto"
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-between mt-3"
                    >
                      <span class="font-weight-light text-center">
                        {{ order_bundle.bundle.products[index + 1].title }}
                      </span>
                      <span class="font-weight-light text-center grey">
                        ${{
                          order_bundle.bundle.products[index + 1].price
                            | formatNumber
                        }}
                      </span>
                    </div>
                  </div>
                </div>
                <div v-else class="d-flex justify-content-center">
                  <div class="col-5 p-0">
                    <div class="m-auto p-2">
                      <img
                        :src="`${getStrapiMedia(
                          order_bundle.bundle.products[index].image.url
                        )}`"
                        class="m-auto"
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-between mt-3"
                    >
                      <span class="font-weight-light text-center">
                        {{ order_bundle.bundle.products[index].title }}
                      </span>
                      <span class="font-weight-light text-center grey">
                        ${{
                          order_bundle.bundle.products[index].price
                            | formatNumber
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 d-flex flex-column col-7">
                <p class="text-uppercase font-weight-bold m-0">
                  bundle price: ${{ order_bundle.bundle.price }}
                </p>
                <p class="save-price">
                  You save: $
                  {{
                    order_bundle.bundle.price -
                    order_bundle.bundle.products.reduce(
                      (prVal, curVal) => prVal + curVal.price,
                      0
                    )
                  }}!
                </p>
              </div>
            </div>
            <div class="w-100 d-flex justify-content-end">
              <span
                class="icon icon-trash m-2"
                v-on:click="removeBundle(order_bundle.id)"
              ></span>
            </div>
          </div>
        </li>
      </ul>
      <button class="text-uppercase p-3 mt-auto" v-on:click="$emit('nextStep')">
        go to checkout
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getStrapiMedia } from "~/utils/medias";
import PurchaseTypes from "~/components/common/PurchaseTypes";

export default {
  props: ["isOpen"],
  components: { PurchaseTypes },
  data: () => ({ edit: false, totalPrice: 0 }),
  computed: {
    ...mapGetters({
      order_items: "order/getOrderItems",
      order_bundles: "order/getBundleItems",
      purchaseTypes: "purchase-types/getTypes",
    }),
  },
  watch: {
    order_items: function () {
      this.calcTotalPrice();
    },
    order_bundles: function () {
      this.calcTotalPrice();
    },
  },
  methods: {
    getStrapiMedia,
    ...mapActions({
      removeProduct: "order/removeProduct",
      updateProduct: "order/updateProduct",
      removeBundle: "order/removeBundle",
    }),
    setTypes: function (types, id) {
      const index = this.order_items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const item = { ...this.order_items[index], ...types };
        this.updateProduct(item);
      }
    },
    quantityPlus: function (id) {
      const index = this.order_items.findIndex((item) => item.id === id);
      if (index !== -1 && this.order_items[index].quantity < 99) {
        const item = { ...this.order_items[index] };
        item.quantity = item.quantity + 1;
        this.updateProduct(item);
      }
    },
    quantityMinus: function (id) {
      const index = this.order_items.findIndex((item) => item.id === id);
      if (index !== -1 && this.order_items[index].quantity > 1) {
        const item = { ...this.order_items[index] };
        item.quantity = item.quantity - 1;
        this.updateProduct(item);
      }
    },
    calcTotalPrice: function () {
      const orderItemsTotalPrice = this.order_items.reduce(
        (acc, item) => (acc += item.product.price * item.quantity),
        0
      );

      const bundlesTotalPrice = this.order_bundles.reduce(
        (acc, item) => (acc += item.bundle.price),
        0
      );

      this.totalPrice = orderItemsTotalPrice + bundlesTotalPrice;
    },
    mounted() {
      this.calcTotalPrice();
    },
  },
};
</script>

<style scoped>
.grey {
  color: #919191;
}

.close-button {
  color: #fff;
  font-size: 3rem;
  transform: rotate(45deg);
}

li {
  background: #151515;
}

h6,
p {
  text-transform: uppercase;
}

.icon {
  display: inline-block;
  width: 18px;
  height: 20px;
  background-size: cover;
}

.pen {
  color: #18b0e2;
}

.icon-pen {
  width: 20px;
  background-image: url("../../assets/icons/pen-solid.svg");
  filter: invert(66%) sepia(93%) saturate(4318%) hue-rotate(160deg)
    brightness(93%) contrast(103%);
}

.icon-trash {
  background-image: url("../../assets/icons/trash-can-solid.svg");
  filter: invert(39%) sepia(20%) saturate(3094%) hue-rotate(318deg)
    brightness(94%) contrast(92%);
}

.save-price {
  color: #5bb85d;
}

button {
  background: #18b0e2;
  color: #fff;
}
</style>