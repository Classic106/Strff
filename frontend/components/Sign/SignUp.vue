<template>
  <section class="container">
    <div class="grid md:grid-cols-1 mt-5 mb-5">
      <div class="w-full max-w-md my-0 mx-auto">
        <form
          class="px-8 pt-6 pb-8 mb-4"
          autocomplete="off"
          @submit.stop.prevent="handleSubmit"
        >
          <div class="mb-4">
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              v-model.trim="form.username"
              autocomplete="off"
              required
              autofocus="true"
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
            />
          </div>
          <div class="mb-4">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model.trim="form.email"
              required
              autofocus="true"
              autocomplete="off"
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
            />
            <p :class="isEmail ? 'd-flex' : 'd-none'">
              Email has been already exist
            </p>
          </div>
          <div class="mb-4">
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              v-model.trim="form.password"
              required
              autofocus="true"
              autocomplete="off"
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
import { mapActions } from "vuex";

export default {
  name: "SingUp",
  props: { isMenu: Boolean, toggle: Function },
  data: () => ({
    form: {
      email: "",
      password: "",
      username: "",
    },
    isEmail: false,
    timer: null,
  }),
  watch: {
    form: {
      handler() {
        this.checkCurrentEmail();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      createCustomer: "auth/createCustomer",
      checkEmail: "auth/checkEmail",
    }),
    checkCurrentEmail: async function () {
      const { email } = this.form;

      if (email) {
        clearInterval(this.timer);
        this.timer = null;

        this.timer = setTimeout(async () => {
          const result = await this.checkEmail(email);

          if (result) {
            this.isEmail = true;
          } else {
            this.isEmail = false;
          }
        }, 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    linkClick() {
      if (this.isMenu) {
        this.toggle();
        return;
      }
      this.$router.push("/login");
    },
    async handleSubmit() {
      const { isEmail, form } = this;
      const { email, username, password } = form;

      if (!isEmail && email && username && password) {
        await this.createCustomer(form);
      }
    },
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style lang="scss">
input {
  width: 100%;
  max-width: 450px;
}
</style>
