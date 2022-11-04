<template>
  <div class="w-100 h-100">
    <div
      v-if="!user"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>
    <slot v-else name="page"></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Loader from "~/components/common/Loader";

export default {
  name: "Admin",
  components: { Loader },
  data: () => ({ loading: true }),
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    if (!this.user) {
      this.$router.push("/admin/login");
    } else {
      const { path } = this.$route;
      this.$router.push(path);
    }
  },
};
</script>

<style scoped>
</style>