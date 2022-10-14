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
      :columns="columns"
      :rows="currentOrders"
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
import { mapGetters, mapMutations } from "vuex";
import { prevCurrNextItems } from "~/helpers";

import OrderItems from "./OrderItems.vue";
import OrderCustomers from "./OrderCustomers.vue";
import OrderDate from "./OrderDate.vue";

export default {
  name: "OrderTable",
  components: { OrderItems, OrderCustomers, OrderDate },
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
        if (field === "id") {
          this.currentOrders.sort((a, b) => {
            return a.id < b.id;
          });
        }
        if (field === "total") {
          this.currentOrders.sort((a, b) => {
            return a.total < b.total;
          });
        }
        if (field === "order_date") {
          this.currentOrders.sort((a, b) => {
            const dateA = new Date(a.order_date);
            const dateB = new Date(b.order_date);
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
        if (field === "order_items") {
          this.currentOrders.sort((a, b) => {
            return a.order_items.length < b.order_items.length;
          });
        }
        if (field === "order_bundles") {
          this.currentOrders.sort((a, b) => {
            return a.order_bundles.length < b.order_bundles.length;
          });
        }
      }
      if (type === "desc") {
        if (field === "id") {
          this.currentOrders.sort((a, b) => {
            return a.id > b.id;
          });
        }
        if (field === "total") {
          this.currentOrders.sort((a, b) => {
            return a.total > b.total;
          });
        }
        if (field === "order_date") {
          this.currentOrders.sort((a, b) => {
            const dateA = new Date(a.order_date);
            const dateB = new Date(b.order_date);
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
        if (field === "order_items") {
          this.currentOrders.sort((a, b) => {
            return a.order_items.length > b.order_items.length;
          });
        }
        if (field === "order_bundles") {
          this.currentOrders.sort((a, b) => {
            return a.order_bundles.length > b.order_bundles.length;
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
      const { first_name, last_name } = order;

      return `${first_name} ${last_name}`;
    },
  },
  mounted() {
    this.currentOrders = JSON.parse(JSON.stringify(this.orders));
  },
};
</script>

<style scoped>
.scroll {
  height: calc(100% - 65px);
}
</style>