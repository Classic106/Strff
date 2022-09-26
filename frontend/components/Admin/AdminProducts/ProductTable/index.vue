<template>
  <div class="w-100 p-0">
    <div class="w-100 h-100 overflow-auto">
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
          <button class="btn btn-danger" v-on:click="deleteItems">
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
import { prevCurrNextItems } from "~/helpers";

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
    ...mapGetters({ products: "admin_products/products" }),
  },
  methods: {
    prevCurrNextItems,
    ...mapMutations({
      setSelectedProducts: "admin_products/setSelectedProducts",
      setProducts: "admin_products/setProducts",
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
    this.currentProducts = JSON.parse(JSON.stringify(this.products));
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