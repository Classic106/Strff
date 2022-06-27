<template>
  <section class="container">
    <div class="grid md:grid-cols-1 mt-3">
      <div class="w-full max-w-md my-0 mx-auto">
        <form class="px-8 pt-6 pb-8 mb-4" @submit.stop.prevent="handleSubmit">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Email
            </label>
            <input
              class="
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none focus:shadow-outline
              "
              id="email"
              type="email"
              placeholder="Email"
              v-model="email"
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                mb-3
                leading-tight
                focus:outline-none focus:shadow-outline
              "
              id="password"
              type="password"
              placeholder="******************"
              v-model="password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="
                bg-blue-500
                hover:bg-blue-700
                text-white
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
            <nuxt-link event="" v-on:click.native="linkClick" to="/signup">
              Registration
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
  name: "SingIn",
  props: { isMenu: Boolean, toggle: Function },
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    linkClick() {
      if (this.isMenu) {
        this.toggle();
        return;
      }
      this.$router.push("/signup");
    },
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await this.$strapi.login({
          identifier: this.email,
          password: this.password,
        });
        this.loading = false;
        this.setUser(response.user);
        this.$store.dispatch("cart/syncByUser", response.user.id);
        this.$router.go(-1);
      } catch (err) {
        this.loading = false;
        alert(err.message || "An error occurred.");
      }
    },
    ...mapMutations({
      setUser: "auth/setUser",
    }),
  },
};
</script>
