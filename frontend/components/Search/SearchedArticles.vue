<template>
  <div class="row">
    <div v-for="article in articles" :key="article.id" class="col">
      <a v-on:click.prevent="redirect(`/article/${article.id}`)">
        <img class="mb-2" :src="`${getStrapiMedia(article.image.url)}`" />
        <div class="d-flex flex-column mb-4 px-3">
          <span class="text-ellipsis text-upprcase col-white text-truncate">{{
            article.title
          }}</span>
          <span class="col-white"
            >in <span class="gold text-lowercase"> MAN`S CARE</span></span
          >
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";
import Loader from "@/components/common/Loader.vue";

export default {
  name: "SearchedArticles",
  props: {
    articles: Array,
  },
  components: { Loader },
  methods: { getStrapiMedia },
};
</script>

<style scoped></style>