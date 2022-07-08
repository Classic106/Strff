<template>
  <div v-if="bundleProducts" class="border-black mt-5">
    <div
      class="text-uppercase font-weight-bold p-2 w-100 bundle-products-title"
    >
      check out this bundle:
    </div>
    <div class="p-1">
      <div
        v-for="bundleProduct in bundleProducts"
        :key="bundleProduct.id"
        class="border-black p-3"
      >
        <h6 class="text-center gold">{{ bundleProduct.title }}</h6>
        <p class="text-center">{{ bundleProduct.description }}</p>
        <div
          v-for="(product, index) in bundleProduct.products"
          :key="product.id + index"
          class="class"
        >
          <div v-if="(index - 1) % 2">
            <div v-if="bundleProduct.products[index + 1]" class="row p-2">
              <div class="col-5 p-0">
                <div class="m-auto p-2">
                  <img
                    :src="`${getFirstImage(
                      bundleProduct.products[index].image
                    )}`"
                    class="m-auto gold-border"
                  />
                </div>
                <div class="d-flex flex-column justify-content-between mt-3">
                  <span class="font-weight-light text-center color-blue">
                    {{ bundleProduct.products[index].title }}
                  </span>
                  <span class="font-weight-light text-center col-black">
                    ${{ bundleProduct.products[index].price | formatNumber }}
                  </span>
                </div>
              </div>
              <div class="col-2 p-0 mx-auto mt-3">
                <p class="text-center plus">+</p>
              </div>
              <div class="col-5 p-0">
                <div class="m-auto p-2">
                  <img
                    :src="`${getFirstImage(
                      bundleProduct.products[index].image
                    )}`"
                    class="m-auto gold-border"
                  />
                </div>
                <div class="d-flex flex-column justify-content-between mt-3">
                  <span class="font-weight-light text-center color-blue">
                    {{ bundleProduct.products[index + 1].title }}
                  </span>
                  <span class="font-weight-light text-center col-black">
                    ${{
                      bundleProduct.products[index + 1].price | formatNumber
                    }}
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="d-flex justify-content-center">
              <div class="col-5 p-0">
                <div class="m-auto p-2">
                  <img
                    :src="`${getFirstImage(
                      bundleProduct.products[index].image
                    )}`"
                    class="m-auto gold-border"
                  />
                </div>
                <div class="d-flex flex-column justify-content-between mt-3">
                  <span class="font-weight-light text-center color-blue">
                    {{ bundleProduct.products[index].title }}
                  </span>
                  <span class="font-weight-light text-center col-black">
                    ${{ bundleProduct.products[index].price | formatNumber }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 d-flex flex-column">
          <p class="text-uppercase font-weight-bold text-center m-0">
            bundle price: ${{ bundleProduct.price }}
          </p>
          <p class="text-center">
            You save: $
            {{
              bundleProduct.price -
              bundleProduct.products.reduce(
                (prVal, curVal) => prVal + curVal.price,
                0
              )
            }}!
          </p>
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
            v-on:click="addToCart(bundleProduct)"
          >
            <span class="icon icon-bag mr-2 d-none d-lg-flex"></span>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getStrapiMedia } from "~/utils/medias";

export default {
  name: "BundleProducts",
  props: {
    product: Object,
  },
  data: () => ({
    bundleProducts: null,
  }),
  methods: {
    getStrapiMedia,
    ...mapActions({
      addBundle: "order/addBundle",
    }),
    getFirstImage: function (images) {
      if (images[0]) {
        return this.getStrapiMedia(images[0].url);
      }
      return this.getStrapiMedia("/uploads/image_not_found_8c8e4b17cc.jpg");
    },
    addToCart(bundle) {
      this.addBundle(bundle);
    },
  },
  async mounted() {
    try {
      const result = await this.$strapi.$bundles.findOne(
        this.product.bundle.id
      );
      this.bundleProducts = [result];
    } catch (error) {}
  },
};
</script>

<style csoped>
img,
.border-black {
  border: 1px solid #000;
}

.color-blue {
  color: #42b4e4;
}

.plus {
  font-size: 2rem;
  font-weight: bold;
}

.bundle-products-title {
  border-bottom: 1px solid #000;
  background-color: #f5f5f5;
}

.add-cart-button {
  background-color: #1f2020;
  color: #fff;
}

.icon-bag {
  width: 14px;
  height: 14px;
  background-image: url("../../assets/icons/shopping-bag.svg");
}
</style>