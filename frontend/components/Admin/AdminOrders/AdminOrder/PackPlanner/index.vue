<template>
  <div class="">
    <div class="d-flex">
      <div class="d-flex flex-column">
        <button
          v-on:click="open.sameVolume = !open.sameVolume"
          class="btn btn-primary"
        >
          Same Volume
        </button>
        <ul class="flex-column" :class="open.sameVolume ? 'd-flex ' : 'd-none'">
          <li v-for="same in sameVolume" :key="same.id" class="m-0">
            {{ same.v }}
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column">
        <button
          v-on:click="open.upperVolume = !open.upperVolume"
          class="btn btn-primary"
        >
          Upper Volumes
        </button>
        <ul
          class="flex-column"
          :class="open.upperVolume ? 'd-flex ' : 'd-none'"
        >
          <li v-for="upper in upperVolume" :key="upper.id" class="m-0">
            {{ upper.v }}
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column">
        <button
          v-on:click="open.equalsVolumes = !open.equalsVolumes"
          class="btn btn-primary"
        >
          Equals Volumes
        </button>
        <ul
          class="flex-column"
          :class="open.equalsVolumes ? 'd-flex ' : 'd-none'"
        >
          <li v-for="equal in equalsVolumes" :key="equal.id" class="m-0">
            {{ equal }}
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column">
        <button
          v-on:click="open.combineVolumes = !open.combineVolumes"
          class="btn btn-primary"
        >
          Combine Volumes
        </button>
        <ul
          class="flex-column"
          :class="open.combineVolumes ? 'd-flex ' : 'd-none'"
        >
          <li v-for="combine in combineVolumes" :key="combine.id" class="m-0">
            {{ combine }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PackagePlanner",
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data: () => ({
    open: {
      sameVolume: false,
      upperVolume: false,
      equalsVolumes: false,
      combineVolumes: false,
    },
    minimums: {
      minH: 999,
      minW: 999,
      minL: 999,
      minWeight: 99999,
    },
    currentItems: [],
    currentBoxes: [],
    persentage: 10,
    totalWeight: 0,
    totalVolume: 0,
    sameVolume: [],
    upperVolume: [],
    equalsVolumes: [],
    combineVolumes: [],
  }),
  computed: {
    ...mapGetters({ boxes: "delivery_boxes/boxes" }),
  },
  methods: {
    ...mapActions({ setBox: "delivery_boxes/setBox" }),
    setMins: function (item) {
      //set minimal for search box
      const { height, width, lengtt, weight } = item;
      const { minH, minW, minL, minWeight } = this.minimums;

      if (minH > height) {
        this.minimums.minH = height;
      }

      if (minW > width) {
        this.minimums.minW = width;
      }

      if (minL > lengtt) {
        this.minimums.minL = lengtt;
      }

      if (minWeight > weight) {
        this.minimums.minWeight = weight;
      }
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
    checkBox: function (box) {
      //checking if the box has same or bigger size
      const { h, w, l, v, weight } = box;
      const { minH, minW, minL, minWeight } = this.minimums;
      const { totalVolume, calcPersentage } = this;

      const isSameVolume =
        v <= totalVolume + calcPersentage(v) && v >= totalVolume;
      const isUpperVolume = v + calcPersentage(v) > totalVolume;
      const isMinH = h >= minH;
      const isMinW = w >= minW;
      const isMinL = l >= minL;
      const isWeight = weight >= minWeight;

      return {
        isSameVolume: isSameVolume && isMinH && isMinW && isMinL && isWeight,
        isUpperVolume: isUpperVolume && isMinH && isMinW && isMinL && isWeight,
      };
    },
    findBoxes: function () {
      const { totalVolume, currentBoxes, checkBox } = this;
      if (totalVolume === 0) {
        return;
      }
      //find same or upper volume boxes
      const { sameVolume, upperVolume } = currentBoxes.reduce(
        (acc, box) => {
          const { isSameVolume, isUpperVolume } = checkBox(box);

          if (isSameVolume) {
            acc.sameVolume.push(box);
          }
          if (isUpperVolume) {
            acc.upperVolume.push(box);
          }

          return acc;
        },
        {
          sameVolume: [],
          upperVolume: [],
        }
      );

      sameVolume.sort((a, b) => sortByVolume(a, b));
      upperVolume.sort((a, b) => sortByVolume(a, b));

      const { equalsCombines, combines } = findCombineVolumes(
        currentBoxes,
        totalVolume
      );

      this.sameVolume = sameVolume;
      this.upperVolume = upperVolume;
      this.equalsVolumes = equalsCombines;
      this.combineVolumes = combines;

      return;

      function sortByVolume(a, b) {
        if (a.v < b.v) {
          return -1;
        }
        if (a.v > b.v) {
          return 1;
        }
        return 0;
      }

      function findCombineVolumes(boxes, totalVolume) {
        const lessBoxes = boxes
          .filter((val) => val.v < totalVolume)
          .sort((a, b) => sortByVolume(b, a));

        const equalsCombines = [];
        const combines = [];

        if (!lessBoxes.length || lessBoxes.length === 1) {
          return { equalsCombines, combines };
        }

        //find equals boxes combinations for pack
        for (let i = 0; i < lessBoxes.length; i++) {
          const { isSameVolume, isUpperVolume } = checkBox(lessBoxes[i]);

          if (true || isSameVolume || isUpperVolume) {
            const val = totalVolume / lessBoxes[i].v;
            const count = val % 1 >= 0.8 ? Math.ceil(val) : Math.floor(val);

            if (count >= 2 && count < 6) {
              const boxes = new Array(count).fill(lessBoxes[i]);
              equalsCombines.push(boxes);
            }
          }
        }

        //find boxes combinations for pack
        const items = [];
        let currentTotalVolume = totalVolume;

        for (let i = 0; i < lessBoxes.length; i++) {
          const { isSameVolume, isUpperVolume } = checkBox(lessBoxes[i]);

          if (currentTotalVolume <= 0) {
            break;
          }

          if (i === 0 /*&& isSameVolume && isUpperVolume*/) {
            items.push(lessBoxes[i]);
            currentTotalVolume -= lessBoxes[i].v;
          }

          for (let j = 0; 0 < currentTotalVolume; j++) {
            if (isSameVolume || isUpperVolume) {
              currentTotalVolume -= lessBoxes[i].v;
              items.push(lessBoxes[i]);
            }
            break;
          }
        }

        if (items.length >= 2) {
          combines.push(items);
        }

        return { equalsCombines, combines };
      }
    },
  },
  mounted() {
    this.currentItems = this.items;
    this.currentBoxes = this.boxes;

    this.currentItems.map((item) => this.setMins(item));
    this.calculateItemsTotals(this.currentItems);

    this.findBoxes();
  },
};
</script>

<style scoped>
</style>