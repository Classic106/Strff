<template>
  <div class="custom-select" v-on:blur="open = false" :tabindex="tabindex">
    <div
      class="text-ellipsis selected"
      :class="{ open: open }"
      @click="open = !open"
    >
      <input
        type="text"
        v-model="text"
        placeholder="Search product"
        class="w-100 p-0"
        v-on:input="fiterData"
      />
    </div>
    <ul
      class="items p-1"
      v-if="filteredData.length"
      :class="open ? 'd-flex flex-column align-self-end' : 'd-none'"
    >
      <vueCustomScrollbar
        class="scroll w-100 overflow-auto"
        :settings="scrollSettings"
      >
        <li
          v-for="(option, i) of filteredData"
          :key="i"
          v-on:click="clickOnItem(option)"
        >
          <slot name="item" :item="option"></slot>
        </li>
      </vueCustomScrollbar>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SelectBundles",
  props: {
    data: Array,
    filter: {
      type: Function,
      required: false,
    },
    clickItem: {
      type: Function,
      required: false,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data: () => ({
    selected: null,
    open: false,
    text: "",
    filteredData: [],
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  watch: {
    data: function () {
      this.selected = this.data.length > 0 ? this.data[0] : null;
      this.fiterData(this.text, this.data);
    },
  },
  methods: {
    clickOnItem: function (item) {
      if (this.clickItem) {
        this.clickItem(item);
      }
      this.open = false;
    },
    fiterData: function () {
      if (this.filter && this.text) {
        this.filteredData = this.filter(this.text, this.data);
        return;
      }
      if (this.text) {
        this.filteredData = this.data.filter((item) => item === this.text);
        return;
      }
      this.filteredData = this.data;
    },
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

.custom-select {
  position: relative;
  width: 100%;
}

.custom-select .selected {
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
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
  z-index: 1;
}

.custom-select .items div {
  color: #000;
  cursor: pointer;
  user-select: none;
}

li:hover {
  background-color: #ad8225;
}
</style>