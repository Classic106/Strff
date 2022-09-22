<template>
  <div class="bg-grey">
    <header>
      <AdminHeader
        :isOpenMenu="isOpenMenu"
        v-on:isOpenMenuHeader="isOpen"
        v-on:isOpenRightSide="isOpenRightSide = !isOpenRightSide"
      />
    </header>
    <main class="h-100 w-100 m-0 row position-relative">
      <div
        ref="menu"
        class="col-md-2 col-2 p-0"
        :class="
          isMobile
            ? isOpenMenu
              ? 'menu-mobile open'
              : 'menu-mobile'
            : 'position-relative justify-content-between'
        "
      >
        <AdminMenu v-on:setPage="setPage" />
      </div>
      <AdminContent class="content col-md-8 col p-0" :page="currentPage" />
      <div
        class="right-side p-0"
        :class="
          isMobile
            ? isOpenRightSide
              ? 'mobile open'
              : 'mobile'
            : 'col-2 desctop'
        "
      >
        <AdminRightSide class="bg-white h-100" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import AdminHeader from "./AdminHeader.vue";
import AdminMenu from "./AdminMenu.vue";
import AdminContent from "./AdminContent.vue";
import AdminRightSide from "./AdminRightSide.vue";

export default {
  name: "Admin",
  components: {
    AdminHeader,
    AdminMenu,
    AdminContent,
    AdminRightSide,
  },
  data: () => ({
    isOpenMenu: false,
    isMobile: true,
    isOpenRightSide: false,
  }),
  computed: {
    ...mapGetters({ currentPage: "admin/currentPage" }),
  },
  methods: {
    ...mapActions({ getProducts: "admin/getProducts" }),
    ...mapMutations({ setCurrentPage: "admin/setCurrentPage" }),
    setPage: function (page) {
      this.setCurrentPage(page);
      this.isOpenMenu = false;
    },
    isOpen: function (isOpen) {
      this.isOpenMenu = isOpen;
    },
    handlerResize(e) {
      this.isMobile = !(e.target.innerWidth > 768);
    },
    closeOutsideMenu(e) {
      const { menu } = this.$refs;
      const { target } = e;

      if (!menu || !target) {
        return;
      }
      if (menu !== target && !menu.contains(target)) {
        this.$emit("isOpenMenu", false);
      }
    },
  },
  mounted() {
    this.getProducts();
    this.handlerResize({ target: window });
    window.addEventListener("resize", this.handlerResize);
    document.addEventListener("click", this.closeOutsideMenu);
  },
  destroyed() {
    window.removeEventListener("resize", this.handlerResize);
    document.removeEventListener("click", this.closeOutsideMenu);
  },
};
</script>

<style scoped>
.menu-mobile {
  display: flex !important;
  height: 100vh;
  position: absolute;
  top: 0;
  left: -100vw;
  transition: all 0.5s ease, top 0.5s ease;
}

.menu-mobile.open {
  left: 0vw;
  height: 100vh;
}

.right-side {
  position: fixed;
  width: 100%;
  border-left: 1px solid black;
}

.right-side.desctop {
  position: relative;
}

.right-side.mobile {
  border-left: none;
  position: relative;
  z-index: -1;
}

.right-side.mobile.open {
  right: 0;
  position: absolute;
  z-index: 1;
}

.content {
  height: calc(100vh - 62px);
}
</style>