<template>
  <div v-if="this.product !== null">
    <div class="row m-1 m-md-5">
      <div class="col-md-6 col-12 rounded pt-2 pb-2">
        <img :src="`${getStrapiMedia(product.image.url)}`" class="m-auto" />
        <RelatedProducts :product="product" />
      </div>
      <div
        class="col-md-6 col-12 pt-0 px-5 flex flex-col justify-content-between"
      >
        <div>
          <h6 class="font-weight-bold text-md-left text-center">
            {{ product.title }}
          </h6>
          <h6 class="mt-3 font-weight-normal text-md-left text-center">
            ${{ product.price | formatNumber }}
          </h6>
          <div
            class="
              d-flex
              mt-1
              mb-5
              justify-content-md-start justify-content-center
            "
          >
            <div class="d-flex">
              <div class="d-flex border position-relative quantity mr-2">
                <input
                  type="number"
                  :value="selected.quantity"
                  class="px-2 w-100"
                />
                <div
                  class="
                    d-flex
                    flex-column
                    position-absolute
                    number-input-buttons
                    justify-content-center
                  "
                >
                  <button
                    v-on:click="quantityPlus"
                    class="m-0 p-0 btn btn-light"
                  >
                    <Icon icon="angle-up" class="angle-up" />
                  </button>
                  <button
                    v-on:click="quantityMinus"
                    class="m-0 p-0 btn btn-light"
                  >
                    <Icon icon="angle-down" class="angle-down" />
                  </button>
                </div>
              </div>
              <button
                v-if="product.status === 'published'"
                class="
                  py-2
                  px-4
                  rounded
                  btn btn-dark
                  d-flex
                  justify-content-center
                  align-items-center
                  text-uppercase text-nowrap
                "
                v-on:click="addToCart"
              >
                <span class="icon icon-bag mr-2 d-none d-lg-flex"></span>
                Add to cart
              </button>

              <div class="text-center mr-5 mb-1" v-else>
                <div class="p-2" role="alert">
                  <span class="d-flex uppercase px-2 py-1 mr-3"
                    >Coming soon...</span
                  >
                  <span class="mr-2 text-left d-flex"
                    >This article is not available yet.</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              class="mt-4"
              v-for="purchaseType in purchaseTypes"
              :key="purchaseType.title"
            >
              <div class="d-flex align-items-center">
                <input
                  name="push-notifications"
                  type="radio"
                  class="mt-2 align-self-start"
                  :id="purchaseType.title"
                  :value="purchaseType.id"
                  v-model="selected.purchaseTypeId"
                  v-on:change="setOptions(purchaseType.id)"
                />
                <label
                  :for="purchaseType.title"
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
                class="position-relative"
                v-model="selected.subscriptionTypeId"
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
          <div class="mt-1 items-baseline text-gray-600">
            {{ product.description }}
          </div>
          <BundleProducts :product="product"/>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    {{ error }}
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";
//import Vue from 'vue'
import "~/utils/filters";
import Icon from "@/assets/icons";
import RelatedProducts from "~/components/products/RelatedProducts";
import BundleProducts from "~/components/products/BundleProducts";

export default {
  layout: "products",
  components: { Icon, RelatedProducts, BundleProducts },
  data() {
    return {
      product: null,
      quantities: [
        {
          title: "1 bottle",
          quantity: 1,
        },
        {
          title: "2 bottles",
          quantity: 2,
        },
      ],
      purchaseTypes: [],
      options: [],
      error: null,
      selected: {
        productId: null,
        quantity: 1,
        purchaseTypeId: null,
        subscriptionTypeId: null,
      },
    };
  },
  async mounted() {
    try {
      this.product = await this.$strapi.findOne(
        "products",
        this.$route.params.id
      );
      this.purchaseTypes = await this.$strapi.find("purchase-types");
      this.selected.productId = this.product.id;
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    quantityPlus: function () {
      if (this.selected.quantity < 99) {
        this.selected.quantity = this.selected.quantity + 1;
      }
    },
    quantityMinus: function () {
      if (this.selected.quantity > 1) {
        this.selected.quantity = this.selected.quantity - 1;
      }
    },
    change: function (e) {
      const { selectedIndex } = e.target.options;

      if (selectedIndex > -1) {
        const { id } = this.options[selectedIndex];
        this.selected.subscriptionTypeId = id;
        return;
      }
      this.selected.subscriptionTypeId = null;
    },
    setOptions: function (purchaseTypeId) {
      const item = this.purchaseTypes.filter(
        (item) => item.id === purchaseTypeId
      )[0];

      if (item && item.subscription_types.length) {
        const { id } = item.subscription_types[0];

        this.selected.subscriptionTypeId = id;
        this.options = [...item.subscription_types];
        return;
      }
      this.selected.subscriptionTypeId = null;
      this.options = [];
    },
    calcPrice: function (itemPrice, quantity) {
      const purchaseType = this.purchaseTypes.filter(
        (item) => item.id === this.selected.purchaseTypeId
      );

      const price = +itemPrice * +quantity;

      if (purchaseType.length && purchaseType[0].title) {
        const { description } = purchaseType[0];

        if (!description) return price;

        if (description.includes("%")) {
          let per = description.match(/(?<!\d)\d{1,2}(?=%)/gi)[0];

          if (per && +per > 0) {
            per = +per;
          }

          const value = (price / 100) * per;
          return price - value;
        } else if (description.includes("$")) {
          let val = description.match(/(?<!\d)\d{1,2}(?=$)/gi)[0];

          if (val && +val > 0) {
            val = +val;
          }
          return price - val;
        }
        return price;
      }
      return price;
    },
    selectOption: function (size) {
      this.selected.quantity = size.quantity;
    },
    addToCart: async function () {
      this.$store.dispatch("cart/add", this.selected);
    },
    getStrapiMedia,
  },
};
</script>

<style scoped>
.quantity {
  width: 56px;
}

.icon-bag {
  width: 14px;
  height: 14px;
  background-image: url("../../assets/icons/shopping-bag.svg");
}

.angle-up,
.angle-down {
  width: 20px;
  height: 12px;
  filter: invert(0%) sepia(100%) saturate(27%) hue-rotate(33deg)
    brightness(105%) contrast(106%);
}

.number-input-buttons {
  right: 2px;
  top: 1px;
  bottom: 1px;
}

.number-input-buttons > button {
  font-size: 11.5px;
}

select {
  margin: 5px 0;
  width: 100%;
  padding: 7px 20px 7px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 38px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 50px !important;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH4wgMBjct9/e3BgAAA0ZJREFUeNrt3M2LTXEcx/H3eBgmT5OHSEwmE+WpZoqijKLMgjwUCxZSsmAhCxZSsrOxkD9B2VrYWFCURFEUpUxEZKJpjCSZGfdaHFNjzP3euebOfTjn/aqzmnvPnO/n+5uZe77nnAFJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2dMC3AG6gYvGMaapwDXgDXAdaExTcYNAfsR2037/0/y3ozJ6mJbito0qbHi7Zd8BmA68L5BRKiwrUFweuJ3x5s8AegpkM5SmQq8Ei+BuRpvfBHwCcgVy2ZO2gq8Gi+B+xpo/C+gNmr8vrYVfDhbBw4w0fw7QFzR/V9oDuBQsgscprrsBmAf0B83vysqvwIvBInia0prnA9+Curdn7UPQ+SCM5ymrdSHwPai3M6unQWeDUF6mpMbFwI+gzi1ZH4ScDsJ5Vee1LQV+BvVtQgCcDEJ6DUypw5qWAwNBXR22/W/Hg7DekczL68UKkkleoXo22O6xHQ1C+0AyN691K4PTvDywxjbHDgfhfSSZn9eqVcGx54HVtnd8DhYIMEcyP2+qwWNeEzQ+B7TZ1tLsD8LsJZmn14r1QfN/Aa228//sDhZBH8lcvdrag+YP/jkb0AR0BYugn2S+3lClY9sYNP/nnzmAymBHEPQ3kjl7pW0OjukHsMS2lVdnEPh3knl7pWwtciyLbNfk2FLkp25xBY5he5HfRgts0+TaVMW/uzuDzyNfgWbbUxkdwSIYmKRP3ruKnJHMtS2VtSFYBEMk8/hy2VtHM4lMWUs8fVtZhu9xINj/Z2pzKpkpq4nn76smsO9DwX57qO3rEpnSRvmvwB0hvjLZaOy1pZVk7l6Oa/DHiO9NmGbctamFfx9EHbm1j2MfJ4L3v6E+707KlGL34W0M3nsqeF831bvmoBItofQ7cc+Q/juUM2UR8b34W0e89lzwuhdGWZ8aSOby0dM4ncCF4OvPjLH+F0EzyZw+V2ReMHp7YnzpWQRzgS8lLIJHxpY+s4mfyR/eHhhVejWRzO8LLYJ7RpR+Mxn7//LcMZrsaCR55nC4+TeMJJvW4W3bkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiSpCn4DQqseBNuAi3EAAAAASUVORK5CYII=");
  background-repeat: no-repeat;
  background-size: 25px;
  background-position: right 10px top 8px;
}

select::-ms-expand {
  display: none;
}

@media screen and (min-width: 0\0) {
  select {
    background: none\9;
    padding: 5px\9;
  }
}
</style>