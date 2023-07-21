<template>
  <div class="h-100">
    <div class="bestseller-scroll d-flex flex-column overflow-hidden px-4">
      <vueCustomScrollbar class="mt-3 overflow-auto" :settings="itemsSettings">
        <h6 class="p-3 text-center">BEST SELLERS</h6>
        <div class="row px-3">
          <div
            v-for="bestSeller in best_sellers"
            :key="bestSeller.id"
            class="product col-12 col-sm-6 mb-3"
          >
            <a
              v-on:click.prevent="redirect(`/products/${bestSeller.slug}`)"
              class="h-100"
            >
              <div class="d-flex flex-column h-100">
                <PreloaderImage
                  :classStyle="'my-auto'"
                  :image="bestSeller.image[0].url"
                />
                <div class="d-flex flex-column">
                  <span class="col-white d-flex justify-content-center"
                    >{{ bestSeller.price }} $</span
                  >
                  <span
                    class="
                      text-ellipsis text-upprcase
                      gold
                      text-center text-sm-left
                    "
                    >{{ bestSeller.title }}</span
                  >
                </div>
              </div>
            </a>
          </div>
        </div>
      </vueCustomScrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PreloaderImage from "~/components/PreloaderImage";

export default {
  name: "SearchBestSellers",
  components: { PreloaderImage },
  data: () => ({
    itemsSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      best_sellers: "best_sellers/best_sellers",
    }),
  },
};
</script>

<style scoped>
@media (min-width: 300px) {
  .product.col-sm-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

.bestseller-scroll {
  height: calc(100% - 80px);
}
</style>