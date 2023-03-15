<template>
  <div>
    <label class="d-flex" for="boxes"> Boxes </label>
    <div class="d-flex flex-column">
      <div v-if="!currentBoxes.length" id="boxes">
        <p class="text-center">There aren't any boxes</p>
      </div>
      <select v-model="selectedBox" class="bts_input_style" id="boxes" v-else>
        <option :value="null">Choose a box</option>
        <option :value="box.id" v-for="box in currentBoxes" :key="box.id">
          <p class="col-11 m-0 p-0">
            length: {{ box.lengthty }} width: {{ box.width }} height:
            {{ box.height }} volume: {{ box.volume }}
          </p>
        </option>
      </select>
      <div class="invalid-feedback mt-2" :class="!selectedBoxes.length && 'd-flex'">
        Boxes aren't chosed
      </div>
      <vueCustomScrollbar
        v-if="selectedBoxes.length"
        class="scroll overflow-auto"
        :settings="scrollSettings"
      >
        <ul class="d-flex flex-column p-0 m-0 mt-2">
          <li
            v-for="box in selectedBoxes"
            :key="box.id"
            class="d-flex justify-content-center"
          >
            <div class="row w-100">
              <p class="col-11 m-0">
                length: {{ box.lengthy }} width: {{ box.width }} height:
                {{ box.height }} volume: {{ box.volume }} weight:
                {{ box.weight }}
              </p>
              <div
                class="col-1 d-flex justify-content-center align-items-start p-0"
                v-on:click="deleteBox(box.id)"
              >
                <BIconX />
              </div>
            </div>
          </li>
        </ul>
      </vueCustomScrollbar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BoxesBlock",
  data: () => ({
    selectedBox: null,
    currentBoxes: [],
    selectedBoxes: [],
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      boxes: "admin_delivery/boxes",
      selectedDelivery: "admin_delivery/selectedDelivery",
    }),
  },
  watch: {
    selectedBox: function () {
      if (this.selectedBox) {
        const index = this.currentBoxes.findIndex(
          (box) => box.id === +this.selectedBox
        );

        if (index !== -1) {
          this.selectedBoxes.push(this.currentBoxes[index]);
          this.currentBoxes.splice(index, 1);
        }
        this.selectedBox = null;
      }
    },
    selectedBoxes: function () {
      this.$emit("setBoxes", this.selectedBoxes);
    },
  },
  methods: {
    ...mapActions({
      getBoxes: "admin_delivery/getBoxes",
    }),
    setBox: function (e) {
      const { value } = e.target;
      this.selectedBox = value;
    },
    setCurrentBoxes: function () {
      const ids = this.selectedBoxes.map((box) => box.id);
      this.currentBoxes = this.boxes.filter((box) => !ids.includes(box.id));
    },
    deleteBox: function (id) {
      this.selectedBoxes = this.selectedBoxes.filter((box) => box.id !== id);
      this.setCurrentBoxes();
    },
  },
  async mounted() {
    await this.getBoxes();

    if (this.selectedDelivery) {
      const { boxes } = this.selectedDelivery;
      this.selectedBoxes = [...boxes];
      this.setCurrentBoxes();
    } else {
      this.currentBoxes = [...this.boxes];
    }
  },
};
</script>

<style scoped>
.scroll {
  max-height: 40vh;
}
</style>