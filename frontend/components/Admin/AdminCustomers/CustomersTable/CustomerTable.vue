<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="d-flex justify-content-between">
      <h6 class="w-100 text-left p-3 m-0">Orders</h6>
      <button
        v-on:click.prevent="$emit('setIsTable')"
        class="btn btn-success text-nowrap my-auto mr-2"
      >
        Add customer
      </button>
    </div>
    <vueCustomScrollbar
      class="scroll w-100 overflow-auto"
      :settings="scrollSettings"
    >
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
          <span v-else class="d-flex align-items-center">
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
        <div slot="selected-row-actions">
          <button class="btn btn-danger" v-on:click="deleteItems">
            Delete
          </button>
        </div>
      </vue-good-table>
    </vueCustomScrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { prevCurrNextItems } from "~/helpers";

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
        field: "spent",
      },
    ],
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({ customers: "admin_customers/customers" }),
  },
  methods: {
    prevCurrNextItems,
    ...mapMutations({
      setSelectedCustomers: "admin_customers/setSelectedCustomers",
      setCustomers: "admin_customers/setCustomers",
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
      const { field, type } = params[0];

      if (type === "asc") {
        if (field === "firstName") {
          this.currentCustomers.sort((a, b) => {
            const aName = this.getCustomerName(a);
            const bName = this.getCustomerName(b);

            return aName < bName;
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
      }
      // params[0].sortType - ascending or descending
      // params[0].columnIndex - index of column being sorted
    },
    deleteItems() {
      const ids = this.selectedRows.map((item) => item.id);
      console.log(ids);
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