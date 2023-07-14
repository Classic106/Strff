<template>
  <section class="container">
    <div class="grid md:grid-cols-1 mt-5 mb-5">
      <div class="w-full max-w-md my-0 mx-auto">
        <form class="px-8 pt-8 pb-8 mb-4" @submit.stop.prevent="handleSubmit">
          <div class="mb-4">
            <input
              class="
                appearance-none
                border
                rounded
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none focus:shadow-outline
              "
              id="email"
              type="email"
              placeholder="Email"
              v-model="identifier"
              
            />
          </div>
          <div class="mb-6">
            <input
              class="
                appearance-none
                border
                rounded
                py-2
                px-3
                text-gray-700
                mb-3
                leading-tight
                focus:outline-none focus:shadow-outline
              "
              id="password"
              type="password"
              placeholder="Password"
              v-model="password"
              
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="
                border-0
                bg-blue-500
                hover:bg-blue-700
                text-white
                gold-background
                font-bold
                py-2
                px-4
                rounded
                focus:outline-none focus:shadow-outline
              "
              type="submit"
            >
              Sign In
            </button>
          </div>
          <p class="text-center mt-3">
            Don't have account?
            <nuxt-link event="" v-on:click.native="linkClick" to="/register">
              Registration
            </nuxt-link>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SingIn",
  props: { isMenu: Boolean, toggle: Function },
  data() {
    return {
      identifier: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({ login: "auth/login" }),
    linkClick() {
      if (this.isMenu) {
        this.toggle();
        return;
      }
      this.$router.push("/register");
    },
    async handleSubmit() {
      // const data = { identifier: "test@test.test", password: "test123456" }; //admin
      const data = { identifier: "test1@gmail.com", password: "test123456" }; //customer
      //const { identifier, password } = this;
      await this.login(data);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  max-width: 450px;
}
</style>
