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
        row
        head
        p-0
        m-3
        justify-content-center
        text-uppercase
        position-relative
        w-100
      "
    >
      <div
        ref="menuButton"
        class="nav-menu-arrow d-flex d-lg-none position-absolute"
        :class="isOpenMenu && 'open'"
        v-on:click="isOpenMenu = !isOpenMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        class="d-flex align-items-center position-relative"
        :class="
          isMobile ? 'w-75 justify-content-end' : 'w-50 justify-content-center'
        "
      >
        <h6 class="mr-5">
          <nuxt-link to="/" class="dark-orange">strff</nuxt-link>
        </h6>
        <span
          class="icon icon-search mr-3"
          :class="!isMobile && ' position-absolute'"
        ></span>
        <div
          class="icon-bag-wrap"
          :class="!isMobile ? 'position-absolute' : 'position-relative'"
          v-on:click="goToCheckout"
        >
          <span
            class="
              position-absolute
              w-100
              d-flex
              justify-content-center
              align-items-center
              dark-orange
            "
            >{{ numberOfItems }}</span
          >
          <span
            class="icon icon-bag position-relative"
            :class="!isMobile && ' position-absolute'"
          ></span>
        </div>
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
            <NuxtLink
              :to="`/categories/${category.slug}`"
              class="dark-orange"
              >{{ category.name }}</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div
        class="d-flex"
        :class="
          isMobile
            ? 'row flex-column m-0 mt-4 pl-3'
            : 'mr-4 justify-content-center align-items-center position-relative'
        "
        ref="additionalMenu"
      >
        <p
          v-on:click="isOpen = !isOpen"
          class="text-nowrap dark-orange d-flex align-items-center"
          :class="isMobile ? 'pl-4' : ''"
        >
          <span class="mr-2">MAN`S CARE</span>
          <Icon
            v-if="!isMobile"
            :icon="isOpen ? 'angle-up' : 'angle-down'"
            class="angle"
          />
        </p>
        <ul
          v-if="isMobile ? true : isOpen"
          class="rounded px-2 py-3"
          :class="isMobile ? 'pl-5' : 'position-absolute additional_menu'"
        >
          <li v-for="item in additionalMenu" :key="item.title">
            <NuxtLink :to="item.link" class="text-nowrap dark-orange">{{
              item.title
            }}</NuxtLink>
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

export default {
  name: "Header",
  components: { Icon },
  data: () => ({
    isOpenMenu: false,
    isMobile: true,
    error: null,
    isOpen: false,
    additionalMenu: [
      {
        title: "Body Care & Deodorant",
        link: "/",
      },
      {
        title: "Facial Care",
        link: "/",
      },
      {
        title: "Body Care",
        link: "/",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      numberOfItems: "cart/numberOfItems",
      username: "auth/username",
      //categories: "categories/categories",
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
    goToCheckout() {
      const isConnected = this.$store.getters["auth/username"];
      if (!isConnected) {
        this.$router.push("/signin");
        return;
      }
      this.$router.push("/checkout");
    },
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
  top: 77px;
  left: -100vw;
  background-color: #1f2020;
  z-index: 2;
  transition: all 0.5s ease, top 0.5s ease;
}

.menu-mobile.open {
  left: 0vw;
}

.ul-mobile {
  margin-top: 15px !important;
  justify-content: flex-start !important;
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

.icon-search {
  right: 60px;
  background-image: url("../assets/icons/iconmonstr-search-thin.svg");
}

.icon-bag-wrap {
  right: 0;
  width: 30px;
  height: 30px;
}

.icon-bag {
  right: 0;
  background-image: url("../assets/icons/shopping-bag.svg");
}

.icon-bag > span {
  filter: invert(50%) sepia(56%) saturate(571%) hue-rotate(6deg) brightness(88%)
    contrast(86%);
}

.angle {
  width: 0.8rem !important;
  height: 0.8rem !important;
}

.nav-menu-arrow {
  width: 50px;
  height: 50px;
  left: 20px;
  position: relative;
  cursor: pointer;
}
.nav-menu-arrow span {
  transform: rotate(0deg);
  transition: all 0.5s ease, top 0.5s ease;
  width: 50px;
  position: absolute;
  height: 10px;
  background-color: #fff;
  border-radius: 5px;
  left: 0;
}
.nav-menu-arrow span:nth-child(1) {
  top: 0px;
}
.nav-menu-arrow span:nth-child(2) {
  top: 20px;
}
.nav-menu-arrow span:nth-child(3) {
  top: 40px;
}
.nav-menu-arrow.open span:nth-child(1) {
  transform: rotate(-45deg);
  top: 10px;
  width: 30px;
}
.nav-menu-arrow.open span:nth-child(3) {
  transform: rotate(45deg);
  top: 30px;
  width: 30px;
}
</style>