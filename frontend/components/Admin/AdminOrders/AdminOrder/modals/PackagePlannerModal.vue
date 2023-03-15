<template>
  <BModal
    v-model="show"
    id="package_planner"
    title="Pack Planner"
    centered
    size="xl"
  >
    <div v-if="!isAvailable" class="text-center">
      Your devices or browsers may still not support WebGL.
    </div>
    <div v-else>
      <PackagePlanner :items="items" />
    </div>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <button size="sm" class="btn btn-light mr-2" v-on:click="show = false">
          Close
        </button>
      </div>
    </template>
  </BModal>
</template>

<script>
import { mapMutations } from "vuex";

import WebGL from "~/utils/WebGL";
import PackagePlanner from "../PackPlanner";

export default {
  name: "PackagePlannerModal",
  components: { PackagePlanner },
  props: { order: Object },
  data: () => ({
    show: false,
    items: [],
    isAvailable: false,
  }),
  watch: {
    show: function () {
      if (!this.show) {
        this.set_selected_delivery();
      }
    },
  },
  methods: {
    ...mapMutations({
      set_selected_delivery: "admin_delivery/set_selected_delivery",
    }),
  },
  beforeMount() {
    const { isWebGLAvailable } = WebGL;
    this.isAvailable = isWebGLAvailable();
  },
  mounted() {
    const { order_items, order_bundles } = this.order;

    const order_products = order_items.reduce((acc, item) => {
      const { quantity, product } = item;
      return [...acc, ...new Array(quantity).fill(product)];
    }, []);

    const order_bundles_products = order_bundles.reduce((acc, item) => {
      if (item.bundle) {
        acc = [...acc, ...item.bundle.products];
      }
      return acc;
    }, []);

    this.items = [...order_products, ...order_bundles_products].sort(
      function sortByVolume(b, a) {
        if (a.volume < b.volume) {
          return -1;
        }
        if (a.volume > b.volume) {
          return 1;
        }
        return 0;
      }
    );
  },
};
</script>

<style scoped>
#planner {
  width: 100%;
  height: calc(100vh * 0.5);
}
</style>