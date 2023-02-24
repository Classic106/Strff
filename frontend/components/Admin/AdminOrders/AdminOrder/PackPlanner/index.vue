<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-between">
      <div class="d-flex mr-1">
        <div
          v-on:click="getBoxes('ups')"
          class="d-flex align-items-center mr-1"
        >
          <img
            src=" https://www.ups.com/assets/resources/images/UPS_logo.svg"
            alt="UPS_logo"
          />
        </div>
        <div v-on:click="getBoxes('usps')" class="d-flex align-items-center">
          <img
            src="https://www.usps.com/global-elements/header/images/utility-header/logo-sb.svg"
            alt="UPS_logo"
          />
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="d-flex flex-column position-relative">
          <button
            v-on:click="isPersentage = !isPersentage"
            class="btn btn-primary mr-1"
          >
            Persentage
          </button>
          <ul
            :class="isPersentage ? 'd-flex ' : 'd-none'"
            class="w-100 flex-column position-absolute p-0 m-0"
          >
            <li v-on:click="persentage = 10" class="text-center">10</li>
            <li v-on:click="persentage = 15" class="text-center">15</li>
            <li v-on:click="persentage = 20" class="text-center">20</li>
            <li v-on:click="persentage = 25" class="text-center">25</li>
          </ul>
        </div>
        <div class="d-flex flex-column position-relative">
          <button v-on:click="isVariants = !isVariants" class="btn btn-primary">
            Variants
          </button>
          <ul
            :class="isVariants ? 'd-flex' : 'd-none'"
            class="w-100 flex-column position-absolute p-0 m-0"
          >
            <li
              :class="sameVolumes.length ? 'd-flex' : 'd-none'"
              class="text-center p-1"
              v-on:click="setVariant('same')"
            >
              Same box
            </li>
            <li
              :class="upperVolumes.length ? 'd-flex' : 'd-none'"
              class="text-center p-1"
              v-on:click="setVariant('upper')"
            >
              Upper box
            </li>
            <li
              :class="equalsVolumes.length ? 'd-flex' : 'd-none'"
              class="text-center p-1"
              v-on:click="setVariant('equals')"
            >
              Equals boxes
            </li>
            <li
              :class="combineVolumes.length ? 'd-flex' : 'd-none'"
              class="text-center p-1"
              v-on:click="setVariant('combines')"
            >
              Combine boxes
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ThreeJS :variant="variant" :items="items" class="mt-4" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ThreeJS from "./ThreeJS.vue";

export default {
  name: "PackagePlanner",
  components: { ThreeJS },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data: () => ({
    isVariants: false,
    isPersentage: false,
    middles: {
      midH: 0,
      midW: 0,
      midL: 0,
      midWeight: 0,
    },
    maximums: {
      maxH: 0,
      maxW: 0,
      maxL: 0,
      maxWeight: 0,
    },
    variant: null,
    currentItems: [],
    currentBoxes: [],
    persentage: 10,
    totalWeight: 0,
    totalVolume: 0,
    sameVolumes: [],
    upperVolumes: [],
    equalsVolumes: [],
    combineVolumes: [],
  }),
  watch: {
    persentage: function () {
      this.init();
    },
  },
  computed: {
    ...mapGetters({ boxes: "delivery_boxes/boxes" }),
  },
  methods: {
    ...mapActions({ getBoxes: "delivery_boxes/getBoxes" }),
    setVariant: function (variant) {
      const { sameVolumes, upperVolumes, equalsVolumes, combineVolumes } = this;

      switch (variant) {
        case "same":
          this.variant = sameVolumes;
          break;
        case "upper":
          this.variant = upperVolumes;
          break;
        case "equals":
          this.variant = equalsVolumes;
          break;
        case "combine":
          this.variant = combineVolumes;
          break;
      }
    },
    setMaxs: function (item) {
      //set maximal for search box
      const { height, width, lengtt, weight } = item;
      const { maxH, maxW, maxL, maxWeight } = this.maximums;

      if (maxH < height) {
        this.maximums.maxH = height;
      }

      if (maxW < width) {
        this.maximums.maxW = width;
      }

      if (maxL < lengtt) {
        this.maximums.maxL = lengtt;
      }

      if (maxWeight < weight) {
        this.maximums.maxWeight = weight;
      }
    },
    middleSizes: function (items) {
      const result = items.reduce(
        (acc, item) => {
          acc.midH += item.height;
          acc.midW += item.width;
          acc.midL += item.lengtt;
          acc.midWeight += item.weight;

          return acc;
        },
        {
          midH: 0,
          midW: 0,
          midL: 0,
          midWeight: 0,
        }
      );

      const { midH, midW, midL, midWeight } = result;
      const { length } = items;

      this.middles = {
        midH: Math.ceil(midH / length),
        midW: Math.ceil(midW / length),
        midL: Math.ceil(midL / length),
        midWeight: Math.ceil(midWeight / length),
      };
    },
    calculateItemsTotals: function (items) {
      const { totalWeight, totalVolume } = items.reduce(
        (acc, item) => {
          const { totalWeight, totalVolume } = acc;
          const data = {
            totalWeight: totalWeight + item.weight,
            totalVolume: totalVolume + item.volume,
          };
          return data;
        },
        { totalWeight: 0, totalVolume: 0 }
      );

      this.totalWeight = totalWeight;
      this.totalVolume = totalVolume;
    },
    calcPersentage: function (d) {
      const { persentage } = this;
      return (+d / 100) * persentage;
    },
    sortByVolume: function (a, b) {
      if (a.v < b.v) {
        return -1;
      }
      if (a.v > b.v) {
        return 1;
      }
      return 0;
    },
    checkMaximums: function (box) {
      //check if can fit biggest item in box
      const { h, w, l, weight } = box;
      const { maxH, maxW, maxL, maxWeight } = this.maximums;

      const isWeight = weight >= maxWeight;

      const checkValues_lenghtAsHeight = l >= maxH && w >= maxW && h >= maxL;

      if (checkValues_lenghtAsHeight && isWeight) {
        return true;
      }

      const checkValues_widthAsHeight = w >= maxH && h >= maxW && l >= maxL;

      if (checkValues_widthAsHeight && isWeight) {
        return true;
      }

      const checkValue_widthAsLenght = h >= maxH && l >= maxW && w >= maxL;

      if (checkValue_widthAsLenght && isWeight) {
        return true;
      }

      const checkValues_widthAsHeight_heightAsLenght =
        w >= maxH && l >= maxW && h >= maxL;

      if (checkValues_widthAsHeight_heightAsLenght && isWeight) {
        return true;
      }

      const checkValues_lenghtAsHeight_heightAsWidth =
        l >= maxH && h >= maxW && w >= maxL;

      if (checkValues_lenghtAsHeight_heightAsWidth && isWeight) {
        return true;
      }

      const checkValues_same = h >= maxH && w >= maxW && l >= maxL;
      if (checkValues_same && isWeight) {
        return true;
      }
    },
    checkBox: function (box) {
      //checking if the box has same or bigger size
      const { h, w, l, weight } = box;
      const { midH, midW, midL, midWeight } = this.middles;

      const max = Math.max(midH, midW, midL);

      const isH = h >= max;
      const isW = w >= max;
      const isL = l >= max;
      const isWeight = weight >= midWeight;

      return isH && isW && isL && isWeight;
    },
    findBoxes: function () {
      const {
        totalVolume,
        persentage,
        currentBoxes,
        checkBox,
        sortByVolume,
        checkMaximums,
        calcPersentage,
      } = this;

      if (totalVolume === 0) {
        return;
      }

      const sameVolume = currentBoxes.filter(
        (box) =>
          totalVolume < box.v &&
          totalVolume >= box.v - calcPersentage(box.v) &&
          checkMaximums(box)
      );

      const upperVolume = currentBoxes
        .filter(
          (box) =>
            box.v > totalVolume + calcPersentage(box.v) && checkMaximums(box)
        )
        .reverse();

      const { equalsCombines, combines } = findCombineVolumes(
        currentBoxes,
        totalVolume,
        persentage
      );

      if (upperVolume.length) {
        this.upperVolumes = [upperVolume[0]];
      }
      this.sameVolumes = sameVolume;
      this.equalsVolumes = equalsCombines;
      this.combineVolumes = combines;

      return;

      function findCombineVolumes(boxes, totalVolume, persentage = 30) {
        const lessBoxes = boxes
          .filter((box, index) => {
            if (index === 0) {
              return box.v < totalVolume && checkMaximums(box);
            }
            return box.v < totalVolume && checkBox(box);
          })
          .sort((a, b) => sortByVolume(b, a));

        const equalsCombines = [];
        const combines = [];

        if (!lessBoxes.length) {
          return { equalsCombines, combines };
        }

        //find equals boxes combinations for pack
        for (let i = 0; i < lessBoxes.length; i++) {
          if (checkMaximums(lessBoxes[i])) {
            const count = totalVolume / lessBoxes[i].v;
            const rest = +((totalVolume / lessBoxes[i].v) % 1).toFixed(1);
            const isNear = rest + (persentage / 100 - 1);
            //isNear is value that shows that the remainder is close to an integer
            if (rest === 1 || isNear === 0) {
              const boxes = new Array(Math.ceil(count)).fill(lessBoxes[i]);
              equalsCombines.push(boxes);
            }
          }
        }

        //find boxes combinations for pack
        const items = [];
        let currentTotalVolume = totalVolume;

        for (let i = 1; i < lessBoxes.length; i++) {
          if (currentTotalVolume <= 0) {
            break;
          }

          if (i === 1) {
            const vol = lessBoxes[0].v + lessBoxes[1].v;
            items.push(lessBoxes[0]);
            items.push(lessBoxes[1]);
            currentTotalVolume -= vol;
          }

          items.push(lessBoxes[i]);
          currentTotalVolume -= lessBoxes[i].v;
        }

        return {
          equalsCombines: equalsCombines.reverse(),
          combines,
        };
      }
    },
    init: function () {
      this.currentItems = this.items;
      this.currentBoxes = [...this.boxes].sort((a, b) =>
        this.sortByVolume(b, a)
      );

      this.currentItems.map((item) => this.setMaxs(item));

      this.calculateItemsTotals(this.currentItems);
      this.middleSizes(this.currentItems);
      this.findBoxes();

      if (this.sameVolumes.length) {
        this.variant = [this.sameVolumes[0]];
        return;
      }

      if (this.equalsVolumes.length) {
        this.variant = this.equalsVolumes[0];
        return;
      }

      if (this.upperVolumes.length) {
        this.variant = [this.upperVolumes[0]];
        return;
      }

      if (this.combineVolumes.length) {
        this.variant = this.combineVolumes[0];
        return;
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
ul {
  top: 100%;
  z-index: 1;
  border-radius: 5px;
  background-color: white;
}
</style>