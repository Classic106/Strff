<template>
  <div class="shipping_inf" :class="isShipping ? 'show' : 'hide'">
    <div class="shipping_inf_content d-flex flex-column">
      <vueCustomScrollbar
        class="scroll-area px-sm-3 px-1 mb-auto"
        :settings="settings"
      >
        <div class="d-flex flex-column">
          <div
            class="
              head
              mb-3
              d-flex
              w-100
              rounded
              justify-content-between
              align-items-center
            "
          >
            <h6
              class="py-3 p-3 text-nowrap"
              v-on:click.self="isShippingAddressOpen = !isShippingAddressOpen"
            >
              + Add Shipping Address
            </h6>
            <CloseButton class="mr-3 my-2" v-on:close="isShippingAddressOpen = false" />
          </div>
          <AddressForm :address-type="1" v-if="isShippingAddressOpen" v-on:setAddress="setAddress" />
        </div>
        <div class="d-flex flex-column">
          <div
            class="
              head
              mb-3
              d-flex
              w-100
              rounded
              justify-content-between
              align-items-center
            "
          >
            <h6
              class="py-3 p-3 text-nowrap"
              v-on:click.self="isBillingAddressOpen = !isBillingAddressOpen"
            >
              + Add Billing Address
            </h6>
            <CloseButton class="mr-3 my-2" v-on:close="isBillingAddressOpen = false" />
          </div>
          <AddressForm :address-type="2" v-if="isBillingAddressOpen" v-on:setAddress="setAddress" />
        </div>
        <div class="d-flex flex-column">
          <div
            class="
              head
              w-100
              mb-3
              d-flex
              rounded
              justify-content-between
              align-items-center
            "
          >
            <h6
              class="p-3 text-nowrap"
              v-on:click.self="isCardOpen = !isCardOpen"
            >
              + Add Credit Card
            </h6>
            <CloseButton class="mr-3 my-2" v-on:close="isCardOpen = false" />
          </div>
          <Card v-if="isCardOpen" v-on:setCard="setCard" />
        </div>
      </vueCustomScrollbar>
      <button
        class="finalize-btn text-nowrap p-3 my-3 mx-1"
        v-on:click="finalize"
      >
        FINALIZE AND PLACE ORDER
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Sign from "@/components/Sign";
import AddressForm from "@/components/AddressForm";
import Card from "./Card.vue";
import CloseButton from "@/components/common/CloseButton";

export default {
  components: { Sign, AddressForm, Card, CloseButton },
  props: ["isShipping"],
  data: () => ({
    userInfo: {},
    card: {},
    isShippingAddressOpen: false,
    isBillingAddressOpen: false,
    isCardOpen: false,
    settings: {
      suppressScrollX: true,
      wheelPropagation: true,
    },
  }),
  computed: {
    ...mapGetters({
        username: "auth/username",
        order: "order/order"
    }),
  },
  methods: {
    ...mapActions({
      confirmOrder: "order/confirmOrder",
    }),
    setAddress: function (address) {
      /* this.userInfo = address; */

      this.$store.dispatch('order/updateOrder', {
        id: this.order.id,
        address: address
      });
    },
    setCard: function (val) {
      this.card = val;
    },
    finalize: function () {
      const isUserInfo = Object.keys(this.userInfo).length !== 0;
      const isCard = Object.keys(this.card).length !== 0;

      if (isUserInfo && isCard) {
        const data = { ...this.userInfo };
        data.state = this.userInfo.state.name;

        this.confirmOrder(data);
        this.$emit("nextStep");
      }
    },
  },
  mounted() {
    this.userInfo = this.userInf;
  },
};
</script>

<style scoped>
@media (max-width: 992px) {
  .shipping_inf,
  .shipping_inf.show,
  .shipping_inf.hide,
  .finalize-btn,
  .scroll-area {
    width: 100% !important;
    transition: none !important;
  }
  .shipping_inf_content {
    width: 100%;
  }
}

@media (min-width: 992px) {
  .scroll-area {
    width: 100%;
  }
  .shipping_inf_content {
    width: 340px;
    height: 100%;
  }
}

.icon {
  filter: brightness(0) invert(1);
}

.show {
  width: 340px;
  transition: width 1s ease-in-out;
}

.hide {
  width: 0;
  transition: width 1s ease-in-out;
}

.head {
  cursor: pointer;
  background: rgb(21, 21, 22);
}

button {
  color: #fff;
  border: none;
}

.finalize-btn {
  width: 340px;
  background: #5bb85d;
  color: #fff;
}
</style>