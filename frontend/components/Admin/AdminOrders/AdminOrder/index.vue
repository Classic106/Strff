<template>
  <vueCustomScrollbar
    class="w-100 h-100 overflow-auto"
    :settings="scrollSettings"
  >
    <div class="row w-100 justify-content-center">
      <div class="d-flex flex-column col-md-8 col-12">
        <div class="d-flex align-items-start mt-3">
          <button v-on:click="clearOrders()" class="button">
            <BIconArrowLeft />
          </button>
          <div class="w-100 px-3">
            <div class="d-flex align-items-center">
              <h6 class="m-0 px-2 font-weight-bold">{{ selected.id }}</h6>
              <div
                class="paid p-1 pl-2 pr-3 mr-2"
                :class="selected.paid && 'active'"
              >
                <BIconDot scale="2" /> Paid
              </div>
              <div class="status p-1 pl-2 pr-3 mr-2">
                <BIconDot scale="2" /> {{ selected.status }}
              </div>
            </div>
            <p>{{ parseDate(selected.order_date) }}</p>
          </div>
          <button
            class="border-left"
            v-on:click="setPreviousOrder"
            :disabled="!previous"
          >
            <BIconChevronLeft />
          </button>
          <button
            class="border-right"
            v-on:click="setNextOrder"
            :disabled="!next"
          >
            <BIconChevronRight />
          </button>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="block w-100 mb-3">
              <div class="block-main d-flex flex-column p-3">
                <div class="d-flex">
                  <div
                    class="
                      icon-circle-wrap
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    <BIconCheckCircle variant="success" />
                  </div>
                  <h6 class="ml-2 m-0">{{ selected.status }}dsdfds</h6>
                </div>
                <div class="d-flex flex-column">
                  <div
                    class="row"
                    v-for="order_item in selected.order_items"
                    :key="order_item.id"
                  >
                    <div class="col-2"></div>
                  </div>
                  <div
                    class="row"
                    v-for="order_bundle in selected.order_bundles"
                    :key="order_bundle.id"
                  >
                    <div class="col-2"></div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end p-3">
                <button class="btn btn-success">Add tracking</button>
              </div>
            </div>
            <div class="block w-100">
              <div class="block-main d-flex flex-column p-3">
                <div class="d-flex">
                  <div
                    class="
                      icon-circle-wrap
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    <BIconCheckCircle variant="success" />
                  </div>
                  <h6 class="ml-2 m-0">Paid</h6>
                </div>
                <div
                  class="d-flex flex-lg-row flex-column justify-content-between"
                >
                  <p>Subtotal</p>
                  <p class="text-center">
                    {{
                      selected.order_items.length +
                      selected.order_bundles.length
                    }}
                    items
                  </p>
                  <p>${{ 465 }}</p>
                </div>
                <div
                  class="d-flex flex-lg-row flex-column justify-content-between"
                >
                  <p>Shipping</p>
                  <p class="text-center">Flat Rate (0.07 rate lb)</p>
                  <p>${{ 465 }}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="font-weight-bold">Total</p>
                  <p class="font-weight-bold">${{ selected.total }}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between p-3">
                <p class="m-0">Paid by customer</p>
                <p class="m-0">${{ selected.total }}</p>
              </div>
            </div>
          </div>
          <div class="col-5 d-flex flex-column">
            <div class="block mb-3">
              <div
                class="d-flex justify-content-between align-items-center p-3"
              >
                <h6 class="text-uppercase m-0">Customer</h6>
                <span v-on:click="openModal('customer-modal')">Edit</span>
              </div>
              <div class="block-main pt-0 px-3">
                <p>{{ getCustomer() }}</p>
                <p>1 order</p>
              </div>
              <div class="block-main">
                <div
                  class="d-flex justify-content-between align-items-center p-3"
                >
                  <h6 class="text-uppercase m-0">Contact information</h6>
                  <span v-on:click="openModal('contact-modal')">Edit</span>
                </div>
                <p>{{ getCustomerEmail() }}</p>
              </div>
              <div class="block-main p-3">
                <div class="d-flex justify-content-between align-items-center">
                  <h6 class="text-uppercase m-0">Shipping address</h6>
                  <span v-on:click="openModal('shipping-modal')">Edit</span>
                </div>
                <p>{{ getCustomer() }}</p>
                <p>{{ getCustomerAdress() }}</p>
                <p>{{ getCustomerPhone() }}</p>
                <a href="#">View map</a>
              </div>
              <div class="p-3">
                <h6 class="text-uppercase m-0">Billing adress</h6>
                <p>Same as shipping address</p>
              </div>
            </div>
            <div class="block d-flex flex-column align-items-center">
              <div class="block-main p-3 w-100">
                <h6 class="m-0">Fraud analysis</h6>
                <BProgress class="mt-2" :max="100">
                  <BProgressBar :value="45 * (6 / 10)" variant="success" />
                  <BProgressBar :value="45 * (2.5 / 10)" variant="warning" />
                  <BProgressBar :value="45 * (1.5 / 10)" variant="danger" />
                </BProgress>
                <ul class="d-flex flex-column p-0 mt-2">
                  <li class="d-flex align-items-center mb-2">
                    <BIconDot scale="2" class="mr-2" />
                    <p class="m-0">
                      Characteristic of this order similat to non-fraudulent
                      orders observed in the past
                    </p>
                  </li>
                  <li class="d-flex align-items-center">
                    <BIconDot scale="2" class="mr-2" />
                    <p class="m-0">There was 1 payment attempt</p>
                  </li>
                </ul>
              </div>
              <a href="#" class="p-3">View full analisis</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContactModal :order="selected" />
    <CustomerModal :order="selected" />
    <ShippingModal :order="selected" />
  </vueCustomScrollbar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { getStrapiMedia } from "~/utils/medias";
import { prevCurrNextItems } from "~/helpers";

import CustomerModal from "./CustomerModal.vue";
import ContactModal from "./ContactModal.vue";
import ShippingModal from "./ShippingModal.vue";

export default {
  name: "AdminOrder",
  components: { CustomerModal, ContactModal, ShippingModal },
  data: () => ({
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      orders: "admin_orders/orders",
      previous: "admin_orders/previous",
      selected: "admin_orders/selected",
      next: "admin_orders/next",
    }),
  },
  methods: {
    getStrapiMedia,
    prevCurrNextItems,
    ...mapMutations({
      clearOrders: "admin_orders/clearOrders",
      setSelectedOrders: "admin_orders/setSelectedOrders",
    }),
    openModal: function (modal) {
      this.$root.$emit("bv::show::modal", modal);
    },
    setNextOrder: function () {
      const index = this.findCurrentIndex();
      const result = this.prevCurrNextItems(
        this.orders[index + 1],
        this.orders
      );

      this.setSelectedOrders(result);
    },
    setPreviousOrder: function () {
      const index = this.findCurrentIndex();
      const result = this.prevCurrNextItems(
        this.orders[index - 1],
        this.orders
      );

      this.setSelectedOrders(result);
    },
    findCurrentIndex: function () {
      return this.orders.findIndex((item) => item.id === this.selected.id);
    },
    parseDate: function (date) {
      const options = { month: "long" };

      const d = new Date(date);

      const month = new Intl.DateTimeFormat("en-US", options).format(d);
      const day = d.getDate();
      const hours = d.getHours();
      const minutes = d.getMinutes();

      return `${month} ${day}, at ${hours}: ${minutes}`;
    },
    getCustomer: function () {
      const { first_name, last_name, user } = this.selected;

      if (!user) {
        return `${first_name} ${last_name}`;
      } else {
        const { first_name, last_name } = user;
        return `${first_name} ${last_name}`;
      }
    },
    getCustomerEmail: function () {
      const { email, user } = this.selected;

      if (!user) {
        return email;
      } else {
        const { email } = user;
        return email;
      }
    },
    getCustomerAdress: function () {
      const { address1, user } = this.selected;

      if (!user) {
        return address1;
      } else {
        const { address1 } = user;
        return address1;
      }
    },
    getCustomerPhone: function () {
      const { cellphone, user } = this.selected;

      if (!user) {
        return cellphone;
      } else {
        const { cellphone } = user;
        return cellphone;
      }
    },
  },
  async mounted() {
    console.log(this.selected);
    /*console.log(this.selected.id);
  
    const result = await this.$strapi.find("orders", { id: this.selected.id });
    console.log(result);*/
  },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  background: none;
}

.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}

.border-left {
  border-radius: 5px 0 0 5px;
  border: 1px solid #000;
}

.border-right {
  border-radius: 0 5px 5px 0;
  border: 1px solid #000;
}

.image-wrap:hover > .image-buttons {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}

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

.icon-circle-wrap {
  border: 4px solid #ade9d0;
  border-radius: 50%;
}

.block-main {
  border-bottom: 1px solid black;
}
</style>