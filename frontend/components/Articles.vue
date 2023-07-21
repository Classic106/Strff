<template>
  <main class="d-flex justify-content-center">
    <div class="align-items-stretch">
      <div v-if="loading" class="d-flex align-items-center h-100">
        <Loader />
      </div>
      <div v-else class="d-flex flex-column align-items-center my-2 h-100">
        <h6>Articles</h6>
        <input
          type="text"
          v-model.trim="search"
          class="mb-2"
          placeholder="Search"
        />
        <BPagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="my-table"
          class="m-0"
          :class="currentPage < 2 && total < perPage && 'd-none'"
        ></BPagination>
        <div class="d-flex align-items-center justify-content-center h-100">
          <Loader v-if="loadingByPage" />
          <p v-else-if="total === 0">Nothing not found</p>
          <div v-else class="row p-2 d-flex justify-content-center w-100">
            <div
              class="col-6 d-flex flex-column justify-content-center p-1"
              v-for="article in articles"
              :key="article.id"
            >
              <NuxtLink
                :to="`/article/${article.id}`"
                class="gold"
                v-on:click.native="lickClick(`/article/${article.id}`)"
              >
                <div class="d-flex position-relative mb-5">
                  <img
                    :src="`${getStrapiMedia(article.image.url)}`"
                    alt="image"
                  />
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
                <div class="d-flex">
                  <p class="text-center">{{ article.title }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <BPagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="my-table"
          :class="currentPage < 2 && total < perPage && 'd-none'"
        ></BPagination>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import "~/utils/filters";
import { getStrapiMedia } from "~/utils/medias";
import Loader from "@/components/common/Loader.vue";

export default {
  name: "Articles",
  components: { Loader },
  data: () => ({
    perPage: 10,
    currentPage: 1,
    search: "",
    loading: true,
    loadingByPage: false,
    timer: null,
  }),
  computed: {
    ...mapGetters({
      articles: "articles/articles",
      total: "articles/total",
    }),
  },

  watch: {
    currentPage: async function () {
      await this.getArts();
    },
    search: async function () {
      const { search } = this;

      if (search) {
        clearInterval(this.timer);
        this.timer = null;

        this.timer = setTimeout(async () => {
          await this.getArts();
        }, 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;

        await this.getArts();
      }
    },
  },
  methods: {
    getStrapiMedia,
    ...mapActions({ getArticles: "articles/getArticles" }),
    getArts: async function () {
      const { search, currentPage, perPage } = this;

      this.loadingByPage = true;
      await this.getArticles({ search, currentPage, perPage });
      this.loadingByPage = false;
    },
    lickClick(link) {
      this.$router.push(link);
      this.isOpenMenu = false;
      this.isOpen = false;
    },
  },
  async mounted() {
    this.loading = true;
    const { search, currentPage, perPage } = this;
    await this.getArticles({ search, currentPage, perPage });
    this.loading = false;
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style scoped>
main {
  min-height: 80vh;
}

.text-ellipsis {
  width: 20%;
}

.date {
  background-color: #9e7d24;
  color: #fff;
  bottom: 0;
}
</style>