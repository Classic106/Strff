<template>
  <div class="menu h-100">
    <ul class="d-flex flex-column h-100 pt-3 p-0 pr-2">
      <li
        v-on:click="setPage()"
        class="menu-item cursor-pointer d-flex align-items-center"
        :class="currentPage === '' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconHouseDoorFill class="mr-2" />Home</span
        >
      </li>
      <li
        v-on:click="setPage('orders')"
        class="menu-item cursor-pointer d-flex align-items-center"
        :class="currentPage === 'orders' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconInboxFill class="mr-2" />Orders</span
        >
      </li>
      <li
        v-on:click="setPage('products')"
        class="menu-item cursor-pointer d-flex align-items-center"
        :class="currentPage === 'products' && 'active'"
      >
        <span class="d-flex cursor-pointer align-items-center w-100 p-1"
          ><BIconTagFill class="mr-2" />Products</span
        >
      </li>
      <li
        v-on:click="setPage('bundles')"
        class="menu-item cursor-pointer d-flex align-items-center"
        :class="currentPage === 'bundles' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconTagsFill class="mr-2" />Bundles</span
        >
      </li>
      <li
        v-on:click="setPage('customers')"
        class="menu-item cursor-pointer d-flex align-items-center"
        :class="currentPage === 'customers' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconPersonFill class="mr-2" />Customers</span
        >
      </li>
      <li
        v-on:click="setPage('categories')"
        class="menu-item cursor-pointer d-flex align-items-center"
        :class="currentPage === 'categories' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconStack class="mr-2" />Categories</span
        >
      </li>
      <li
        v-on:click="setPage('types')"
        class="menu-item cursor-pointer d-flex align-items-center"
        :class="currentPage === 'types' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconClipboard class="mr-2" />Types</span
        >
      </li>
      <li
        v-on:click="setPage('articles')"
        class="menu-item cursor-pointer d-flex align-items-center"
        :class="currentPage === 'articles' && 'active'"
      >
        <span class="d-flex align-items-center w-100 p-1"
          ><BIconJournalText class="mr-2" />Articles</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AdminMenu",
  data: () => ({ currentPage: "" }),
  methods: {
    setPage: function (page = "") {
      this.$emit("isOpen", false);
      this.currentPage = page;
      this.$router.push(`/admin/${page}`);
    },
    popstate: function () {
      this.currentPage = window.location.pathname.replace("/admin/", "");
    },
  },
  beforeMount() {
    this.popstate();
  },
  mounted() {
    window.addEventListener("popstate", this.popstate);
  },
  destroyed() {
    window.removeEventListener("popstate", this.popstate);
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .menu {
    background-color: #fff;
  }
}

span {
  font-size: 1rem;
}

.menu {
  z-index: 20;
  color: #000;
  border-right: 1px solid black;
}

.menu-item::before {
  content: "";
  width: 4px;
  height: 100%;
  display: block;
  margin-right: 4px;
}

.menu-item.active::before {
  content: "";
  background-color: green;
  border-radius: 0 5px 5px 0;
}

.menu-item.active > span {
  background-color: #edeef0;
  border-radius: 5px;
  color: green;
}
</style>