<template>
  <div :class="setClass()"></div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    small: Boolean,
  },
  methods: {
    setClass: function () {
      const { small } = this;

      if (small) {
        return "lds-dual-ring sm";
      }
      return "lds-dual-ring";
    },
  },
};
</script>

<style>
.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 5px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

.sm {
  width: 30px;
  height: 30px;
}

.sm:after {
  width: 30px;
  height: 30px;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>