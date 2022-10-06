<template>
  <div class="row justify-content-center w-100 h-100">
    <div class="col-10 h-100 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create Product</h6>
      </div>
      <vueCustomScrollbar
        class="scroll w-100 mb-2 overflow-auto"
        :settings="scrollSettings"
      >
        <div class="block p-3">
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
                v-model="form.title"
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
                v-model="form.description"
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
      </vueCustomScrollbar>
      <button
        class="btn btn-success w-100"
        v-on:click="submit"
        form="add-product-form"
      >
        Create product
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({ categories: "categories/categories" }),
  },
  methods: {
    addFiles: function (data) {
      console.log(data);
    },
    removeFile: function (data) {
      console.log(data);
    },
    previewFiles: function (event) {
      this.image = event.target.files;
    },
    submit: function () {
      console.log(this.form);
      this.$refs.form.reset();
      this.form = {
        title: "",
        description: "",
        price: 0,
        category: "",
        image: null,
      };
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

.scroll {
  height: 80%;
}
</style>