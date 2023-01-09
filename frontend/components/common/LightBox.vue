<template>
  <CoolLightBox
    :items="images"
    :index="imageIndex"
    :loop="true"
    @close="clearImageIndex"
  />
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "LightBox",
  computed: {
    ...mapGetters({
      images: "cool_light_box/images",
      imageIndex: "cool_light_box/imageIndex",
    }),
  },
  methods: {
    ...mapMutations({
      clearImageIndex: "cool_light_box/clearImageIndex",
    }),
  },
};
</script>

<style scoped>
</style>