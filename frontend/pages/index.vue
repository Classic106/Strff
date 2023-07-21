<template>
  <Club />
</template>

<script>
import Club from "@/components/Club";

export default {
  layout: "club",
  middleware: "isAuthenticated",
  components: { Club },
};
</script>

<style>
</style>

