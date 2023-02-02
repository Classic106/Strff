<template>
  <BModal
    v-model="show"
    id="package_planner"
    title="Pack Planner"
    centered
    size="xl"
  >
    <div>
      <PackagePlanner :items="items" />
      <div id="planner"></div>
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
import PackagePlanner from "../PackPlanner";

export default {
  name: "PackagePlannerModal",
  components: { PackagePlanner },
  props: { order: Object },
  data: () => ({
    show: false,
    items: [],
  }),
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

    this.items = [...order_products, ...order_bundles_products];
    /*items: [
      {
        h: 1,
        w: 4,
        l: 3,
      },
      {
        h: 2,
        w: 4,
        l: 2,
      },
      {
        h: 3,
        w: 3,
        l: 4,
      },
      {
        h: 4,
        w: 3,
        l: 3,
      },
      {
        h: 4,
        w: 2,
        l: 3,
      },
      {
        h: 2,
        w: 1,
        l: 4,
      },
      {
        h: 3,
        w: 2,
        l: 4,
      },
      {
        h: 1,
        w: 4,
        l: 3,
      },
    ],*/
  },
};
</script>

<style scoped>
#planner {
  width: 100%;
  height: calc(100vh * 0.5);
}
</style>