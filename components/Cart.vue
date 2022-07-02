<template>
  <div class="d-flex flex-column overflow-auto">
    <div
      v-if="!orderItems.length"
      class="cart p-4 d-flex justify-content-center align-items-center"
    >
      <h5 class="text-uppercase text-center">put something in the cart</h5>
    </div>
    <div v-else class="cart d-flex flex-column px-3">
      <ul class="p-0">
        <li
          v-for="product in orderItems"
          :key="product.product"
          class="p-3 mb-3"
        >
          <div class="d-flex flex-column">
            <div class="d-flex">
              <div class="w-25">
                <img
                  :src="`${getStrapiMedia(product.item.image.url)}`"
                  class="m-auto"
                />
              </div>
              <div class="d-flex flex-column px-3">
                <h6>{{ product.item.title }}</h6>
                <div>
                  <p class="mb-2 grey">price {{ product.item.price }} $</p>
                </div>
                <p v-if="product.quantity > 1">
                  total price {{ product.item.price * product.quantity }} $
                </p>
              </div>
            </div>
            <div class="d-flex flex-column mt-3">
              <div class="d-flex">
                <p class="w-25 mb-2 grey">description</p>
                <p class="mb-2">{{ product.item.description }}</p>
              </div>
              <div class="d-flex">
                <p class="w-25 mb-2 grey">quantity</p>
                <div class="d-flex">
                  <button
                    v-if="edit"
                    v-on:click="quantityMinus(product.item.id)"
                  >
                    -
                  </button>
                  <p class="my-auto" :class="edit && 'mx-3'">
                    {{ product.quantity }}
                  </p>
                  <button
                    v-if="edit"
                    v-on:click="quantityPlus(product.item.id)"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="d-flex">
                <p class="w-25 mb-2 grey">category</p>
                <p
                  v-for="category in product.item.categories"
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
                      (item) => product.purchase_type === item.id
                    )[0].title
                  }}
                </p>
                <PurchaseTypes
                  v-else
                  cart="cart"
                  v-on:setTypes="(types) => setTypes(types, product.item.id)"
                />
              </div>
            </div>
            <div class="w-100 d-flex justify-content-between">
              <div
                class="d-flex align-items-center pen"
                v-on:click="edit = !edit"
              >
                <span class="icon icon-pen m-2"></span>
                <p class="m-0 pl-1">edit</p>
              </div>
              <span
                class="icon icon-trash m-2"
                v-on:click="removeProduct(product.item.id)"
              ></span>
            </div>
          </div>
        </li>
      </ul>
      <button class="text-uppercase p-3 mt-auto">go to checkout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getStrapiMedia } from "~/utils/medias";
import PurchaseTypes from "~/components/common/PurchaseTypes";

export default {
  props: ["isOpen"],
  components: { PurchaseTypes },
  data: () => ({ edit: false, orderItems: [] }),
  computed: {
    ...mapGetters({
      order_items: "cart/getOrderItems",
      purchaseTypes: "purchase-types/getTypes",
    }),
  },
  watch: {
    order_items: function () {
      this.orderItems = this.order_items;
    },
  },
  methods: {
    getStrapiMedia,
    ...mapMutations({
      removeProduct: "cart/removeProduct",
      updateProduct: "cart/updateProduct",
    }),
    setTypes: function (types, id) {
      const index = this.order_items.findIndex((item) => item.product === id);
      if (index !== -1) {
        const item = { ...this.order_items[index], ...types };
        this.updateProduct(item);
      }
    },
    quantityPlus: function (id) {
      const index = this.order_items.findIndex((item) => item.product === id);
      if (index !== -1 && this.order_items[index].quantity < 99) {
        const item = { ...this.order_items[index] };
        item.quantity = item.quantity + 1;
        this.updateProduct(item);
      }
    },
    quantityMinus: function (id) {
      const index = this.order_items.findIndex((item) => item.product === id);
      if (index !== -1 && this.order_items[index].quantity > 1) {
        const item = { ...this.order_items[index] };
        item.quantity = item.quantity - 1;
        this.updateProduct(item);
      }
    },
  },
};
</script>

<style scoped>
.grey {
  color: #919191;
}

.cart {
  height: 90vh;
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
  background-image: url("../assets/icons/pen-solid.svg");
  filter: invert(66%) sepia(93%) saturate(4318%) hue-rotate(160deg)
    brightness(93%) contrast(103%);
}

.icon-trash {
  background-image: url("../assets/icons/trash-can-solid.svg");
  filter: invert(39%) sepia(20%) saturate(3094%) hue-rotate(318deg)
    brightness(94%) contrast(92%);
}

button {
  background: #18b0e2;
  color: #fff;
}
</style>