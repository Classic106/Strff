<template>
  <form class="d-flex flex-column" v-on:submit.stop.prevent="submit">
    <div class="block d-flex flex-column p-2 mt-2">
      <label class="d-flex font-weight-bold" for="name">Name</label>
      <input
        id="name"
        type="text"
        required
        v-model.trim="currentArticle.name"
      />
    </div>
    <div class="block d-flex flex-column p-2 mt-2">
      <label class="d-flex font-weight-bold" for="title">Title</label>
      <input
        id="title"
        type="text"
        required
        v-model.trim="currentArticle.title"
      />
    </div>
    <div class="block d-flex flex-column p-2 mt-2">
      <label class="d-flex font-weight-bold" for="article">Article</label>
      <textarea
        id="article"
        type="text"
        required
        v-model.trim="currentArticle.article"
      />
    </div>
    <div class="block d-flex flex-column p-2 mt-2">
      <label class="d-flex font-weight-bold" for="published_at"
        >Article status</label
      >
      <select id="published_at" required v-model="status">
        <option value="published">published</option>
        <option value="null">draft</option>
      </select>
    </div>
    <div class="block mt-2 p-2 d-flex flex-column">
      <label class="d-flex font-weight-bold" for="media">Media</label>
      <ArticleMedia
        v-if="article && currentArticle.image && currentArticle.image.id"
        id="media"
      />
      <UploadImages v-else v-on:changed="handleImages" :max="1" id="media" />
    </div>
    <div class="d-flex">
      <button
        class="w-100 m-1 btn btn-success text-uppercase my-2"
        type="submit"
      >
        {{ article ? "update" : "create" }}
      </button>
      <button
        v-if="article"
        class="col-3 m-1 btn btn-danger text-uppercase my-2"
        v-on:click="deleteArticle"
        type="button"
      >
        delete
      </button>
    </div>
    <ConfirmModal :id="'confirm-delete-article'" v-on:confirm="confirm" />
  </form>
</template>

<script>
import { mapActions } from "vuex";
import UploadImages from "vue-upload-drop-images";

import ArticleMedia from "./ArticleMedia.vue";
import ConfirmModal from "./ConfirmModal.vue";

export default {
  name: "ArticleForm",
  props: {
    article: Object | null,
  },
  components: { UploadImages, ConfirmModal, ArticleMedia },
  data: () => ({
    status: null,
    currentArticle: {
      name: "",
      title: "",
      article: "",
      image: null,
      published_at: null,
    },
  }),
  watch: {
    article: function () {
      if (this.article) {
        this.currentArticle = JSON.parse(JSON.stringify(this.article));
        const { published_at } = this.currentArticle;

        if (published_at) {
          this.status = "published";
        }
      } else {
        this.currentArticle = {
          name: "",
          title: "",
          article: "",
          image: null,
          published_at: null,
        };
      }
    },
  },
  methods: {
    ...mapActions({
      updateArticle: "admin_articles/updateArticle",
      deleteArticles: "admin_articles/deleteArticles",
      createArticle: "admin_articles/createArticle",
    }),
    submit: function () {
      const { published_at } = this.currentArticle;

      if (this.status === "null") {
        this.currentArticle.published_at = null;
      } else if (this.status !== null && published_at === null) {
        this.currentArticle.published_at = new Date();
      }

      if (this.article) {
        this.updateArticle(this.currentArticle);
      } else {
        this.createArticle(this.currentArticle);
      }
    },
    handleImages(files) {
      this.currentArticle.image = files;
    },
    deleteArticle: function () {
      this.$root.$emit("bv::show::modal", "confirm-delete-article");
    },
    confirm: async function () {
      const { id } = this.currentArticle;
      await this.deleteArticles([id]);
    },
  },
  mounted() {
    if (this.article) {
      this.currentArticle = JSON.parse(JSON.stringify(this.article));
      const { published_at } = this.currentArticle;

      if (published_at) {
        this.status = "published";
      }
    }
  },
};
</script>

<style scoped>
.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}
</style>