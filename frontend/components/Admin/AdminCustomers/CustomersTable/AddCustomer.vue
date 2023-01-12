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
          <div class="mb-2">
            <label class="d-flex" for="username"> User Name </label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              v-model.trim="customer.username"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="d-flex" for="first-name"> First Name </label>
              <input
                id="first-name"
                type="text"
                placeholder="Enter first name"
                v-model.trim="customer.first_name"
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
                v-model.trim="customer.last_name"
                autofocus="true"
                class="w-100"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <label class="d-flex" for="s-contact-no"> Cellphone </label>
              <masked-input
                type="text"
                name="s-contact-no"
                class="w-100"
                v-model.trim="customer.contact_no"
                :mask="phoneMask"
                :guide="true"
                placeholder="+1(___)-___-____"
              />
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
          <div class="row mb-2">
            <div class="col-6">
              <label class="d-flex" for="s-address1"> Address 1</label>
              <input
                id="s-address1"
                type="text"
                placeholder="Enter your address"
                v-model.trim="customer.address_1"
                autofocus="true"
                class="w-100"
              />
            </div>
            <div class="col-6">
              <label class="d-flex" for="s-address2"> Address 2</label>
              <input
                id="s-address2"
                type="text"
                placeholder="Enter your address"
                v-model.trim="customer.address_2"
                autofocus="true"
                class="w-100"
              />
            </div>
          </div>
          <div class="mb-2">
            <label class="d-flex" for="s-city"> City </label>
            <input
              id="s-city"
              type="text"
              placeholder="Enter your city"
              v-model.trim="customer.city"
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
              class="w-100"
              :class="customer.state && 'chosed'"
            >
              <option disabled :value="''">Chose state</option>
              <option v-for="hash in states" :key="hash.name" :value="hash">
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
              v-model.trim="customer.zip_code"
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

import { states } from "@/data";

export default {
  name: "AddCustomer",
  data: () => ({
    customer: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zip_code: "",
      contact_no: "",
      role: 3,
    },
    phoneMask: [
      "+",
      "1",
      " ",
      "(",
      /[1-9]/,
      /\d/,
      /\d/,
      ")",
      " ",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    states,
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
input {
  max-width: 100%;
}

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