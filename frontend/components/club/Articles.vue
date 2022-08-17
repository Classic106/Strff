<template>
  <div>
    <h6 class="col-black p-3 pb-5 text-center text-uppercase">articles</h6>
    <div
      class="
        row
        flex-column flex-md-row
        mb-5
        px-4 px-md-0
        justify-content-center
        w-100
        mx-auto
      "
    >
      <div
        class="article col col-lg-6 m-1 p-0"
        v-for="article in articles"
        :key="article.id"
      >
        <nuxt-link
          class="d-flex position-relative p-0"
          :to="`article/${article.id}`"
        >
          <img :src="`${getStrapiMedia(article.image.url)}`" alt="image" />
          <div
            class="
              inf
              d-flex
              flex-column
              position-absolute
              justify-content-center
            "
          >
            <h5 class="w-100 text-center text-uppercase">
              {{ article.name }}
            </h5>
            <div
              class="
                date
                d-flex
                flex-row flex-lg-column
                position-absolute
                px-5
                py-2
                mb-lg-3 mb-xl-5
              "
            >
              <h6 class="text-center text-uppercase">
                {{ new Date(article.created_at).getDate() | formatDate }}
              </h6>
              <h6>
                {{ new Date(article.created_at).getMonth() | parseMonth }}
              </h6>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "~/utils/filters";
import { getStrapiMedia } from "~/utils/medias";

export default {
  data: () => ({
    articles: [],
  }),
  computed: {
    ...mapGetters({
      allArticles: "articles/articles",
    }),
  },
  methods: { getStrapiMedia },
  mounted() {
    this.articles = [...this.allArticles]
      .sort(function (a, b) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
      })
      .reverse();
    this.articles.length = 2;
  },
};
</script>

<style scoped>
.article.col-lg-6 {
  flex: 1 0 48%;
}

.article:hover {
  transform: scale(1.01);
}

.date {
  background-color: #9e7d24;
  bottom: 0;
}

.inf {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #000000a1;
  color: #fff;
}

hr {
  height: 1px;
  background-color: #e8e8e8;
  width: 30%;
}
</style>