<template>
  <div class="d-flex flex-column">
    <div class="border-bottom p-3">
      <div class="d-flex justify-content-between">
        <p class="text-uppercase">total orders</p>
        <p>Today</p>
      </div>
      <span v-if="!todayOrders.length"
        >There were no sales during this time</span
      >
      <span v-else>{{ todayOrders.length }}</span>
    </div>
    <TopProducts
      class="border-bottom p-3"
      :topTodayProducts="topTodayProducts"
    />
    <TopBundles class="border-bottom p-3" :topTodayBundles="topTodayBundles" />
    <div class="d-flex flex-column p-3">
      <p class="text-uppercase">payout shedule</p>
      <div class="d-flex flex-column justify-content-between">
        <div
          class="d-flex flex-lg-row flex-column justify-content-between mb-2"
          v-for="payout_shedule in payout_shedules"
          :key="payout_shedule.summ"
        >
          <div class="d-flex justify-content-center">
            <span class="text-nowrap mr-2">{{
              parseDate(payout_shedule.date)
            }}</span>
            <span class="paid p-2">Paid</span>
          </div>
          <span class="text-nowrap text-center"
            >$ {{ parseSumm(payout_shedule.summ) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import TopProducts from "./TopProducts.vue";
import TopBundles from "./TopBundles.vue";

export default {
  name: "AdminHomeRightSide",
  components: { TopProducts, TopBundles },
  data: () => ({
    topTodayProducts: [],
    topTodayBundles: [],
    payout_shedules: [
      {
        date: new Date(),
        summ: 65464,
      },
      {
        date: new Date(),
        summ: 658464,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      todayOrders: "admin_orders/todayOrders",
    }),
  },
  watch: {
    todayOrders: function () {
      this.topToday();
    },
  },
  methods: {
    parseDate: function (date) {
      const curDate = new Date(date);
      const day = date.getDay();
      const month = curDate.toLocaleString("en-US", {
        month: "long",
      });

      return `${month} ${day}`;
    },
    parseSumm: function (summ) {
      return new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 3,
      }).format(summ);
    },
    topToday: function () {
      const allProducts = [];
      const allBundles = [];

      this.todayOrders.map((item) => {
        const { order_bundles, order_items } = item;

        order_items.map((item) => {
          const { product } = item;
          const index = allProducts.findIndex((item) => (item.id = product.id));
          if (index !== -1) {
            allProducts[index].count = allProducts[index].count + 1;
          } else {
            allProducts.push({ ...product, count: 1 });
          }
        });
        order_bundles.map((item) => {
          const { bundle } = item;
          const index = allBundles.findIndex((item) => (item.id = bundle.id));
          if (index !== -1) {
            allBundles[index].count = allBundles[index].count + 1;
          } else {
            allBundles.push({ ...bundle, count: 1 });
          }
        });
      });

      this.topTodayProducts = allProducts
        .sort((a, b) => a.count - b.count)
        .slice(0, 4);
      this.topTodayBundles = allBundles
        .sort((a, b) => a.count - b.count)
        .slice(0, 4);
    },
  },
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #000;
}

.paid {
  border-radius: 20px;
  background: green;
  font-size: 15px;
}
</style>