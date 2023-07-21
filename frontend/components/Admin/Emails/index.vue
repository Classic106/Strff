<template>
  <div class="col px-3">
    <h6 class="w-100 text-left p-3 m-0">Emails</h6>
    <CheckEmail class="block mt-2 p-3" />
    <Uploader class="block mt-2 p-3" />
    <Textarea class="block mt-2 p-3" />
    <DeleteEmail class="block mt-2 p-3 mb-3" />
  </div>
</template>

<script>
import CheckEmail from "./CheckEmail.vue";
import Uploader from "./Uploader.vue";
import Textarea from "./Textarea.vue";
import DeleteEmail from "./DeleteEmail.vue";

export default {
  name: "Emails",
  components: { CheckEmail, Uploader, Textarea, DeleteEmail },
};
</script>

<style scoped>
</style>