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
            <select required v-model="form.category" class="w-100">
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
            <label class="d-flex" for="last-name"> Media </label>
            <Dropzone
              id="foo"
              ref="el"
              :options="options"
              destroyDropzone
              duplicateCheck
              v-on:vdropzone-files-added="addFiles"
              v-on:vdropzone-removed-file="removeFile"
            ></Dropzone>
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
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";

export default {
  name: "CreateProduct",
  components: { Dropzone },
  data: () => ({
    form: {
      title: "",
      description: "",
      price: 0,
      category: "",
      image: null,
    },
    options: {
      url: "http://httpbin.org/anything",
      uploadMultiple: true,
    },
  }),
  computed: {
    ...mapGetters({ categories: "categories/categories" }),
  },
  methods: {
    ...mapActions({ createProduct: "admin_products/createProduct" }),
    addFiles: function (data) {
      console.log(data);
    },
    removeFile: function (data) {
      console.log(data);
    },
    previewFiles: function (event) {
      this.image = event.target.files;
    },
    submit: async function () {
      await this.createProduct(this.form);
      this.$refs.form.reset();
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