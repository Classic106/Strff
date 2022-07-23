<template>
  <form autocomplete="off" v-on:submit.stop.prevent="send" class="mb-3">
    <div class="px-2">
      <div class="mb-2">
        <label class="" for="first-name"> First Name </label>
        <input
          id="first-name"
          type="text"
          placeholder="Enter your first name"
          v-model="userInfo.firstName"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="last-name"> Last Name </label>
        <input
          id="last-name"
          type="text"
          placeholder="Enter your last name"
          v-model="userInfo.lastName"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-company"> Company </label>
        <input
          id="s-company"
          type="text"
          placeholder="Enter company name"
          v-model="userInfo.company"
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-address"> Address </label>
        <input
          id="s-address"
          type="text"
          placeholder="Enter your address"
          v-model="userInfo.address1"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-city"> City </label>
        <input
          id="s-city"
          type="text"
          placeholder="Enter your city"
          v-model="userInfo.city"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-state"> State </label>
        <input
          id="s-state"
          type="text"
          placeholder="Enter your state"
          v-model="userInfo.state"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-zip-code"> Zip Code </label>
        <input
          id="s-zip-code"
          type="text"
          placeholder="Enter your postal code"
          v-model="userInfo.zip"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-contact-no"> Contact No. </label>
        <input
          id="s-contact-no"
          type="text"
          placeholder="Enter your contact no."
          v-model="userInfo.contactNo"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-email"> Email </label>
        <input
          id="s-email"
          type="text"
          placeholder="Enter your email"
          v-model="userInfo.email"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div v-if="false">
        <div class="mb-2">
          <label class="" for="s-password"> Password </label>
          <input
            class=""
            id="s-password"
            type="password"
            placeholder="******************"
            v-model="password"
          />
        </div>
        <div class="mb-2">
          <label class="" for="s-comfirm-password"> Confirm Password </label>
          <input
            class=""
            id="s-comfirm-password"
            type="password"
            placeholder="******************"
            v-model="password"
          />
        </div>
      </div>
      <button
        class="text-uppercase w-100 p-2 save gold-background"
        type="submit"
      >
        save
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    password: "",
    userInfo: {
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      contactNo: "",
      email: "",
    },
  }),
  methods: {
    send: function () {
      if (this.password) {
        this.userInfo.password = this.password;
      }
      this.$emit("setUserInfo");
    },
    cancel: function () {
      this.question = false;
      this.createAccount = false;
    },
  },
};
</script>

<style scoped>
input {
  padding: 10px;
  border: none;
  border-radius: 6px;
  color: #fff;
  background: #222222;
  width: 100%;
}

.save {
  color: #fff;
  border: none;
}
</style>