<template>
  <form class="col" v-on:submit.prevent.stop="submit">
    <div class="row m-0 p-0 justify-content-between mb-2">
      <label class="d-flex font-weight-bold" for="emails-file">File</label>
      <button class="btn btn-warning btn-sm" v-on:click="files = []">
        Clear
      </button>
    </div>
    <input
      type="file"
      id="emails-file"
      v-on:change="onFileChange"
      name="emails-file"
      accept=".csv, text/plain"
      class="form-control w-100"
      required
    />
    <div class="row justify-content-end w-100 m-0 p-0">
      <button
        type="submit"
        class="btn btn-success mt-3"
        :disabled="!files.length"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Uploader",
  data: () => ({
    files: [],
  }),
  methods: {
    ...mapActions({
      setEmails: "admin_emails/setEmails",
    }),
    onFileChange: function (e) {
      this.files = e.target.files || e.dataTransfer.files;
    },
    submit: function () {
      this.setEmails(this.files);
      this.files = [];
    },
  },
};
</script>

<style scoped>
</style>