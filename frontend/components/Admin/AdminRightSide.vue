<template>
  <div class="d-flex flex-column">
    <div>
      <div class="d-flex">
        <p class="text-uppercase">total sales</p>
        <p>Today</p>
      </div>
      <span>There were no sales during this time</span>
    </div>
    <div>
      <div class="d-flex">
        <p class="text-uppercase">total sales breakdown</p>
        <p>Today</p>
      </div>
      <span>There were no sales during this time</span>
    </div>
    <div>
      <div class="d-flex">
        <p class="text-uppercase">top products</p>
        <p>Today</p>
      </div>
      <span>There were no products sold during this time</span>
    </div>
    <div class="d-flex flex-column">
      <p class="text-uppercase">payout shedule</p>
      <div class="d-flex flex-column justify-content-between">
        <div
          class="d-flex justify-content-between"
          v-for="payout_shedule in payout_shedules"
          :key="payout_shedule.summ"
        >
          <div>
            <span>{{ parseDate(payout_shedule.date) }}</span>
            <span>Paid</span>
          </div>
          <span>$ {{ parseSumm(payout_shedule.summ) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminRightSide",
  data: () => ({
    payout_shedules: [
      {
        date: new Date(),
        summ: 65464,
      },
      {
        date: new Date(),
        summ: 65464,
      },
    ],
  }),
  methods: {
    parseDate: function (date) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = monthNames[date.getMonth()];
      const day = date.getDay();

      return `${month} ${day}`;
    },
    parseSumm: function (summ) {
      return new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
      }).format(summ);
    },
  },
};
</script>

<style scoped>
</style>