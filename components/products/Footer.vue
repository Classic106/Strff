<template>
  <div class="d-flex justify-content-between m-5">
    <p>©Copyright Rebelnut.com. 2021</p>
    <div class="d-flex">
      <a href="https://twitter.com/" class="ml-4">
        <Twitter />
      </a>
      <a href="https://facebook.com/" class="ml-3">
        <Facebook />
      </a>
    </div>
  </div>
</template>

<script>
import Twitter from "~/components/icons/twitter.vue";
import Facebook from "~/components/icons/facebook.vue";

export default {
  components: {
    Twitter,
    Facebook,
  },
};
</script>

<style>
.emoji {
  font-size: 30px;
}
</style>
