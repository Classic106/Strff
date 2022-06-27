<template>
  <div>
    <Loader v-if="loading" />
    <div
      v-if="!article"
      class="d-flex justify-content-center align-items-center article"
    >
      Article not found
    </div>
    <div
      v-else
      class="article d-flex flex-column justify-content-center m-5 p-5"
    >
      <div class="d-flex position-relative mb-5">
        <img :src="`${getStrapiMedia(article.image.url)}`" alt="image" />
        <div class="date d-flex flex-column position-absolute px-5 py-2 mb-5">
          <h6 class="text-center text-uppercase">{{ 9 | formatDate }}</h6>
          <h6 class="text-center text-uppercase">
            {{ article.date.getMonth() | parseMonth }}
          </h6>
        </div>
      </div>
      <div
        class="
          d-flex
          flex-column
          justify-content-center
          align-items-center
          px-5
        "
      >
        <p class="text-center">{{ article.title }}</p>
        <hr class="m-3" />
        <p class="text-center">{{ article.article }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import "~/utils/filters";
import { getStrapiMedia } from "~/utils/medias";
import Loader from "@/components/Loader.vue";

export default {
  layout: "club",
  components: { Loader },
  data: () => ({ article: null, loading: true }),
  methods: { getStrapiMedia },
  async mounted() {
    try {
      const result = await this.$strapi.$articles.findOne(
        this.$route.params.id
      );
      result.date = new Date(result.date);
      this.article = result;
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
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