<template>
  <div class="row w-100 justify-content-center m-0 mt-3">
    <div class="d-flex flex-column col-md-6 col-12">
      <div class="d-flex align-items-center">
        <button v-on:click="clearSelectedProducts()" class="button">
          <BIconArrowLeft />
        </button>
        <p class="text-ellipsis m-0 ml-2">{{ title }}</p>
        <button
          class="border-left"
          v-on:click="setPreviousProduct"
          :disabled="!previous"
        >
          <BIconChevronLeft />
        </button>
        <button
          class="border-right"
          v-on:click="setNextProduct"
          :disabled="!next"
        >
          <BIconChevronRight />
        </button>
      </div>
      <div class="d-flex">
        <div class="w-75">
          <div class="d-flex flex-column">
            <div class="block d-flex flex-column p-2 mt-2">
              <p class="font-weight-bold">Title</p>
              <input type="text" v-model="title" />
            </div>
            <div class="block d-flex flex-column p-2 mt-2">
              <p class="font-weight-bold">Media</p>
              <div class="row w-100 m-0 justify-content-center">
                <div class="col-12 mb-2">
                  <label class="btn btn-primary w-100">
                    <i class="fa fa-image"></i> Add<input
                      type="file"
                      style="display: none"
                      name="image"
                    />
                  </label>
                </div>
                <div
                  class="image-wrap col-5 position-relative m-2"
                  v-for="(image, index) in selected.image"
                  :key="image.id"
                >
                  <div
                    class="
                      image-buttons
                      position-absolute
                      align-items-center
                      justify-content-center
                    "
                  >
                    <button
                      class="btn btn-primary m-1"
                      v-on:click="setImageIndex(index)"
                    >
                      show
                    </button>
                    <button class="btn btn-danger m-1">delete</button>
                  </div>
                  <PreloaderImage :image="image.url" rounded />
                </div>
              </div>
            </div>
            <button class="btn btn-danger text-uppercase my-2">
              delete product
            </button>
          </div>
        </div>
        <div class="d-flex flex-column ml-2">
          <div class="block d-flex flex-column p-2 mt-2">
            <p class="font-weight-bold">Product status</p>
            <select name="" id="">
              <option value="">published</option>
              <option value="">unpublisched</option>
            </select>
          </div>
          <div class="block d-flex flex-column p-2 mt-2">
            <p class="font-weight-bold">Categories</p>
            <select name="" id="">
              <option value="">1</option>
              <option value="">2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { getStrapiMedia } from "~/utils/medias";
import { prevCurrNextItems } from "~/helpers";

import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "AdminProduct",
  components: { PreloaderImage },
  data: () => ({
    title: "",
    images: [],
  }),
  watch: {
    selected: function () {
      const { image } = this.selected;
      const images = image.map((item) => this.getStrapiMedia(item.url));
      this.setImages(images);
    },
  },
  computed: {
    ...mapGetters({
      products: "admin_products/products",
      previous: "admin_products/previous",
      selected: "admin_products/selected",
      next: "admin_products/next",
    }),
  },
  methods: {
    getStrapiMedia,
    prevCurrNextItems,
    ...mapMutations({
      clearSelectedProducts: "admin_products/clearSelectedProducts",
      setSelectedProducts: "admin_products/setSelectedProducts",
      setImages: "cool_light_box/setImages",
      setImageIndex: "cool_light_box/setImageIndex",
    }),
    setNextProduct: function () {
      const index = this.findIndex();
      const result = this.prevCurrNextItems(
        this.products[index + 1],
        this.products
      );

      this.setSelectedProducts(result);
    },
    setPreviousProduct: function () {
      const index = this.findIndex();
      const result = this.prevCurrNextItems(
        this.products[index - 1],
        this.products
      );

      this.setSelectedProducts(result);
    },
    findIndex: function () {
      return this.products.findIndex((item) => item.id === this.selected.id);
    },
  },
  mounted() {
    const { title, image } = this.selected;

    this.title = title;
    const images = image.map((item) => this.getStrapiMedia(item.url));
    this.setImages(images);
  },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  background: none;
}

.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}

.border-left {
  border-radius: 5px 0 0 5px;
  border: 1px solid #000;
}

.border-right {
  border-radius: 0 5px 5px 0;
  border: 1px solid #000;
}

.image-wrap > .image-buttons {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.663);
}

.image-wrap:hover > .image-buttons {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
</style>