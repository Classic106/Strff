<template>
  <main>
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
                :show-arrows="images.length > 5"
                :loop="true"
                :slides-per-page="5"
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
        </div>
        <div
          class="
            col-md-6 col-12
            pt-0
            pl-md-5
            py-2
            flex flex-col
            justify-content-between
          "
        >
          <div>
            <h5
              v-html="colorTitleNumbers(product.title)"
              class="font-weight-bold text-md-left text-uppercase"
            ></h5>
            <h6
              class="
                product-price
                mt-3
                font-weight-bold
                text-md-left text-center
              "
            >
              <span class="position-relative" :class="discount && 'cross-out'"
                >${{ calcPrice() | formatNumber }}</span
              >
            </h6>
            <div v-if="discount" class="d-flex align-items-center">
              <h6 class="m-0 font-weight-bold text-md-left text-center">
                ${{ calcDiscoutPrice() | formatNumber }}
              </h6>
              <div class="d-flex ml-3 position-relative align-items-center">
                <span class="icon-tag"></span>
                <span class="discount position-absolute gold-background">{{
                  discount
                }}</span>
              </div>
            </div>
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
              {{ product.description }}
            </div>
            <div
              v-if="included.length"
              class="mt-1 items-baseline text-gray-600"
            >
              <span class="gold font-weight-bold">Included:</span>
              <ul class="included d-flex flex-column p-0">
                <li v-for="include in included" :key="include">
                  {{ include }}
                </li>
              </ul>
            </div>
            <BundleProducts :product="product" />
          </div>
        </div>
      </div>
      <RelatedProducts :product="product" />
    </div>
  </main>
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
  layout: "header_without_text_bunner",
  components: { Icon, RelatedProducts, BundleProducts, PurchaseTypes },
  data: () => ({
    product: null,
    options: [],
    error: null,
    images: [],
    discount: null,
    included: [],
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

      if (this.product.included) {
        this.included = this.product.included;
      }
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
      this.calcDiscoutPrice();
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
    calcPrice: function () {
      const { product, quantity } = this.selected;
      return product.price * quantity;
    },
    calcDiscoutPrice: function () {
      const { product, quantity } = this.selected;

      const purchaseType = this.purchaseTypes.filter(
        (item) => item.id === this.selected.purchase_type
      );

      const price = product.price * quantity;

      if (purchaseType.length && purchaseType[0].title) {
        const { description } = purchaseType[0];

        if (!description) {
          this.discount = null;
          return price;
        }

        if (description.includes("%")) {
          let per = description.match(/(?<!\d)\d{1,2}(?=%)/gi)[0];

          if (per && +per > 0) {
            per = +per;
          }

          this.discount = `${per}%`;
          const value = (price / 100) * per;
          return price - value;
        } else if (description.includes("$")) {
          let val = description.match(/(?<!\d)\d{1,2}(?=$)/gi)[0];

          if (val && +val > 0) {
            val = +val;
          }
          this.discount = `${val}$`;
          return price - val;
        }

        this.discount = null;
        return price;
      }

      this.discount = null;
      return price;
    },
    addToCart: async function () {
      this.$store.dispatch("order/addProduct", this.selected);
    },
  },
};
</script>

<style scoped>
.icon-tag {
  display: inline-block;
  min-width: 44px;
  height: 50px;
  background-size: cover;
  transform: rotate(-45deg);
  filter: invert(45%) sepia(61%) saturate(475%) hue-rotate(6deg) brightness(96%)
    contrast(95%);
  background-image: url("../../assets/icons/tag-solid.svg");
}

.discount {
  left: 15px;
  color: white;
  padding: 0 5px 1px 0;
  border-radius: 0 10px 10px 0;
}

.product-price > span.cross-out::before {
  position: absolute;
  content: "";
  display: block;
  width: 140%;
  height: 3px;
  top: 50%;
  left: -20%;
  transform: rotate(-14deg);
  background-color: #9e7d24;
}

.add-cart-button {
  background-color: #1f2020;
  color: #fff;
}

.quantity {
  width: 56px;
}

.icon-bag {
  width: 14px;
  height: 14px;
  background-image: url("../../assets/icons/shopping-bag.svg");
  filter: invert(98%) sepia(98%) saturate(0%) hue-rotate(326deg)
    brightness(103%) contrast(102%);
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

.included > li:first-child {
  margin-top: 10px;
}

.image-wrapper > .image {
  cursor: pointer;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 100%;
}
</style>