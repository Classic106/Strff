<template>
  <div class="w-100 h-100">
    <div
      v-if="loading"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>
    <div v-else class="w-100">
      <h6 class="w-100 text-left p-3 m-0">Categories</h6>
      <div class="block mx-5 tags-input-container p-2">
        <div
          class="tag p-1 m-1"
          :class="index === activeTag && 'active'"
          v-for="(category, index) in currentCategories"
          :key="category.name"
        >
          <span v-if="activeTag !== index" @click="activeTag = index">{{
            category.name
          }}</span>
          <input
            v-else
            v-model.lazy="currentCategories[index].name"
            v-focus
            :style="{ width: category.name.length + 'ch' }"
            @blur="update(category)"
            @keyup.enter="update(category)"
          />
          <span @click="remove(category)"><BIconX /></span>
        </div>
        <input
          v-model="tagValue"
          @keyup.enter="add"
          class="m-2"
          placeholder="Add category..."
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Loader from "~/components/common/Loader";

export default {
  name: "Categories",
  components: { Loader },
  data: () => ({
    tagValue: "",
    activeTag: null,
    loading: true,
    currentCategories: [],
  }),
  computed: {
    ...mapGetters({ categories: "categories/categories" }),
  },
  watch: {
    categories: function () {
      this.currentCategories = JSON.parse(JSON.stringify(this.categories));
    },
  },
  methods: {
    ...mapActions({
      getCategories: "categories/getCategories",
      createCategory: "categories/createCategory",
      updateCategory: "categories/updateCategory",
      deleteCategory: "categories/deleteCategory",
    }),
    add: async function () {
      await this.createCategory({
        name: this.tagValue[0].toUpperCase() + this.tagValue.slice(1),
        slug: this.tagValue.toLowerCase(),
      });
      this.tagValue = "";
    },
    update: async function (category) {
      if (this.activeTag === null) return;
      this.activeTag = null;

      const { id, name } = category;

      const cat = this.categories.filter((c) => c.id === id)[0];

      if (cat && cat.name === name) return;

      const body = {
        name: name[0].toUpperCase() + name.slice(1),
        slug: name.toLowerCase(),
      };

      await this.updateCategory({ id, body });
    },
    remove: async function (category) {
      const { id } = category;
      await this.deleteCategory(id);
    },
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus();
      },
    },
  },
  async mounted() {
    this.loading = true;
    await this.getCategories();
    this.currentCategories = JSON.parse(JSON.stringify(this.categories));
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.tags-input-container {
  background-color: rgba($color: #ffffff, $alpha: 0.7);

  input {
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    font-size: 1rem;
  }
  .tag {
    float: left;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover,
    &.active {
      background-color: #57c340;
      border-radius: 5px;
    }
    span:first-child {
      margin-right: 8px;
    }
    svg {
      color: #666;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>