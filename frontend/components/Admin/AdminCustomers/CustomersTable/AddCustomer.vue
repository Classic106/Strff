<template>
  <div class="row justify-content-center w-100 h-100 m-0">
    <div class="col-10 my-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Add customer</h6>
      </div>
      <AddCustomerForm class="block p-3" />
    </div>
  </div>
</template>

<script>
import AddCustomerForm from "~/components/Admin/common/AddCustomerForm.vue";

export default {
  name: "AddCustomer",
  components: { AddCustomerForm },
};
</script>

<style scoped>
</style>