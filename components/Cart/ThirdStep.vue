<template>
  <div class="mx-3">
    <p class="text-uppercase">payment method</p>
    <v-credit-card-form
      v-on:change="creditInfoChanged"
      :trans="translations"
      :noCard="true"
    />
    <button class="text-uppercase w-100 mt-4 p-2 finalize-order">
      finalize and place order
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
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
  methods: {
    creditInfoChanged(values) {
      console.log("Credit card fields", values);
    },
  },
};
</script>

<style>
.credit-card-form > .field:first-child,
label {
  display: none;
}

#card-number,
#expirationdate,
#securitycode {
  padding: 10px;
  border: none;
  border-radius: 6px;
  color: #fff;
  background: #222222;
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

.finalize-order {
  color: #fff;
  border: none;
  background: #5bb85d;
}
</style>