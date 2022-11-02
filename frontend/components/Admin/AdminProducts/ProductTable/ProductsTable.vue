<template>
  <div class="w-100 h-100 p-0">
    <div class="d-flex justify-content-between">
      <h6 class="w-100 text-left p-3 m-0">Products</h6>
      <button
        class="btn btn-success text-nowrap my-auto mr-2"
        v-on:click="$emit('setIsTable')"
      >
        Add Product
      </button>
    </div>
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="products"
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
        <ProductTableColumn
          :item="props.row"
          v-if="props.column.field == 'title'"
        />
        <CategoryTableColumn
          :categories="props.row.categories"
          v-else-if="props.column.field == 'categories'"
        />
        <span v-else class="d-flex align-items-center">
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
      <div slot="selected-row-actions">
        <button class="btn btn-danger" v-on:click="deleteItems">Delete</button>
        <button class="btn btn-success" v-on:click="publish">Publish</button>
        <button class="btn btn-warning" v-on:click="unPublish">
          Unpublish
        </button>
      </div>
    </vue-good-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { prevCurrNextItems } from "~/helpers";

import ProductTableColumn from "./ProductTableColumn.vue";
import CategoryTableColumn from "./CategoryTableColumn.vue";

export default {
  name: "ProductsTable",
  components: {
    ProductTableColumn,
    CategoryTableColumn,
  },
  data: () => ({
    selectedRows: [],
    timer: null,
    columns: [
      {
        label: "Product",
        field: "title",
        width: "250px",
      },
      {
        label: "Status",
        field: "status",
      },
      {
        label: "Categories",
        field: "categories",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      products: "admin_products/products",
      params: "admin_products/params",
      total: "admin_products/total",
    }),
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      deleteProducts: "admin_products/deleteProducts",
      getProducts: "admin_products/getProducts",
    }),
    ...mapMutations({
      setParams: "admin_products/setParams",
      setSelectedProducts: "admin_products/setSelectedProducts",
    }),
    onPageChange(params) {
      this.setParams({ ...this.params, page: params.currentPage });
      this.getProducts();
    },
    onPerPageChange(params) {
      this.setParams({ ...this.params, currentPerPage: params.currentPerPage });
      this.getProducts();
    },
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.products);

      this.setSelectedProducts(result);
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
        this.getProducts();
      }, 1000);
    },
    onSortChange(params) {
      const { field } = params[0];
      if (field === "categories") {
        params[0].field = "categories.name";
      }

      this.setParams({ ...this.params, sort: params[0] });
      this.getProducts();
    },
    deleteItems() {
      const ids = this.selectedRows.map((item) => item.id);
      this.deleteProducts(ids);
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
</style>