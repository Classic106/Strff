<template>
  <div class="d-flex flex-column">
    <div class="border-bottom p-3">
      <div class="d-flex justify-content-between">
        <p class="text-uppercase">total sales</p>
        <p>Today</p>
      </div>
      <span v-if="!todayOrders.length"
        >There were no sales during this time</span
      >
      <span v-else>{{ todayOrders.length }}</span>
    </div>
    <div class="border-bottom p-3">
      <div class="d-flex justify-content-between">
        <p class="text-uppercase">total sales breakdown</p>
        <p>Today</p>
      </div>
      <span>There were no sales during this time</span>
    </div>
    <div class="border-bottom p-3">
      <div class="d-flex justify-content-between">
        <p class="text-uppercase">top products</p>
        <p>Today</p>
      </div>
      <span>There were no products sold during this time</span>
    </div>
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

export default {
  name: "AdminHomeRightSide",
  data: () => ({
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