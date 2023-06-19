<template>
  <div>
    <div class="row m-0">
      <div class="d-flex col-10 position-relative mb-4 pr-2 p-0">
        <canvas ref="canvas"></canvas>
        <div class="split">
          <div ref="view1"></div>
        </div>
      </div>
      <div class="col-2 p-0 pr-2">
        <Items :items="packedItems" />
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button
        class="btn mr-1"
        :class="autoPack ? 'btn-primary' : 'btn-danger'"
        v-on:click="autoPack = !autoPack"
      >
        Auto pack
      </button>
      <button
        class="btn btn-warning mr-1"
        :disabled="autoPack"
        v-on:click="reset"
      >
        Reset
      </button>
      <button
        class="btn btn-primary"
        :disabled="autoPack"
        v-on:click="nextItem = !nextItem"
      >
        Next item
      </button>
    </div>
  </div>
</template>

<script>
import ManageBoxes from "./ManageBoxes";
import Items from "./Items.vue";

export default {
  name: "PlannerVisual",
  props: {
    variant: [Object, Array, null],
    items: Array,
  },
  components: { Items },
  data: () => ({
    autoPack: true,
    nextItem: false,
    packedItems: [],
    currentItems: [],
    copiedItems: [],
    boxFilled: [],
    ManageBoxes: null,
  }),
  watch: {
    autoPack: function () {
      if (this.autoPack) {
        this.packItems();
      } else {
        this.reset();
      }
    },
    nextItem: function () {
      if (!this.ManageBoxes) {
        return;
      }

      if (this.ManageBoxes.boxUuids.length) {
        const boxes = [...this.ManageBoxes.boxUuids].filter(
          (box) => !this.boxFilled.includes(box)
        );

        if (boxes.length) {
          this.packBox(boxes[0]);
        }
      } else {
        this.packBox(this.ManageBoxes.boxUuids[0]);
      }
      this.initPackedItems();
    },
    currentItems: {
      handler() {
        this.initPackedItems();
      },
      deep: true,
    },
    variant: function () {
      this.initAll();
      if (this.autoPack) {
        this.packItems();
      }
    },
    items: function () {
      this.initAll();
      if (this.autoPack) {
        this.packItems();
      }
    },
  },
  methods: {
    clearAllItems: function () {
      const { ManageBoxes } = this;
      if (!ManageBoxes) {
        return;
      }
      ManageBoxes.clearAllPacks();
      ManageBoxes.clearAllBoxes();
      this.boxFilled = [];
    },
    add_Pack: function (boxUuid, obj) {
      if (this.ManageBoxes && obj) {
        const { area, cube, item_index } = obj;

        this.currentItems.splice(item_index, 1);
        this.ManageBoxes.addPack(cube, area, boxUuid);
      }
    },
    packBox: function (boxUuid) {
      if (!this.ManageBoxes) {
        return;
      }

      const { findAreas, currentItems } = this;

      if (!currentItems.length) {
        return;
      }

      const { volume, height } = this.ManageBoxes.boxesData[boxUuid];
      const current_items_length = this.currentItems.length;

      const areas = findAreas(volume)
        .filter(({ value }) => value < height)
        .sort((a, b) => {
          const square_A = a.length * a.width;
          const square_B = b.length * b.width;

          if (square_A > square_B) {
            return -1;
          } else if (square_A > square_B) {
            return 1;
          }
          return 0;
        })
        .sort((a, b) => {
          const val_A = a.value;
          const val_B = b.value;

          if (val_A < val_B) {
            return -1;
          } else if (val_A > val_B) {
            return 1;
          }
          return 0;
        });

      const data = this.findPack(areas, height);

      if (data) {
        this.add_Pack(boxUuid, data);
      }

      if (
        this.currentItems.length &&
        this.currentItems.length === current_items_length
      ) {
        if (!this.autoPack && this.ManageBoxes.boxUuids.length) {
          this.nextItem = !this.nextItem;
        }

        this.boxFilled.push(boxUuid);
        return;
      }

      if (this.autoPack) {
        if (
          this.currentItems.length &&
          this.currentItems.length < current_items_length
        ) {
          this.packBox(boxUuid);
          return;
        }
      }
    },
    packItems: function () {
      if (!this.ManageBoxes) {
        return;
      }

      for (const [key, value] of Object.entries(this.ManageBoxes.boxesData)) {
        if (!this.currentItems.length) {
          break;
        }
        this.packBox(key);
      }
    },
    findPack: function (areas, height) {
      const { currentItems, itemForArea } = this;

      let data = null;

      for (let i = 0; i < areas.length && !data; i++) {
        if (!currentItems.length) {
          break;
        }

        for (let j = 0; j < currentItems.length; j++) {
          const item = currentItems[j];
          const area = areas[i];
          const cube = itemForArea(item, area, height);

          if (cube) {
            data = { cube, item_index: j, area };
            break;
          }
        }
      }

      return data;
    },
    itemForArea: function (pack, area, boxHeight) {
      if (!this.ManageBoxes) {
        return;
      }

      const { value, width, length } = area;
      const { w, l, h } = pack;

      const checkValues_lenghtAsHeight =
        value + l <= boxHeight && length >= h && width >= w;

      if (checkValues_lenghtAsHeight) {
        return { ...pack, w, l: h, h: l };
      }

      const checkValues_widthAsHeight =
        value + w <= boxHeight && length >= l && width >= h;

      if (checkValues_widthAsHeight) {
        return { ...pack, w: h, l, h: w };
      }

      const checkValue_widthAsLenght =
        value + h <= boxHeight && length >= w && width >= l;

      if (checkValue_widthAsLenght) {
        return { ...pack, w: l, l: w, h };
      }

      const checkValues_widthAsHeight_heightAsLenght =
        value + w <= boxHeight && length >= h && width >= l;

      if (checkValues_widthAsHeight_heightAsLenght) {
        return { ...pack, w: l, l: h, h: w };
      }

      const checkValues_lenghtAsHeight_heightAsWidth =
        value + l <= boxHeight && length >= w && width >= h;

      if (checkValues_lenghtAsHeight_heightAsWidth) {
        return { ...pack, w: h, l: w, h: l };
      }

      const checkValues_same =
        value + h <= boxHeight && length >= l && width >= w;

      if (checkValues_same) {
        return pack;
      }

      return null;
    },
    findAreas: function (arr) {
      const planes = [];

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          const currentValue = arr[i][j];
          let width = 1;
          let length = 1;

          while (
            j + width < arr[i].length &&
            arr[i][j + width] === currentValue
          ) {
            width++;
          }

          while (
            i + length < arr.length &&
            arr.slice(i, i + length + 1).every((row) => row[j] === currentValue)
          ) {
            length++;
          }

          const planeHasEqualValues = arr
            .slice(i, i + length)
            .every((row) =>
              row.slice(j, j + width).every((value) => value === currentValue)
            );

          if (planeHasEqualValues) {
            planes.push({
              topLeft: [i, j],
              bottomRight: [i + length - 1, j + width - 1],
              width,
              length,
              value: arr[i][j],
            });
          }
        }
      }

      const squares = planes.reduce((acc, item) => {
        const { topLeft, bottomRight } = item;
        const [b_l, b_w] = bottomRight;
        const [t_l, t_w] = topLeft;

        const index = acc.findIndex(({ topLeft, bottomRight, value }) => {
          const [l_b, w_b] = bottomRight;
          const [l_t, w_t] = topLeft;

          const isValue = item.value === value;
          const w = t_w >= w_t && t_w <= w_b;
          const l = t_l >= l_t && t_l <= l_b;
          const isBottom = w_b === b_w && l_b === b_l;

          return isValue && w && l && isBottom;
        });

        if (index !== -1) {
          const { topLeft } = acc[index];

          const [w, l] = topLeft;

          if (t_w > w) {
            acc[index].topLeft[0] = w;
          }

          if (t_l > l) {
            acc[index].topLeft[1] = l;
          }
        } else {
          acc.push(item);
        }

        return acc;
      }, []);

      return squares;
    },
    initPackedItems: function () {
      const ids = this.currentItems.map(({ id }) => id);

      this.packedItems = [...this.copiedItems].map((item) => {
        const { id } = item;
        const isExist = ids.includes(id);

        item.packed = !isExist;

        return item;
      });
    },
    initBoxes: function () {
      if (!this.variant || !this.ManageBoxes) {
        return;
      }

      if (!Array.isArray(this.variant)) {
        this.ManageBoxes.addBox(this.variant);
      } else {
        this.variant.map((v, index) => {
          if (this.ManageBoxes) {
            this.ManageBoxes.addBox(v, index);
          }
        });
      }
    },
    initAll: function () {
      this.copiedItems = [...this.items]
        .sort(this.ManageBoxes?.sortByVolume)
        .map((pack) => {
          if (this.ManageBoxes) {
            return this.ManageBoxes.initPack(pack);
          }
          return pack;
        });
      this.currentItems = [...this.copiedItems];

      this.ManageBoxes?.clearAllBoxes();
      this.clearAllItems();

      this.initBoxes();
    },
    reset: function () {
      if (this.ManageBoxes) {
        this.ManageBoxes.clearAllPacks();
        this.packedItems = [];
        this.boxFilled = [];
        this.currentItems = [...this.copiedItems]
          .sort(this.ManageBoxes?.sortByVolume)
          .map((pack) => {
            if (this.ManageBoxes) {
              return this.ManageBoxes.initPack(pack);
            }
            return pack;
          });
      }
    },
  },
  mounted() {
    const { $refs } = this;
    const { canvas, view1 } = $refs;

    if (canvas && view1) {
      this.ManageBoxes = new ManageBoxes($refs.canvas, $refs.view1);
    }
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 50vh;
  display: block;
}

.split {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.split > div {
  width: 100%;
  height: 100%;
}
</style>