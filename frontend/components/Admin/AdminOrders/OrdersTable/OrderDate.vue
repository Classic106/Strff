<template>
  <div>{{ parseDate() }}</div>
</template>

<script>
export default {
  name: "OrdarDate",
  props: { date: String },
  methods: {
    parseDate: function () {
      const currentDate = new Date();
      const order_date = new Date(this.date);

      const curDate = currentDate.getDate();
      const curDay = currentDate.getDay();
      const curMonth = currentDate.getMonth();
      const curYear = currentDate.getFullYear();

      const orderDate = order_date.getDate();
      const orderDay = order_date.getDay();
      const orderMonth = order_date.getMonth();
      const orderYear = order_date.getFullYear();
      const orderTime = order_date.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });

      const orderDayAsString = order_date.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const orderMountAsString = order_date.toLocaleString("en-US", {
        month: "long",
      });

      if (curYear !== orderYear) {
        return `${orderMountAsString} ${orderYear} at ${orderTime}`;
      } else if (
        orderMonth !== curMonth &&
        curDate - orderDate > 5 &&
        curYear === orderYear
      ) {
        return `${orderMountAsString} at ${orderTime}`;
      } else if (curDate - orderDate > 5) {
        return `${orderDayAsString} at ${orderTime}`;
      }

      return `Yesturday at ${orderTime}`;
    },
  },
};
</script>

<style scoped>
</style>