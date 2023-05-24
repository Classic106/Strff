<template>
  <form class="col" v-on:submit.prevent.stop="submit">
    <div class="row m-0 p-0 justify-content-between mb-2">
      <label class="d-flex font-weight-bold" for="emails-text">Text</label>
      <button class="btn btn-warning btn-sm" v-on:click="text = ''">
        Clear
      </button>
    </div>
    <p class="text-muted"><small>Values (one line per value)</small></p>
    <vueCustomScrollbar class="scroll overflow-auto" :settings="scrollSettings">
      <div class="row m-0 p-0">
        <ul id="lineCounter" class="col-1 py-2 column p-0 m-0 text-center">
          <li
            v-for="(line, index) in lines"
            :class="text.length && wrongLines.includes(index) && 'wrong_line'"
            :key="`line${line}`"
          >
            {{ line }}
          </li>
        </ul>
        <div class="col-11 position-relative">
          <textarea
            type="text"
            id="emails-text"
            v-model.trim="text"
            name="emails-text"
            class="form-control position-absolute mt-1 mr-1"
            :class="text ? (isValid ? 'is-valid' : 'is-invalid') : ''"
            placeholder="Ex:
example@example.com ?status
example1@example.com ?status"
            required
          />
        </div>
      </div>
    </vueCustomScrollbar>
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

import { email_with_status_RegExp } from "~/patterns";
import Loader from "~/components/common/Loader";

export default {
  name: "Textarea",
  components: { Loader },
  data: () => ({
    isValid: true,
    text: "",
    loading: false,
    lines: [1],
    wrongLines: [],
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: true,
    },
  }),
  watch: {
    text: function () {
      const { text } = this;
      this.wrongLines = [];

      const split = text.split("\n");
      const match = split.reduce((acc, item, index) => {
        const result = item.match(email_with_status_RegExp);
        if (result) {
          acc.push(item);
        } else {
          this.wrongLines.push(index);
        }
        return acc;
      }, []);

      if (split) {
        this.lines = split.map((_, index) => index + 1);
      } else {
        this.lines = [1];
      }

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
#emails-text {
  resize: none;
  right: 0;
  min-height: 15rem;
  width: 100%;
  height: 100%;
}

.wrong_line {
  background-color: brown;
}

.scroll {
  min-height: 16rem;
  max-height: 36rem;
}
</style>