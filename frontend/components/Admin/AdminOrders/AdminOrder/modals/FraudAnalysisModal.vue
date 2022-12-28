<template>
  <BModal v-model="show" id="fraud-analysis" title="Fraud Analysis" centered>
    <BProgress class="mt-2" :max="100">
      <BProgressBar :value="45 * (6 / 10)" variant="success" />
      <BProgressBar :value="45 * (2.5 / 10)" variant="warning" />
      <BProgressBar :value="45 * (1.5 / 10)" variant="danger" />
    </BProgress>
    <div class="row mb-2">
      <span class="col-4 text-center">LOW</span>
      <span class="col-4 text-center">MEDIUM</span>
      <span class="col-4 text-center">HIGH</span>
    </div>
    <div class="d-flex flex-column">
      <span class="horisontal font-weight-bold position-relative"
        >Indicators</span
      >
      <ul class="d-flex flex-column p-0">
        <li
          v-for="indicator in indicators"
          :key="indicator.title"
          class="
            horisontal
            indicator
            d-flex
            align-items-center
            position-relative
            mb-2
          "
        >
          <BIconDot scale="2" class="mr-2" />
          {{ indicator.title }}
        </li>
      </ul>
    </div>

    <template #modal-footer>
      <div class="d-flex flex-column w-100">
        <span class="horisontal font-weight-bold position-relative"
          >Additional information</span
        >
        <div
          class="
            horisontal
            indicator
            d-flex
            align-items-center
            position-relative
            mb-2
          "
        >
          <BIconDot scale="2" class="mr-2" />
          This order was placed from IP address 127.0.0.1
        </div>
      </div>
    </template>
  </BModal>
</template>

<script>
export default {
  name: "FraudAnalysisModal",
  data: () => ({
    show: false,
    indicators: [
      {
        title:
          "Characteristic of this order similat to non-fraudulent orders observed in the past",
        status: true,
      },
      {
        title: "There was 1 payment attempt",
        status: false,
      },
      {
        title: "Payment was made with 1 credit card",
        status: true,
      },
      {
        title:
          "Billing country matches the country from which the order was placed",
        status: true,
      },
    ],
  }),
};
</script>

<style scoped>
.horisontal::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  position: absolute;
  background-color: #dee2e6;
}

.horisontal.indicator::after {
  bottom: -2px;
}

.border-bottom {
  border-bottom: 1px solid #dee2e6;
}
</style>