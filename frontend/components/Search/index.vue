<template>
  <div class="container d-flex col-12 col-lg-6 m-0 p-0">
    <div class="content d-flex flex-column" :class="isOpen && 'open'">
      <div class="header d-flex align-items-center justify-content-between">
        <h6 class="text-uppercase p-4">search</h6>
        <CloseButton class="mr-3 my-2" v-on:close="$emit('close')" />
      </div>
      <div class="container-height d-flex flex-column">
        <SearchInput v-on:setText="setText" />
        <SearchBestSellers v-if="!text" />
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
            v-if="text.length && !products.length && !articles.length"
            class="text-uppercase text-center p-3 w-100"
          >
            nothing not found
          </div>
          <div
            v-else-if="!isLoading"
            class="container-height overflow-hidden px-4"
          >
            <vueCustomScrollbar
              class="overflow-auto h-100"
              :settings="itemsSettings"
            >
              <div class="d-flex flex-column px-3">
                <div class="row">
                  <p
                    class="gold col-6 text-center"
                    :class="!isSearchedArticles ? 'line' : ''"
                    v-on:click="isSearchedArticles = !isSearchedArticles"
                  >
                    products
                  </p>
                  <p
                    class="gold col-6 text-center"
                    :class="isSearchedArticles ? 'line' : ''"
                    v-on:click="isSearchedArticles = !isSearchedArticles"
                  >
                    articles
                  </p>
                </div>
                <div v-if="isSearchedArticles">
                  <SearchedArticles
                    v-if="articles.length"
                    :articles="articles"
                  />
                  <div
                    v-if="!articles.length"
                    class="text-uppercase text-center p-3 w-100"
                  >
                    nothing not found
                  </div>
                </div>
                <div v-if="!isSearchedArticles">
                  <SearchedProducts
                    v-if="products.length"
                    :products="products"
                  />
                  <div
                    v-if="!products.length"
                    class="text-uppercase text-center p-3 w-100"
                  >
                    nothing not found
                  </div>
                </div>
              </div>
            </vueCustomScrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
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
    isLoading: false,
    isSearchedArticles: false,
    itemsSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      articles: "articles/articles",
      products: "products/products",
    }),
  },
  watch: {
    text: async function () {
      const { text } = this;

      if (text === "") {
        this.clearArticles();
        this.clearProducts();
        return;
      }

      this.isLoading = true;

      const getDataBy = {
        search: text,
        currentPage: 1,
        perPage: -1,
      };

      await this.getArticles(getDataBy);
      await this.getProducts(getDataBy);

      this.isLoading = false;
    },
  },
  methods: {
    shuffleArray,
    ...mapActions({
      getProducts: "products/getProducts",
      getArticles: "articles/getArticles",
    }),
    ...mapMutations({
      clearArticles: "articles/clearAll",
      clearProducts: "products/clearAll",
    }),
    redirect: function (to) {
      this.$router.push(to);
      this.$emit("close");
    },
    setText: function (text) {
      this.text = text;
    },
  },
  destroyed() {
    this.clearArticles();
    this.clearProducts();
  },
};
</script>

<style scoped>
.icon {
  filter: brightness(0) invert(1);
}

.line {
  border-bottom: solid;
  border-color: #9e7d24;
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