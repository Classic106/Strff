<template>
  <form class="col" v-on:submit.prevent.stop="submit">
    <div class="row m-0 p-0 justify-content-between mb-2">
      <label class="d-flex font-weight-bold" for="emails-file">File</label>
      <button type="button" class="btn btn-warning btn-sm" v-on:click="clear()">
        Clear
      </button>
    </div>
    <input
      type="file"
      id="emails-file"
      ref="fileupload"
      v-on:change="onFileChange"
      name="emails-file"
      accept=".csv, text/plain"
      class="form-control w-100"
      required
    />
    <div class="row justify-content-end align-items-center w-100 m-0 p-0 mt-3">
      <Loader v-if="loading" class="mr-2" small />
      <button type="submit" class="btn btn-success" :disabled="!files.length">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

import Loader from "~/components/common/Loader";

export default {
  name: "Uploader",
  components: { Loader },
  data: () => ({
    files: [],
    loading: false,
  }),
  methods: {
    ...mapActions({
      setEmails: "admin_emails/setEmails",
    }),
    clear: function () {
      this.$refs.fileupload.value = null;
      this.files = [];
    },
    onFileChange: function (e) {
      this.files = e.target.files || e.dataTransfer.files;
    },
    submit: async function () {
      this.loading = true;
      const result = await this.setEmails(this.files);

      if (result) {
        this.clear();
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
</style>