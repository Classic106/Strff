<template>
  <div class="container d-flex col-12 col-lg-6 m-0 p-0">
    <div class="content d-flex flex-column" :class="isOpen && 'open'">
      <div class="header d-flex align-items-center justify-content-between">
        <h6 class="text-uppercase p-4">search</h6>
        <CloseButton class="mr-3 my-2" v-on:close="$emit('close')" />
      </div>
      <div class="d-flex flex-column">
        <div class="form__group field w-100 d-flex justify-content-center">
          <input
            type="input"
            class="form__field w-75"
            id="search_text"
            placeholder="Enter a search term"
            v-model.trim="text"
          />
          <label for="search_text" class="form__label"
            >Enter a search term</label
          >
        </div>
        <div v-if="!text">
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
          <div v-else class="mt-3">
            <h6 class="p-3 text-center">BEST SELLERS</h6>
            <div
              class="
                items
                row
                justify-content-center
                align-items-center
                overflow-auto
                px-5
                mx-5
              "
            >
              <div
                v-for="bestSeller in bestSellers"
                :key="bestSeller.id"
                class="col-12 col-md-6"
              >
                <a
                  v-on:click.prevent="redirect(`/products/${bestSeller.slug}`)"
                >
                  <img
                    class="mb-2"
                    :src="`${getFirstImage(bestSeller.image)}`"
                  />
                  <div class="card-info d-flex justify-content-between mb-4">
                    <span class="col-white text-nowrap mr-3"
                      >{{ bestSeller.price }} $</span
                    >
                    <span class="text-upprcase gold">{{
                      bestSeller.title
                    }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="
            items
            row
            justify-content-center
            align-items-center
            overflow-auto
            px-5
            mx-5
            mt-5
          "
        >
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
            v-if="resultProducts.length"
            class="row justify-content-center px-5 my-auto"
          >
            <div
              v-for="product in resultProducts"
              :key="product.id"
              class="col-12 col-md-6"
            >
              <a v-on:click.prevent="redirect(`/products/${product.slug}`)">
                <img class="mb-2" :src="`${getFirstImage(product.image)}`" />
                <div class="d-flex flex-column justify-content-between mb-4">
                  <span class="text-uppercase col-white">{{
                    product.title
                  }}</span>
                  <span class="gold">{{ product.price }} $</span>
                  <span class="col-white"
                    >in <span class="gold">{{ product.slug }}</span></span
                  >
                </div>
              </a>
            </div>
          </div>

          <div
            v-if="resultArticles.length"
            class="row justify-content-center px-5 my-auto w-100 mt-5"
          >
            <div
              v-for="article in resultArticles"
              :key="article.id"
              class="col"
            >
              <a v-on:click.prevent="redirect(`/article/${article.id}`)">
                <img
                  class="mb-2"
                  :src="`${getStrapiMedia(article.image.url)}`"
                />
                <div
                  class="d-flex flex-column justify-content-between mb-4 px-3"
                >
                  <span class="text-upprcase col-white text-truncate">{{
                    article.title
                  }}</span>
                  <span class="col-white"
                    >in
                    <span class="gold text-lowercase"> MAN`S CARE</span></span
                  >
                </div>
              </a>
            </div>
          </div>

          <div
            v-if="
              text.length && !resultProducts.length && !resultArticles.length
            "
            class="text-uppercase text-center p-3 position-absolute"
          >
            nothing not found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";
import Loader from "@/components/Loader";
import CloseButton from "@/components/common/CloseButton";

export default {
  components: { Loader, CloseButton },
  props: ["isOpen"],
  data: () => ({
    text: "",
    resultProducts: [],
    resultArticles: [],
    products: [],
    articles: [],
    bestSellers: [],
    isLoading: false,
  }),
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
    getStrapiMedia,
    getFirstImage: function (images) {
      if (images[0]) {
        return this.getStrapiMedia(images[0].url);
      }
      return this.getStrapiMedia("/uploads/image_not_found_8c8e4b17cc.jpg");
    },
    redirect: function (to) {
      this.$router.push(to);
      this.$emit("close");
    },
  },
  async mounted() {
    this.isLoading = true;
    this.products = await this.$strapi.find("products");
    this.articles = await this.$strapi.find("articles");
    const result = await this.$strapi.find("bestsellers");

    if (result.length && result[0].products) {
      this.bestSellers = result[0].products;
    }

    this.isLoading = false;
  },
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  max-width: 600px;
}

.col-white,
h6 {
  color: #fff;
}

.header > span {
  color: #fff;
  font-size: 3rem;
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

.items {
  height: 70vh;
}

$primary: #9e7d24;
$secondary: #f3c956;
$white: #fff;

.form__group {
  position: relative;
  width: 50%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $white;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $white;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}

.form__field {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}
</style>