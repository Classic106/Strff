<template>
  <div
    v-if="loading"
    class="w-100 h-100 d-flex align-items-center justify-content-center"
  >
    <Loader />
  </div>
  <div v-else class="d-flex flex-column p-5">
    <div class="d-flex flex-column">
      <h6>Purchase Types</h6>
      <div class="tags-input-container w-100 p-2 d-flex align-items-center">
        <div
          class="tag pr-1 m-1"
          :class="index === activeTag && 'active'"
          v-for="(purchaseType, index) in purchaseTypes"
          :key="purchaseType.id"
        >
          <span v-on:click="activeTag = index" class="p-1">{{
            purchaseType.title
          }}</span>
          <span v-on:click="deletePurchaseType(purchaseType.id)"
            ><BIconX
          /></span>
        </div>
        <button class="btn btn-success" v-on:click="activeTag = null">
          New type
        </button>
      </div>
      <form class="block p-3" v-on:submit.prevent.stop="submit">
        <div class="d-flex flex-column mb-2">
          <label for="title" class="d-flex">Title</label>
          <input id="title" type="text" v-model="currentPT.title" required />
        </div>
        <div class="d-flex flex-column mb-2">
          <label for="description" class="d-flex">Description</label>
          <input
            id="description"
            type="text"
            v-model="currentPT.description"
            :required="!currentPT.one_time"
          />
        </div>
        <div class="d-flex align-items-center mb-2">
          <label for="one-time" class="d-flex m-0">One time</label>
          <input
            id="one-time"
            class="ml-2"
            type="checkbox"
            v-model="currentPT.one_time"
          />
        </div>
        <div>
          <label for="subscription-types" class="d-flex"
            >Subscription Types</label
          >
          <div class="d-flex mb-2">
            <div
              class="tag d-flex pr-1"
              v-for="st in currentPT.subscription_types"
              :key="st.id"
            >
              <p class="p-1 m-0">{{ st.title }}</p>
              <p
                class="m-0 d-flex align-items-center"
                v-on:click="removeSubscriptionType(st.id)"
              >
                <BIconX />
              </p>
            </div>
          </div>
          <v-select
            v-model="selectItem"
            :options="subscriptionTypes"
            label="title"
            class="mb-2"
          >
            <template #search="{ attributes, events }">
              <input
                class="vs__search"
                :required="
                  !currentPT.one_time && !currentPT.subscription_types.length
                "
                v-bind="attributes"
                v-on="events"
              /> </template
          ></v-select>
        </div>
        <button class="btn btn-success w-100" type="submit">
          {{ activeTag !== null ? "Update" : "Add" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Loader from "~/components/common/Loader";

export default {
  name: "Types",
  components: { Loader },
  data: () => ({
    loading: true,
    tagValue: "",
    activeTag: null,
    selectItem: null,
    currentPT: {
      subscription_types: [],
      title: "",
      description: "",
      one_time: false,
    },
  }),
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
  computed: {
    ...mapGetters({
      purchaseTypes: "purchase-types/getTypes",
      subscriptionTypes: "purchase-types/subscriptionTypes",
    }),
  },
  methods: {
    ...mapActions({
      createPurchaseType: "purchase-types/createPurchaseType",
      updatePurchaseType: "purchase-types/updatePurchaseType",
      deletePurchaseType: "purchase-types/deletePurchaseType",
      getPurchaseTypes: "purchase-types/getPurchaseTypes",
      getSubscriptionTypes: "purchase-types/getSubscriptionTypes",
    }),
    addSubscriptionType: function (e) {
      const { value } = e.target;
      const isInclude = this.currentPT.subscription_types.filter(
        (s) => s.id === +value
      )[0];

      if (isInclude) return;

      const sType = this.subscriptionTypes.filter((s) => s.id === +value)[0];

      if (sType) {
        this.currentPT.subscription_types.push(sType);
      }
    },
    removeSubscriptionType: function (id) {
      this.currentPT.subscription_types =
        this.currentPT.subscription_types.filter((s) => s.id !== id);
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
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}

.tags-input-container {
  background-color: rgba($color: #ffffff, $alpha: 0.7);

  input {
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    font-size: 1rem;
  }
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