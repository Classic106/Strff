<template>
  <div class="row w-100 h-100">
    <div class="d-flex col-8 flex-column w-100 text-left p-3">
      <p>Here`s what`s heppenning with your store today.</p>
      <div class="row justify-content-between m-0">
        <div class="block bg-white p-3 col-md-6 col-12 d-flex flex-column">
          <p class="text-uppercase m-0">total sessions</p>
          <div
            class="
              border-bottom
              d-flex
              justify-content-between
              align-items-center
            "
          >
            <h6>18</h6>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="d-flex align-items-center">
              <span class="live d-flex align-items-center p-2 mr-2"
                ><BIconDot />LIVE</span
              >
              <span>1 visitor</span>
            </div>
            <nuxt-link to="/#">See Live View</nuxt-link>
          </div>
        </div>
        <div class="block bg-white col-md-6 col-12 p-3 mt-md-0 mt-2">
          <p class="text-uppercase m-0">total sales</p>
          <span class="border-bottom d-flex w-100">No sales yet</span>
          <div class="d-flex justify-content-between mt-2">
            <span>No orders yet</span>
            <nuxt-link to="/#">View report</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="right-side col-4 p-0">
      <AdminHomeRightSide class="bg-white h-100" />
    </div>
  </div>
</template>

<script>
import AdminHomeRightSide from "./AdminHomeRightSide.vue";

export default {
  name: "AdminHome",
  components: { AdminHomeRightSide },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .bg-white.col-md-6 {
    flex: 0 0 49%;
    max-width: 49%;
  }
}

.block {
  border-radius: 5px;
  border: 1px solid #000;
}

.live {
  color: red;
  background-color: rgb(255, 115, 115);
}

.border-bottom {
  border-bottom: 1px solid #000;
}

.right-side {
  border-left: 1px solid black;
}
</style>