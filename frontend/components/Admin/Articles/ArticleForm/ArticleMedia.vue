<template>
  <div class="row w-100 m-0 justify-content-center">
    <div class="image-wrap col-5 position-relative m-2">
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
          v-on:click="setImageIndex(0)"
        >
          show
        </button>
        <button
          class="btn btn-danger m-1"
          type="button"
          v-on:click="deleteFromImages(0)"
        >
          delete
        </button>
      </div>
      <PreloaderImage v-if="image" :image="image" rounded />
    </div>
    <ConfirmModal :id="'confirm-delete-image'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getStrapiMedia } from "~/utils/medias";

import PreloaderImage from "~/components/common/PreloaderImage.vue";
import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";

export default {
  name: "ArticleMedia",
  components: { PreloaderImage, ConfirmModal },
  data: () => ({
    image: "",
  }),
  computed: {
    ...mapGetters({
      selected: "admin_articles/selected",
    }),
  },
  watch: {
    selected: {
      handler() {
        if (this.selected) {
          this.image = this.getStrapiMedia(this.selected.image.url);
          this.setImages([this.image]);
        }
      },
      deep: true,
    },
  },
  methods: {
    getStrapiMedia,
    ...mapActions({
      updateArticle: "admin_articles/updateArticle",
    }),
    ...mapMutations({
      updateSelectedImages: "admin_products/updateSelectedImages",
      setImages: "cool_light_box/setImages",
      setImageIndex: "cool_light_box/setImageIndex",
    }),
    deleteFromImages: async function (index) {
      this.removeImageIndex = index;
      this.$root.$emit("bv::show::modal", "confirm-delete-image");
    },

    confirm: async function () {
      const article = { ...this.selected, image: null };
      await this.updateArticle(article);
    },
  },
  mounted() {
    if (this.selected) {
      this.image = this.getStrapiMedia(this.selected.image.url);
      this.setImages([this.image]);
    }
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