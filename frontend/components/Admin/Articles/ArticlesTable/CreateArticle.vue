<template>
  <div class="row w-100 justify-content-center m-0 mt-3">
    <div class="d-flex flex-column col-10">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create Article</h6>
      </div>
      <ArticleForm />
    </div>
  </div>
</template>

<script>
import ArticleForm from "../ArticleForm";

export default {
  name: "AdminArticle",
  components: { ArticleForm },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  background: none;
}

.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}

.border-left {
  border-radius: 5px 0 0 5px;
  border: 1px solid #000;
}

.border-right {
  border-radius: 0 5px 5px 0;
  border: 1px solid #000;
}
</style>