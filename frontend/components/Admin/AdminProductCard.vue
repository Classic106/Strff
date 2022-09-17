<template>
  <div class="d-flex flex-column justify-content-between h-100">
    <nuxt-link
      :to="`admin/product/${product.id}`"
      class="h-100 d-flex flex-column"
    >
      <PreloaderImage
        :classStyle="'mb-2 w-100 my-auto'"
        :image="product.image[0].url"
        rounded
      />
      <div class="mb-0 mt-auto">
        <h6
          class="
            text-ellipsis
            col-black
            text-upprcase
            m-2
            mb-4
            text-uppercase text-nowrap
          "
        >
          {{ product.title }}
        </h6>
      </div>
    </nuxt-link>
    <button
      class="w-100 btn btn-danger p-0"
      v-on:click.self="removeProduct(product.id)"
    >
      <span class="icon icon-trash m-2"></span>
    </button>
  </div>
</template>

<script>
import PreloaderImage from "~/components/PreloaderImage";

export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
  components: { PreloaderImage },
  methods: {
    removeProduct: function (id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
.content {
  margin-left: 35px;
  margin-right: 35px;
}

.price {
  font-size: 1.5rem;
}

.icon-trash {
  display: inline-block;
  width: 15px;
  height: 17px;
  background-size: cover;
  background-image: url("../../assets/icons/trash-can-solid.svg");
  filter: invert(95%) sepia(95%) saturate(0%) hue-rotate(217deg)
    brightness(106%) contrast(107%);
}
</style>
