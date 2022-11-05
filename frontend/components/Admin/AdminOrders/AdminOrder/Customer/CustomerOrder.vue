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
      {{ order.order_date || formatDate }}
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
            <p class="text-ellipsis m-0">
              {{ order_item.product.title }}
            </p>
          </div>
          <div class="col-2 d-flex align-items-center text-nowrap">
            <p class="m-0">$ {{ order_item.total | formatNumber }}</p>
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
            <p class="text-ellipsis m-0">
              {{ order_bundle.bundle.title }}
            </p>
          </div>
          <div class="col-2 text-nowrap d-flex align-items-center">
            <p class="m-0">$ {{ order_bundle.bundle.price | formatNumber }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "~/utils/filters";
import PreloaderImage from "~/components/common/PreloaderImage.vue";

export default {
  name: "CustomerOrder",
  props: {
    order: [Object, null],
  },
  components: { PreloaderImage },
};
</script>

<style scoped>
.wrap-img > span {
  top: -0.8rem;
  right: -0.5rem;
  width: 2rem;
  height: 2rem;
  background-color: #e4e5e7;
  border-radius: 50%;
}
</style>