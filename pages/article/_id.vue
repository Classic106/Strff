<template>
  <div>
    <Loader v-if="!article" />
    <div v-else class="d-flex flex-column justivy-content-center m-5 p-5">
      <div class="d-flex position-relative mb-5">
        <img :src="article.image" alt="image" />
        <div class="date d-flex flex-column position-absolute px-5 py-2 mb-5">
          <h6 class="text-center text-uppercase">{{ 9 | formatDate }}</h6>
          <h6 class="text-center text-uppercase">
            {{ article.date.getMonth() | parseMonth }}
          </h6>
        </div>
      </div>
      <div class="px-5">
        <p class="text-center">{{ article.title }}</p>
        <hr />
        <p class="text-center">{{ article.article }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import "~/utils/filters";
import Loader from "@/components/Loader.vue";

export default {
  layout: "club",
  components: { Loader },
  data: () => ({
    article: null,
  }),
  mounted() {
    //console.log(this.$route.params.id);
    this.article = {
      id: 1,
      date: new Date(),
      image:
        "https://cdn.cnn.com/cnnnext/dam/assets/200910131009-mensskincarelead.jpg",
      title: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aut
      perferendis omnis, aspernatur corrupti magni dicta illo? Itaque illum
      accusantium quaerat, assumenda, adipisci aliquam facere laborum explicabo
      nulla delectus sit?`,
      article: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, fugit
      doloribus ex ad nesciunt consectetur eius! Saepe quae, eveniet consequatur
      dolores aliquid vitae, incidunt expedita hic corporis vel rerum labore.`,
    };
  },
};
</script>

<style scoped>
.date {
  background-color: #9e7d24;
  color: #fff;
  bottom: 0;
}

hr {
  height: 1px;
  background-color: #e8e8e8;
  width: 30%;
}
</style>