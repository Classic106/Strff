<template>
  <div v-if="asList" class="d-flex flex-column position-relative">
    <button
      v-on:click="isVariants = !isVariants"
      class="btn btn-sm btn-primary text-center"
    >
      {{ active ? active : "Variants" }}
    </button>
    <ul
      class="w-100 flex-column position-absolute p-0 m-0"
      :class="isVariants ? 'd-flex' : 'd-none'"
    >
      <li
        class="justify-content-center p-1"
        :class="active !== 'month' ? 'd-flex' : 'd-none'"
        v-on:click="setVariant('month')"
      >
        month
      </li>
      <li
        class="justify-content-center p-1"
        :class="active !== 'half year' ? 'd-flex' : 'd-none'"
        v-on:click="setVariant('half year')"
      >
        half year
      </li>
      <li
        class="justify-content-center p-1"
        :class="active !== 'year' ? 'd-flex' : 'd-none'"
        v-on:click="setVariant('year')"
      >
        year
      </li>
    </ul>
  </div>
  <div v-else class="d-flex justify-content-start">
    <button
      class="btn mx-1"
      :class="active === 'month' ? 'btn-success' : 'btn-primary'"
      v-on:click="setVariant('month')"
    >
      month
    </button>
    <button
      class="btn btn-primary mx-1"
      :class="active === 'half year' ? 'btn-success' : 'btn-primary'"
      v-on:click="setVariant('half year')"
    >
      half year
    </button>
    <button
      class="btn btn-primary mx-1"
      :class="active === 'year' ? 'btn-success' : 'btn-primary'"
      v-on:click="setVariant('year')"
    >
      year
    </button>
  </div>
</template>

<script>
export default {
  name: "DatesButtons",
  props: {
    byMonth: {
      type: Function,
      required: true,
    },
    byHalfYear: {
      type: Function,
      required: true,
    },
    byYear: {
      type: Function,
      required: true,
    },
    asList: Boolean,
    init: Boolean,
  },
  data: () => ({
    active: "month",
    isVariants: false,
  }),
  methods: {
    setVariant: function (variant) {
      switch (variant) {
        case "month":
          this.active = variant;
          this.month();
          break;
        case "half year":
          this.active = variant;
          this.halfYear();
          break;
        case "year":
          this.active = variant;
          this.year();
          break;
      }
    },
    month: function () {
      const date = new Date(new Date().setMonth(new Date().getMonth() - 1));

      this.byMonth(date);
    },
    halfYear: function () {
      const date = new Date(new Date().setMonth(new Date().getMonth() - 6));

      this.byHalfYear(date);
    },
    year: function () {
      const date = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      );

      this.byYear(date);
    },
  },
  mounted() {
    if (this.init) {
      this.month();
    }
  },
};
</script>

<style scoped>
ul {
  top: 100%;
  z-index: 1;
  border-radius: 5px;
  background-color: white;
}
</style>