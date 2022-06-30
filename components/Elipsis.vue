<template>
  <div>
    <div class="px-3" v-on:click="isOpen = !isOpen">
      <span>&#8942;</span>
    </div>
    <RightSideMenu :isOpen="isOpen" v-on:isRightSide="close" />
  </div>
</template>

<script>
import RightSideMenu from "@/components/RightSideMenu";

export default {
  name: "Elipsis",
  components: { RightSideMenu },
  data: () => ({ isOpen: false }),
  methods: {
    close: function (val) {
      console.log(val);
      if (val) {
        this.isOpen = false;
        return;
      }
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style csoped>
</style>