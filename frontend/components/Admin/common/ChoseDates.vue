<template>
  <div
    :class="column ? 'd-flex flex-column' : 'row'"
    class="justify-content-between align-items-center m-0"
  >
    <p v-if="label" class="m-0 font-weight-bold">{{ label }}</p>
    <div
      :class="column ? 'd-flex flex-column' : 'row'"
      class="align-items-center justify-content-md-between justify-content-center"
    >
      <p class="m-0 mr-2 my-2 text-center">
        {{ parseDate(range[0]) }} - {{ parseDate(range[1]) }}
      </p>
      <div
        class="w-100 row m-0 mt-1 justify-content-md-between justify-content-center align-items-center"
      >
        <DatePicker
          v-model="range"
          class="d-flex w-75 pr-2 justify-content-md-end justify-content-start"
          :inline="inline"
          :disabled-date="disabledBeforeToday"
          range
        />
        <DatesButtons
          class="justify-content-center w-25"
          :byMonth="setRange"
          :byHalfYear="setRange"
          :byYear="setRange"
          asList
          init
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatesButtons from "~/components/common/DatesButtons";

export default {
  name: "ChoseDates",
  components: { DatesButtons },
  props: {
    label: String,
    column: Boolean,
    inline: Boolean,
    from_today: Boolean,
  },
  data: () => ({
    range: [Date.now(), Date.now()],
    reset: false,
  }),
  watch: {
    range: function () {
      const { range } = this;
      this.$emit("setRange", range);
    },
  },
  methods: {
    setRange: function (from) {
      const to = new Date();
      this.range = [from, to];
    },
    disabledBeforeToday(date) {
      if (!this.from_today) {
        return false;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today;
    },
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
    const { from_today } = this;

    let from, to;

    if (!from_today) {
      from = new Date(new Date().setDate(new Date().getDate() - 1));
      to = new Date();
    } else {
      from = new Date();
      to = new Date(new Date().setDate(new Date().getDate() + 1));
    }

    this.range = [from, to];

    this.$emit("setRange", this.range);
  },
};
</script>

<style scoped>
</style>