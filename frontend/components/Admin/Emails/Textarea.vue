<template>
  <form class="col" v-on:submit.prevent.stop="submit">
    <div class="row m-0 p-0 justify-content-between mb-2">
      <label class="d-flex font-weight-bold" for="emails-text">Text</label>
      <button class="btn btn-warning btn-sm" v-on:click="text = ''">
        Clear
      </button>
    </div>
    <p class="text-muted"><small>Values (one line per value)</small></p>
    <textarea
      type="text"
      id="emails-text"
      v-model="text"
      name="emails-text"
      class="form-control w-100"
      :class="text ? (isValid ? 'is-valid' : 'is-invalid') : ''"
      placeholder="Ex:
example@example.com
example1@example.com"
      required
    />
    <div class="row justify-content-end align-items-center w-100 m-0 p-0 mt-3">
      <Loader v-if="loading" class="mr-2" small />
      <button
        type="submit"
        class="btn btn-success"
        :disabled="text && !isValid"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

import Loader from "~/components/common/Loader";

export default {
  name: "Textarea",
  components: { Loader },
  data: () => ({
    isValid: true,
    text: "",
    loading: false,
  }),
  watch: {
    text: function () {
      const { text } = this;

      const split = text.split("\n");
      const match = text.match(
        /(^[a-z0-9._%+-]{0,300}@[a-z0-9.-]{0,50}.[a-z]{3,4}$|^([a-z0-9._%+-]{0,300}@[a-z0-9.-]{0,50}.[a-z]{3,4})\s(true|false)$)[\t\n]*/gm
      );

      const splitResult = split && split.length;
      const matchResult = match && match.length;

      this.isValid = splitResult === matchResult;
    },
  },
  methods: {
    ...mapActions({
      setEmails: "admin_emails/setEmails",
    }),
    submit: async function () {
      this.loading = true;
      await this.setEmails(this.text);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
textarea {
  min-height: 16rem;
  max-height: 36rem;
}
</style>