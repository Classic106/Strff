<template>
  <div class="d-flex flex-column">
    <div class="w-100 m-0 justify-content-center" id="media">
      <label class="d-flex justify-content-between" for="logo"> Logo </label>
      <div v-if="!delivery.logo" class="mb-2">
        <UploadImages v-on:changed="handleImages" :max="1" id="logo" />
      </div>
      <div v-else class="image-wrap position-relative m-2">
        <div
          class="image-buttons position-absolute align-items-center justify-content-center"
        >
          <button
            class="btn btn-danger m-1"
            type="button"
            v-on:click="deleteImage"
          >
            delete
          </button>
        </div>
        <div id="logo">
          <PreloaderImage :image="delivery.logo.url" rounded />
        </div>
      </div>
    </div>
    <ConfirmModal :id="'confirm-delete-image'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import UploadImages from "vue-upload-drop-images";

import PreloaderImage from "~/components/common/PreloaderImage.vue";
import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";

export default {
  name: "DeliveryMedia",
  components: { PreloaderImage, ConfirmModal, UploadImages },
  props: {
    delivery: Object,
  },
  watch: {
    delivery: function () {
      this.init();
    },
  },
  methods: {
    handleImages(files) {
      this.$emit("setFile", files[0]);
    },
    deleteImage: async function () {
      this.$root.$emit("bv::show::modal", "confirm-delete-image");
    },
    confirm: function () {
      this.$emit("setLogo", null);
    },
    init: function () {
      const { logo } = this.delivery;
      this.logo = logo;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
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