<template>
  <div class="d-flex">
    <div class="d-flex position-relative">
      <input
        v-model.trim="text"
        type="text"
        class="mr-2"
        :class="isOpen && 'open'"
      />
      <ul
        v-if="result.length"
        class="search-list col position-absolute rounded"
      >
        <li v-for="item in result" :key="item.id" class="py-2">
          <nuxt-link :to="`/products/${item.slug}`" class="dark-orange">{{
            item.title
          }}</nuxt-link>
        </li>
      </ul>
    </div>
    <span class="icon icon-search mr-3" v-on:click="isOpen = !isOpen"></span>
  </div>
</template>

<script>
export default {
  name: "Search",
  data: () => ({ isOpen: false, text: "", result: [], products: [] }),
  async mounted() {
    this.products = await this.$strapi.find("products");
  },
  watch: {
    text: function () {
      if (this.text === "") {
        this.result = [];
        return;
      }

      this.result = this.products.filter((item) => {
        const buyTitlle = item.title
          .toLowerCase()
          .includes(this.text.toLowerCase());

        const byPrice =
          Number.isInteger(+this.text) &&
          item.price.toString().includes(this.text);

        if (buyTitlle || byPrice) {
          return item;
        }
        return false;
      });
    },
    isOpen: function () {
      if (!this.isOpen) {
        this.text = "";
      }
    },
  },
};
</script>

<style scoped>
.icon {
  display: inline-block;
  min-width: 30px;
  height: 30px;
  filter: brightness(0) invert(1);
  background-size: cover;
}

input {
  transform: translateY(-200%);
  transition: all 0.5s ease-in-out;
}

.open {
  transform: translateY(0);
}

.icon-search {
  background-image: url("../assets/icons/iconmonstr-search-thin.svg");
}

.search-input {
  top: 0;
  right: 60%;
}

.search-list {
  top: 100%;
  right: 4px;
  z-index: 5;
  background: black;
}
</style>