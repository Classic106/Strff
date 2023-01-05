<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="d-flex justify-content-between">
      <h6 class="w-100 text-left p-3 m-0">Customers</h6>
      <button
        v-on:click.prevent="$emit('setIsTable')"
        class="btn btn-success text-nowrap my-auto mr-2"
      >
        Add customer
      </button>
    </div>
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="customers"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true,
      }"
      :search-options="{ enabled: true }"
      :sort-options="{ enabled: true }"
      :pagination-options="{
        enabled: true,
        position: 'top',
        dropdownAllowAll: false,
        infoFn: (params) =>
          `Showing ${params.firstRecordOnPage} to ${params.lastRecordOnPage} of page ${params.currentPage}`,
      }"
      :totalRows="total"
      @on-page-change="onPageChange"
      @on-per-page-change="onPerPageChange"
      @on-cell-click="onCellClick"
      @on-sort-change="onSortChange"
      @on-selected-rows-change="selectionChanged"
      @on-search="onSearch"
      @on-select-all="onSelectAll"
      styleClass="vgt-table"
      compactMode
    >
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field == 'firstName'">
          <p class="text-ellipsis m-0">{{ getCustomerName(props.row) }}</p>
        </div>
        <div
          v-else-if="props.column.field == 'orders_count'"
          class="d-flex align-items-center"
        >
          <p class="m-0">{{ props.row.orders_count }} orders</p>
        </div>
        <div
          v-else-if="props.column.field == 'total_price'"
          class="d-flex align-items-center"
        >
          <p class="m-0">$ {{ props.row.total_price | formatNumber }}</p>
        </div>
        <div v-else class="d-flex align-items-center">
          <p class="text-ellipsis m-0">
            {{ props.formattedRow[props.column.field] }}
          </p>
        </div>
      </template>
      <div slot="selected-row-actions">
        <button class="btn btn-danger" v-on:click="deleteItems">Delete</button>
      </div>
    </vue-good-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { prevCurrNextItems } from "~/helpers";

import "~/utils/filters";

export default {
  name: "CustomerTable",
  data: () => ({
    selectedRows: [],
    timer: null,
    columns: [
      {
        label: "Customer name",
        field: "firstName",
      },
      {
        label: "Email",
        field: "email",
      },
      {
        label: "Location",
        field: "state",
      },
      {
        label: "Orders",
        field: "orders_count",
      },
      {
        label: "Spent",
        field: "total_price",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      customers: "admin_customers/customers",
      params: "admin_customers/params",
      total: "admin_customers/total",
    }),
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      deleteCustomers: "admin_customers/deleteCustomers",
      getCustomers: "admin_customers/getCustomers",
    }),
    ...mapMutations({
      setSelectedCustomers: "admin_customers/setSelectedCustomers",
      setParams: "admin_customers/setParams",
    }),
    onPageChange(params) {
      this.setParams({ ...this.params, page: params.currentPage });
      this.getCustomers();
    },
    onPerPageChange(params) {
      this.setParams({ ...this.params, currentPerPage: params.currentPerPage });
      this.getCustomers();
    },
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.customers);
      this.setSelectedCustomers(result);
    },
    selectionChanged(params) {
      this.selectedRows = params.selectedRows;
    },
    onSelectAll(params) {
      this.selectedRows = params.selectedRows;
    },
    onSearch(params) {
      clearTimeout(this.timer);
      this.timer = null;

      this.setParams({ ...this.params, search: params.searchTerm });

      this.timer = setTimeout(() => {
        this.getCustomers();
      }, 1000);
    },
    onSortChange(params) {
      this.setParams({ ...this.params, sort: params[0] });
      this.getCustomers();
    },
    async deleteItems() {
      const ids = this.selectedRows.map((item) => item.id);
      await this.deleteCustomers(ids);
    },
    getCustomerName: function (customer) {
      const { firstName, lastName } = customer;
      return `${firstName} ${lastName}`;
    },
  },
};
</script>

<style scoped>
</style>