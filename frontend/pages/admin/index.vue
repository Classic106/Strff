<template>
  <div>
    <Admin />
    <LightBox />
  </div>
</template>

<script>
import Admin from "~/components/Admin";
import LightBox from "@/components/common/LightBox.vue";

export default {
  name: "AdminPage",
  components: { Admin, LightBox },
};
</script>

<style scoped>
</style>