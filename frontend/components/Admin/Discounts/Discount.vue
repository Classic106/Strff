<template>
  <div class="row w-100 justify-content-center m-0 mt-3">
    <div class="d-flex flex-column align-items-center col-10 p-0">
      <div class="d-flex align-items-center justify-content-between w-100">
        <button v-on:click="$emit('setIsTable')" class="button">
          <BIconArrowLeft />
        </button>
      </div>
      <form
        class="was-validated w-100"
        id="admin-discount-form"
        v-on:submit.stop.prevent="submit"
      >
        <div class="block col m-0 p-3 mt-3">
          <label class="d-flex font-weight-bold" for="code"> Code </label>
          <div class="row m-0 justify-content-between">
            <div class="col-9">
              <input
                id="code"
                class="form-control"
                v-model="currentDiscount.code"
                pattern="^[a-zA-Z0-9]{12}$"
                required
              />
              <div class="invalid-feedback">Value must have 12 characters</div>
            </div>
            <div class="mt-1">
              <button class="btn btn-success btn-sm" v-on:click="generateCode">
                generate
              </button>
            </div>
          </div>
        </div>
        <div class="block row w-100 m-0 justify-content-between mt-2 p-2">
          <div class="col-6">
            <label class="d-flex font-weight-bold" for="type">Type</label>
            <div class="d-flex">
              $
              <BFormCheckbox
                id="type"
                v-model="currentDiscount.percent"
                class="ml-2"
                switch
              />
              %
            </div>
          </div>
          <div class="col-6">
            <label class="d-flex font-weight-bold" for="value"> Value </label>
            <InputDecimal
              id="value"
              class="form-control w-100"
              :value="currentDiscount.value"
              :maxlength="5"
              v-on:setDecimal="setValue"
              required
            />
            <div class="invalid-feedback">Value must be greater than 1</div>
          </div>
        </div>
        <div class="block row m-0 p-3 mt-3">
          <div class="col-6 d-flex flex-column">
            <label class="d-flex font-weight-bold" for="status">Status</label>
            <select
              id="status"
              required
              v-model="status"
              class="form-control is-valid"
            >
              <option value="published">published</option>
              <option value="null">draft</option>
            </select>
          </div>
          <div class="col-6 d-flex flex-column">
            <label class="d-flex font-weight-bold" for="used">Used</label>
            <input
              id="used"
              disabled
              v-model="currentDiscount.used"
              class="form-control"
            />
          </div>
        </div>
        <div class="block p-3 mt-3">
          <label class="d-flex font-weight-bold" for="customers">
            Customers
          </label>
          <CustomersBlock v-on:setCustomers="setCustomers" id="customers" />
        </div>
        <div class="block p-3 mt-3">
          <label class="d-flex font-weight-bold" for="products">
            Products
          </label>
          <ProductsBlock v-on:setProducts="setProducts" id="products" />
        </div>
        <div class="block p-3 mt-3">
          <label class="d-flex font-weight-bold" for="bundles"> Bundles </label>
          <BundlesBlock v-on:setBundles="setBundles" id="bundles" />
        </div>
        <ChoseDates
          class="block mt-2 p-2"
          v-on:setRange="setRange"
          label="Chose dates"
          column
          inline
          from_today
        />
      </form>
      <div class="row justify-content-between w-100">
        <button
          :class="selected ? 'col-8' : 'w-100'"
          class="btn btn-success text-uppercase my-2"
          type="submit"
          form="admin-discount-form"
        >
          {{ selected ? "update" : "create" }}
        </button>
        <button
          class="col-3 btn btn-danger text-uppercase my-2"
          v-if="selected"
          v-on:click="deleteDiscount"
        >
          delete
        </button>
      </div>
    </div>
    <ConfirmModal :id="'confirm-delete-discount'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
const voucher_codes = require("voucher-code-generator");

import { prevCurrNextItems } from "~/helpers";
import { error } from "~/utils/error";

import CustomersBlock from "~/components/Admin/common/CustomersBlock.vue";
import ProductsBlock from "~/components/Admin/common/ProductsBlock.vue";
import BundlesBlock from "~/components/Admin/common/BundlesBlock.vue";
import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";
import InputDecimal from "~/components/Admin/common/InputDecimal.vue";
import ChoseDates from "~/components/Admin/common/ChoseDates.vue";

export default {
  name: "Discount",
  components: {
    ConfirmModal,
    InputDecimal,
    ChoseDates,
    BundlesBlock,
    ProductsBlock,
    CustomersBlock,
  },
  data: () => ({
    status: "null",
    currentDiscount: {
      value: 0,
      code: "",
      percent: false,
      customers: [],
      products: [],
      bundles: [],
      used: false,
      from_date: null,
      to_date: null,
    },
  }),
  computed: {
    ...mapGetters({
      selected: "admin_discounts/selected",
    }),
  },
  watch: {
    selected: function () {
      const { selected } = this;

      if (selected) {
        this.currentDiscount = JSON.parse(JSON.stringify(selected));

        const { published_at } = this.currentDiscount;

        if (published_at) {
          this.status = "published";
        }
      }
    },
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      getDiscounts: "admin_discounts/getDiscounts",
      createDiscount: "admin_discounts/createDiscount",
      updateDiscount: "admin_discounts/updateDiscount",
      deleteDiscounts: "admin_discounts/deleteDiscounts",
    }),
    ...mapMutations({
      clearDiscounts: "admin_discounts/clearDiscounts",
      clearSelectedDiscount: "admin_discounts/clearSelectedDiscount",
    }),
    generateCode: function () {
      const [code] = voucher_codes.generate({
        length: 12,
        count: 1,
      });

      this.currentDiscount.code = code;
    },
    setRange: function (range) {
      const [from_date, to_date] = range;

      this.currentDiscount.from_date = from_date;
      this.currentDiscount.to_date = to_date;
    },
    setValue: function (val) {
      this.currentDiscount.value = val;
    },
    setCustomers: function (data) {
      const customers = data.map(({ id }) => id);
      this.currentDiscount.customers = customers;
    },
    setProducts: function (data) {
      this.currentDiscount.products = data.map(({ id }) => id);
    },
    setBundles: function (data) {
      this.currentDiscount.bundles = data.map(({ bundle }) => bundle.id);
    },
    submit: async function () {
      const { status, selected } = this;
      const { published_at, customers, products, bundles } =
        this.currentDiscount;

      if (
        (!customers || !customers.length) &&
        (!products || !products.length) &&
        (!bundles || !bundles.length)
      ) {
        error("Chose customer or product or bundle");
        return;
      }

      if (status === "null") {
        this.currentDiscount.published_at = null;
      } else if (this.status !== null && published_at === null) {
        this.currentDiscount.published_at = new Date();
      }

      if (selected) {
        await this.updateDiscount(this.currentDiscount);
      } else {
        await this.createDiscount(this.currentDiscount);
      }
    },
    deleteDiscount: function () {
      this.$emit("bv::show::modal", "confirm-delete-discount");
    },
    confirm: async function () {
      const { id } = this.currentDiscount;
      await this.deleteDiscounts([id]);
    },
  },
  beforeMount() {
    if (this.selected) {
      const { published_at, from_date, to_date } = this.selected;

      this.currentDiscount = JSON.parse(JSON.stringify(this.selected));

      if (published_at) {
        this.status = "published";
      }
    }
  },
  mounted() {
    if (!this.selected) {
      this.generateCode();
    }
  },
  async destroyed() {
    this.clearDiscounts();
    await this.getDiscounts();
  },
};
</script>

<style scoped>
</style>