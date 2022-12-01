<template>
  <div v-if="order">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <a href="#" v-on:click.prevent="" class="mr-2">{{ order.id }}</a>
        <div class="paid p-1 pl-2 pr-3 mr-2" :class="order.paid && 'active'">
          <BIconDot scale="2" /> Paid
        </div>
        <div class="status p-1 pl-2 pr-3 mr-2">
          <BIconDot scale="2" />
          {{ order.order_status.title }}
        </div>
      </div>
      <div>
        <span class="text-nowrap font-weight-bold">
          $ {{ order.total | formatNumber }}
        </span>
      </div>
    </div>
    <p>
      {{ order.order_date | formatDate }}
    </p>
    <div v-if="order.order_items.length">
      <h6 class="mb-3">Products</h6>
      <ul class="d-flex flex-column p-0">
        <li v-for="order_item in order.order_items" :key="order_item.id">
          <ProductCard
            :product="order_item.product"
            :quantity="order_item.quantity"
          />
        </li>
      </ul>
    </div>
    <div v-if="order.order_bundles.length">
      <h6>Bundles</h6>
      <ul class="d-flex flex-column p-0">
        <li v-for="order_bundle in order.order_bundles" :key="order_bundle.id">
          <BundleCard :bundle="order_bundle.bundle" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "~/utils/filters";
import BundleCard from "~/components/Admin/common/BundleCard.vue";
import ProductCard from "~/components/Admin/common/ProductCard.vue";

export default {
  name: "CustomerOrder",
  props: {
    order: [Object, null],
  },
  components: {
    BundleCard,
    ProductCard,
  },
};
</script>

<style scoped>
.status,
.paid {
  border-radius: 20px;
  font-size: 15px;
  background: #e4e5e7;
}

.status {
  background: yellow;
}

.paid.active {
  background: green;
}
</style>