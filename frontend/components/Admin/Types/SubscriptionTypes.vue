<template>
  <div>
    <label for="tags-pills">Enter category</label>
    <div class="tags-input-container w-100 p-2">
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
          :style="{ width: category.length + 'ch' }"
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SubscriptionTypes",
  computed: {
    ...mapGetters({
      subscriptionTypes: "purchase-types/subscriptionTypes",
    }),
  },
  methods: {
    ...mapActions({
      getSubscriptionTypes: "purchase-types/getSubscriptionTypes",
    }),
  },
};
</script>

<style>
</style>