<template>
  <BModal v-model="show" id="customer-modal" title="Edit customer">
    <form v-on:submit.prevent="submit">
      <div class="row">
        <div class="col-6 d-flex flex-column">
          <label class="d-flex" for="first-name"> First Name </label>
          <input
            id="first-name"
            type="text"
            placeholder="Enter your first name"
            v-model="newOrder.firstName"
            required
            autofocus="true"
            class=""
          />
        </div>
        <div class="col-6 mb-2 d-flex flex-column">
          <label class="d-flex" for="last-name"> Last Name </label>
          <input
            id="last-name"
            type="text"
            placeholder="Enter your last name"
            v-model="newOrder.lastName"
            required
            autofocus="true"
            class=""
          />
        </div>
      </div>
      <div class="mb-2 w-100">
        <label class="d-flex" for="email"> Email </label>
        <input
          id="email"
          type="text"
          placeholder="Enter your email"
          v-model="newOrder.email"
          required
          autofocus="true"
          class="w-100"
        />
      </div>
      <div class="w-100">
        <label class="d-flex" for="cellphone"> Cellphone </label>
        <vue-tel-input
          id="cellphone"
          v-model="newOrder.cellphone"
          v-bind="vueTelInputProps(false)"
        ></vue-tel-input>
      </div>
    </form>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-danger mr-2" v-on:click="show = false">
          Cancel
        </button>
        <button size="sm" class="btn btn-success" type="submit">Save</button>
      </div>
    </template>
  </BModal>
</template>

<script>
export default {
  name: "CustomerModalPage",
  props: { order: Object },
  data: () => ({
    show: false,
    newOrder: {},
  }),
  methods: {
    submit: function () {
      console.log(this.newOrder);
    },
    vueTelInputProps: (required = true) => ({
      mode: "international",
      validCharactersOnly: true,
      inputOptions: {
        placeholder: "Enter a phone number",
        required,
      },
    }),
  },
  mounted() {
    this.newOrder = JSON.parse(JSON.stringify(this.order));
  },
};
</script>

<style scoped>
</style>