<template>
  <form
    autocomplete="off"
    id="add-customer-form"
    v-on:submit.stop.prevent="save"
    class="was-validated mb-3"
    ref="form"
  >
    <div class="p-2">
      <div class="mb-2">
        <label class="d-flex" for="username"> User Name </label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          v-model.trim="customerMain.username"
          :pattern="isUsername ? '^[a-zA-Z0-9]{1000000}$' : '^[a-zA-Z0-9]{8,}$'"
          required
          autofocus="true"
          class="form-control w-100"
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">
          {{
            isUsername
              ? "Username has been already exist"
              : "Username must be least 8 or more characters"
          }}
        </div>
      </div>
      <div class="mb-2">
        <label class="d-flex" for="username"> Email </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          v-model.trim="customerMain.email"
          required
          autofocus="true"
          autocomplete="off"
          :pattern="
            isEmail
              ? '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{10000}$'
              : '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          "
          class="form-control py-2 px-3"
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">
          {{
            isEmail ? "Email has been already exist" : "Email must contain @"
          }}
        </div>
      </div>
      <div class="mb-2">
        <label class="d-flex" for="s-contact-no"> Cellphone </label>
        <masked-input
          type="text"
          name="s-contact-no"
          class="form-control w-100"
          pattern="\+1 \(\d{3}\)-\d{3}-\d{4}"
          required
          v-model.trim="customerMain.contact_no"
          :mask="phoneMask"
          :guide="true"
          placeholder="+1 (___)-___-____"
        />
        <div class="valid-feedback">Looks good!</div>
        <div class="invalid-feedback">Wrong number</div>
      </div>
      <div class="row mb-2">
        <div class="col-6">
          <label class="d-flex" for="first-name"> First Name </label>
          <input
            id="first-name"
            type="text"
            placeholder="Enter first name"
            v-model.trim="customerAdditional.first_name"
            pattern="^[a-zA-Z]+$"
            :class="customerAdditional.first_name ? 'form-control' : ''"
            autofocus="true"
            class="bts_input_style w-100"
          />
        </div>
        <div class="col-6">
          <label class="d-flex" for="last-name"> Last Name </label>
          <input
            id="last-name"
            type="text"
            placeholder="Enter last name"
            v-model.trim="customerAdditional.last_name"
            pattern="^[a-zA-Z]+$"
            :class="customerAdditional.last_name ? 'form-control' : ''"
            autofocus="true"
            class="bts_input_style w-100"
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
            :class="customerAdditional.address_1 ? 'form-control' : ''"
            pattern="[\.\-\,\w ]+"
            v-model.trim="customerAdditional.address_1"
            autofocus="true"
            class="bts_input_style w-100"
          />
        </div>
        <div class="col-6">
          <label class="d-flex" for="s-address2"> Address 2</label>
          <input
            id="s-address2"
            type="text"
            placeholder="Enter your address"
            :class="customerAdditional.address_2 ? 'form-control' : ''"
            pattern="[\.\-\,\w ]+"
            v-model.trim="customerAdditional.address_2"
            autofocus="true"
            class="bts_input_style w-100"
          />
        </div>
      </div>
      <div class="mb-2">
        <label class="d-flex" for="s-city"> City </label>
        <input
          id="s-city"
          type="text"
          placeholder="Enter your city"
          v-model.trim="customerAdditional.city"
          :class="customerAdditional.city ? 'form-control' : ''"
          pattern="[a-zA-Z]+"
          autofocus="true"
          class="bts_input_style w-100"
        />
      </div>
      <div class="mb-2">
        <label class="d-flex" for="s-state"> State </label>
        <select
          size="1"
          name="states_hash"
          v-model="customerAdditional.state"
          ref="select"
          class="bts_input_style w-100"
          :class="customerAdditional.state && 'chosed form-control'"
        >
          <option disabled :value="''">Chose state</option>
          <option v-for="hash in states" :key="hash.name" :value="hash">
            {{ showHash(hash) }}
          </option>
        </select>
      </div>
      <div class="mb-2">
        <label class="d-flex" for="s-zip-code"> Zip Code </label>
        <masked-input
          type="text"
          name="s-zip-code"
          class="bts_input_style w-100"
          :class="customerAdditional.zip_code ? 'form-control ' : ''"
          pattern="\d{5}-\d{4}"
          v-model.trim="customerAdditional.zip_code"
          :mask="zipMask"
          :guide="true"
          placeholder="_____-____"
        />
      </div>
      <div class="mb-2">
        <label class="d-flex" for="s-company"> Company </label>
        <input
          id="s-company"
          type="text"
          placeholder="Enter company name"
          v-model.trim="customerAdditional.company"
          :class="customerAdditional.company ? 'form-control' : ''"
          pattern="[\.\-\,\w ]+"
          autofocus="true"
          class="bts_input_style w-100"
        />
      </div>
    </div>
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
  </form>
</template>

<script>
import { mapActions } from "vuex";

import { states } from "@/data";

export default {
  name: "AddCustomerForm",
  data: () => ({
    customerMain: {
      username: "",
      email: "",
      contact_no: "",
    },
    customerAdditional: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zip_code: "",
      role: 3,
    },
    isUsername: false,
    isEmail: false,
    phoneMask: [
      "+",
      "1",
      " ",
      "(",
      /[1-9]/,
      /\d/,
      /\d/,
      ")",
      "-",
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    zipMask: [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
    states,
  }),
  watch: {
    customerMain: {
      handler: async function () {
        await this.checkUs();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      createCustomer: "admin_customers/createCustomer",
      checkUser: "auth/checkUser",
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
      if (
        this.customerAdditional.state &&
        this.customerAdditional.state.name === hash.name
      ) {
        return hash.abbreviation;
      }

      return hash.name;
    },
    checkUs: async function () {
      const { username, email } = this.customerMain;

      if (username || email) {
        clearInterval(this.timer);
        this.timer = null;

        this.timer = setTimeout(async () => {
          const { isUsername, isEmail } = await this.checkUser({
            username,
            email,
          });

          this.isEmail = isEmail;
          this.isUsername = isUsername;
        }, 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    save: async function () {
      const { customerMain, customerAdditional } = this;
      const { state } = customerAdditional;

      const data = {
        ...customerMain,
        ...{ ...customerAdditional, state: state.name },
      };
      await this.createCustomer(data);
      this.$refs.form.reset();
    },
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style scoped>
input {
  max-width: 100%;
}
</style>