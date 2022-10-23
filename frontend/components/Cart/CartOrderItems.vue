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
            <p class="w-25 mb-2 grey mr-2 text-uppercase">Quantity</p>
            <div class="d-flex" v-if="isEdit">
              <button
                v-if="isEdit"
                v-on:click="quantityMinus()"
                class="gold-background"
              >
                -
              </button>
              <p class="my-auto text-uppercase" :class="isEdit && 'mx-3'">
                {{ selectedItem.quantity }}
              </p>
              <button
                v-if="isEdit"
                v-on:click="quantityPlus()"
                class="gold-background"
              >
                +
              </button>
            </div>
            <div class="d-flex" v-else>
                {{ item.quantity }}
            </div>
          </div>
          <div class="d-flex flex-sm-row flex-column">
            <p class="w-25 mb-2 grey mr-2 text-uppercase">Category</p>
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
            <p class="mb-2" v-if="!isEdit">
              {{ item.purchase_type.title + (item.subscription_type? ' - ' + item.subscription_type.title: '') }}
            </p>
            <PurchaseTypes
              v-else
              cart
              :purType="item.purchase_type ? item.purchase_type.id : null"
              :subType="item.subscription_type ? item.subscription_type.id : null"
              v-on:setTypes="(types) => setTypes(types, item.id)"
            />
          </div>
        </div>
        <div class="w-100 d-flex justify-content-between">
          <div class="d-flex align-items-center pen" v-on:click="editOrSaveItem(item)">
            <span class="icon icon-pen m-2"></span>
            <p class="m-0 pl-1 gold text-uppercase">
              {{ isEdit ? "save" : "edit" }}
            </p>
          </div>
          <span
            class="icon icon-trash m-2"
            v-on:click="removeItemFromCart(item)"
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
    isEdit: false,
    purchaseTypes: [],
    selectedItem: {
        id: null,
        quantity: 0,
        purchaseTypeId: null,
        subscriptionTypeId: null,
        orderId: null
    }
  }),
  methods: {
    quantityPlus() {
        if (this.selectedItem.quantity < 99) {
            this.selectedItem.quantity += 1
        }
    },
    quantityMinus() {
        if (this.selectedItem.quantity > 1) {
            this.selectedItem.quantity -= 1
        }
    },
    setTypes: function (types, id) {
        this.selectedItem.purchaseTypeId = types.purchase_type;
        this.selectedItem.subscriptionTypeId = types.subscription_type;
    },
    removeItemFromCart(item) {
        this.$store.dispatch('order/removeItem', item);
    },
    editOrSaveItem(item) {
        if (this.isEdit) {
            console.log(this.selectedItem);
            this.updateCart(this.selectedItem);
            this.isEdit = false;
        } else {
            this.selectedItem.id = item.id;
            this.selectedItem.quantity = item.quantity;
            this.selectedItem.purchaseTypeId = item.purchase_type.id? item.purchase_type: null;
            this.selectedItem.subscriptionTypeId = item.subscription_type? item.subscription_type.id: null;
            this.orderId = item.order.id;
            this.isEdit = true;
        }
    },
    updateCart: async function (data) {
        this.$store.dispatch("order/updateItem", data);
    }
  },
  async mounted () {
    this.purchaseTypes = await this.$strapi.find('purchase-types');
  }
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

.pen {
  cursor: pointer;
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