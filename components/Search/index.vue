<template>
  <div class="container d-flex col-12 col-lg-6 m-0 p-0">
    <div class="content d-flex flex-column" :class="isOpen && 'open'">
      <div class="header d-flex align-items-center justify-content-between">
        <h6 class="text-uppercase px-5">search</h6>
        <span
          class="p-4 text-center close-button"
          v-on:click.self="$emit('close')"
          >+</span
        >
      </div>
      <div class="d-flex flex-column">
        <input
          v-model.trim="text"
          type="text"
          placeholder="Enter name or price"
        />
        <ul
          v-if="result.length"
          class="search-list col position-absolute rounded"
        >
          <li v-for="item in result" :key="item.id" class="py-2">
            <nuxt-link :to="`/products/${item.slug}`" class="gold">{{
              item.title
            }}</nuxt-link>
          </li>
        </ul>
        <div
          v-if="text.length && !result.length"
          class="search-list text-uppercase text-center p-3 position-absolute"
        >
          nothing not found
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isOpen"],
  data: () => ({ text: "", result: [], products: [] }),
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
  },
  async mounted() {
    this.products = await this.$strapi.find("products");
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}

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

.close-button {
  transform: rotate(45deg);
}
</style>