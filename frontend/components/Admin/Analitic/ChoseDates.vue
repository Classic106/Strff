<template>
  <div class="row justify-content-between align-items-center m-0">
    <p v-if="label" class="m-0 font-weight-bold">{{ label }}</p>
    <div class="d-flex align-items-center justify-content-end">
      <p class="m-0 mr-2">
        {{ parseDate(range[0]) }} - {{ parseDate(range[1]) }}
      </p>
      <DatePicker v-model="range" range />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoseDates",
  props: {
    label: String,
  },
  data: () => ({
    range: [Date.now(), Date.now()],
  }),
  watch: {
    range: function () {
      const { range } = this;
      this.$emit("setRange", range);
    },
  },
  methods: {
    parseDate: function (date) {
      const currentDate = new Date();
      const newDate = new Date(date ? date : currentDate);
      const curDate = newDate.getDate();
      const curYear = newDate.getFullYear();
      const orderMountAsString = newDate.toLocaleString("en-US", {
        month: "long",
      });
      return `${orderMountAsString} ${curDate}, ${curYear}`;
    },
  },
  beforeMount() {
    const from = new Date(new Date().setDate(new Date().getDate() - 1));
    const to = new Date();

    this.range = [from, to];
    this.$emit("setRange", this.range);
  },
};
</script>

<style scoped>
</style>