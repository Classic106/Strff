<template>
  <section class="container">
    <div class="grid md:grid-cols-1 mt-5 mb-5">
      <div class="w-full max-w-md my-0 mx-auto">
        <form
          class="px-8 pt-6 pb-8 mb-4"
          :class="
            username || email || password ? 'was-validated' : 'needs-validation'
          "
          autocomplete="off"
          novalidate
          @submit.stop.prevent="handleSubmit"
        >
          <div class="mb-4">
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              v-model.trim="username"
              autocomplete="off"
              required
              autofocus="true"
              :pattern="
                isUsername ? '^[a-zA-Z0-9]{1000000}$' : '^[a-zA-Z0-9]{8,}$'
              "
              title="Invalid email address"
              class="
                form-control
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
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback">
              {{
                isUsername
                  ? "Username has been already exist"
                  : "Username nust be least 8 or more characters"
              }}
            </div>
          </div>
          <div class="mb-4">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              v-model.trim="email"
              required
              autofocus="true"
              autocomplete="off"
              :pattern="
                isEmail
                  ? '[^@\s]+@[^@\s]+\.[^@\s]{100000}'
                  : '[^@\s]+@[^@\s]+\.[^@\s]+'
              "
              title="Invalid email address"
              class="
                form-control
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
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback">
              {{
                isEmail
                  ? "Email has been already exist"
                  : "Email must contain @"
              }}
            </div>
          </div>
          <div class="mb-4">
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              v-model.trim="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              autofocus="true"
              autocomplete="off"
              class="
                form-control
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
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback">
              Must contain at least one number and one uppercase and lowercase
              letter, and at least 8 or more characters
            </div>
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
    username: "",
    email: "",
    password: "",
    isUsername: false,
    isEmail: false,
    timer: null,
  }),
  watch: {
    username: function () {
      this.checkUs();
    },
    email: function () {
      this.checkUs();
    },
  },
  methods: {
    ...mapActions({
      createCustomer: "auth/createCustomer",
      checkUser: "auth/checkUser",
    }),
    checkUs: async function () {
      const { username, email } = this;

      if (username || email) {
        clearInterval(this.timer);
        this.timer = null;

        this.timer = setTimeout(async () => {
          const { isUsername, isEmail } = await this.checkUser({
            username,
            email,
          });

          this.isEmail = isEmail;
          this.isUsername = isUsername;
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
      const { isEmail, isUsername, email, username, password } = this;

      if (!isEmail && !isUsername && email && username && password) {
        const data = { email, username, password };
        await this.createCustomer(data);
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
