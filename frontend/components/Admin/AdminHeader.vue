<template>
  <div class="header d-flex justify-content-between align-items-center py-3">
    <div class="d-flex align-items-center">
      <div ref="menuButton" class="d-flex d-md-none pl-3">
        <BurgerMenuButton
          :isOpenMenu="isOpenMenu"
          v-on:isOpenMenu="$emit('isOpenMenuHeader', !isOpenMenu)"
          colorBlack
        />
      </div>
      <span class="px-3">strf</span>
      <span class="px-2">{{ getDate() }}</span>
    </div>
    <div>
      <input v-model="text" type="text" placeholder="Search" />
    </div>
    <div class="d-flex">
      <div class="d-flex">
        <BAvatar :text="chortUserName()" class="text-uppercase" />
        <span class="px-3 text-ellipsis">{{
          (user && user.first_name) || "user"
        }}</span>
      </div>
      <span
        class="d-flex d-md-none align-items-center"
        v-on:click="$emit('isOpenRightSide')"
        ><BIconThreeDotsVertical
      /></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
  methods: {
    chortUserName: function () {
      if (this.user) {
        const { first_name, last_name } = this.user;

        return `${first_name[0]} ${last_name[0]}`;
      }
      return "u";
    },
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
.header {
  border-bottom: 1px solid #000;
}
</style>