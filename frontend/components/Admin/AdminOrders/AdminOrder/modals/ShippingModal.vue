<template>
  <BModal
    v-model="show"
    id="shipping-modal"
    title="Edit shipping address"
    centered
  >
    <form v-on:submit.prevent="submit" id="shipping-form">
      <select v-model="selectedAddress" class="mb-2">
        <option disabled>Select address</option>
        <option :value="address" v-for="address in addresses" :key="address">
          {{ address }}
        </option>
      </select>
      <div class="w-100">
        <label for="country/region">Country/Region</label>
        <country-select
          v-model="country"
          :country="country"
          topCountry="US"
          class="mb-2 w-100"
        />
      </div>
      <div class="row mb-2">
        <div class="col-6">
          <label class="d-flex" for="first-name"> First Name </label>
          <input
            id="first-name"
            type="text"
            placeholder="Enter your first name"
            v-model="currentOrder.firstName"
            required
            autofocus="true"
            class=""
          />
        </div>
        <div class="col-6">
          <label class="d-flex" for="last-name"> Last Name </label>
          <input
            id="last-name"
            type="text"
            placeholder="Enter your last name"
            v-model="currentOrder.lastName"
            required
            autofocus="true"
            class=""
          />
        </div>
      </div>
      <div class="mb-2 w-100">
        <label class="d-flex" for="s-company"> Company </label>
        <input
          id="s-company"
          type="text"
          placeholder="Enter company name"
          v-model="currentOrder.company"
          autofocus="true"
          class="w-100"
        />
      </div>
      <div class="mb-2 w-100">
        <label class="d-flex" for="s-address"> Address </label>
        <input
          id="s-address"
          type="text"
          placeholder="Enter your address"
          v-model="currentOrder.address1"
          required
          autofocus="true"
          class="w-100"
        />
      </div>
      <div class="mb-2 w-100">
        <label class="d-flex" for="s-address"> Address </label>
        <input
          id="s-address"
          type="text"
          placeholder="Enter your address"
          v-model="currentOrder.address1"
          required
          autofocus="true"
          class="w-100"
        />
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col-4">
          <label class="d-flex" for="s-city"> City </label>
          <input
            id="s-city"
            type="text"
            placeholder="Enter your city"
            v-model="currentOrder.city"
            required
            autofocus="true"
            class="w-100"
          />
        </div>
        <div class="col-4">
          <label class="d-flex" for="s-state"> State </label>
          <select
            size="1"
            name="states_hash"
            v-model="currentOrder.state"
            ref="select"
            required
            class="w-100"
            :class="currentOrder.state && 'chosed'"
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
        <div class="col-4">
          <label class="d-flex" for="s-zip-code"> Zip Code </label>
          <input
            id="s-zip-code"
            type="text"
            placeholder="Enter your Zip code"
            v-model="currentOrder.zip"
            required
            autofocus="true"
            class="w-100"
          />
        </div>
      </div>
      <div class="w-100">
        <label class="d-flex" for="cellphone"> Cellphone </label>
        <vue-tel-input
          id="cellphone"
          v-model="currentOrder.cellphone"
          v-bind="vueTelInputProps(false)"
        ></vue-tel-input>
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
          form="shipping-form"
        >
          Save
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
import { states_hashes } from "@/data";

export default {
  name: "ShippingModal",
  props: { order: Object },
  data: () => ({
    show: false,
    states_hashes,
    addresses: ["addresses", "addresses1", "addresses2", "addresses3"],
    selectedAddress: "",
    country: "",
    currentOrder: {},
  }),
  methods: {
    submit: function () {
      console.log(this.currentOrder);
    },
    showHash: function (hash) {
      if (
        !this.openSelect &&
        this.currentOrder.state &&
        this.currentOrder.state.name === hash.name
      ) {
        return hash.abbreviation;
      }

      return hash.name;
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
    this.currentOrder = JSON.parse(JSON.stringify(this.order));
  },
};
</script>

<style scoped>
</style>