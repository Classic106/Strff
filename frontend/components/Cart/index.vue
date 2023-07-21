<template>
  <div class="container d-flex m-0 p-0">
    <div class="content d-flex flex-column" :class="isOpen && 'open'">
      <div class="header d-flex align-items-center justify-content-between">
        <h6 class="text-uppercase m-0 p-3">Shopping Bag</h6>
        <CloseButton class="mr-3 my-2" v-on:close="$emit('close')" />
      </div>
      <div class="steps">
        <CartDetail v-on:close="$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartDetail from "./CartDetail";
import CloseButton from "@/components/common/CloseButton";

export default {
  components: {
    CartDetail,
    CloseButton,
  },
  props: ["isOpen"],
  data: () => ({
    settings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  })
};
</script>

<style scoped>
@media (max-width: 992px) {
  .container {
    width: 100% !important;
  }
}

.icon {
  filter: brightness(0) invert(1);
}

.container {
  height: 100%;
  width: max-content;
}

.header {
  height: 56px;
}

.content {
  min-width: 100%;
  margin-left: 100%;
  height: 100%;
  color: #fff;
  background: #333333;
  transition: all 1s ease-in-out;
}

.content.open {
  margin-left: 0;
}

.steps {
  height: calc(100% - 56px);
}
</style>