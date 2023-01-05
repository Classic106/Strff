<template>
  <ArticlesTable v-if="isTable" v-on:setIsTable="isTable = false" />
  <CreateArticle v-else v-on:setIsTable="isTable = true" />
</template>

<script>
import CreateArticle from "./CreateArticle.vue";
import ArticlesTable from "./ArticlesTable.vue";

export default {
  name: "ArticelTable",
  components: { CreateArticle, ArticlesTable },
  data: () => ({
    isTable: true,
  }),
};
</script>

<style scoped>
</style>