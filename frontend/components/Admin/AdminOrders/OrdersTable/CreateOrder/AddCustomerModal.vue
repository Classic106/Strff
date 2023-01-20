<template>
  <BModal
    v-model="show"
    id="create-order-modal"
    title="Add customer"
    centered
    scrollable
    :hide-footer="true"
  >
    <AddCustomerForm />
  </BModal>
</template>

<script>
import AddCustomerForm from "~/components/Admin/common/AddCustomerForm.vue";

export default {
  name: "AddCustomerModal",
  components: { AddCustomerForm },
};
</script>

<style scoped>
</style>