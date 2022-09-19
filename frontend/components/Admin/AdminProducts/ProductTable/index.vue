<template>
  <div class="w-100 p-0">
    <div class="w-100 h-100 overflow-auto">
      <vue-good-table
        :columns="columns"
        :rows="products"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
        }"
        :search-options="{ enabled: true }"
        :sort-options="{
          enabled: true,
          initialSortBy: [
            { field: 'title', type: 'asc' },
            { field: 'status', type: 'asc' },
            { field: 'categories', type: 'asc' },
          ],
        }"
        :pagination-options="{ enabled: true, position: 'top' }"
        @on-cell-click="onCellClick"
        @on-selected-rows-change="selectionChanged"
        @on-select-all="onSelectAll"
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
          <button class="btn btn btn-danger" v-on:click="deleteItems">
            Delete
          </button>
          <button class="btn btn-success" v-on:click="publish">Publish</button>
          <button class="btn btn-warning" v-on:click="unPublish">
            Unpublish
          </button>
        </div>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import Loader from "~/components/common/Loader";
import ProductTableColumn from "../ProductTable/ProductTableColumn.vue";
import CategoryTableColumn from "../ProductTable/CategoryTableColumn.vue";

export default {
  name: "ProductTable",
  components: {
    Loader,
    ProductTableColumn,
    CategoryTableColumn,
  },
  data: () => ({
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
    ...mapGetters({ products: "admin/products" }),
  },
  methods: {
    ...mapMutations({
      setSelectedProduct: "admin/setSelectedProduct",
    }),
    onCellClick: function (params) {
      this.setSelectedProduct(params.row);
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