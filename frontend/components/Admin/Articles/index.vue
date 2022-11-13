<template>
  <div class="w-100 h-100">
    <div
      v-if="loading"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>
    <div v-else class="w-100">
      <ArticlesTable v-if="!selected" />
      <AdminArticle v-else />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import Loader from "~/components/common/Loader";
import ArticlesTable from "./ArticlesTable";
import AdminArticle from "./AdminArticle";

export default {
  name: "Articles",
  components: { Loader, ArticlesTable, AdminArticle },
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters({ selected: "admin_articles/selected" }),
  },
  methods: {
    ...mapActions({ getArticles: "admin_articles/getArticles" }),
    ...mapMutations({
      clearArticles: "admin_articles/clearArticles",
    }),
  },
  async mounted() {
    this.loading = true;
    await this.getArticles();
    this.loading = false;
  },
  destroyed() {
    this.clearArticles();
  },
};
</script>

<style scoped>
</style>