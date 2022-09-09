<template>
  <ul class="p-0">
    <li
      v-for="order_bundle in order_bundles"
      :key="order_bundle.id"
      class="p-3 mb-3"
    >
      <div class="d-flex flex-column">
        <div class="row">
          <div class="col-6">
            <div
              v-for="(product, index) in order_bundle.bundle.products"
              :key="product.id + index"
            >
              <div v-if="(index - 1) % 2" class="row w-100 p-0 m-0">
                <div
                  v-if="order_bundle.bundle.products[index + 1]"
                  class="row w-100 p-0 m-0"
                >
                  <div class="col-5 p-0 d-flex flex-column">
                    <div class="m-auto">
                      <PreloaderImage
                        :classStyle="'m-auto gold-border'"
                        :image="
                          order_bundle.bundle.products[index].image[0].url
                        "
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-between mt-3"
                    >
                      <span class="font-weight-light block-with-text">
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
                  <div class="col-5 p-0 d-flex flex-column">
                    <div class="m-auto">
                      <PreloaderImage
                        :classStyle="'m-auto gold-border'"
                        :image="
                          order_bundle.bundle.products[index + 1].image[0].url
                        "
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-between mt-3"
                    >
                      <span class="font-weight-light block-with-text">
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
                  <div class="col-5 p-0 d-flex flex-column">
                    <div class="m-auto">
                      <PreloaderImage
                        :classStyle="'m-auto gold-border'"
                        :image="
                          order_bundle.bundle.products[index].image[0].url
                        "
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-between mt-3"
                    >
                      <span class="font-weight-light block-with-text">
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
            </div>
          </div>
          <div class="mt-4 d-flex flex-column col-6">
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
</template>

<script>
import { mapActions } from "vuex";

import PreloaderImage from "~/components/PreloaderImage";

export default {
  name: "OrderBundles",
  props: {
    order_bundles: Array,
  },
  components: { PreloaderImage },
  methods: {
    ...mapActions({
      removeBundle: "order/removeBundle",
    }),
  },
};
</script>

<style scoped>
li {
  background: #151515;
}

.image-wrap {
  min-width: 25%;
}

.save-price {
  color: #5bb85d;
}

.icon-trash {
  display: inline-block;
  width: 18px;
  height: 20px;
  background-size: cover;
  background-image: url("../../assets/icons/trash-can-solid.svg");
  filter: invert(39%) sepia(20%) saturate(3094%) hue-rotate(318deg)
    brightness(94%) contrast(92%);
}

.block-with-text {
  overflow: hidden;
  line-height: 1.2em;
  max-height: 2.4em;
  text-align: center;
}
</style>