<template>
  <div class="d-flex flex-column">
    <div class="row m-0">
      <div class="col-9 d-flex">
        <div v-if="!deliveries.length">
          <p>Deliveries is not found</p>
        </div>
        <div
          v-else
          v-for="delivery in deliveries"
          :key="delivery.id"
          v-on:click="set_selected_delivery(delivery)"
          class="row w-100 m-0"
        >
          <PreloaderImage
            :img="delivery.logo"
            :alt="delivery.title"
            class="col-3 p-0"
          />
        </div>
      </div>
      <div
        class="col-3 row justify-content-sm-center justify-content-lg-end p-0"
      >
        <div class="d-flex flex-column position-relative">
          <button
            v-on:click="isPersentage = !isPersentage"
            class="btn btn-primary mr-1 mb-1"
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
          <button
            v-on:click="isVariants = !isVariants"
            class="btn btn-primary text-center"
          >
            {{ activeVariant ? activeVariant : "Variants" }}
          </button>
          <ul
            :class="isVariants ? 'd-flex' : 'd-none'"
            class="w-100 flex-column position-absolute p-0 m-0"
          >
            <li
              :class="
                sameVolumes.length && activeVariant !== 'Same'
                  ? 'd-flex'
                  : 'd-none'
              "
              class="justify-content-center p-1"
              v-on:click="setVariant('same')"
            >
              Same box
            </li>
            <li
              :class="
                upperVolumes.length && activeVariant !== 'Upper'
                  ? 'd-flex'
                  : 'd-none'
              "
              class="justify-content-center p-1"
              v-on:click="setVariant('upper')"
            >
              Upper box
            </li>
            <li
              :class="
                equalsVolumes.length && activeVariant !== 'Equals'
                  ? 'd-flex'
                  : 'd-none'
              "
              class="justify-content-center p-1"
              v-on:click="setVariant('equals')"
            >
              Equals boxes
            </li>
            <li
              :class="
                combineVolumes.length && activeVariant !== 'Combines'
                  ? 'd-flex'
                  : 'd-none'
              "
              class="justify-content-center p-1"
              v-on:click="setVariant('combines')"
            >
              Combine boxes
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PlannerVisual :variant="variant" :items="items" class="mt-4 p-2" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { convertSizes } from "~/utils/functions";
// import { delivery_boxes } from "~/static/delivery_boxes_examples";
import PreloaderImage from "~/components/common/PreloaderImage.vue";
import PlannerVisual from "./PlannerVisual.vue";

export default {
  name: "PackagePlanner",
  components: { PlannerVisual, PreloaderImage },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data: () => ({
    isVariants: false,
    activeVariant: "",
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
    boxes: [],
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
    ...mapGetters({
      selected: "admin_delivery/selected",
      deliveries: "admin_delivery/deliveries",
    }),
  },
  methods: {
    convertSizes,
    ...mapActions({
      getBoxes: "admin_delivery/getBoxes",
      getDeliveries: "admin_delivery/getDeliveries",
    }),
    ...mapMutations({
      set_selected_delivery: "admin_delivery/set_selected_delivery",
    }),
    logoUrl: function (delivery) {
      const { logo_url } = delivery;

      if (logo_url) {
        return logo_url;
      } else {
        return;
      }
    },
    setVariant: function (variant) {
      const { sameVolumes, upperVolumes, equalsVolumes, combineVolumes } = this;

      switch (variant) {
        case "same":
          this.activeVariant = "Same";
          this.variant = sameVolumes;
          break;
        case "upper":
          this.activeVariant = "Upper";
          this.variant = upperVolumes;
          break;
        case "equals":
          this.activeVariant = "Equals";
          this.variant = equalsVolumes[0];
          break;
        case "combines":
          this.activeVariant = "Combine";
          this.variant = combineVolumes;
          break;
      }
    },
    setMaxs: function (item) {
      //set maximal for search box
      const { height, width, lengthy, weight } = item;
      const { maxH, maxW, maxL, maxWeight } = this.maximums;

      if (maxH < height) {
        this.maximums.maxH = height;
      }

      if (maxW < width) {
        this.maximums.maxW = width;
      }

      if (maxL < lengthy) {
        this.maximums.maxL = lengthy;
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
          acc.midL += item.lengthy;
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
      if (a.volume < b.volume) {
        return -1;
      }
      if (a.volume > b.volume) {
        return 1;
      }
      return 0;
    },
    checkMaximums: function (box) {
      //check if can fit biggest item in box
      const { height, width, lengthy, weight } = box;
      const { maxH, maxW, maxL, maxWeight } = this.maximums;

      const isWeight = weight >= maxWeight;

      const checkValues_lenghtAsHeight =
        lengthy >= maxH && width >= maxW && height >= maxL;

      if (checkValues_lenghtAsHeight && isWeight) {
        return true;
      }

      const checkValues_widthAsHeight =
        width >= maxH && height >= maxW && lengthy >= maxL;

      if (checkValues_widthAsHeight && isWeight) {
        return true;
      }

      const checkValue_widthAsLenght =
        height >= maxH && lengthy >= maxW && width >= maxL;

      if (checkValue_widthAsLenght && isWeight) {
        return true;
      }

      const checkValues_widthAsHeight_heightAsLenght =
        width >= maxH && lengthy >= maxW && height >= maxL;

      if (checkValues_widthAsHeight_heightAsLenght && isWeight) {
        return true;
      }

      const checkValues_lenghtAsHeight_heightAsWidth =
        lengthy >= maxH && height >= maxW && width >= maxL;

      if (checkValues_lenghtAsHeight_heightAsWidth && isWeight) {
        return true;
      }

      const checkValues_same =
        height >= maxH && width >= maxW && lengthy >= maxL;
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
          totalVolume < box.volume &&
          totalVolume >= box.volume - calcPersentage(box.volume) &&
          checkMaximums(box)
      );

      const upperVolume = currentBoxes
        .filter(
          (box) =>
            box.volume > totalVolume + calcPersentage(box.volume) &&
            checkMaximums(box)
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
          combines: items,
        };
      }
    },
    init: function () {
      this.currentItems = [...this.items].map((item) => {
        const box = this.convertSizes(item);
        this.setMaxs(box);
        return item;
      });

      if (this.deliveries.length) {
        this.currentBoxes = [...this.deliveries[0].boxes]
          // this.currentBoxes = [...delivery_boxes]
          .map((box) => this.convertSizes(box))
          .sort((a, b) => this.sortByVolume(b, a));
      }

      this.calculateItemsTotals(this.currentItems);
      this.middleSizes(this.currentItems);
      this.findBoxes();

      if (this.sameVolumes.length) {
        this.setVariant("same");
        return;
      }

      if (this.equalsVolumes.length) {
        this.setVariant("equals");
        return;
      }

      if (this.upperVolumes.length) {
        this.setVariant("upper");
        return;
      }

      if (this.combineVolumes.length) {
        this.setVariant("combines");
        return;
      }
    },
  },
  async mounted() {
    if (!this.deliveries.length) {
      await this.getDeliveries();
    }
    await this.init();
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