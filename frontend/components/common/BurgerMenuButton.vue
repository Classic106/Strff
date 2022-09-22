<template>
  <div
    class="nav-menu-arrow d-flex d-lg-none"
    :class="setStyle()"
    v-on:click="$emit('isOpenMenu', !isOpenMenu)"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "BurgerMenuButton",
  props: {
    isOpenMenu: Boolean,
    colorBlack: Boolean,
  },
  methods: {
    setStyle: function () {
      const isOpen = this.isOpenMenu ? "open" : "";
      const isBlack = this.colorBlack ? "black " : "";
      return `${isOpen} ${isBlack}`;
    },
  },
};
</script>

<style scoped>
.nav-menu-arrow {
  width: 30px;
  height: 26px;
  position: relative;
  cursor: pointer;
}
.nav-menu-arrow span {
  transform: rotate(0deg);
  transition: all 0.5s ease, top 0.5s ease;
  width: 30px;
  position: absolute;
  height: 4px;
  background-color: #fff;
  border-radius: 5px;
  left: 0;
}

.nav-menu-arrow.black span {
  background-color: #000;
}
.nav-menu-arrow span:nth-child(1) {
  top: 0px;
}
.nav-menu-arrow span:nth-child(2) {
  top: 10px;
}
.nav-menu-arrow span:nth-child(3) {
  top: 20px;
}
.nav-menu-arrow.open span:nth-child(1) {
  transform: rotate(-45deg);
  top: 5px;
  width: 20px;
  left: -4px;
}
.nav-menu-arrow.open span:nth-child(3) {
  transform: rotate(45deg);
  top: 17px;
  width: 20px;
  left: -4px;
}
</style>