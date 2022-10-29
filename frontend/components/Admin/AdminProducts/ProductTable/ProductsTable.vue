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
      :columns="columns"
      :rows="currentProducts"
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
    currentProducts: [],
    selectedRows: [],
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
      sortParams: "admin_products/sortParams",
    }),
  },
  watch: {
    products: function () {
      if (this.sortParams) {
        this.onSortChange(this.sortParams);
      } else {
        this.currentProducts = JSON.parse(JSON.stringify(this.products));
      }
    },
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({ deleteProducts: "admin_products/deleteProducts" }),
    ...mapMutations({
      setSelectedProducts: "admin_products/setSelectedProducts",
      setProducts: "admin_products/setProducts",
      setSortParams: "admin_products/setSortParams",
    }),
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.currentProducts);

      this.setSelectedProducts(result);
      this.setProducts(this.currentProducts);
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
        if (field === "title" || field === "status") {
          this.currentProducts.sort((a, b) => {
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
  mounted() {
    this.currentProducts = JSON.parse(JSON.stringify(this.products));
  },
};
</script>

<style scoped>
</style>