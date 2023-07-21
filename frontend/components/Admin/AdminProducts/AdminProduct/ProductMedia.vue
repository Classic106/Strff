<template>
  <div class="block d-flex flex-column">
    <label class="d-flex font-weight-bold p-2" for="media">Media</label>
    <div class="row w-100 m-0 justify-content-center" id="media">
      <div class="col-12 mb-2">
        <label class="btn btn-primary w-100">
          <i class="fa fa-image"></i> Add<input
            type="file"
            style="display: none"
            name="image"
            accept="image/*"
            multiple
            v-on:change="addFile"
          />
        </label>
      </div>
      <div
        class="image-wrap col-5 position-relative m-2"
        v-for="(image, index) in images"
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
            type="button"
            v-on:click="setImageIndex(index)"
          >
            show
          </button>
          <button
            class="btn btn-danger m-1"
            type="button"
            v-on:click="deleteFromImages(index)"
          >
            delete
          </button>
        </div>
        <PreloaderImage :image="image.url" rounded />
      </div>
    </div>
    <ConfirmModal :id="'confirm-delete-image'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

import { getStrapiMedia } from "~/utils/medias";
import { warn } from "~/utils/warn";

import PreloaderImage from "~/components/common/PreloaderImage.vue";
import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";

export default {
  name: "ProductMedia",
  components: { PreloaderImage, ConfirmModal },
  data: () => ({
    images: [],
    removeImageIndex: null,
  }),
  computed: {
    ...mapGetters({
      selected: "admin_products/selected",
    }),
  },
  watch: {
    selected: {
      handler() {
        this.images = [...this.selected.image];
        const images = this.images.map((item) => this.getStrapiMedia(item.url));
        this.setImages(images);
      },
      deep: true,
    },
  },
  methods: {
    getStrapiMedia,
    ...mapActions({
      updateProduct: "admin_products/updateProduct",
    }),
    ...mapMutations({
      updateSelectedImages: "admin_products/updateSelectedImages",
      setImages: "cool_light_box/setImages",
      setImageIndex: "cool_light_box/setImageIndex",
    }),
    addFile: async function (e) {
      const { files } = e.target;

      for (let i = 0; i < files.length; i++) {
        const isImage = [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg",
        ].includes(files[i]["type"]);
        if (!isImage) {
          warn("Only jpg/jpeg/jpg/png files are allowed!");
          return;
        }
      }

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i], files[i].name);
      }

      const product = {
        ...this.selected,
        image: this.images,
        files: formData,
      };

      await this.updateProduct(product);
    },
    deleteFromImages: async function (index) {
      if (this.images.length <= 1) {
        warn("There is must be at least one image");
        return;
      }
      this.removeImageIndex = index;
      this.$root.$emit("bv::show::modal", "confirm-delete-image");
    },

    confirm: async function () {
      this.images.splice(this.removeImageIndex, 1);
      this.removeImageIndex = null;

      const product = { ...this.selected, image: this.images };
      await this.updateProduct(product);
    },
  },
  mounted() {
    this.images = [...this.selected.image];
    const images = this.images.map((item) => this.getStrapiMedia(item.url));
    this.setImages(images);
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