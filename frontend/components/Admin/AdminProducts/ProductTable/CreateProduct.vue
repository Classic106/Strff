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
          class="mb-3"
          ref="form"
        >
          <div class="was-validated mb-2">
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
          <div class="mb-2" :class="form.description && 'was-validated'">
            <label class="d-flex" for="description"> Description </label>
            <input
              id="description"
              type="text"
              placeholder="Enter description"
              v-model.trim="form.description"
              pattern="^[a-zA-Z\s.,-:]{10,100}$"
              autofocus="true"
              class="form-control w-100"
              min="10"
              max="100"
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
            <label class="d-flex" for="price"> Price $ </label>
            <InputDecimal
              id="price"
              class="form-control w-100"
              :value="form.price"
              v-on:setDecimal="setPrice"
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
          <div class="row mb-2">
            <div class="col-6">
              <label class="d-flex" for="title"> Dimension </label>
              <select
                v-model="form.dimension"
                required
                class="form-control w-100"
              >
                <option value="cm">cm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            <div class="col-6">
              <label class="d-flex" for="volume"> Volume </label>
              <input
                id="volume"
                type="number"
                placeholder="Volume"
                v-model.trim="form.volume"
                disabled
                autofocus="false"
                class="form-control w-100"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <label class="d-flex" for="title"> Length </label>
              <input
                id="length"
                type="number"
                placeholder="Enter length"
                v-model.trim="form.lengthy"
                required
                min="1"
                max="100"
                autofocus="true"
                class="form-control w-100"
              />
            </div>
            <div class="col-4">
              <label class="d-flex" for="width"> Width </label>
              <input
                id="width"
                type="number"
                placeholder="Enter width"
                v-model.trim="form.width"
                required
                min="1"
                max="100"
                autofocus="true"
                class="form-control w-100"
              />
            </div>
            <div class="col-4">
              <label class="d-flex" for="height"> Height </label>
              <input
                id="height"
                type="number"
                placeholder="Enter height"
                v-model.trim="form.height"
                required
                min="1"
                max="100"
                autofocus="true"
                class="form-control w-100"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="d-flex" for="weight"> Weight </label>
              <InputDecimal
                id="weight"
                class="form-control w-100"
                :value="form.weight"
                v-on:setDecimal="setWeight"
                required
              />
            </div>
            <div class="col-6">
              <label class="d-flex" for="weight_dimension">
                Weight dimension
              </label>
              <select
                id="weight_dimension"
                v-model="form.weight_dimension"
                required
                class="form-control w-100"
              >
                <option value="kilo">kilo</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="media"> Media </label>
            <UploadImages v-on:changed="handleImages" :max="5" id="media" />
          </div>
          <ChoseColor
            class="mb-2"
            :color="form.color"
            v-on:setColor="setColor"
          />
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

import InputDecimal from "~/components/Admin/common/InputDecimal.vue";
import ChoseColor from "~/components/Admin/common/ChoseColor.vue";

export default {
  name: "CreateProduct",
  components: { UploadImages, InputDecimal, ChoseColor },
  data: () => ({
    status: "null",
    form: {
      title: "",
      description: "",
      price: 0,
      lengthy: 1,
      width: 1,
      height: 1,
      volume: 1,
      weight: 1.0,
      dimension: "cm",
      weight_dimension: "kilo",
      categories: null,
      image: [],
    },
  }),
  watch: {
    form: {
      handler: function () {
        const { lengthy, width, height } = this.form;
        this.form.volume = lengthy * width * height;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({ categories: "categories/categories" }),
  },
  methods: {
    ...mapActions({ createProduct: "admin_products/createProduct" }),
    setPrice: function (val) {
      this.form.price = val;
    },
    setWeight: function (val) {
      this.form.weight = val;
    },
    setColor: function (color) {
      this.form.color = color;
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