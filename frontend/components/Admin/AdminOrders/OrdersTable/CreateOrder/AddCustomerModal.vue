<template>
  <BModal
    v-model="show"
    id="create-order-modal"
    title="Add customer"
    size="lg"
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
  data: () => ({ show: false }),
};
</script>

<style scoped>
</style>