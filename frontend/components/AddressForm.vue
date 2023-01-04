<template>
  <form autocomplete="off" v-on:submit.stop.prevent="send" class="mb-3">
    <div class="px-2">
      <div class="mb-2">
        <label class="" for="first-name"> First Name </label>
        <input
          id="first-name"
          type="text"
          placeholder="Enter your first name"
          v-model="address.firstName"
          required
          autofocus="true"
        />
      </div>
      <div class="mb-2">
        <label class="" for="last-name"> Last Name </label>
        <input
          id="last-name"
          type="text"
          placeholder="Enter your last name"
          v-model="address.lastName"
          required
          autofocus="true"
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-company"> Company </label>
        <input
          id="s-company"
          type="text"
          placeholder="Enter company name"
          v-model="address.company"
          autofocus="true"
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-address"> Address </label>
        <input
          id="s-address"
          type="text"
          placeholder="Enter your address"
          v-model="address.address1"
          required
          autofocus="true"
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-city"> City </label>
        <input
          id="s-city"
          type="text"
          placeholder="Enter your city"
          v-model="address.city"
          required
          autofocus="true"
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-state"> State </label>
        <select
          size="1"
          name="states_hash"
          v-model="address.state"
          ref="select"
          required
          :class="address.state && 'chosed'"
        >
          <option disabled :value="''">Chose state</option>
          <option v-for="state in states" :key="state.name" :value="state.name">
            {{ state.name }}
          </option>
        </select>
      </div>
      <div class="mb-2">
        <label class="" for="s-zip-code"> Zip Code </label>
        <input
          id="s-zip-code"
          type="text"
          placeholder="Enter your Zip code"
          v-model="address.zip"
          required
          autofocus="true"
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-contact-no"> Cellphone </label>
        <input
          id="s-contact-no"
          type="text"
          placeholder="Enter your cellphone"
          v-model="address.contactNo"
          required
          autofocus="true"
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-email"> Email </label>
        <input
          id="s-email"
          type="text"
          placeholder="Enter your email"
          v-model="address.email"
          required
          autofocus="true"
        />
      </div>
      <button
        class="text-uppercase w-100 p-2 save gold-background"
        type="submit">
        {{ isSaved ? "Saved" : "Save" }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { states } from "@/data";

export default {
  props: {
    addressType: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    address: {
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      contactNo: '',
      email: '',
      type: 0
    },
    isSaved: false,
    openSelect: false,
    states,
  }),
  computed: {
    ...mapGetters({
      order: "order/order"
    }),
  },
  methods: {
    send: function () {
      this.address.type = this.addressType;
      this.isSaved = true;
      this.$emit("setAddress", this.address);
    },
    cancel: function () {
      this.question = false;
      this.createAccount = false;
    },
  },
  mounted() {
    if (this.addressType == 1) {
      this.address = {
        firstName: this.order.shipping_first_name,
        lastName: this.order.shipping_last_name,
        company: this.order.shipping_company,
        address1: this.order.shipping_address_1,
        address2: this.order.shipping_address_2,
        city: this.order.shipping_city,
        state: this.order.shipping_state,
        zip: this.order.shipping_zip_code,
        contactNo: this.order.shipping_contact_no,
        email: this.order.shipping_email
      };
    } else {
      this.address = {
        firstName: this.order.billing_first_name,
        lastName: this.order.billing_last_name,
        company: this.order.billing_company,
        address1: this.order.billing_address_1,
        address2: this.order.billing_address_2,
        city: this.order.billing_city,
        state: this.order.billing_state,
        zip: this.order.billing_zip_code,
        contactNo: this.order.billing_contact_no,
        email: this.order.billing_email
      };
    }

    const { select } = this.$refs;

    select.onchange = () => select.blur();
    select.onfocus = () => (this.openSelect = true);
    select.onblur = () => (this.openSelect = false);
    select.onkeyup = (e) => {
      if (e.keyCode == 27) this.openSelect = true;
    };
  },
};
</script>

<style scoped>
input,
select {
  padding: 10px;
  border: none;
  border-radius: 6px;
  color: #fff;
  background: #222222;
  width: 100%;
}

select {
  color: gray;
}

select.chosed {
  color: #fff;
}

.save {
  color: #fff;
  border: none;
}
</style>