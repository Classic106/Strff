<template>
  <div class="row justify-content-center w-100">
    <div class="col-10 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Create bundle</h6>
      </div>
      <div class="block p-3 mb-3">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateBundle",
};
</script>

<style scoped>
</style>