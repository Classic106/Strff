<template>
  <form v-on:submit.prevent="send" class="d-flex flex-column">
    <input type="text" v-model="login" placeholder="login" />
    <input type="text" v-model="pass" placeholder="password" />
    <button class="btn btn-succcess" type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: "AdminLogin",
  data: () => ({
    login: "",
    pass: "",
  }),
  methods: {
    send: function () {
      console.log(this.login, this.pass);
    },
  },
};
</script>

<style scoped>
</style>