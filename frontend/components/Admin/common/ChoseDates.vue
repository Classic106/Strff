<template>
  <div
    :class="column ? 'col' : 'row'"
    class="justify-content-between align-items-center m-0"
  >
    <p v-if="label" class="m-0 font-weight-bold">{{ label }}</p>
    <div :class="column ? 'col' : 'row'" class="align-items-center">
      <p class="m-0 mr-2 mb-2 text-center">
        {{ parseDate(range[0]) }} - {{ parseDate(range[1]) }}
      </p>
      <DatePicker
        v-model="range"
        range
        :inline="inline"
        :disabled-date="disabledBeforeToday"
        class="d-flex justify-content-center"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChoseDates",
  props: {
    label: String,
    column: Boolean,
    inline: Boolean,
    from_today: Boolean,
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