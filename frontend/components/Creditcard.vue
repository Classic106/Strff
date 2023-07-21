<template>
  <div class="mb-3 px-2">
    <v-credit-card-form
      v-on:change="creditInfoChanged"
      :trans="translations"
      :noCard="true"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Creditcard",
  data: () => ({
    cardData: null,
    translations: {
      name: {
        label: "Name",
        placeholder: "Name",
      },
      card: {
        label: "Card Number",
        placeholder: "Card Number",
      },
      expiration: {
        label: "Expiration",
        placeholder: "Expiration",
      },
      security: {
        label: "CVV/CSC",
        placeholder: "CVV/CSC",
      },
    },
  }),
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
  },
  methods: {
    creditInfoChanged(values) {
      this.cardData = values;

      const isCardNumber = this.cardData.cardNumber.length === 19;
      const isExpiration = this.cardData.expiration.length === 5;
      const isSecurity = this.cardData.security.length === 4;
      if (isCardNumber && isExpiration && isSecurity) {
        console.log(this.cardData);
        this.$emit('setCreditcard', this.cardData);
      }
    },
  },
};
</script>

<style>

    .credit-card-form > .field:first-child, label {
        display: none;
    }

    #card-number,
    #expirationdate,
    #securitycode {
        padding: 4px 10px;
        border: 1px solid gray;
        border-radius: 0;
        color: #000;
        background: #fff;
    }

    .credit-card-form > .field,
    .credit-card-form > .field-group,
    .credit-card-form > .field > input,
    .credit-card-form > .field-group > .field,
    .credit-card-form > .field-group > .field > input {
        width: 100%;
    }

    .credit-card-form > .field-group {
        display: flex;
    }

    .credit-card-form > .field-group > .field:first-child {
        margin-right: 8px;
    }

    .credit-card-form > .field-group > .field:last-child {
        margin-left: 8px;
    }

</style>