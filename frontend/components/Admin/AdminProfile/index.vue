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
        @submit.stop.prevent="handleSubmit"
        class="block p-3"
      >
        <div class="mb-4">
          <label class="d-flex mb-2" for="username"> Name </label>
          <input
            id="username"
            type="text"
            class="w-100"
            placeholder="Name"
            v-model="currentUser.username"
            required
          />
        </div>
        <div class="mb-4">
          <label class="d-flex mb-2" for="email"> Email </label>
          <input
            id="email"
            type="email"
            class="w-100"
            placeholder="Email"
            v-model="currentUser.email"
            required
          />
        </div>
        <!--div class="mb-4">
          <label class="d-flex mb-2" for="first_name"> First name </label>
          <input
            id="first_name"
            type="text"
            class="w-100"
            placeholder="First name"
            v-model="currentUser.first_name"
          />
        </div>
        <div class="mb-4">
          <label class="d-flex mb-2" for="last_name"> Last name </label>
          <input
            id="last_name"
            type="text"
            class="w-100"
            placeholder="Last name"
            v-model="currentUser.last_name"
          />
        </div-->
        <div class="mb-4">
          <label class="d-flex mb-2" for="role"> Role </label>
          <select class="w-100" id="role" v-model="roleId">
            <option :value="role.id" v-for="role in roles" :key="role.id">
              {{ role.name }}
            </option>
          </select>
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
import { mapGetters } from "vuex";

import ChangePasswordModal from "./ChangePasswordModal.vue";

export default {
  name: "AdminProfile",
  components: { ChangePasswordModal },
  data: () => ({
    backUrl: null,
    currentUser: null,
    roles: null,
    roleId: null,
    isResetPassword: false,
  }),
  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
  methods: {
    back: function () {
      this.$router.push(this.backUrl);
    },
    handleSubmit: async function () {
      const { id } = this.currentUser;
      const updatetdUser = { ...this.currentUser, role: this.roleId };
      const { data } = await this.$axios.put(`/users/${id}`, updatetdUser);
    },
  },
  async beforeMount() {
    const { data } = await this.$axios.get(`/users-permissions/roles`);
    this.roles = data.roles;
  },
  mounted() {
    const { params } = this.$route;
    const { backUrl } = params;

    this.backUrl = backUrl ? backUrl : "/admin";
    this.currentUser = JSON.parse(JSON.stringify(this.user));
    this.roleId = this.currentUser.role.id;
    console.log(this.user);
  },
};
</script>

<style  scoped>
</style>