<template>
  <section class="container">
    <div class="grid md:grid-cols-1 mt-5 mb-5">
      <div class="w-full max-w-md my-0 mx-auto">
        <form class="px-8 pt-6 pb-8 mb-4" autocomplete="off" @submit.stop.prevent="handleSubmit">
          <div class="mb-4">
            <input id="username" type="text" placeholder="Enter your username" v-model="username"
              required autofocus="true" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div class="mb-4">
            <input id="email" type="email" placeholder="Enter your email" v-model="email" required autofocus="true"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div class="mb-4">
            <input id="password" type="password" placeholder="Enter your password" v-model="password" required autofocus="true"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div class="flex items-center justify-between">
            <button class="border-0 bg-blue-500 hover:bg-blue-700 text-white gold-background font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
          <p class="text-center mt-3">
            Already have an account?
            <nuxt-link event="" v-on:click.native="linkClick" to="/login">
              Login
            </nuxt-link>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "SingUp",
  props: { isMenu: Boolean, toggle: Function },
  data() {
    return {
      email: '',
      password: '',
      username: '',
      loading: false,
    };
  },
  methods: {
    linkClick() {
      if (this.isMenu) {
        this.toggle();
        return;
      }
      this.$router.push('/login');
    },
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await this.$strapi.register({
          email: this.email,
          username: this.username,
          password: this.password,
        });
        this.loading = false;
        this.setCurrentLoggedUser(response.user);
        this.$router.push('/');
      } catch (err) {
        this.loading = false;
        alert(err.message || 'An error occurred.');
      }
    },
    ...mapMutations({
        setCurrentLoggedUser: 'auth/setUser',
    }),
  },
};
</script>

<style lang="scss">

input {
    width: 100%;
    max-width: 450px;
}

</style>