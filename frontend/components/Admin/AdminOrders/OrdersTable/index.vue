<template>
  <div class="d-flex flex-column w-100 p-3">
    <h6 class="w-100 text-left">Orders</h6>
    <div class="w-100 h-100 overflow-auto">
      <vue-good-table
        :columns="columns"
        :rows="orders"
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
          <OrderItems
            :items="props.row.order_items"
            v-if="props.column.field == 'order_items'"
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
          <button class="btn btn-danger" v-on:click="deleteItems">
            Delete
          </button>
        </div>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { prevCurrNextItems } from "~/helpers";

import OrderItems from "./OrderItems.vue";
import OrderCustomers from "./OrderCustomers.vue";

export default {
  name: "OrdersTable",
  components: { OrderItems, OrderCustomers },
  data: () => ({
    currentOrders: [],
    selectedRows: [],
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
    ...mapGetters({ orders: "admin_orders/orders" }),
  },
  methods: {
    prevCurrNextItems,
    ...mapMutations({
      setSelectedOrders: "admin_orders/setSelectedOrders",
      setOrders: "admin_orders/setOrders",
    }),
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.currentOrders);

      this.setSelectedOrders(result);
      this.setOrders(this.currentOrders);
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
        if (field === "id" || field === "total") {
          this.currentOrders.sort((a, b) => {
            return a < b;
          });
        }
        if (field === "order_date") {
          this.currentOrders.sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA < dateB;
          });
        }
        if (field === "user") {
          this.currentOrders.sort((a, b) => {
            const nameA = this.getCustomerName(a);
            const nameB = this.getCustomerName(b);
            return nameA < nameB;
          });
        }
        if (field === "order_items" || field === "order_bundles") {
          this.currentOrders.sort((a, b) => {
            return a.length < b.length;
          });
        }
      }
      if (type === "desc") {
        if (field === "id" || field === "total") {
          this.currentOrders.sort((a, b) => {
            return a > b;
          });
        }
        if (field === "order_date") {
          this.currentOrders.sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA > dateB;
          });
        }
        if (field === "user") {
          this.currentOrders.sort((a, b) => {
            const nameA = this.getCustomerName(a);
            const nameB = this.getCustomerName(b);
            return nameA > nameB;
          });
        }
        if (field === "order_items" || field === "order_bundles") {
          this.currentOrders.sort((a, b) => {
            return a.length > b.length;
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
    getCustomerName: function (order) {
      const { first_name, last_name, user } = order;

      if (!user) {
        return `${first_name} ${last_name}`;
      } else {
        const { first_name, last_name } = user;
        return `${first_name} ${last_name}`;
      }
    },
    parseDate: function (date) {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getDay();

      return `${day}/${month}/${year}`;
    },
  },
  mounted() {
    this.currentOrders = JSON.parse(JSON.stringify(this.orders));
  },
};
</script>

<style scoped>
</style>