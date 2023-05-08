<template>
  <div class="col px-3">
    <h6 class="w-100 text-left p-3 m-0">Emails</h6>
    <Uploader class="block mt-2 p-3" />
    <Textarea class="block mt-2 p-3" />
  </div>
</template>

<script>
import Uploader from "./Uploader.vue";
import Textarea from "./Textarea.vue";

export default {
  name: "Emails",
  components: { Uploader, Textarea },
};
</script>

<style scoped>
</style>