<template>
  <AddOrder v-if="isAddOrder" v-on:closeCreateOrder="isAddOrder = false" />
  <div v-else class="row w-100 justify-content-center">
    <div class="d-flex flex-column col-md-8 col-12">
      <div class="d-flex align-items-start mt-3">
        <button v-on:click="$emit('setCustomer')" class="button">
          <BIconArrowLeft />
        </button>
        <div class="w-100 px-3">
          <div class="d-flex flex-column">
            <h6 class="m-0 px-2 font-weight-bold">{{ getCustomerName() }}</h6>
            <span>{{ selected.state }} {{ customerDuration() }}</span>
          </div>
        </div>
      </div>
      <Loader
        v-if="loading"
        class="w-100 h-100 d-flex align-items-center justify-content-center"
      />
      <div v-else class="row mb-3">
        <div class="col-7">
          <div class="block w-100 d-flex justify-content-between mb-3 p-3">
            <div>
              <h6 class="text-center font-weight-bold">
                {{ `$ ${ordersSpent}` }}
              </h6>
              <p>Amount spent</p>
            </div>
            <div>
              <h6 class="text-center font-weight-bold">
                {{ customerOrders.length }}
              </h6>
              <p>Orders</p>
            </div>
            <div>
              <h6 class="text-center font-weight-bold">
                {{ `$ ${ordersSpent / customerOrders.length}` }}
              </h6>
              <p>Average order value</p>
            </div>
          </div>
          <div class="block w-100">
            <div v-if="viewAll === false" class="p-3">
              <h6 class="w-100">Last order place</h6>
              <CustomerOrder :order="customerOrders[0]" />
            </div>
            <div v-else class="p-3">
              <h6 class="w-100">All orders</h6>
              <CustomerOrder
                v-for="customerOrder in customerOrders"
                :order="customerOrder"
                :key="customerOrder.id"
              />
            </div>
            <div
              class="bottom d-flex justify-content-end align-items-center p-3"
            >
              <a
                href="#"
                v-on:click.prevent="viewAll = !viewAll"
                class="mr-2"
                >{{ viewAll ? "Hide all orders" : "View all orders" }}</a
              >
              <button class="btn btn-success" v-on:click="isAddOrder = true">
                Add order
              </button>
            </div>
          </div>
        </div>
        <CustomerRightSide class="col-5" :customer="selected.customer" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { prevCurrNextItems } from "~/helpers";
import { states_hashes } from "@/data";

import Loader from "~/components/common/Loader.vue";
import CustomerOrder from "./CustomerOrder.vue";
import CustomerRightSide from "./CustomerRightSide.vue";
import AddOrder from "./AddOrder";

export default {
  name: "Customer",
  components: {
    Loader,
    CustomerOrder,
    CustomerRightSide,
    AddOrder,
  },
  data: () => ({
    viewAll: false,
    customerOrders: [],
    ordersSpent: 0,
    summOrders: {},
    states_hashes,
    loading: false,
    isAddOrder: false,
  }),
  computed: {
    ...mapGetters({
      selected: "admin_orders/selected",
    }),
  },
  methods: {
    prevCurrNextItems,
    ...mapMutations({
      clearOrders: "admin_orders/clearOrders",
      setSelectedOrders: "admin_orders/setSelectedOrders",
    }),
    openModal: function (modal) {
      this.$root.$emit("bv::show::modal", modal);
    },
    customerDuration: function () {
      const { created_at } = this.selected;
      const regDate = new Date(created_at);

      const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
      ];

      const seconds = Math.floor((Date.now() - regDate.getTime()) / 1000);
      const interval = intervals.find((i) => i.seconds < seconds);
      const count = Math.floor(seconds / interval.seconds);
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    },
    getCustomerName: function () {
      const { customer } = this.selected;
      const { firstName, lastName } = customer;

      return `${firstName} ${lastName}`;
    },
  },
  async mounted() {
    this.loading = true;
    const { customer } = this.selected;

    const currentCustomer = await this.$strapi.findOne(
      "customers",
      customer.id
    );

    const { orders } = currentCustomer;

    if (orders && orders.length) {
      this.customerOrders = orders.sort(
        (a, b) => new Date(a.order_date) < new Date(b.order_date)
      );

      this.ordersSpent = this.customerOrders.reduce(
        (acc, order) => (acc += order.total),
        0
      );
    }
    this.loading = false;
  },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  background: none;
}

.image-wrap:hover > .image-buttons {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}

.status,
.paid {
  border-radius: 20px;
  font-size: 15px;
  background: #e4e5e7;
}

.status {
  background: yellow;
}

.paid.active {
  background: green;
}

.icon-circle-wrap {
  border: 4px solid #ade9d0;
  border-radius: 50%;
}

.block-main {
  border-bottom: 1px solid black;
}

.wrap-img > span {
  top: -1rem;
  right: -0.2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #e4e5e7;
}

.wrap-img > img {
  border: 2px solid #f3f4f5;
  border-radius: 5px;
}

.bottom {
  border-top: 1px solid #000;
}
</style>