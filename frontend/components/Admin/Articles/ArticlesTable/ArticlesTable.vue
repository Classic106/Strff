<template>
  <div class="w-100 h-100 p-0">
    <div class="d-flex justify-content-between">
      <h6 class="w-100 text-left p-3 m-0">Articles</h6>
      <button
        class="btn btn-success text-nowrap my-auto mr-2"
        v-on:click="$emit('setIsTable')"
      >
        Add Article
      </button>
    </div>
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="articles"
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
        <div v-if="props.column.field == 'date'">
          <p class="m-0">
            {{ props.formattedRow[props.column.field] | formatDate }}
          </p>
        </div>
        <div
          v-else-if="props.column.field == 'title'"
          class="d-flex align-items-center"
          style="width: 250px"
        >
          <p class="text-ellipsis m-0">
            {{ props.formattedRow[props.column.field] }}
          </p>
        </div>
        <div
          v-else-if="props.column.field == 'published_at'"
          class="d-flex align-items-center"
        >
          <p class="text-ellipsis m-0">
            {{
              props.formattedRow[props.column.field].length > 1
                ? "Published"
                : "Draft"
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
        <button class="btn btn-danger" v-on:click="deleteItems">Delete</button>
        <button class="btn btn-success" v-on:click="publish">Publish</button>
        <button class="btn btn-warning" v-on:click="unPublish">
          Unpublish
        </button>
      </div>
    </vue-good-table>
    <ConfirmModal :id="'confirm-delete-articles'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import "~/utils/filters";

import { mapGetters, mapMutations, mapActions } from "vuex";
import { prevCurrNextItems } from "~/helpers";

import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";

export default {
  name: "ArticlesTable",
  components: { ConfirmModal },
  data: () => ({
    selectedRows: [],
    timer: null,
    columns: [
      {
        label: "Name",
        field: "name",
      },
      {
        label: "Title",
        field: "title",
        width: "250px",
      },
      {
        label: "Status",
        field: "published_at",
      },
      {
        label: "Date",
        field: "date",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      articles: "admin_articles/articles",
      params: "admin_articles/params",
      total: "admin_articles/total",
    }),
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      deleteArticles: "admin_articles/deleteArticles",
      getArticles: "admin_articles/getArticles",
      statusArticles: "admin_articles/statusArticles",
    }),
    ...mapMutations({
      setParams: "admin_articles/setParams",
      setSelectedArticles: "admin_articles/setSelectedArticles",
    }),
    onPageChange(params) {
      this.setParams({ ...this.params, page: params.currentPage });
      this.getArticles();
    },
    onPerPageChange(params) {
      this.setParams({ ...this.params, currentPerPage: params.currentPerPage });
      this.getArticles();
    },
    onCellClick: function (params) {
      const result = this.prevCurrNextItems(params.row, this.articles);

      this.setSelectedArticles(result);
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
        this.getArticles();
      }, 1000);
    },
    onSortChange(params) {
      const { field } = params[0];
      if (field === "categories") {
        params[0].field = "categories.name";
      }

      this.setParams({ ...this.params, sort: params[0] });
      this.getArticles();
    },
    deleteItems() {
      this.$root.$emit("bv::show::modal", "confirm-delete-articles");
    },
    confirm: async function () {
      const ids = this.selectedRows.map((item) => item.id);
      this.deleteArticles(ids);
    },
    async publish() {
      await this.statusArticles({
        articles: this.selectedRows,
        status: "publish",
      });
    },
    async unPublish() {
      await this.statusArticles({ articles: this.selectedRows });
    },
  },
};
</script>

<style scoped>
</style>