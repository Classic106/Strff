<template>
  <div
    class="shipping_inf d-flex flex-column"
    :class="isShipping ? 'show' : 'hide'"
  >
    <vueCustomScrollbar
      class="scroll-area position-realtive px-3 mb-auto"
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
            class="w-100 p-3"
            v-on:click.self="isAddressOpen = !isAddressOpen"
          >
            + Add Shipping Address
          </h6>
          <span
            class="p-3 text-center close-button"
            v-on:click.self="isAddressOpen = false"
            >+</span
          >
        </div>
        <UserForm v-if="isAddressOpen" :setUserInfo="setUserInfo" />
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
          <h6 class="w-100 p-3" v-on:click.self="isCardOpen = !isCardOpen">
            + Add Credit Card
          </h6>
          <span
            class="p-3 text-center close-button"
            v-on:click.self="isCardOpen = false"
            >+</span
          >
        </div>
        <Card v-if="isCardOpen" :setCard="setCard" />
      </div>
    </vueCustomScrollbar>
    <button
      class="finalize-btn text-nowrap p-3 mt-4 mx-1"
      v-on:click="finalize"
    >
      FINALIZE AND PLACE ORDER
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sign from "@/components/Sign";
import UserForm from "@/components/UserForm";
import Card from "./Card.vue";

export default {
  components: { Sign, UserForm, Card },
  props: ["isShipping"],
  data: () => ({
    userInfo: {},
    card: {},
    isAddressOpen: false,
    isCardOpen: false,
    settings: {
      suppressScrollX: true,
      wheelPropagation: true,
    },
  }),
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
  },
  methods: {
    setUserInfo: function (val) {
      this.userInfo = val;
    },
    setCard: function (val) {
      this.card = val;
    },
    finalize: function () {
      const isUserInfo = Object.keys(this.userInfo).length !== 0;
      const isCard = Object.keys(this.card).length !== 0;

      if (isUserInfo && isCard) {
        console.log(this.userInfo, this.card);
        this.$emit("nextStep");
      }
    },
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
}

.shipping_inf {
  width: 0;
}

.scroll-area,
.shipping_inf.show {
  width: 340px;
  transition: width 1s ease-in-out;
}

.shipping_inf.hide {
  width: 0;
  transition: width 1s ease-in-out;
}

.head {
  cursor: pointer;
  background: rgb(21, 21, 22);
}

.close-button {
  transform: rotate(45deg);
  z-index: 0;
  cursor: pointer;
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