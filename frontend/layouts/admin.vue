<template>
  <div class="bg-grey">
    <header>
      <AdminHeader :isOpenMenu="isOpenMenu" v-on:isOpenMenuHeader="isOpen" />
    </header>
    <main class="h-100 w-100 m-0 row position-relative">
      <section
        ref="menu"
        class="col-md-2 p-0"
        :class="
          isMobile
            ? isOpenMenu
              ? 'menu-mobile open'
              : 'menu-mobile'
            : 'position-relative justify-content-between'
        "
      >
        <AdminMenu v-on:isOpen="isOpen" />
      </section>
      <vueCustomScrollbar
        class="content overflow-auto p-0 col-md-10 col-12 ml-auto"
        :settings="scrollSettings"
      >
        <Nuxt class="p-0 m-0 h-100" />
      </vueCustomScrollbar>
    </main>
    <LightBox />
    <notifications group="all" position="top center" />
  </div>
</template>

<script>
import AdminHeader from "~/components/Admin/AdminHeader";
import AdminMenu from "~/components/Admin/AdminMenu.vue";
import LightBox from "@/components/common/LightBox.vue";

export default {
  name: "AdminPage",
  components: { AdminHeader, AdminMenu, LightBox },
  data: () => ({
    isOpenMenu: false,
    isMobile: true,
    scrollSettings: {
      suppressScrollX: false,
      wheelPropagation: true,
    },
  }),
  methods: {
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
  height: 100%;
  position: absolute;
  top: 0;
  left: -100vw;
  transition: all 0.5s ease, top 0.5s ease;
}

.menu-mobile.open {
  left: 0vw;
  height: 100%;
}

.content {
  height: calc(100vh - 4.8rem);
}
</style>