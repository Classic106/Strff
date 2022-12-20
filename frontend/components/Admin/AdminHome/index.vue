<template>
  <div class="row w-100 h-100 m-0">
    <div class="d-flex col-8 flex-column w-100 text-left p-3">
      <h6>Here`s what`s heppenning with your store.</h6>
      <div class="row justify-content-between m-0 mb-3">
        <div class="block bg-white p-3 col-md-6 col-12 d-flex flex-column">
          <p class="text-uppercase m-0">total sessions</p>
          <div
            class="
              border-bottom
              d-flex
              justify-content-between
              align-items-center
            "
          >
            <h6>{{ count_visitors }}</h6>
            <a href="/#" v-on:click.prevent="openModal('visitors-apex-charts')"
              >View report</a
            >
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="d-flex align-items-center">
              <span class="live d-flex align-items-center p-2 mr-2"
                ><BIconDot />LIVE</span
              >
              <span>{{ count_connected_visitors }} visitor</span>
            </div>
          </div>
        </div>
        <div class="block bg-white col-md-6 col-12 p-3 mt-md-0 mt-2">
          <p class="border-bottom text-uppercase m-0 pb-2">total orders</p>
          <div class="d-flex justify-content-between mt-3">
            <span>{{ countOrders }}</span>
            <a href="/#" v-on:click.prevent="openModal('orders-apex-charts')"
              >View report</a
            >
          </div>
        </div>
      </div>
      <BestSellersProducts class="block mb-3" />
    </div>
    <div class="right-side col-4 p-0">
      <RightSide class="bg-white h-100" />
    </div>
    <VisitorsApexChartsModal />
    <OrdersApexChartsModal />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import RightSide from "./RightSide";
import BestSellersProducts from "./BestSellersProducts.vue";
import VisitorsApexChartsModal from "./VisitorsApexChartsModal.vue";
import OrdersApexChartsModal from "./OrdersApexChartsModal.vue";

export default {
  name: "AdminHome",
  components: {
    RightSide,
    BestSellersProducts,
    VisitorsApexChartsModal,
    OrdersApexChartsModal,
  },
  data: () => ({
    timer: null,
    countOrders: 0,
  }),
  computed: {
    ...mapGetters({
      count_visitors: "admin_visitors/count_visitors",
      count_connected_visitors: "admin_visitors/count_connected_visitors",
    }),
  },
  methods: {
    ...mapActions({
      getCountVisitors: "admin_visitors/getCountVisitors",
      getCountConnectedCountVisitors:
        "admin_visitors/getCountConnectedCountVisitors",
      getCountOrders: "admin_orders/getCountOrders",
      getTodayOrders: "admin_orders/getTodayOrders",
      getBestSellers: "best_sellers/getBestSellers",
    }),
    openModal: function (modal) {
      this.$root.$emit("bv::show::modal", modal);
    },
  },
  async mounted() {
    await this.getCountConnectedCountVisitors();
    await this.getCountVisitors();
    await this.getTodayOrders();
    await this.getBestSellers();
    this.countOrders = await this.getCountOrders();

    this.timer = setInterval(async () => {
      await this.getCountConnectedCountVisitors();
      await this.getCountVisitors();
      await this.getTodayOrders();
      await this.getBestSellers();
      this.countOrders = await this.getCountOrders();
    }, 5000);
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .bg-white.col-md-6 {
    flex: 0 0 49%;
    max-width: 49%;
  }
}

.live {
  color: red;
  background-color: rgb(255, 115, 115);
}

.border-bottom {
  border-bottom: 1px solid #000;
}

.right-side {
  border-left: 1px solid black;
}
</style>