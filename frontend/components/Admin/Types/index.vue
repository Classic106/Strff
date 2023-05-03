<template>
  <div
    v-if="loading"
    class="w-100 h-100 d-flex align-items-center justify-content-center"
  >
    <Loader />
  </div>
  <div v-else class="d-flex flex-column">
    <SubscriptionTypes class="mb-3" />
    <div class="d-flex flex-column mb-3">
      <h6 class="w-100 text-left p-3 m-0">Purchase Types</h6>
      <div class="block mx-5 mb-3">
        <div
          class="tags-input-container row m-0 p-3 mb-2 align-items-center justify-content-between"
        >
          <div class="col-10 p-0 pr-2">
            <div
              class="tag p-1"
              :class="index === activeTag && 'active'"
              v-for="(purchaseType, index) in purchaseTypes"
              :key="purchaseType.id"
            >
              <span v-on:click="activeTag = index" class="p-1">{{
                purchaseType.title
              }}</span>
              <span v-on:click="deletePT(purchaseType.id)" class="p-1"
                ><BIconX
              /></span>
            </div>
          </div>
          <button class="col-2 btn btn-success" v-on:click="activeTag = null">
            New type
          </button>
        </div>
        <form class="was-validated p-3" v-on:submit.prevent.stop="submit">
          <div class="d-flex flex-column mb-2">
            <label for="title" class="d-flex font-weight-bold">Title</label>
            <input
              id="title"
              type="text"
              class="form-control"
              pattern="^[a-zA-Z\s.,-:]{10,100}$"
              v-model="currentPT.title"
              required
            />
            <div class="invalid-feedback">
              <div class="d-flex align-items-center">
                Title must be from 10 to 100 symbols and may contain &nbsp;
                <h6>. , - :</h6>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column mb-2" v-if="!currentPT.one_time">
            <label for="description" class="d-flex font-weight-bold"
              >Description</label
            >
            <input
              id="description"
              type="text"
              class="form-control"
              pattern="^[a-zA-Z\s.,-:%]{10,100}$"
              v-model="currentPT.description"
              :required="!currentPT.one_time"
            />
            <div class="invalid-feedback">
              <div class="d-flex align-items-center">
                Description must be from 10 to 100 symbols and may contain
                &nbsp;
                <h6>. , - : %</h6>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center mb-2">
            <label for="one-time" class="d-flex m-0 font-weight-bold"
              >One time</label
            >
            <input
              id="one-time"
              class="ml-2"
              type="checkbox"
              v-model="currentPT.one_time"
            />
          </div>
          <div>
            <label for="subscription-types" class="d-flex font-weight-bold"
              >Subscription Types</label
            >
            <div class="d-flex mb-2 p-0">
              <div
                class="tag d-flex pr-1"
                v-for="st in currentPT.subscription_types"
                :key="st.id"
              >
                <p class="p-1 m-0">{{ st.title }}</p>
                <span
                  class="m-0 d-flex align-items-center"
                  v-on:click="removeST(st.id)"
                >
                  <BIconX />
                </span>
              </div>
            </div>
            <SelectWithSearch
              :data="currentST"
              :total="currentST.length"
              :currentPerPage="currentST.length"
              :placeholder="'Search subscription types'"
              v-on:clickItem="addST"
              v-on:setSearchText="setSearchText"
              class="w-100 mb-2"
            >
              <template v-slot:item="currentST">
                <p class="w-100 m-0 p-1">
                  {{ currentST.item.title }}
                </p>
              </template>
            </SelectWithSearch>
          </div>
          <button class="btn btn-success w-100" type="submit">
            {{ activeTag !== null ? "Update" : "Add" }}
          </button>
        </form>
      </div>
    </div>
    <ConfirmModal
      :id="'confirm-delete-PT'"
      v-on:confirm="confirm"
      v-on:cancel="cancel"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";
import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import Loader from "~/components/common/Loader";
import SubscriptionTypes from "./SubscriptionTypes.vue";

export default {
  name: "Types",
  components: { Loader, SubscriptionTypes, SelectWithSearch, ConfirmModal },
  data: () => ({
    loading: true,
    tagValue: "",
    activeTag: null,
    selectItem: null,
    currentST: [],
    currentPT: {
      subscription_types: [],
      title: "",
      description: "",
      one_time: false,
    },
    searchText: "",
    deletePT_Id: null,
  }),
  computed: {
    ...mapGetters({
      purchaseTypes: "purchase-types/getTypes",
      subscriptionTypes: "purchase-types/subscriptionTypes",
    }),
  },
  watch: {
    selectItem: function () {
      if (this.selectItem) {
        const isInclude = this.currentPT.subscription_types.filter(
          (item) => item.id === this.selectItem.id
        )[0];

        if (!isInclude) {
          this.currentPT.subscription_types.push(this.selectItem);
        }
      }
    },
    searchText: function () {
      const { searchText } = this;

      if (searchText) {
        this.filterST(searchText);
      } else {
        this.filterST();
      }
    },
    activeTag: function () {
      if (this.activeTag !== null) {
        this.currentPT = JSON.parse(
          JSON.stringify(this.purchaseTypes[this.activeTag])
        );
      } else {
        this.currentPT = {
          subscription_types: [],
          title: "",
          description: "",
          one_time: false,
        };
      }
    },
  },
  methods: {
    ...mapActions({
      createPurchaseType: "purchase-types/createPurchaseType",
      updatePurchaseType: "purchase-types/updatePurchaseType",
      deletePurchaseType: "purchase-types/deletePurchaseType",
      getPurchaseTypes: "purchase-types/getPurchaseTypes",
      getSubscriptionTypes: "purchase-types/getSubscriptionTypes",
    }),
    addST: function (item) {
      const items = this.currentST.filter(({ id }) => id !== item.id);
      this.currentST = items;
      this.currentPT.subscription_types.push(item);
    },
    setSearchText: function (text) {
      this.searchText = text;
    },
    filterST: function (text) {
      const { currentPT } = this;
      const { subscription_types } = currentPT;

      const ids = subscription_types.map(({ id }) => id);
      const items = this.subscriptionTypes.filter(({ id, title }) => {
        const includes = !ids.includes(id);
        let byText = true;

        if (text) {
          byText = title.toLowerCase().includes(text.toLowerCase());
        }
        return includes && byText;
      });

      this.currentST = items;
    },
    confirm: function () {
      debugger;
      this.deletePurchaseType(this.deletePT_Id);
      this.this.deletePT_Id = null;
    },
    cancel: function () {
      this.deletePT_Id = null;
    },
    removeST: async function (itemId) {
      const { currentPT } = this;
      const { subscription_types } = currentPT;

      this.currentPT.subscription_types = subscription_types.filter(
        ({ id }) => id !== itemId
      );
      this.filterST();
    },
    deletePT(id) {
      this.deletePT_Id = id;
      this.$root.$emit("bv::show::modal", "confirm-delete-PT");
    },
    submit: async function () {
      const subscription_types = this.currentPT.subscription_types.map(
        (item) => item.id
      );
      const data = { ...this.currentPT, subscription_types };

      if (this.activeTag !== null) {
        await this.updatePurchaseType(data);
      } else {
        await this.createPurchaseType(data);
        this.currentPT = {
          subscription_types: [],
          title: "",
          description: "",
          one_time: false,
        };
        this.activeTag = null;
      }
    },
  },
  async mounted() {
    this.loading = true;
    await this.getPurchaseTypes();
    await this.getSubscriptionTypes();
    this.currentST = this.subscriptionTypes;
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.tags-input-container {
  background-color: rgba($color: #ffffff, $alpha: 0.7);

  .tag {
    float: left;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover,
    &.active {
      background-color: #57c340;
      border-radius: 5px;
    }
    span:first-child {
      margin-right: 8px;
    }
    svg {
      color: #666;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>