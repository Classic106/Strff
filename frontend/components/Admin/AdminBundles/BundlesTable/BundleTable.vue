<template>
  <div class="w-100 h-100 p-0">
    <div class="d-flex justify-content-between">
      <h6 class="w-100 text-left p-3 m-0">Bundles</h6>
      <button
        class="btn btn-success text-nowrap my-auto mr-2"
        v-on:click="$emit('setIsTable')"
      >
        Add Bundle
      </button>
    </div>
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="bundles"
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import { prevCurrNextItems } from "~/helpers";

import BundleProducts from "./BundleProducts.vue";

export default {
  name: "BundleTable",
  components: { BundleProducts },
  data: () => ({
    selectedRows: [],
    timer: null,
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
    ...mapGetters({
      bundles: "admin_bundles/bundles",
      params: "admin_bundles/params",
      total: "admin_bundles/total",
    }),
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      deleteBundles: "admin_bundles/deleteBundles",
      getBundles: "admin_bundles/getBundles",
    }),
    ...mapMutations({
      setSelectedBundles: "admin_bundles/setSelectedBundles",
      setParams: "admin_bundles/setParams",
    }),
    onPageChange(params) {
      this.setParams({ ...this.params, page: params.currentPage });
      this.getBundles();
    },
    onPerPageChange(params) {
      this.setParams({ ...this.params, currentPerPage: params.currentPerPage });
      this.getBundles();
    },
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.bundles);
      this.setSelectedBundles(result);
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
        this.getBundles();
      }, 1000);
    },
    onSortChange: async function (params) {
      const { field } = params[0];
      if (field === "products") {
        params[0].field = 'id';
      }

      this.setParams({ ...this.params, sort: params[0] });
      this.getBundles();
    },
    deleteItems() {
      const ids = this.selectedRows.map((item) => item.id);
      this.deleteBundles(ids);
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

.product {
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.17);
  border-radius: 10px;
}

.product:hover {
  transform: scale(1.01);
}
</style>