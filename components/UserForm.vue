<template>
  <div>
    <form autocomplete="off" v-on:submit.stop.prevent="send">
      <div class="">
        <div>
          <div class="">
            <div>
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
            <div>
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
          <div class="mb-5">
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
          <div class="mb-5">
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
          <div class="mb-5">
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
        </div>
      </div>
      <div v-if="!question">
        <button v-on:click="$emit('haveAccount')">i have account</button>
        <button class="" v-on:click="question = true">Next</button>
      </div>
      <div v-else>
        <div
          v-if="!createAccount"
          class="d-flex flex-column align-items-center"
        >
          <p class="text-uppercase">do you want create account?</p>
          <div class="d-flex">
            <button class="btn btn-success" v-on:click="createAccount = true">
              yes
            </button>
            <button class="btn btn-danger" type="submit">no</button>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center" v-else>
          <p class="text-uppercase">enter password</p>
          <div class="d-flex">
            <input
              class=""
              id="password"
              type="password"
              placeholder="******************"
              v-model="password"
            />
            <button type="submit">create</button>
            <button v-on:click="cancel">cancel</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    question: false,
    createAccount: false,
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
      console.log(this.userInfo);
      this.$emit("next");
    },
    cancel: function () {
      this.question = false;
      this.createAccount = false;
    },
  },
};
</script>

<style>
</style>