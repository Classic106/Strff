<template>
  <form autocomplete="off" v-on:submit.stop.prevent="() => {}">
    <div class="">
      <div>
        <div class="">
          <div>
            <label class="" for="s-address"> First Name </label>
            <input
              id="s-address"
              type="text"
              placeholder="Enter your first name"
              v-model="userInfo.firstName"
              required
              autofocus="true"
              class=""
            />
          </div>
          <div>
            <label class="" for="s-address"> Last Name </label>
            <input
              id="s-address"
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
    <button :disabled="loading" type="submit" class="">Submit</button>
  </form>
</template>

<script>
export default {
  data: () => ({
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
};
</script>

<style>
</style>