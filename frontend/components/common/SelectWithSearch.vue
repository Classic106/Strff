<template>
  <div class="position-relative">
    <div
      class="d-flex flex-column align-items-center"
      :tabindex="tabindex - 100"
      v-on:mouseenter="mouseenter"
      v-on:mouseleave="mouseleave"
    >
      <BPagination
        v-model="page"
        aria-controls="my-table"
        class="m-0 mb-3"
        :class="page < 2 && total <= currentPerPage && 'd-none'"
        :total-rows="total"
        :per-page="currentPerPage"
      />
      <div class="custom-select" :tabindex="tabindex">
        <input
          type="text"
          class="p-0 w-100"
          v-model.trim="text"
          :placeholder="placeholder || 'Search...'"
          v-on:click="open = !open"
          v-on:input="$emit('setSearchText', text)"
        />
      </div>
      <ul
        class="block items p-1 position-absolute w-100"
        :class="open ? 'd-flex flex-column align-self-end' : 'd-none'"
      >
        <div v-if="text && !data.length">
          <p class="m-0 p-3 w-100 text-center">Nothing not found</p>
        </div>
        <vueCustomScrollbar
          v-else
          class="scroll w-100 overflow-auto"
          :settings="scrollSettings"
        >
          <li
            v-for="(option, i) of data"
            :key="i"
            v-on:click="clickOnItem(option)"
          >
            <slot name="item" :item="option"></slot>
          </li>
        </vueCustomScrollbar>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectWithSearch",
  props: {
    data: Array,
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    placeholder: {
      type: String,
    },
    currentPerPage: {
      type: Number,
      required: true,
      default: 10,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data: () => ({
    selected: null,
    open: false,
    text: "",
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
    page: 1,
    focused: false,
    timer: null,
  }),
  watch: {
    data: function () {
      this.selected = this.data.length > 0 ? this.data[0] : null;
    },
    page: function () {
      this.$emit("setPage", this.page);
    },
  },
  methods: {
    mouseenter: function () {
      this.open = true;
      this.focused = true;
    },
    mouseleave: function () {
      clearTimeout(this.timer);
      this.timer = null;

      this.focused = false;

      this.timer = setTimeout(() => {
        if (!this.focused) {
          this.open = false;
        }
      }, 300);
    },
    clickOnItem: function (item) {
      this.$emit("clickItem", item);
      this.open = false;
    },
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style scoped>
input {
  border: none;
  outline: none;
}

.scroll {
  max-height: 40vh;
}

.scroll > li {
  display: flex;
  z-index: 1;
}

.items {
  color: #000;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  top: calc(100% + 2px);
  z-index: 4;
}

li:hover {
  background-color: #ad8225;
}
</style>