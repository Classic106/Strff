<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="d-flex justify-content-between">
      <h6 class="w-100 text-left p-3 m-0">Orders</h6>
      <button
        v-on:click.prevent="$emit('setIsTable')"
        class="btn btn-success text-nowrap my-auto mr-2"
      >
        Create order
      </button>
    </div>
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="orders"
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
        <OrderDate
          :date="props.row.order_date"
          v-if="props.column.field == 'order_date'"
        />
        <OrderItems
          :items="props.row.order_items"
          v-else-if="props.column.field == 'order_items'"
        />
        <OrderItems
          :items="props.row.order_bundles"
          v-else-if="props.column.field == 'order_bundles'"
        />
        <OrderCustomers
          :order="props.row"
          v-else-if="props.column.field == 'user'"
        />
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

import OrderItems from "./OrderItems.vue";
import OrderCustomers from "./OrderCustomers.vue";
import OrderDate from "./OrderDate.vue";

export default {
  name: "OrderTable",
  components: { OrderItems, OrderCustomers, OrderDate },
  data: () => ({
    selectedRows: [],
    timer: null,
    columns: [
      {
        label: "Order",
        field: "id",
      },
      {
        label: "Date",
        field: "order_date",
      },
      {
        label: "Customer",
        field: "user",
      },
      {
        label: "Total",
        field: "total",
      },
      {
        label: "Status",
        field: "status",
      },
      {
        label: "Items",
        field: "order_items",
      },
      {
        label: "Bundles",
        field: "order_bundles",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      orders: "admin_orders/orders",
      params: "admin_orders/params",
      total: "admin_orders/total",
    }),
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      deleteOrders: "admin_orders/deleteOrders",
      getOrders: "admin_orders/getOrders",
    }),
    ...mapMutations({
      setSelectedOrders: "admin_orders/setSelectedOrders",
      setParams: "admin_orders/setParams",
    }),
    onPageChange(params) {
      this.setParams({ ...this.params, page: params.currentPage });
      this.getOrders();
    },
    onPerPageChange(params) {
      this.setParams({ ...this.params, currentPerPage: params.currentPerPage });
      this.getOrders();
    },
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.orders);
      this.setSelectedOrders(result);
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
        this.getOrders();
      }, 1000);
    },
    onSortChange(params) {
      const { field } = params[0];
      if (field === "order_items" || field === "order_bundles") {
        params[0].field = `${field}.name`;
      }

      this.setParams({ ...this.params, sort: params[0] });
      this.getOrders();
    },
    deleteItems() {
      const ids = this.selectedRows.map((item) => item.id);
      this.deleteOrders(ids);
    },
    getCustomerName: function (order) {
      const { first_name, last_name } = order;

      return `${first_name} ${last_name}`;
    },
  },
};
</script>

<style scoped>
</style>