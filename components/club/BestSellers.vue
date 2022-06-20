<template>
  <div class="d-flex flex-column">
    <h6 class="p-3 pb-5 text-center col-black">BEST SELLERS</h6>
    <div class="row flex-column flex-md-row justify-content-center">
      <div
        v-for="product in products"
        :key="product.id"
        class="col col-md-5 col-lg-3"
      >
        <nuxt-link :to="`/products/${product.slug}`">
          <img
            v-lazy
            class="mb-2"
            src="~/assets/img/placeholder-image.png"
            :data-src="`${getStrapiMedia(product.image.url)}`"
          />

          <a class="card-info col-black d-flex justify-content-between mb-4">
            <span>{{ product.price }} $</span>
            <span class="text-upprcase">{{ product.title }}</span>
          </a>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  data: () => ({
    products: [],
    error: null,
  }),
  async mounted() {
    try {
      const result = await this.$strapi.$bestsellers.find();
      this.products = result[0].products;
    } catch (error) {
      this.error = error;
    }
  },
  directives: {
    lazy: {
      inserted: (el) => {
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              observer.unobserve(el);
            }
          });
        });
        observer.observe(el);
      },
    },
  },
  methods: { getStrapiMedia },
};
</script>

<style>
</style>