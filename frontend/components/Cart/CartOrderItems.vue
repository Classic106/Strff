<template>
  <ul class="p-0">
    <li v-for="item in order_items" :key="item.product.id" class="p-3 mb-3">
      <div class="d-flex flex-column">
        <div class="d-flex">
          <div class="image-wrap">
            <PreloaderImage
              :classStyle="'m-auto gold-border'"
              :image="item.product.image[0].url"
            />
          </div>
          <div class="d-flex flex-column px-3">
            <h6 class="block-with-text">{{ item.product.title }}</h6>
            <div>
              <p class="mb-2 grey text-uppercase">
                price {{ item.product.price | formatNumber }} $
              </p>
            </div>
            <p v-if="item.quantity > 1">
              total price
              {{ (item.product.price * item.quantity) | formatNumber }}
              $
            </p>
          </div>
        </div>
        <div class="d-flex flex-column mt-3">
          <div class="d-flex flex-sm-row flex-column">
            <p class="w-25 mb-2 grey mr-2 text-uppercase">quantity</p>
            <div class="d-flex">
              <button
                v-if="edit"
                v-on:click="quantityMinus(item.id)"
                class="gold-background"
              >
                -
              </button>
              <p class="my-auto text-uppercase" :class="edit && 'mx-3'">
                {{ item.quantity }}
              </p>
              <button
                v-if="edit"
                v-on:click="quantityPlus(item.id)"
                class="gold-background"
              >
                +
              </button>
            </div>
          </div>
          <div class="d-flex flex-sm-row flex-column">
            <p class="w-25 mb-2 grey mr-2 text-uppercase">category</p>
            <p
              v-for="category in item.product.categories"
              :key="category.id"
              class="mr-2 mb-2"
            >
              {{ category.name }}
            </p>
          </div>
          <div class="d-flex flex-sm-row flex-column">
            <p class="w-25 mb-2 grey mr-2 text-uppercase">Purchase</p>
            <p class="mb-2" v-if="!edit">
              {{
                purchaseTypes.filter(
                  (type) => item.purchase_type === type.id
                )[0].title
              }}
            </p>
            <PurchaseTypes
              v-else
              cart
              :purType="item.purchase_type ? item.purchase_type : null"
              :subType="item.subscription_type ? item.subscription_type : null"
              v-on:setTypes="(types) => setTypes(types, item.id)"
            />
          </div>
        </div>
        <div class="w-100 d-flex justify-content-between">
          <div class="d-flex align-items-center pen" v-on:click="edit = !edit">
            <span class="icon icon-pen m-2"></span>
            <p class="m-0 pl-1 gold text-uppercase">
              {{ edit ? "save" : "edit" }}
            </p>
          </div>
          <span
            class="icon icon-trash m-2"
            v-on:click="removeProduct(item.id)"
          ></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import PreloaderImage from "~/components/PreloaderImage";
import PurchaseTypes from "~/components/common/PurchaseTypes";

export default {
  name: "CartOrderItems",
  props: {
    order_items: Array,
  },
  components: { PreloaderImage, PurchaseTypes },
  data: () => ({
    edit: false,
  }),
  computed: {
    ...mapGetters({
      purchaseTypes: "purchase-types/getTypes",
    }),
  },
  methods: {
    ...mapActions({
      removeProduct: "order/removeProduct",
      updateProduct: "order/updateProduct",
    }),
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
    setTypes: function (types, id) {
      const index = this.order_items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const item = { ...this.order_items[index], ...types };
        this.updateProduct(item);
      }
    },
  },
};
</script>

<style scoped>
.image-wrap {
  min-width: 25%;
}

.cart {
  max-width: 600px;
  z-index: 1;
  position: relative;
  background: #333333;
}

li {
  background: #151515;
}

.icon {
  display: inline-block;
  width: 18px;
  height: 20px;
  background-size: cover;
}

.icon-pen {
  width: 20px;
  background-image: url("../../assets/icons/pen-solid.svg");
  filter: invert(45%) sepia(61%) saturate(475%) hue-rotate(6deg) brightness(96%)
    contrast(95%);
}

.icon-trash {
  background-image: url("../../assets/icons/trash-can-solid.svg");
  filter: invert(39%) sepia(20%) saturate(3094%) hue-rotate(318deg)
    brightness(94%) contrast(92%);
}

button {
  color: #fff;
  border: none;
}

.block-with-text {
  /* hide text if it more than N lines  */
  overflow: hidden;
  /* for set '...' in absolute position */
  position: relative;
  /* use this value to count block height */
  line-height: 1.2em;
  /* max-height = line-height (1.2) * lines max number (3) */
  max-height: 2.4em;
  /* fix problem when last visible word doesn't adjoin right side  */
  text-align: justify;

  /*margin-right: -1em; */
  padding-right: 1em;
}

.block-with-text:before {
  /* points in the end */
  content: "...";
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of block */
  right: 0;
  bottom: 0;
}
</style>