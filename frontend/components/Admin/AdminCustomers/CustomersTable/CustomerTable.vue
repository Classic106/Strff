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
      :columns="columns"
      :rows="currentCustomers"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true,
      }"
      :search-options="{ enabled: true }"
      :sort-options="{ enabled: true }"
      :pagination-options="{ enabled: true, position: 'top' }"
      @on-cell-click="onCellClick"
      @on-sort-change="onSortChange"
      @on-selected-rows-change="selectionChanged"
      @on-select-all="onSelectAll"
      styleClass="vgt-table"
      compactMode
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'firstName'"
          >{{ getCustomerName(props.row) }}
        </span>
        <span
          v-else-if="props.column.field == 'orders'"
          class="d-flex align-items-center"
        >
          {{ props.row.orders.length }} orders
        </span>
        <span
          v-else-if="props.column.field == 'id'"
          class="d-flex align-items-center"
        >
          $ {{ spent(props.row) | formatNumber }}
        </span>
        <span v-else class="d-flex align-items-center">
          {{ props.formattedRow[props.column.field] }}
        </span>
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
    currentCustomers: [],
    selectedRows: [],
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
        field: "orders",
      },
      {
        label: "Spent",
        field: "id",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      customers: "admin_customers/customers",
      sortParams: "admin_customers/sortParams",
    }),
  },
  watch: {
    customers: function () {
      if (this.sortParams) {
        this.onSortChange(this.sortParams);
      } else {
        this.currentCustomers = JSON.parse(JSON.stringify(this.customers));
      }
    },
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({ deleteCustomers: "admin_customers/deleteCustomers" }),
    ...mapMutations({
      setSelectedCustomers: "admin_customers/setSelectedCustomers",
      setCustomers: "admin_customers/setCustomers",
      setSortParams: "admin_customers/setSortParams",
    }),
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.currentCustomers);

      this.setSelectedCustomers(result);
      this.setCustomers(this.currentCustomers);
      // params.row - row object
      // params.pageIndex - index of this row on the current page.
      // params.selected - if selection is enabled this argument
      // indicates selected or not
      // params.event - click event
    },
    selectionChanged(params) {
      this.selectedRows = params.selectedRows;
      // params.selectedRows - all rows that are selected (this page)
    },
    onSelectAll(params) {
      this.selectedRows = params.selectedRows;
      // params.selected - whether the select-all checkbox is checked or unchecked
      // params.selectedRows - all rows that are selected (this page)
    },
    onSortChange(params) {
      this.setSortParams(params);

      const { field, type } = params[0];

      if (type === "asc") {
        if (field === "firstName") {
          this.currentCustomers.sort((a, b) => {
            const aName = this.getCustomerName(a);
            const bName = this.getCustomerName(b);

            return aName < bName;
          });
        }
        if (field === "email") {
          this.currentCustomers.sort((a, b) => a.email.localeCompare(b.email));
        }
        if (field === "state") {
          this.currentCustomers.sort((a, b) => a.state.localeCompare(b.state));
        }
        if (field === "state") {
          this.currentCustomers.sort(
            (a, b) => a.orders.length < b.orders.length
          );
        }
        if (field === "id") {
          this.currentCustomers.sort((a, b) => {
            const totalA = a.orders.reduce(
              (acc, order) => (acc += order.total),
              0
            );
            const totalB = b.orders.reduce(
              (acc, order) => (acc += order.total),
              0
            );

            return totalA < totalB;
          });
        }
      }
      if (type === "desc") {
        if (field === "firstName") {
          this.currentCustomers.sort((a, b) => {
            const aName = this.getCustomerName(a);
            const bName = this.getCustomerName(b);

            return aName > bName;
          });
        }
        if (field === "email") {
          this.currentCustomers.sort((a, b) => b.email.localeCompare(a.email));
        }
        if (field === "state") {
          this.currentCustomers.sort((a, b) => b.state.localeCompare(a.state));
        }
        if (field === "state") {
          this.currentCustomers.sort(
            (a, b) => a.orders.length > b.orders.length
          );
        }
        if (field === "id") {
          this.currentCustomers.sort((a, b) => {
            const totalA = a.orders.reduce(
              (acc, order) => (acc += order.total),
              0
            );
            const totalB = b.orders.reduce(
              (acc, order) => (acc += order.total),
              0
            );

            return totalA > totalB;
          });
        }
      }
      // params[0].sortType - ascending or descending
      // params[0].columnIndex - index of column being sorted
    },
    async deleteItems() {
      const ids = this.selectedRows.map((item) => item.id);
      await this.deleteCustomers(ids);
    },
    spent: function (customer) {
      const { orders } = customer;
      return orders.reduce((acc, order) => (acc += order.total), 0);
    },
    getCustomerName: function (customer) {
      const { firstName, lastName } = customer;
      return `${firstName} ${lastName}`;
    },
  },
  mounted() {
    this.currentCustomers = JSON.parse(JSON.stringify(this.customers));
  },
};
</script>

<style scoped>
</style>