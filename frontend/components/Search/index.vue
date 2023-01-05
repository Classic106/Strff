<template>
  <div class="container d-flex col-12 col-lg-6 m-0 p-0">
    <div class="content d-flex flex-column" :class="isOpen && 'open'">
      <div class="header d-flex align-items-center justify-content-between">
        <h6 class="text-uppercase p-4">search</h6>
        <CloseButton class="mr-3 my-2" v-on:close="$emit('close')" />
      </div>
      <div class="container-height d-flex flex-column">
        <SearchInput v-on:setText="setText" />
        <SearchBestSellers v-if="!text" :products="bestSellers" />
        <div v-else class="d-flex flex-column mt-5 h-100">
          <Loader
            v-if="isLoading"
            class="
              loader
              d-flex
              w-100
              justify-content-center
              align-items-center
            "
          />
          <div
            v-if="
              text.length && !resultProducts.length && !resultArticles.length
            "
            class="text-uppercase text-center p-3 w-100"
          >
            nothing not found
          </div>
          <div v-else class="container-height overflow-hidden px-4">
            <vueCustomScrollbar
              class="overflow-auto h-100"
              :settings="itemsSettings"
            >
              <div class="d-flex flex-column px-3">
                <SearchedProducts
                  v-if="resultProducts.length"
                  :products="resultProducts"
                />
                <SearchedArticles
                  v-if="resultArticles.length"
                  :articles="resultArticles"
                />
              </div>
            </vueCustomScrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { shuffleArray } from "~/helpers";

import Loader from "@/components/common/Loader";
import CloseButton from "@/components/common/CloseButton";
import SearchInput from "./SearchInput.vue";
import SearchBestSellers from "./SearchBestSellers.vue";
import SearchedProducts from "./SearchedProducts.vue";
import SearchedArticles from "./SearchedArticles.vue";

export default {
  components: {
    Loader,
    CloseButton,
    SearchInput,
    SearchBestSellers,
    SearchedProducts,
    SearchedArticles,
  },
  props: ["isOpen"],
  data: () => ({
    text: "",
    resultProducts: [],
    resultArticles: [],
    products: [],
    articles: [],
    bestSellers: [],
    isLoading: false,
    itemsSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      best_sellers: "best_sellers/best_sellers",
    }),
  },
  watch: {
    text: function () {
      if (this.text === "") {
        this.resultProducts = [];
        this.resultArticles = [];
        return;
      }

      this.isLoading = true;

      this.resultProducts = this.products.filter((item) => {
        const buyTitlle = item.title
          .toLowerCase()
          .includes(this.text.toLowerCase());

        if (buyTitlle) {
          return item;
        }
        return false;
      });

      this.resultArticles = this.articles.filter((item) => {
        const buyArticle = item.article
          .toLowerCase()
          .includes(this.text.toLowerCase());

        const buyTitlle = item.title
          .toLowerCase()
          .includes(this.text.toLowerCase());

        if (buyTitlle || buyArticle) {
          return item;
        }
        return false;
      });

      this.isLoading = false;
    },
  },
  methods: {
    shuffleArray,
    redirect: function (to) {
      this.$router.push(to);
      this.$emit("close");
    },
    setText: function (text) {
      this.text = text;
    },
  },
  async mounted() {
    this.isLoading = true;

    try {
      this.products = await this.$strapi.find("products");
      this.articles = await this.$strapi.find("articles");

      this.bestSellers = this.shuffleArray(this.best_sellers);
    } catch (e) {
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      this.$notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
    this.isLoading = false;
  },
};
</script>

<style scoped>
.icon {
  filter: brightness(0) invert(1);
}

.container-height {
  height: calc(100% - 96px);
}

.container {
  height: 100%;
  max-width: 600px;
}

.content {
  min-width: 100%;
  margin-left: 100%;
  height: 100%;
  color: #fff;
  background: #333333;
  transition: all 1s ease-in-out;
}

.content.open {
  margin-left: 0;
}

.loader {
  height: 86vh;
}
</style>