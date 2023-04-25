<template>
  <div class="d-flex flex-column w-100 h-100">
    <div class="d-flex justify-content-between">
      <h6 class="w-100 text-left p-3 m-0">Discount</h6>
      <button
        v-on:click.prevent="$emit('setIsTable')"
        class="btn btn-success text-nowrap my-auto mr-2"
      >
        Create discount
      </button>
    </div>
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="discounts"
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
        <div
          v-if="props.column.field == 'value'"
          class="d-flex align-items-center"
        >
          <p class="text-ellipsis m-0">
            {{ props.formattedRow[props.column.field] | formatNumber }}
          </p>
        </div>
        <div
          v-else-if="props.column.field == 'type'"
          class="d-flex align-items-center"
        >
          <p class="text-ellipsis m-0">
            {{
              props.formattedRow[props.column.field] === "percent" ? "%" : "$"
            }}
          </p>
        </div>
        <div
          v-else-if="props.column.field == 'published_at'"
          class="d-flex align-items-center"
        >
          <p class="text-ellipsis m-0">
            {{
              props.formattedRow[props.column.field].length > 1
                ? "published"
                : "unpublished"
            }}
          </p>
        </div>
        <div v-else class="d-flex align-items-center">
          <p class="text-ellipsis m-0">
            {{ props.formattedRow[props.column.field] }}
          </p>
        </div>
      </template>
      <div slot="selected-row-actions">
        <button class="btn btn-success mx-1" v-on:click="publish">
          Publish
        </button>
        <button class="btn btn-warning" v-on:click="unPublish">
          Unpublish
        </button>
        <button class="btn btn-danger" v-on:click="deleteItems">Delete</button>
      </div>
    </vue-good-table>
    <ConfirmModal :id="'confirm-delete-discounts'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { prevCurrNextItems } from "~/helpers";

import "~/utils/filters";
import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";

export default {
  name: "OrderTable",
  components: {
    ConfirmModal,
  },
  data: () => ({
    selectedRows: [],
    timer: null,
    columns: [
      {
        label: "Id",
        field: "id",
      },
      {
        label: "Value",
        field: "value",
      },
      {
        label: "Type",
        field: "type",
      },
      {
        label: "From date",
        field: "from_date",
      },
      {
        label: "To date",
        field: "to_date",
      },
      {
        label: "Status",
        field: "published_at",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      discounts: "admin_discounts/discounts",
      params: "admin_discounts/params",
      total: "admin_discounts/total",
    }),
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      deleteDiscounts: "admin_discounts/deleteDiscounts",
      getDiscounts: "admin_discounts/getDiscounts",
      statusDiscounts: "admin_discounts/statusDiscounts",
    }),
    ...mapMutations({
      setSelectedDiscounts: "admin_discounts/setSelectedDiscounts",
      setParams: "admin_discounts/setParams",
    }),
    onPageChange(params) {
      this.setParams({ ...this.params, page: params.currentPage });
      this.getDiscounts();
    },
    onPerPageChange(params) {
      this.setParams({ ...this.params, currentPerPage: params.currentPerPage });
      this.getDiscounts();
    },
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.discounts);
      this.setSelectedDiscounts(result);
      this.$emit("setIsTable");
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
        this.getDiscounts();
      }, 1000);
    },
    onSortChange(params) {
      this.setParams({ ...this.params, sort: params[0] });
      this.getDiscounts();
    },
    deleteItems() {
      this.$root.$emit("bv::show::modal", "confirm-delete-discounts");
    },
    confirm: async function () {
      const ids = this.selectedRows.map((item) => item.id);
      this.deleteDiscounts(ids);
    },
    async publish() {
      await this.statusDiscounts({
        discounts: this.selectedRows,
        status: "publish",
      });
    },
    async unPublish() {
      await this.statusDiscounts({ discounts: this.selectedRows });
    },
  },
};
</script>

<style scoped>
</style>