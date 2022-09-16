<template>
  <div class="d-flex justify-content-between align-items-center py-3">
    <div class="d-flex align-items-center">
      <span class="px-3">strf</span>
      <span class="px-2">{{ getDate() }}</span>
    </div>
    <div>
      <input v-model="text" type="text" placeholder="Search" />
    </div>
    <div class="px-3">user</div>
  </div>
</template>

<script>
export default {
  name: "AdminHeader",
  data: () => ({
    text: "",
  }),
  methods: {
    getDate: function () {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();

      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style scoped>
</style>