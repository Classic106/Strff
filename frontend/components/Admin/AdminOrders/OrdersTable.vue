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
          <Items
            :items="props.row.order_items"
            v-if="props.column.field == 'order_items'"
          />
          <Items
            :items="props.row.order_bundles"
            v-else-if="props.column.field == 'order_bundles'"
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

import Items from "./Items.vue";

export default {
  name: "OrdersTable",
  components: { Items },
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
        field: "customer",
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
      setSelectedProducts: "admin_orders/setSelectedProducts",
      setOrders: "admin_orders/setOrders",
    }),
    onCellClick: function (params) {
      /*const result = this.prevCurrNextProduct(params.row, this.currentProducts);

      this.setSelectedProducts(result);
      this.setProducts(this.currentProducts);*/
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
        if (field === "title" || field === "status") {
          this.orders.sort((a, b) => {
            return a[field].localeCompare(b[field]);
          });
        }
        if (field === "categories") {
          this.currentProducts.sort((a, b) => {
            const nameA = a.categories[0].name;
            const nameB = b.categories[0].name;
            return nameA.localeCompare(nameB);
          });
        }
      }
      if (type === "desc") {
        if (field === "title" || field === "status") {
          this.currentProducts.sort((a, b) => {
            return b[field].localeCompare(a[field]);
          });
        }
        if (field === "categories") {
          this.currentProducts.sort((a, b) => {
            const nameA = a.categories[0].name;
            const nameB = b.categories[0].name;
            return nameB.localeCompare(nameA);
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
  },
  mounted() {
    this.currentOrders = JSON.parse(JSON.stringify(this.orders));
  },
};
</script>

<style scoped>
</style>