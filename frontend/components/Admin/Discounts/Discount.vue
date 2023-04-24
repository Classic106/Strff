<template>
  <div class="row w-100 justify-content-center m-0 mt-3">
    <div class="d-flex flex-column align-items-center col-10 p-0">
      <div class="d-flex align-items-center justify-content-between w-100">
        <button v-on:click="clearSelectedDiscount()" class="button">
          <BIconArrowLeft />
        </button>
      </div>
      <form
        class="was-validated w-100"
        id="admin-discount-form"
        v-on:submit.stop.prevent="submit"
      >
        <div class="block mt-2 p-2">
          <label class="d-flex font-weight-bold" for="value"> Value </label>
          <InputDecimal
            id="price"
            class="form-control w-100"
            :value="currentDiscount.value"
            v-on:setDecimal="setValue"
            required
          />
          <div class="invalid-feedback">Value must be greater than 1</div>
        </div>
        <div class="block mt-2 p-2">
          <label class="d-flex" for="weight_dimension"> Type </label>
          <select
            id="weight_dimension"
            v-model="currentDiscount.type"
            required
            class="bts_input_style w-100"
          >
            <option value="percent">%</option>
            <option value="currency">$</option>
          </select>
        </div>
        <div class="block d-flex flex-column p-2 mt-2">
          <label class="d-flex font-weight-bold" for="status">Status</label>
          <select id="status" required v-model="status" class="form-control">
            <option value="published">published</option>
            <option value="null">draft</option>
          </select>
        </div>
      </form>
      <div class="row justify-content-between w-100">
        <button
          class="w-100 btn btn-success text-uppercase my-2"
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
import { prevCurrNextItems } from "~/helpers";

import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";
import InputDecimal from "~/components/Admin/common/InputDecimal.vue";

export default {
  name: "Discount",
  components: { ConfirmModal, InputDecimal },
  data: () => ({
    status: "null",
    currentDiscount: {
      value: 0,
      type: "percent",
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
      this.currentDiscount = JSON.parse(JSON.stringify(this.selected));

      const { published_at } = this.currentDiscount;

      if (published_at) {
        this.status = "published";
      }
    },
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      getDiscounts: "admin_discounts/getDiscounts",
      createDiscount: "admin_discounts/createDiscount",
      updateDiscount: "admin_discounts/updateDiscounts",
      deleteDiscounts: "admin_discounts/deleteDiscounts",
    }),
    ...mapMutations({
      setParams: "admin_discounts/setParams",
      clearSelectedDiscount: "admin_discounts/clearSelectedDiscount",
    }),
    setValue: function (val) {
      this.currentDiscount.value = val;
    },
    submit: async function () {
      const { status, selected } = this;
      const { published_at } = this.currentDiscount;

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
      this.$root.$emit("bv::show::modal", "confirm-delete-discount");
    },
    confirm: async function () {
      const { id } = this.currentDiscount;
      await this.deleteDiscounts([id]);
    },
  },
  beforeMount() {
    if (this.selected) {
      const { published_at } = this.selected;

      this.currentDiscount = JSON.parse(JSON.stringify(this.selected));

      if (published_at) {
        this.status = "published";
      }
    }
  },
  async destroyed() {
    this.setParams({ ...this.params, page: 1 });
    await this.getDiscounts();
  },
};
</script>

<style scoped>
</style>