<template>
  <div class="w-100 h-100 p-0">
    <div class="d-flex justify-content-between">
      <h6 class="w-100 text-left p-3 m-0">Products</h6>
      <button
        class="btn btn-success text-nowrap my-auto mr-2"
        v-on:click="$emit('setIsTable')"
      >
        Add Bundle
      </button>
    </div>
    <vue-good-table
      :columns="columns"
      :rows="currentBundles"
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
        <BundleProducts
          v-if="props.column.field == 'products'"
          :products="props.row.products"
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

import BundleProducts from "./BundleProducts.vue";

export default {
  name: "BundleTable",
  components: { BundleProducts },
  data: () => ({
    currentBundles: [],
    selectedRows: [],
    columns: [
      {
        label: "Bundle",
        field: "products",
        width: "250px",
      },
      {
        label: "Title",
        field: "title",
      },
      {
        label: "Price",
        field: "price",
      },
    ],
  }),
  computed: {
    ...mapGetters({ bundles: "admin_bundles/bundles" }),
  },
  methods: {
    prevCurrNextItems,
    ...mapMutations({
      setSelectedBundles: "admin_bundles/setSelectedBundles",
      setBundles: "admin_bundles/setBundles",
    }),
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.currentBundles);

      this.setSelectedBundles(result);
      this.setBundles(this.currentBundles);
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
        if (field === "products") {
          this.currentBundles.sort((a, b) => a.id < b.id);
        }
        if (field === "title") {
          this.currentBundles.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (field === "price") {
          this.currentBundles.sort((a, b) => a.price < b.price);
        }
      }
      if (type === "desc") {
        if (field === "products") {
          this.currentBundles.sort((a, b) => a.id > b.id);
        }
        if (field === "title") {
          this.currentBundles.sort((a, b) => b.title.localeCompare(a.title));
        }
        if (field === "price") {
          this.currentBundles.sort((a, b) => a.price > b.price);
        }
      }
      // params[0].sortType - ascending or descending
      // params[0].columnIndex - index of column being sorted
    },
    deleteItems() {
      const ids = this.selectedRows.map((item) => item.id);
      console.log(ids);
    },
    publish() {
      const ids = this.selectedRows.map((item) => item.id);
      console.log(ids);
    },
    unPublish() {
      const ids = this.selectedRows.map((item) => item.id);
      console.log(ids);
    },
  },
  mounted() {
    this.currentBundles = JSON.parse(JSON.stringify(this.bundles));
  },
};
</script>

<style scoped>
@media (min-width: 300px) {
  .product.col-sm-6 {
    flex: 0 0 44%;
    max-width: 44%;
  }
}

@media (min-width: 768px) {
  .product.col-md-4 {
    flex: 0 0 31%;
    max-width: 31%;
  }
}

@media (min-width: 992px) {
  .product.col-lg-3 {
    flex: 0 0 23%;
    max-width: 23%;
  }
}

.scroll {
  height: calc(100% - 65px);
}

.product {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.17);
  border-radius: 10px;
}

.product:hover {
  transform: scale(1.01);
}
</style>