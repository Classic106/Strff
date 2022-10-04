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
          {{ order.status }}
        </div>
      </div>
      <span class="font-weight-bold">$ {{ order.total }}</span>
    </div>
    <p>
      {{ parseDate(order.order_date) }}
    </p>
    <div v-if="order.order_items.length">
      <h6 class="mb-3">Products</h6>
      <ul class="d-flex flex-column p-0">
        <li
          v-for="order_item in order.order_items"
          :key="order_item.id"
          class="row w-100"
        >
          <div class="wrap-img col-2 position-relative">
            <span
              class="
                position-absolute
                d-flex
                justify-content-center
                align-items-center
                p-2
              "
              >{{ order_item.quantity }}</span
            >
            <PreloaderImage :image="order_item.product.image[0].url" />
          </div>
          <div class="text-ellipsis col-8 d-flex align-items-center">
            {{ order_item.product.title }}
          </div>
          <div class="col-2 d-flex align-items-center text-nowrap">
            $ {{ order_item.total }}
          </div>
        </li>
      </ul>
    </div>
    <div v-if="order.order_bundles.length">
      <h6>Bundles</h6>
      <ul class="d-flex flex-column p-0">
        <li
          v-for="order_bundle in order.order_bundles"
          :key="order_bundle.id"
          class="row align-item-center"
        >
          <div class="col-3 d-flex align-items-center">
            <div class="wrap-img">
              <PreloaderImage
                :image="order_bundle.bundle.products[0].image[0].url"
                class="p-0"
              />
            </div>
            +
            <div class="wrap-img">
              <PreloaderImage
                :image="order_bundle.bundle.products[1].image[0].url"
              />
            </div>
          </div>
          <div class="text-ellipsis col-7 d-flex align-items-center">
            {{ order_bundle.bundle.title }}
          </div>
          <div class="col-2 text-nowrap d-flex align-items-center">
            $ {{ order_bundle.bundle.price }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "CustomerOrder",
  props: {
    order: [Object, null],
  },
  components: { PreloaderImage },
  methods: {
    parseDate: function (date) {
      const options = { month: "long" };

      const d = new Date(date);

      const month = new Intl.DateTimeFormat("en-US", options).format(d);
      const day = d.getDate();
      const hours = d.getHours();
      const minutes = d.getMinutes();

      return `${month} ${day}, at ${hours}: ${minutes}`;
    },
  },
};
</script>

<style scoped>
.wrap-img > span {
  top: -.8rem;
  right: -.5rem;
  width: 2rem;
  height: 2rem;
  background-color: #e4e5e7;
  border-radius: 50%;
}
</style>