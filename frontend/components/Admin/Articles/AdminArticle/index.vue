<template>
  <div class="row w-100 justify-content-center m-0 mt-3">
    <div class="d-flex flex-column col-10">
      <div class="d-flex align-items-center justify-content-between">
        <button v-on:click="clearSelectedArticles()" class="button">
          <BIconArrowLeft />
        </button>
        <p class="text-ellipsis m-0 ml-2">{{ selected.name }}</p>
        <div>
          <button
            class="border-left"
            v-on:click="setPreviousArticle"
            :disabled="!previous"
          >
            <BIconChevronLeft />
          </button>
          <button
            class="border-right"
            v-on:click="setNextArticle"
            :disabled="!next"
          >
            <BIconChevronRight />
          </button>
        </div>
      </div>
      <ArticleForm :article="selected" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { prevCurrNextItems } from "~/helpers";

import ArticleForm from "../ArticleForm";

export default {
  name: "AdminArticle",
  components: { ArticleForm },
  computed: {
    ...mapGetters({
      articles: "admin_articles/articles",
      previous: "admin_articles/previous",
      selected: "admin_articles/selected",
      next: "admin_articles/next",
      params: "admin_articles/params",
      total: "admin_articles/total",
    }),
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      updateArticle: "admin_articles/updateArticle",
      deleteArticles: "admin_articles/deleteArticles",
      getArticles: "admin_articles/getArticles",
    }),
    ...mapMutations({
      setParams: "admin_articles/setParams",
      clearSelectedArticles: "admin_articles/clearSelectedArticles",
      setSelectedArticles: "admin_articles/setSelectedArticles",
      setImages: "cool_light_box/setImages",
      setImageIndex: "cool_light_box/setImageIndex",
    }),
    setNextArticle: async function () {
      const index = this.findIndex();

      const { page, currentPerPage } = this.params;

      let isMax = false;

      if (
        this.total / currentPerPage - page <= 0 &&
        index === this.articles.length - 2
      ) {
        isMax = true;
      }

      const { selected, next, previous } = this.prevCurrNextItems(
        this.articles[index + 1],
        this.articles
      );

      if (!isMax && !next) {
        const { page } = this.params;

        this.setParams({ ...this.params, page: page + 1 });

        await this.getArticles();

        const result = this.prevCurrNextItems(this.articles[0], [
          selected,
          ...this.articles,
        ]);

        this.setSelectedArticles(result);
      } else {
        this.setSelectedArticles({ selected, next, previous });
      }
    },
    setPreviousArticle: async function () {
      const index = this.findIndex();

      const { page } = this.params;

      const { selected, next, previous } = this.prevCurrNextItems(
        this.articles[index - 1],
        this.articles
      );

      let isMin = false;

      if (page >= 1 && index === 1) {
        isMin = true;
      }

      if (!isMin && !previous) {
        const { page } = this.params;
        this.setParams({ ...this.params, page: page - 1 });

        await this.getArticles();

        const result = this.prevCurrNextItems(
          this.articles[this.articles.length - 1],
          [...this.articles, selected]
        );
        this.setSelectedArticles(result);
      } else {
        this.setSelectedArticles({ selected, next, previous });
      }
    },
    findIndex: function () {
      return this.articles.findIndex((item) => item.id === this.selected.id);
    },
  },
  async destroyed() {
    this.setParams({ ...this.params, page: 1 });
    await this.getArticles();
  },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  background: none;
}

.border-left {
  border-radius: 5px 0 0 5px;
  border: 1px solid #000;
}

.border-right {
  border-radius: 0 5px 5px 0;
  border: 1px solid #000;
}
</style>