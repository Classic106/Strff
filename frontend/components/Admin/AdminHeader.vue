<template>
  <div
    class="
      header
      bg-white
      row
      w-100
      justify-content-between
      align-items-center
      m-0
      py-3
    "
  >
    <div
      class="
        left-side
        col-lg-3 col-sm-5 col-6
        d-flex
        align-items-center
        font-italic
      "
    >
      <div ref="menuButton" class="d-flex d-md-none pl-3">
        <BurgerMenuButton
          :isOpenMenu="isOpenMenu"
          v-on:isOpenMenu="$emit('isOpenMenuHeader', !isOpenMenu)"
          colorBlack
        />
      </div>
      <h5 class="px-3 m-0" v-on:click="$router.push(`/admin`)">strff</h5>
      <span class="p-1">{{ getDate() }}</span>
    </div>
    <div
      class="
        col-lg-5 col-sm-3 col-4
        d-flex
        align-items-center
        position-relative
      "
    >
      <BIconSearch class="search-icon d-flex position-absolute" />
      <input
        v-model="text"
        type="text"
        placeholder="Search"
        class="bg-grey py-1 w-100"
      />
    </div>
    <div class="col-sm-3 col-1 d-flex justify-content-end">
      <div class="user-name d-sm-flex d-none align-items-center">
        <span class="text-ellipsis px-3 align-items-center p-0">
          {{ (user && user.username) || "user" }}
        </span>
      </div>
      <BDropdown id="dropdown-1" right :text="shortUserName()" class="m-md-2">
        <BDropdownItem v-on:click="exit">logout</BDropdownItem>
      </BDropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
    ...mapActions({ logout: "auth/logout" }),
    exit: function () {
      this.$router.push("/admin/login");
      this.logout();
    },
    shortUserName: function () {
      if (this.user) {
        const { username, first_name, last_name } = this.user;

        if (username) {
          return username[0];
        }

        const first = first_name ? first_name[0] : "";
        const last = last_name ? first_name[0] : "";

        if (!first && !last) {
          return `u`;
        }

        return `${first} ${last}`.trim();
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
  left: 1.4rem;
}

.user-name {
  width: calc(100% - 54px);
}
</style>