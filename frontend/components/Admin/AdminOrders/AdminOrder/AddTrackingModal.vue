<template>
  <BModal v-model="show" id="tracking-modal" title="Add tracking" centered>
    <form v-on:submit.prevent="submit" id="tracking-form">
      <div class="row mb-2">
        <div class="col-6 d-flex flex-column">
          <label class="d-flex" for="tracking-number"> Tracking number </label>
          <input
            id="tracking-number"
            type="text"
            v-model="tracking_number"
            required
            autofocus="true"
          />
        </div>
        <div class="col-6 d-flex flex-column">
          <label class="d-flex" for="shipping-carrier">
            Shipping carrier
          </label>
          <input
            id="shipping-carrier"
            type="text"
            v-model="shipping_carrier"
            required
            autofocus="true"
          />
        </div>
      </div>
      <div class="d-flex align-items-center">
        <input
          type="checkbox"
          id="send-to-customer"
          v-model="send_to_customer"
          autofocus="true"
          class="mr-3"
        />
        <label class="d-flex m-0" for="send-to-customer">
          Send notification email to customer
        </label>
      </div>
    </form>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-light mr-2" v-on:click="show = false">
          Cancel
        </button>
        <button
          size="sm"
          class="btn btn-success"
          type="submit"
          form="tracking-form"
        >
          Save
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
export default {
  name: "AddTrackingModal",
  data: () => ({
    show: false,
    tracking_number: "",
    shipping_carrier: "",
    send_to_customer: false,
  }),
  methods: {
    submit: function () {
      console.log(
        this.tracking_number,
        this.shipping_carrier,
        this.send_to_customer
      );
    },
  },
};
</script>

<style scoped>
</style>