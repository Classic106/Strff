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

    const a = [
      {
        id: 0,
        width: 2,
        lengtt: 4,
        height: 4,
        volume: 32,
        weight: 165,
      },
      {
        id: 1,
        width: 1,
        lengtt: 1,
        height: 1,
        volume: 1,
        weight: 229,
      },
      { id: 2, width: 3, lengtt: 4, height: 1, volume: 12, weight: 166 },
      {
        id: 3,
        width: 5,
        lengtt: 1,
        height: 3,
        volume: 15,
        weight: 230,
      },
      {
        id: 4,
        width: 1,
        lengtt: 2,
        height: 1,
        volume: 2,
        weight: 154,
      },
      {
        id: 5,
        width: 2,
        lengtt: 4,
        height: 3,
        volume: 24,
        weight: 148,
      },
      {
        id: 6,
        width: 1,
        lengtt: 1,
        height: 3,
        volume: 3,
        weight: 174,
      },
      { id: 7, width: 3, lengtt: 4, height: 4, volume: 48, weight: 170 },
      {
        id: 8,
        width: 3,
        lengtt: 4,
        height: 4,
        volume: 48,
        weight: 170,
      },
      {
        id: 9,
        width: 5,
        lengtt: 1,
        height: 4,
        volume: 20,
        weight: 117,
      },
      {
        id: 10,
        width: 1,
        lengtt: 1,
        height: 4,
        volume: 4,
        weight: 183,
      },
      { id: 11, width: 5, lengtt: 4, height: 1, volume: 20, weight: 149 },
      {
        id: 12,
        width: 4,
        lengtt: 5,
        height: 5,
        volume: 100,
        weight: 246,
      },
      {
        id: 13,
        width: 5,
        lengtt: 3,
        height: 3,
        volume: 45,
        weight: 170,
      },
      {
        id: 14,
        width: 2,
        lengtt: 2,
        height: 4,
        volume: 16,
        weight: 196,
      },
      {
        id: 15,
        width: 5,
        lengtt: 2,
        height: 2,
        volume: 20,
        weight: 242,
      },
      {
        id: 16,
        width: 4,
        lengtt: 2,
        height: 4,
        volume: 32,
        weight: 217,
      },
      {
        id: 17,
        width: 1,
        lengtt: 4,
        height: 4,
        volume: 16,
        weight: 210,
      },
      {
        id: 18,
        width: 2,
        lengtt: 4,
        height: 1,
        volume: 8,
        weight: 126,
      },
      {
        id: 19,
        width: 1,
        lengtt: 4,
        height: 1,
        volume: 4,
        weight: 117,
      },
      {
        id: 20,
        width: 1,
        lengtt: 5,
        height: 1,
        volume: 5,
        weight: 172,
      },
      {
        id: 21,
        width: 1,
        lengtt: 4,
        height: 1,
        volume: 4,
        weight: 117,
      },
      {
        id: 22,
        width: 1,
        lengtt: 5,
        height: 1,
        volume: 5,
        weight: 172,
      },
      // {
      //   width: 6,
      //   height: 6,
      //   lengtt: 6,
      //   weight: 4,
      //   volume: 216,
      // },
      // {
      //   width: 3,
      //   height: 4,
      //   lengtt: 3,
      //   weight: 6,
      //   volume: 36,
      // },
      //    {
      //   width: 6,
      //   height: 6,
      //   lengtt: 6,
      //   weight: 4,
      //   volume: 216,
      // },
      // {
      //   width: 3,
      //   height: 4,
      //   lengtt: 3,
      //   weight: 6,
      //   volume: 36,
      // },
      // {
      //   width: 5,
      //   height: 3,
      //   lengtt: 5,
      //   weight: 3,
      //   volume: 75,
      // },
      // {
      //   width: 6,
      //   height: 3,
      //   lengtt: 3,
      //   weight: 6,
      //   volume: 54,
      // },
      // {
      //   width: 6,
      //   height: 3,
      //   lengtt: 5,
      //   weight: 5,
      //   volume: 90,
      // },
      // {
      //   width: 5,
      //   height: 4,
      //   lengtt: 5,
      //   weight: 3,
      //   volume: 100,
      // },
    ];

    // function randomIntFromInterval(min, max) {
    //   // min and max included
    //   return Math.floor(Math.random() * (max - min + 1) + min);
    // }

    // for (let i = 0; i < 20; i++) {
    //   const width = randomIntFromInterval(1, 5);
    //   const height = randomIntFromInterval(1, 5);
    //   const lengtt = randomIntFromInterval(1, 5);
    //   const volume = width * lengtt * height;
    //   const weight = randomIntFromInterval(100, 250);
    //   a.push({ width, lengtt, height, volume, weight });
    // }

    // console.log(a);

    this.items = [/*...order_products, ...order_bundles_products,*/ ...a].sort(
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