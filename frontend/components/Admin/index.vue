<template>
  <div class="gold-background">
    <header>
      <AdminHeader :isOpenMenu="isOpenMenu" v-on:isOpenMenuHeader="isOpen" />
    </header>
    <main class="h-100 w-100 m-0 row position-relative">
      <div
        ref="menu"
        class="col-md-2 col-2"
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
      <AdminContent class="content col-md-10 col p-0" :page="page" />
    </main>
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminMenu from "./AdminMenu.vue";
import AdminContent from "./AdminContent.vue";

export default {
  name: "Admin",
  components: { AdminHeader, AdminMenu, AdminContent },
  data: () => ({
    page: "home",
    isOpenMenu: false,
    isMobile: true,
  }),
  methods: {
    setPage: function (page) {
      this.page = page;
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
  async mounted() {
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

.content {
  height: calc(100vh - 62px);
}
</style>