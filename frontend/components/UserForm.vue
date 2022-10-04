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
        <select
          size="1"
          name="states_hash"
          v-model="userInfo.state"
          ref="select"
          required
          :class="userInfo.state && 'chosed'"
        >
          <option disabled :value="''">Chose state</option>
          <option v-for="hash in states_hashes" :key="hash.name" :value="hash">
            {{ showHash(hash) }}
          </option>
        </select>
      </div>
      <div class="mb-2">
        <label class="" for="s-zip-code"> Zip Code </label>
        <input
          id="s-zip-code"
          type="text"
          placeholder="Enter your Zip code"
          v-model="userInfo.zip"
          required
          autofocus="true"
          class=""
        />
      </div>
      <div class="mb-2">
        <label class="" for="s-contact-no"> cellphone </label>
        <input
          id="s-contact-no"
          type="text"
          placeholder="Enter your cellphone"
          v-model="userInfo.cellphone"
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
        {{ saved ? "saved" : "save" }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { states_hashes } from "@/data";

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
      cellphone: "",
      email: "",
    },
    saved: false,
    openSelect: false,
    states_hashes,
  }),
  computed: {
    ...mapGetters({
      user: "auth/user",
      userInf: "userInfo/userInfo",
    }),
  },
  watch: {
    userInfo: {
      handler() {
        this.choseState = false;
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations({
      setUserInfo: "userInfo/setUserInfo",
    }),
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
    send: function () {
      if (this.password) {
        this.userInfo.password = this.password;
      }
      this.saved = true;
      this.setUserInfo(this.userInfo);
      this.$emit("setUserInfo", this.userInfo);
    },
  },
  mounted() {
    if (this.user) {
      const {
        firstName,
        lastName,
        company,
        address1,
        address2,
        city,
        state,
        zip,
        cellphone,
        email,
      } = this.user;

      this.userInfo = {
        firstName,
        lastName,
        company,
        address1,
        address2,
        city,
        state,
        zip,
        cellphone,
        email,
      };
    } else {
      this.userInfo = { ...this.userInfo, ...this.userInf };
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