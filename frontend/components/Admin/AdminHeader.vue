<template>
  <div
    class="
      header
      bg-white
      d-flex
      justify-content-between
      align-items-center
      py-3
    "
  >
    <div class="left-side d-flex align-items-center font-italic">
      <div ref="menuButton" class="d-flex d-md-none pl-3">
        <BurgerMenuButton
          :isOpenMenu="isOpenMenu"
          v-on:isOpenMenu="$emit('isOpenMenuHeader', !isOpenMenu)"
          colorBlack
        />
      </div>
      <h5 class="px-3 m-0">strf</h5>
      <span class="p-1">{{ getDate() }}</span>
    </div>
    <div class="d-flex align-items-center position-relative">
      <BIconSearch class="search-icon d-flex position-absolute" />
      <input
        v-model="text"
        type="text"
        placeholder="Search"
        class="bg-grey py-1"
      />
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

import { getSeason } from "~/helpers";
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
    getSeason,
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

      return `${this.getSeason(date)} ${year}`;
    },
  },
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #000;
}

.left-side > span {
  font-size: 0.7rem;
  border: 1px solid #000;
  border-radius: 5px;
}

input {
  position: relative;
  border: 1px solid #000;
  border-radius: 5px;
  padding-left: 30px;
}

.search-icon {
  z-index: 1;
  left: 6px;
}
</style>