<template>
  <div>
    <AdminHeader />
    <div class="d-flex h-100">
      <AdminMenu class="w-25 h-100" v-on:setPage="setPage" />
      <AdminContent class="w-75 h-100" :page="page" />
    </div>
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
  }),
  methods: {
    setPage: function (page) {
      this.page = page;
    },
  },
};
</script>

<style scoped>
</style>