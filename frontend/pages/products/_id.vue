<template>
  <div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="this.product !== null">
      <div class="row m-1 m-md-5">
        <div class="col-md-6 col-12 rounded pt-2 pb-2">
          <div class="m-auto images-wrapper">
            <CoolLightBox
              :items="images"
              :index="imageIndex"
              :loop="true"
              @close="imageIndex = null"
            />
            <div class="image-wrapper">
              <div
                class="image"
                @click="imageIndex = index"
                :style="{ backgroundImage: `url(${images[index]})` }"
              ></div>
              <ssr-carousel
                class="all-images mt-3"
                :show-arrows="images.length > 6"
                :loop="true"
              >
                <div
                  class="image-wrapper slide mr-2"
                  v-for="(image, imageIndex) in images"
                  :key="imageIndex"
                  :index="imageIndex"
                >
                  <div
                    class="image gold-border"
                    v-on:click="index = imageIndex"
                    :style="{ backgroundImage: `url(${image})` }"
                  ></div>
                </div>
              </ssr-carousel>
            </div>
          </div>
          <RelatedProducts :product="product" />
        </div>
        <div
          class="
            col-md-6 col-12
            pt-0
            px-5
            flex flex-col
            justify-content-between
          "
        >
          <div>
            <h6
              v-html="colorTitleNumbers(product.title)"
              class="font-weight-bold text-md-left text-center"
            ></h6>
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
                    add-cart-button
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
            <PurchaseTypes
              v-on:setTypes="setTypes"
              :purType="selected.purchase_type"
              :subType="selected.subscription_type"
            />
            <div class="mt-1 items-baseline text-gray-600">
              <span class="gold font-weight-bold">Description:</span>
              {{ product.description }}
            </div>
            <BundleProducts :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { getStrapiMedia } from "~/utils/medias";
import { colorTitleNumbers } from "~/helpers";

import "~/utils/filters";
import Icon from "@/assets/icons";
import RelatedProducts from "~/components/products/RelatedProducts";
import BundleProducts from "~/components/products/BundleProducts";
import PurchaseTypes from "~/components/common/PurchaseTypes";

export default {
  layout: "club",
  components: { Icon, RelatedProducts, BundleProducts, PurchaseTypes },
  data: () => ({
    product: null,
    options: [],
    error: null,
    images: [],
    selected: {
      product: null,
      quantity: 1,
      purchase_type: 1,
      subscription_type: null,
      total: 0,
    },
    index: 0,
    imageIndex: null,
  }),
  computed: {
    ...mapGetters({
      purchaseTypes: "purchase-types/getTypes",
    }),
  },
  async mounted() {
    try {
      this.product = await this.$strapi.findOne(
        "products",
        this.$route.params.id
      );

      this.selected.product = this.product;
      this.selected.total = this.product.price;
      this.images = this.product.image.map((item) => this.getImage(item));
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    getStrapiMedia,
    colorTitleNumbers,
    getImage: function (image) {
      if (image.url) {
        return this.getStrapiMedia(image.url);
      }
      return this.getStrapiMedia("/uploads/image_not_found_8c8e4b17cc.jpg");
    },
    setTypes: function (types) {
      this.selected = { ...this.selected, ...types };
    },
    quantityPlus: function () {
      if (this.selected.quantity < 99) {
        this.selected.quantity = this.selected.quantity + 1;
        this.selected.total = this.selected.quantity * this.product.price;
      }
    },
    quantityMinus: function () {
      if (this.selected.quantity > 1) {
        this.selected.quantity = this.selected.quantity - 1;
        this.selected.total = this.selected.quantity * this.product.price;
      }
    },
    calcPrice: function (itemPrice, quantity) {
      const purchaseType = this.purchaseTypes.filter(
        (item) => item.id === this.selected.purchase_type
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
    addToCart: async function () {
      this.$store.dispatch("order/addProduct", this.selected);
    },
  },
};
</script>

<style scoped>
.add-cart-button {
  background-color: #1f2020;
  color: #fff;
}

.quantity {
  width: 56px;
}

.image-wrapper.slide {
  width: 15%;
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