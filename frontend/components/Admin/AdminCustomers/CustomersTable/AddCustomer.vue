<template>
  <div class="row justify-content-center w-100 h-100 m-0">
    <div class="col-10 h-100 mt-3">
      <div class="d-flex w-100 mb-3 d-flex align-items-center">
        <button v-on:click="$emit('setIsTable')" class="mr-3">
          <BIconArrowLeft />
        </button>
        <h6 class="m-0">Add customer</h6>
      </div>
      <form
        autocomplete="off"
        id="add-customer-form"
        v-on:submit.stop.prevent="save"
        class="block mb-3 p-3"
        ref="form"
      >
        <div class="p-2">
          <div class="row mb-2">
            <div class="col-6">
              <label class="d-flex" for="first-name"> First Name </label>
              <input
                id="first-name"
                type="text"
                placeholder="Enter first name"
                v-model.trim="customer.firstName"
                required
                autofocus="true"
                class="w-100"
              />
            </div>
            <div class="col-6">
              <label class="d-flex" for="last-name"> Last Name </label>
              <input
                id="last-name"
                type="text"
                placeholder="Enter last name"
                v-model.trim="customer.lastName"
                required
                autofocus="true"
                class="w-100"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="d-flex" for="s-contact-no"> Cellphone </label>
              <vue-tel-input
                id="cellphone"
                v-model.trim="customer.cellphone"
                v-bind="vueTelInputProps(false)"
              ></vue-tel-input>
            </div>
            <div class="col-6">
              <label class="d-flex" for="s-email"> Email </label>
              <input
                id="s-email"
                type="text"
                placeholder="Enter email"
                v-model="customer.email"
                required
                autofocus="true"
                class="w-100"
              />
            </div>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="s-address"> Address </label>
            <input
              id="s-address"
              type="text"
              placeholder="Enter your address"
              v-model.trim="customer.address1"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
          <div class="mb-2">
            <label class="d-flex" for="s-city"> City </label>
            <input
              id="s-city"
              type="text"
              placeholder="Enter your city"
              v-model.trim="customer.city"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
          <div class="mb-2">
            <label class="d-flex" for="s-state"> State </label>
            <select
              size="1"
              name="states_hash"
              v-model="customer.state"
              ref="select"
              required
              class="w-100"
              :class="customer.state && 'chosed'"
            >
              <option disabled :value="''">Chose state</option>
              <option
                v-for="hash in states_hashes"
                :key="hash.name"
                :value="hash"
              >
                {{ showHash(hash) }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="s-zip-code"> Zip Code </label>
            <input
              id="s-zip-code"
              type="text"
              placeholder="Enter your Zip code"
              v-model.trim="customer.zip"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
          <div class="mb-2">
            <label class="d-flex" for="s-company"> Company </label>
            <input
              id="s-company"
              type="text"
              placeholder="Enter company name"
              v-model.trim="customer.company"
              autofocus="true"
              class="w-100"
            />
          </div>
        </div>
      </form>
      <div class="w-100 d-flex justify-content-end">
        <button
          size="sm"
          class="btn btn-light mr-2"
          v-on:click="$emit('setIsTable')"
        >
          Cancel
        </button>
        <button
          size="sm"
          class="btn btn-success"
          type="submit"
          form="add-customer-form"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { states_hashes } from "@/data";

export default {
  name: "AddCustomer",
  data: () => ({
    customer: {
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      cellphone: "",
      email: "",
    },
    states_hashes,
  }),
  methods: {
    ...mapActions({
      createCustomer: "admin_customers/createCustomer",
    }),
    vueTelInputProps: (required = true) => ({
      mode: "international",
      validCharactersOnly: true,
      inputOptions: {
        placeholder: "Enter a phone number",
        required,
      },
    }),
    showHash: function (hash) {
      if (this.customer.state && this.customer.state.name === hash.name) {
        return hash.abbreviation;
      }

      return hash.name;
    },
    save: async function () {
      const { state } = this.customer;
      const data = {
        ...this.customer,
        state: state.name,
      };
      await this.createCustomer(data);
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
input,
select {
  position: relative;
  border: 1px solid #000;
  border-radius: 5px;
}

.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}
</style>