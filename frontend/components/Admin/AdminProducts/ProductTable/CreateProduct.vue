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
          class="was-validated mb-3"
          ref="form"
        >
          <div class="mb-2">
            <label class="d-flex" for="title"> Title </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              v-model.trim="form.title"
              pattern="^[a-zA-Z\s.,-:]{10,100}$"
              required
              autofocus="true"
              class="form-control w-100"
            />
            <div class="invalid-feedback">
              <div class="d-flex align-items-center">
                Title must be from 10 to 100 symbols and may contain &nbsp;
                <h6>. , - :</h6>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="description"> Description </label>
            <input
              id="description"
              type="text"
              placeholder="Enter description"
              v-model.trim="form.description"
              pattern="^[a-zA-Z\s.,-:]{10,100}$"
              autofocus="true"
              class="w-100"
              min="10"
              max="100"
              :class="form.description ? 'form-control' : 'bts_input_style'"
            />
            <div v-if="form.description" class="invalid-feedback">
              <div class="d-flex align-items-center">
                Description must be from 10 to 100 symbols and may contain
                &nbsp;
                <h6>. , - :</h6>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="price"> Price </label>
            <InputMoney
              id="price"
              class="form-control w-100"
              :price="form.price"
              v-on:setPrice="setPrice"
              required
            />
            <div class="invalid-feedback">Price mustn't be zero</div>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="category"> Category </label>
            <select
              id="category"
              required
              v-model="form.categories"
              class="form-control w-100"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <div class="invalid-feedback">Category isn't chesed</div>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="published_at">Status</label>
            <select
              class="form-control w-100"
              id="published_at"
              required
              v-model="status"
            >
              <option value="published">published</option>
              <option value="null">draft</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="media"> Media </label>
            <UploadImages v-on:changed="handleImages" :max="5" id="media" />
          </div>
        </form>
        <button class="btn btn-success w-100" form="add-product-form">
          Create product
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UploadImages from "vue-upload-drop-images";

import { warn } from "~/utils/warn";
import InputMoney from "~/components/Admin/common/InputMoney.vue";

export default {
  name: "CreateProduct",
  components: { UploadImages, InputMoney },
  data: () => ({
    status: "null",
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
    setPrice: function (val) {
      this.form.price = val;
    },
    handleImages(files) {
      this.form.image = files;
    },
    submit: async function () {
      if (!this.form.image.length) {
        warn("Choose at least one image");
        return;
      }

      if (this.status === "null") {
        this.form.published_at = null;
      } else {
        this.form.published_at = new Date();
      }

      await this.createProduct(this.form);
      this.$refs.form.reset();
      this.form.image = [];
      this.status = "null";
    },
  },
};
</script>

<style scoped>
</style>