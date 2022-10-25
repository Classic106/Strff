<template>
  <BModal
    v-model="show"
    id="create-order-modal"
    title="Add customer"
    centered
    scrollable
    :hide-footer="true"
  >
    <form v-on:submit.stop.prevent="save" class="mb-3" ref="form">
      <div class="p-2">
        <div class="row mb-2">
          <div class="col-6">
            <label class="d-flex" for="first-name"> First Name </label>
            <input
              id="first-name"
              type="text"
              placeholder="Enter first name"
              v-model.trim="userInfo.firstName"
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
              v-model.trim="userInfo.lastName"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-6">
            <label class="d-flex" for="s-contact-no"> Cellphone </label>
            <input
              id="s-contact-no"
              type="text"
              placeholder="Enter cellphone"
              v-model.trim="userInfo.cellphone"
              required
              autofocus="true"
              class="w-100"
            />
          </div>
          <div class="col-6">
            <label class="d-flex" for="s-email"> Email </label>
            <input
              id="s-email"
              type="text"
              placeholder="Enter email"
              v-model.trim="userInfo.email"
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
            v-model.trim="userInfo.address1"
            required
            autofocus="true"
            class=""
          />
        </div>
        <div class="mb-2">
          <label class="d-flex" for="s-city"> City </label>
          <input
            id="s-city"
            type="text"
            placeholder="Enter your city"
            v-model.trim="userInfo.city"
            required
            autofocus="true"
            class=""
          />
        </div>
        <div class="mb-2">
          <label class="d-flex" for="s-state"> State </label>
          <select
            size="1"
            name="states_hash"
            v-model.trim="userInfo.state"
            ref="select"
            required
            :class="userInfo.state && 'chosed'"
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
            v-model.trim="userInfo.zip"
            required
            autofocus="true"
            class=""
          />
        </div>
        <div class="mb-2">
          <label class="d-flex" for="s-company"> Company </label>
          <input
            id="s-company"
            type="text"
            placeholder="Enter company name"
            v-model.trim="userInfo.company"
            autofocus="true"
            class=""
          />
        </div>
      </div>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-light mr-2" v-on:click="show = false">
          Cancel
        </button>
        <button size="sm" class="btn btn-success" type="submit">Save</button>
      </div>
    </form>
  </BModal>
</template>

<script>
import { states_hashes } from "@/data";

export default {
  name: "AddCustomerModal",
  data: () => ({
    show: false,
    userInfo: {
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
    saved: false,
    openSelect: false,
    states_hashes,
  }),
  methods: {
    showHash: function (hash) {
      if (
        !this.openSelect &&
        this.userInfo.state &&
        this.userInfo.state.name === hash.name
      ) {
        return hash.abbreviation;
      }

      return hash.name;
    },
    save: async function () {
      const { name } = this.userInfo.state;
      const form = { ...this.userInfo, state: name };

      try {
        const token = this.$cookies.get("token");

        const { data } = await this.$axios.post(`/customers`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$emit("addCustomer", data);
        this.$refs.form.reset();
        this.show = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
input,
select {
  padding: 10px;
  border: 1px solid #000;
  border-radius: 6px;
  color: #000;
  width: 100%;
}

select {
  color: gray;
}

.save {
  color: #fff;
  border: none;
}
</style>