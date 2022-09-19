<template>
  <div class="d-flex justify-content-between align-items-center py-3">
    <div class="d-flex align-items-center">
      <div ref="menuButton" class="d-flex d-md-none pl-3">
        <BurgerMenuButton
          :isOpenMenu="isOpenMenu"
          v-on:isOpenMenu="$emit('isOpenMenuHeader', !isOpenMenu)"
        />
      </div>
      <span class="px-3">strf</span>
      <span class="px-2">{{ getDate() }}</span>
    </div>
    <div>
      <input v-model="text" type="text" placeholder="Search" />
    </div>
    <div class="px-3">user</div>
  </div>
</template>

<script>
import BurgerMenuButton from "~/components/common/BurgerMenuButton.vue";

export default {
  name: "AdminHeader",
  components: { BurgerMenuButton },
  props: {
    isOpenMenu: Boolean,
  },
  data: () => ({
    text: "",
    isMobile: true,
  }),
  methods: {
    getDate: function () {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();

      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style scoped>
</style>