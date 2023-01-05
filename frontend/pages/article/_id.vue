<template>
  <main>
    <Loader v-if="loading" />
    <div
      v-if="!article"
      class="d-flex justify-content-center align-items-center article"
    >
      Article not found
    </div>
    <div
      v-else
      class="
        article
        d-flex
        flex-column
        justify-content-center
        m-sm-5 m-1
        p-lg-5 p-0
      "
    >
      <div class="d-flex position-relative mb-5">
        <img :src="`${getStrapiMedia(article.image.url)}`" alt="image" />
        <div
          class="
            date
            d-flex
            flex-row flex-lg-column
            position-absolute
            px-5
            py-md-2 py-1
            mb-5
          "
        >
          <h6 class="text-center text-uppercase mr-1">
            {{ new Date(article.created_at).getDate() | formatDay }}
          </h6>
          <h6 class="text-center text-uppercase">
            {{ new Date(article.created_at).getMonth() | parseMonth }}
          </h6>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <p class="text-center">{{ article.title }}</p>
        <hr class="m-3" />
        <p class="text-center">{{ article.article }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import "~/utils/filters";
import { getStrapiMedia } from "~/utils/medias";

import Loader from "@/components/common/Loader.vue";

export default {
  layout: "club",
  components: { Loader },
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters({ article: "articles/article" }),
  },
  methods: {
    getStrapiMedia,
    ...mapActions({ getArticle: "articles/getArticle" }),
    ...mapMutations({ setArticle: "articles/setArticle" }),
  },
  async mounted() {
    this.loading = true;
    const { id } = this.$route.params;
    await this.getArticle(id);
    this.loading = false;
  },
  destroyed() {
    this.setArticle(null);
  },
};
</script>

<style scoped>
.date {
  background-color: #9e7d24;
  color: #fff;
  bottom: 0;
}

.article {
  min-height: 54vh;
}

hr {
  height: 1px;
  background-color: #e8e8e8;
  width: 30%;
}
</style>