<template>
  <div class="row justify-content-center w-100 h-100 m-0">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create Product</h6>
      </div>
      <div class="block p-3 mb-3">
        <form
          id="add-product-form"
          v-on:submit.stop.prevent="submit"
          ref="form"
        >
          <div class="mb-2">
            <label class="d-flex" for="last-name"> Title </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              v-model.trim="form.title"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
          <div class="mb-2">
            <label class="d-flex" for="last-name"> Description </label>
            <input
              id="description"
              type="text"
              placeholder="Enter description"
              v-model.trim="form.description"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
          <div class="mb-2">
            <label class="d-flex" for="last-name"> Price </label>
            <input
              id="price"
              type="number"
              placeholder="Enter price"
              v-model="form.price"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
          <div class="mb-2">
            <label class="d-flex" for="last-name"> Category </label>
            <select required v-model="form.categories" class="w-100">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="media"> Media </label>
            <UploadImages v-on:changed="handleImages" :max="5" id="media" />
          </div>
        </form>
      </div>
      <button class="btn btn-success w-100" form="add-product-form">
        Create product
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import UploadImages from "vue-upload-drop-images";

export default {
  name: "CreateProduct",
  components: { UploadImages },
  data: () => ({
    form: {
      title: "",
      description: "",
      price: 0,
      categories: null,
      image: [],
    },
  }),
  computed: {
    ...mapGetters({ categories: "categories/categories" }),
  },
  methods: {
    ...mapActions({ createProduct: "admin_products/createProduct" }),
    handleImages(files) {
      this.form.image = files;
    },
    submit: async function () {
      await this.createProduct(this.form);
      this.$refs.form.reset();
      this.form.image = [];
    },
  },
};
</script>

<style scoped>
input {
  position: relative;
  border: 1px solid #000;
  border-radius: 5px;
}

.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}
</style>