<template>
  <header
    class="
      d-flex
      flex-column
      p-0
      m-0
      justify-content-center
      align-items-center
      w-100
      position-sticky
    "
  >
    <div
      class="
        head
        d-flex
        px-4
        my-4
        mb-lg-2
        justify-content-between
        align-items-center
        text-uppercase
        w-100
      "
    >
      <div
        ref="menuButton"
        class="nav-menu-arrow d-flex d-lg-none"
        :class="isOpenMenu && 'open'"
        v-on:click="isOpenMenu = !isOpenMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h6 class="d-flex justify-content-center align-items-center w-100 m-0">
        <nuxt-link to="/" class="gold m-0">strff</nuxt-link>
      </h6>
      <div class="d-flex align-items-center ml-4">
        <Search class="cursor-pointer" />
        <Cart class="cursor-pointer" />
      </div>
    </div>
    <div
      class="row w-100"
      :class="
        isMobile
          ? isOpenMenu
            ? 'menu-mobile open flex-column'
            : 'menu-mobile'
          : 'position-relative justify-content-between'
      "
    >
      <div class="col-lg row">
        <ul
          ref="menu"
          class="
            pl-4
            text-uppercase
            d-flex
            w-100
            m-0
            flex-column flex-lg-row
            justify-content-center
          "
          :class="isMobile ? 'ul-mobile' : ''"
        >
          <li
            v-for="category in categories"
            :key="category.id"
            class="px-3 py-2"
          >
            <NuxtLink :to="`/categories/${category.slug}`" class="gold">{{
              category.name
            }}</NuxtLink>
          </li>
          <li
            class="d-flex"
            :class="
              isMobile
                ? 'row flex-column m-0 pl-3'
                : 'justify-content-center align-items-center position-relative'
            "
            ref="additionalMenu"
          >
            <a
              v-on:click.prevent="isOpen = !isOpen"
              class="
                gold
                cursor-pointer
                d-flex
                align-items-center
                text-nowrap
                m-0
              "
            >
              MAN`S CARE
              <Icon
                v-if="!isMobile"
                :icon="isOpen ? 'angle-up' : 'angle-down'"
                class="angle ml-1"
              />
            </a>
            <vueCustomScrollbar
              class="
                scroll-area
                position-realtive
                d-flex
                flex-column
                overflow-auto
                rounded
                p-3
              "
              :settings="scrollSettings"
              v-if="isMobile ? true : isOpen"
              :class="isMobile ? '' : 'position-absolute additional_menu'"
            >
              <ul class="p-0">
                <li v-for="article in articles" :key="article.name">
                  <NuxtLink
                    :to="`/article/${article.id}`"
                    class="text-nowrap gold"
                    >{{ article.name }}</NuxtLink
                  >
                </li>
              </ul>
            </vueCustomScrollbar>
          </li>
        </ul>
      </div>
    </div>
    <span class="p-3 text-center m-0 w-100">
      Last chance to shop holiday gifts. Buy online and pick up at an STRFF
      Store or choose two‑hour courier or free delivery. Shop now
    </span>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import Icon from "@/assets/icons";
import Search from "./Search";
import Cart from "./Cart";

export default {
  name: "Header",
  components: { Icon, Search, Cart },
  data: () => ({
    isOpenMenu: false,
    isMobile: true,
    error: null,
    isOpen: false,
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      //categories: "categories/categories",
      articles: "articles/articles",
    }),
    categories: {
      //return this.$store.getters["categories/categories"];
      get: function () {
        return this.$store.getters["categories/categories"];
      },
      set: function (newValue) {},
    },
  },
  methods: {
    handlerResize(e) {
      this.isMobile = !(e.target.innerWidth > 992);
    },
    closeOutsideMenu(e) {
      const { menu, menuButton, additionalMenu } = this.$refs;
      const { target } = e;

      if (!menu || !menuButton || !additionalMenu || !target) {
        return;
      }
      if (
        menu !== target &&
        !menu.contains(target) &&
        menuButton !== target &&
        !menuButton.contains(target) &&
        additionalMenu !== target &&
        !additionalMenu.contains(target)
      ) {
        this.isOpenMenu = false;
        this.isOpen = false;
      }
    },
  },
  async mounted() {
    this.handlerResize({ target: window });
    window.addEventListener("resize", this.handlerResize);
    document.addEventListener("click", this.closeOutsideMenu);

    try {
      this.categories = await this.$strapi.find("categories");
    } catch (error) {
      this.error = error;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handlerResize);
    document.addEventListener("click", this.closeOutsideMenu);
  },
};
</script>

<style>
header {
  max-height: 220px;
  background-color: #1f2020;
  color: #fff;
  z-index: 2;
}

header > span {
  color: #fff;
  background-color: #2b2b2b;
  border-top: 1px solid #707070;
  border-bottom: 1px solid #707070;
}

.head {
  width: 56%;
}

.menu-mobile {
  display: flex !important;
  height: 100vh;
  position: absolute;
  width: 80vw !important;
  top: 35%;
  left: -100vw;
  background-color: #1f2020;
  transition: all 0.5s ease, top 0.5s ease;
}

.scroll-area {
  max-height: 46vh;
}

.menu-mobile.open {
  left: 0vw;
}

.ul-mobile {
  margin-top: 15px !important;
  justify-content: flex-start !important;
}

h6 > a {
  font-family: "Roboto", sans-serif;
}

li > a {
  font-family: "Roboto", sans-serif;
  display: block;
  width: 100%;
}

.additional_menu {
  top: 100%;
  right: 0;
  background: #000;
}

.icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  filter: brightness(0) invert(1);
  background-size: cover;
}

.angle {
  width: 0.8rem !important;
  height: 0.8rem !important;
}

.nav-menu-arrow {
  width: 80px;
  height: 26px;
  position: relative;
  cursor: pointer;
}
.nav-menu-arrow span {
  transform: rotate(0deg);
  transition: all 0.5s ease, top 0.5s ease;
  width: 30px;
  position: absolute;
  height: 4px;
  background-color: #fff;
  border-radius: 5px;
  left: 0;
}
.nav-menu-arrow span:nth-child(1) {
  top: 0px;
}
.nav-menu-arrow span:nth-child(2) {
  top: 10px;
}
.nav-menu-arrow span:nth-child(3) {
  top: 20px;
}
.nav-menu-arrow.open span:nth-child(1) {
  transform: rotate(-45deg);
  top: 5px;
  width: 20px;
  left: -4px;
}
.nav-menu-arrow.open span:nth-child(3) {
  transform: rotate(45deg);
  top: 17px;
  width: 20px;
  left: -4px;
}
</style>