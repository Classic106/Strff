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
        flex-column
        px-4
        my-4
        mb-lg-2
        justify-content-between
        align-items-center
        text-uppercase
        w-100
        position-relative
      "
    >
      <div class="w-100 d-flex">
        <div ref="menuButton">
          <BurgerMenuButton
            :isOpenMenu="isOpenMenu"
            v-on:isOpenMenu="isOpenMenu = !isOpenMenu"
          />
        </div>
        <h6 class="d-flex justify-content-center align-items-center w-100 m-0">
          <nuxt-link to="/" class="gold m-0">strff</nuxt-link>
        </h6>
        <div class="d-flex align-items-center ml-sm-4 ml-1">
          <Search class="cursor-pointer" />
          <Cart class="cursor-pointer" />
        </div>
      </div>
      <div
        class="row m-0 w-100"
        :class="
          isMobile
            ? isOpenMenu
              ? 'menu-mobile open'
              : 'menu-mobile'
            : 'position-relative justify-content-between'
        "
      >
        <div class="menu-wrap col-lg col-sm-8 m-0" ref="menu">
          <ul
            class="
              pl-sm-4 pl-1
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
              class="px-md-3 px-1 py-2"
            >
              <NuxtLink
                :to="`/categories/${category.slug}`"
                class="gold"
                v-on:click.native="linkClick(`/categories/${category.slug}`)"
                >{{ category.name }}</NuxtLink
              >
            </li>
            <li
              class="d-flex"
              :class="
                isMobile
                  ? 'row flex-column m-0 pl-md-3 pl-1'
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
                      class="gold"
                      v-on:click.native="linkClick(`/article/${article.id}`)"
                      >{{ article.name }}</NuxtLink
                    >
                  </li>
                </ul>
              </vueCustomScrollbar>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <span v-if="isTextBunner" class="p-3 text-center m-0 w-100">
      Last chance to shop holiday gifts. Buy online and pick up at an STRFF
      Store or choose two‑hour courier or free delivery. Shop now
    </span>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

import Icon from "@/assets/icons";
import BurgerMenuButton from "~/components/common/BurgerMenuButton.vue";
import Search from "./Search";
import Cart from "./Cart";

export default {
  name: "Header",
  props: {
    isTextBunner: {
      type: Boolean,
      default: false,
    },
  },
  components: { Icon, Search, Cart, BurgerMenuButton },
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
    linkClick(link) {
      this.$router.push(link);
      this.isOpenMenu = false;
      this.isOpen = false;
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
    document.removeEventListener("click", this.closeOutsideMenu);
  },
};
</script>

<style scoped>
header {
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
  top: calc(100% + 28px);
  left: -100vw;
  transition: all 0.5s ease, top 0.5s ease;
}

.scroll-area {
  max-height: 46vh;
}

.menu-mobile.open {
  left: 0vw;
  height: 100vh;
}

.menu-wrap {
  background-color: #1f2020;
  height: 100%;
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

a:hover {
  color: #d2a52c;
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
</style>