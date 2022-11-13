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
    <!--div class="block d-flex flex-column p-2 mt-2">
      <label class="d-flex font-weight-bold" for="status">Article status</label>
      <select id="status" required v-model="currentArticle.status">
        <option value="published">published</option>
        <option value="draft">draft</option>
      </select>
    </div-->
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
    currentArticle: {
      name: "",
      title: "",
      article: "",
      image: null,
      status: "draft",
    },
  }),
  watch: {
    article: function () {
      if (this.article) {
        this.currentArticle = JSON.parse(JSON.stringify(this.article));
      } else {
        this.currentArticle = {
          name: "",
          title: "",
          article: "",
          image: null,
          status: "draft",
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
      if (this.article) {
        this.updateArticle(this.currentArticle);
      } else {
        this.createArticle(this.currentArticle);
      }
      //console.log(this.currentArticle);
    },
    handleImages(files) {
      this.currentArticle.image = files;
    },
    deleteArticle: function () {
      this.$root.$emit("bv::show::modal", "confirm-delete-article");
    },
    confirm: async function () {
      const { id } = this.currentArticle;
      console.log(id);
      //await this.deleteArticles([id]);
    },
  },
  mounted() {
    if (this.article) {
      this.currentArticle = JSON.parse(JSON.stringify(this.article));
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