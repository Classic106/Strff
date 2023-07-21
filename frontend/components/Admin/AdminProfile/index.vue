<template>
  <div v-if="currentUser" class="row justify-content-center my-5">
    <div class="col-11 p-0">
      <div class="d-flex justify-content-between mb-3">
        <button v-on:click="back" class="button">
          <BIconArrowLeft />
        </button>
        <span class="text-ellipsis ml-3">{{ currentUser.username }}</span>
        <button
          class="btn btn-primary btn-block w-25"
          v-on:click="$root.$emit('bv::show::modal', 'peset-password')"
        >
          Reset password
        </button>
      </div>
      <form
        autocomplete="off"
        @submit.stop.prevent="submit"
        class="block was-validated p-3"
      >
        <div class="mb-4">
          <label class="d-flex mb-2" for="username"> Name </label>
          <input
            id="username"
            type="text"
            :pattern="!isUsername ? '^[a-zA-Z0-9\s_]{5,100}$' : ''"
            class="form-control w-100"
            placeholder="Name"
            v-model="currentUser.username"
            required
          />
          <div class="invalid-feedback">
            <div v-if="isUsername">Username is exist</div>
            <div v-else class="d-flex align-items-center">
              Title must be from 5 to 100 symbols and may contain &nbsp;
              <h6>space, _</h6>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label class="d-flex mb-2" for="email"> Email </label>
          <input
            id="email"
            type="email"
            :pattern="
              !isEmail
                ? '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$'
                : ''
            "
            class="form-control w-100"
            placeholder="Email"
            v-model="currentUser.email"
            required
          />
          <div class="invalid-feedback">
            <div v-if="isEmail">Email is exist</div>
            <div v-else class="d-flex align-items-center">
              Title must be from 10 to 100 symbols and may contain &nbsp;
              <h6>_</h6>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-success btn-block mt-3">
          Update
        </button>
      </form>
    </div>
    <ChangePasswordModal />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ChangePasswordModal from "./ChangePasswordModal.vue";

export default {
  name: "AdminProfile",
  components: { ChangePasswordModal },
  data: () => ({
    backUrl: null,
    currentUser: null,
    isResetPassword: false,
    isUsername: false,
    isEmail: false,
    timer: null,
  }),
  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
  watch: {
    currentUser: {
      handler: function () {
        this.checkUs();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      checkUser: "auth/checkUser",
      updateUser: "auth/updateUser",
    }),
    back: function () {
      this.$router.push(this.backUrl);
    },
    checkUs: function () {
      const { username, email } = this.currentUser;
      const { username: name, email: mail } = this.user;

      if ((username && username !== name) || (email && email !== mail)) {
        clearInterval(this.timer);
        this.timer = null;

        this.timer = setTimeout(async () => {
          const { isUsername, isEmail } = await this.checkUser({
            username,
            email,
          });

          this.isUsername = isUsername && username !== name;
          this.isEmail = isEmail && email !== mail;
        }, 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    submit: async function () {
      const updatetdUser = { ...this.currentUser };
      await this.updateUser(updatetdUser);
    },
  },
  mounted() {
    const { params } = this.$route;
    const { backUrl } = params;

    this.backUrl = backUrl ? backUrl : "/admin";
    this.currentUser = JSON.parse(JSON.stringify(this.user));
  },
};
</script>

<style  scoped>
</style>