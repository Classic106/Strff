<template>
  <BModal v-model="show" id="contact-modal" title="Contact customer" centered>
    <form v-on:submit.prevent="submit" id="contact-form">
      <div class="row">
        <div class="col-6 d-flex flex-column">
          <label class="d-flex" for="customer-email"> To </label>
          <input
            id="customer-email"
            type="text"
            v-model="order.email"
            required
            autofocus="true"
            disabled
          />
        </div>
        <div class="col-6 mb-2 d-flex flex-column">
          <label class="d-flex" for="organization-email"> From </label>
          <select id="organization-email" v-model="chosedFromEmails" required>
            <option v-for="email in fromMails" :key="email" :value="email">
              {{ email }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-2 w-100">
        <label class="d-flex" for=""> Send dcc to: </label>
        <div id="send-to-bcc">
          <div
            v-for="support in supportEmails"
            :key="support"
            class="d-flex align-items-center"
          >
            <input
              :id="support"
              type="checkbox"
              :value="support"
              v-model="chosedSupportEmails"
              autofocus="true"
              required
              class="mr-3"
            />
            <label class="d-flex" :for="support"> {{ support }} </label>
          </div>
        </div>
      </div>
      <div class="mb-2 w-100">
        <label class="d-flex" for="subject"> Subject </label>
        <input
          type="text"
          id="subject"
          placeholder="Message from:"
          v-model="messageFrom"
          required
          class="w-100"
        />
      </div>
      <div class="w-100">
        <label class="d-flex" for="custom-message">
          Custom message (optional)
        </label>
        <textarea
          type="text"
          id="custom-message"
          v-model="customMessage"
          class="w-100"
        />
      </div>
    </form>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-light mr-2" v-on:click="show = false">
          Cancel
        </button>
        <button
          size="sm"
          class="btn btn-success"
          type="submit"
          form="contact-form"
        >
          Review Email
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
export default {
  name: "ContactModal",
  props: { order: Object },
  data: () => ({
    show: false,
    fromMails: [
      "test@gmail.com",
      "test1@gmail.com",
      "test2@gmail.com",
      "test3@gmail.com",
    ],
    supportEmails: [
      "support@gmail.com",
      "support1@gmail.com",
      "support2@gmail.com",
      "support3@gmail.com",
    ],
    messageFrom: "",
    chosedFromEmails: "",
    customMessage: "",
    chosedSupportEmails: [],
  }),
  methods: {
    submit: function () {
      console.log(
        this.messageFrom,
        this.chosedFromEmails,
        this.customMessage,
        this.chosedSupportEmails
      );
    },
  },
};
</script>

<style scoped>
</style>