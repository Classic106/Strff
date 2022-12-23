<template>
  <div class="row w-100 h-100 justify-content-center m-0">
    <div class="d-flex flex-column col-10">
      <div class="d-flex align-items-start mt-3">
        <button v-on:click="back" class="button">
          <BIconArrowLeft />
        </button>
        <div class="w-100 px-3">
          <div class="d-flex flex-column">
            <h6 class="m-0 px-2 font-weight-bold">{{ getCustomerName() }}</h6>
            <span>{{ customer.state }} {{ customerDuration() }}</span>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-9">
          <div class="block w-100 d-flex justify-content-between mb-3 p-3">
            <div>
              <h6 class="text-center font-weight-bold">
                $ {{ ordersSpent | formatNumber }}
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
                $ {{ averageValue() | formatNumber }}
              </h6>
              <p>Average order value</p>
            </div>
          </div>
          <div
            class="block w-100 d-flex flex-column p-3"
            v-if="!customerOrders.length"
          >
            <p class="text-center">Customer hasn`t any orders</p>
            <button class="btn btn-success" v-on:click="$emit('openAddOrder')">
              Add order
            </button>
          </div>
          <div class="block w-100" v-else>
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
              <button
                class="btn btn-success"
                v-on:click="$emit('openAddOrder')"
              >
                Add order
              </button>
            </div>
          </div>
        </div>
        <CustomerRightSide class="col-3" :customer="customer" />
      </div>
    </div>
  </div>
</template>

<script>
import { prevCurrNextItems } from "~/helpers";
import { states_hashes } from "@/data";
import "~/utils/filters";

import CustomerOrder from "./CustomerOrder.vue";
import CustomerRightSide from "./CustomerRightSide.vue";

export default {
  name: "CustomerMain",
  components: {
    CustomerOrder,
    CustomerRightSide,
  },
  props: {
    customer: Object,
    back: Function,
  },
  data: () => ({
    viewAll: false,
    customerOrders: [],
    ordersSpent: 0,
    states_hashes,
  }),
  methods: {
    prevCurrNextItems,
    averageValue: function () {
      const { total_price, orders_count } = this.customerOrders;
      return total_price / orders_count;
    },
    customerDuration: function () {
      const { created_at } = this.customer;
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
      const { firstName, lastName } = this.customer;

      return `${firstName} ${lastName}`;
    },
  },
  async beforeMount() {
    const { orders } = this.customer;

    if (orders && orders.length) {
      this.customerOrders = orders.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      this.ordersSpent = this.customerOrders.reduce(
        (acc, order) => (acc += order.total),
        0
      );
    }
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