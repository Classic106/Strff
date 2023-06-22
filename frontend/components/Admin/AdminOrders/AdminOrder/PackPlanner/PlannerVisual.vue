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
    variant: [Object, Array],
    items: Array,
  },
  components: { Items },
  data: () => ({
    autoPack: false,
    nextItem: false,
    packedItems: [],
    currentItems: [],
    boxFilled: [],
    ManageBoxes: null,
  }),
  watch: {
    autoPack: function () {
      this.ManageBoxes.clearAllPacks();

      if (this.autoPack) {
        this.packItems();
      } else {
        this.reset();
      }
    },
    nextItem: function () {
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
      this.currentItems = [...this.items];
      this.clearAllItems();
      this.initBoxes();
      if (this.autoPack) {
        this.packItems();
      }
    },
    items: function () {
      this.packItems();
    },
  },
  methods: {
    clearAllItems: function () {
      const { ManageBoxes } = this;
      ManageBoxes.clearAllPacks();
      ManageBoxes.clearAllBoxes();
      this.boxFilled = [];
    },
    packBox: function (boxUuid) {
      const { itemForArea, currentItems } = this;

      if (!currentItems.length) {
        return;
      }
      const { volume, height } = this.ManageBoxes.boxesData[boxUuid];

      const widthAreas = this.findWidthSquare(volume);
      const lengthAreas = this.findLengthSquare(volume);
      const current_items_length = this.currentItems.length;

      const width_result = itemInArea(widthAreas);
      const length_result = itemInArea(lengthAreas);

      if (width_result && length_result) {
        const {
          area: width_area,
          cube: width_cube,
          item_index: width_item_index,
        } = width_result;
        const {
          area: length_area,
          cube: length_cube,
          item_index: length_item_index,
        } = length_result;

        const width_value = width_area.value;
        const length_value = length_area.value;

        if (width_value < length_value) {
          this.currentItems.splice(length_item_index, 1);
          this.ManageBoxes.addPack(length_cube, length_area, boxUuid);
        } else {
          this.currentItems.splice(width_item_index, 1);
          this.ManageBoxes.addPack(width_cube, width_area, boxUuid);
        }
      } else if (width_result) {
        const { area, cube, item_index } = width_result;

        this.currentItems.splice(item_index, 1);
        this.ManageBoxes.addPack(cube, area, boxUuid);
      } else if (length_result) {
        const { area, cube, item_index } = length_result;

        this.currentItems.splice(item_index, 1);
        this.ManageBoxes.addPack(cube, area, boxUuid);
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

      function itemInArea(areas) {
        const free_areas = [];

        areas
          .filter((area) => area.value < height)
          .map((area) => {
            const { value, rowIndex, rowCount, columnIndex, columnCount } =
              area;
            const result = areas.filter((a) => {
              return (
                a.value === value &&
                a.rowIndex === rowIndex &&
                a.rowCount === rowCount &&
                a.columnIndex === columnIndex &&
                a.columnCount === columnCount
              );
            });

            if (!result.length) {
              free_areas.push(area);
            }
          });

        free_areas.sort((a, b) => {
          const { value: val_A, columnCount: colC_A, rowCount: rowC_A } = a;
          const { value: val_B, columnCount: colC_B, rowCount: rowC_B } = b;

          const square_A = colC_A * rowC_A;
          const square_B = colC_B * rowC_B;

          if (val_A < val_B && square_A < square_B) {
            return -1;
          } else if (val_A > val_B && square_A > square_B) {
            return 1;
          } else {
            if (square_A < square_B) {
              return -1;
            } else if (square_A > square_B) {
              return 1;
            } else {
              return 0;
            }
          }
        });

        let data = null;

        for (let i = 0; i < areas.length; i++) {
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
      }
    },
    packItems: function () {
      const { ManageBoxes } = this;

      for (const [key, value] of Object.entries(ManageBoxes.boxesData)) {
        if (!this.currentItems.length) {
          break;
        }
        this.packBox(key);
      }
    },
    itemForArea: function (item, area, boxHeight) {
      const { width, lengthy, height, color } = item;
      const { value, rowCount, columnCount } = area;
      const { ws, ls, hs } = this.ManageBoxes.scaleSizes(
        width,
        lengthy,
        height
      );

      const areaLenght = columnCount + 1;
      const areaWidth = rowCount + 1;

      const checkValues_lenghtAsHeight =
        value + ls <= boxHeight && areaLenght >= hs && areaWidth >= ws;

      if (checkValues_lenghtAsHeight) {
        return { w: ws, l: hs, h: ls, color };
      }

      const checkValues_widthAsHeight =
        value + ws <= boxHeight && areaLenght >= ls && areaWidth >= hs;

      if (checkValues_widthAsHeight) {
        return { w: hs, l: ls, h: ws, color };
      }

      const checkValue_widthAsLenght =
        value + hs <= boxHeight && areaLenght >= ws && areaWidth >= ls;

      if (checkValue_widthAsLenght) {
        return { w: ls, l: ws, h: hs, color };
      }

      const checkValues_widthAsHeight_heightAsLenght =
        value + ws <= boxHeight && areaLenght >= hs && areaWidth >= ls;

      if (checkValues_widthAsHeight_heightAsLenght) {
        return { w: ls, l: hs, h: ws, color };
      }

      const checkValues_lenghtAsHeight_heightAsWidth =
        value + ls <= boxHeight && areaLenght >= ws && areaWidth >= hs;

      if (checkValues_lenghtAsHeight_heightAsWidth) {
        return { w: hs, l: ws, h: ls, color };
      }

      const checkValues_same =
        value + hs <= boxHeight && areaLenght >= ls && areaWidth >= ws;

      if (checkValues_same) {
        return { w: ws, l: ls, h: hs, color };
      }

      return null;
    },
    findLengthSquare: function (box) {
      const squares = [];
      let temp = {
        value: 0,
        rowCount: 0,
        rowIndex: 0,
        columnCount: 0,
        columnIndex: 0,
      };
      const columns = [];

      for (let i = 0; i < box[0].length; i++) {
        for (let j = 1; j < box.length; j++) {
          const colValPr = box[j - 1][i];
          const colValNext = box[j][i];

          if (colValPr === colValNext) {
            temp.value = colValNext;
            temp.columnCount++;
            temp.rowIndex = i;

            if (!columns.length) {
              columns.push({ ...temp });
            } else {
              columns[columns.length - 1].columnCount++;
            }
          } else {
            temp.value = colValNext;
            temp.rowIndex = i;
            temp.columnCount = 0;
            temp.columnIndex = j;

            columns.push({ ...temp });
          }
        }

        if (!squares.length && columns.length) {
          columns.map((column) => squares.push(column));

          columns.length = 0;
          temp.columnCount = 0;
          temp.columnIndex = 0;
          continue;
        }

        if (squares.length) {
          columns.map((column) => {
            const index = squares.findIndex((sq) => {
              const { value, rowIndex, rowCount, columnIndex, columnCount } =
                sq;

              const isValue = value === column.value;
              const isColumn = columnIndex === column.columnIndex;
              const isColumnCount = columnCount === column.columnCount;
              const isRow =
                rowIndex + rowCount + 1 === column.rowIndex ||
                rowIndex === column.rowIndex;

              return isValue && isColumnCount && isRow && isColumn;
            });

            if (index !== -1) {
              squares[index].rowCount++;
            } else {
              squares.push(column);
            }
          });
        }
        columns.length = 0;
        temp.columnCount = 0;
        temp.columnIndex = 0;
      }

      return squares;
    },
    findWidthSquare: function (box) {
      const squares = [];
      let temp = {
        value: 0,
        rowCount: 0,
        rowIndex: 0,
        columnCount: 0,
        columnIndex: 0,
      };
      const lines = [];

      for (let i = 0; i < box.length; i++) {
        for (let j = 1; j < box[i].length; j++) {
          const valuePr = box[i][j - 1];
          const valueNext = box[i][j];

          if (valuePr === valueNext) {
            temp.rowCount++;
            temp.value = valueNext;
            temp.columnIndex = i;

            if (!lines.length) {
              lines.push({ ...temp });
            } else {
              lines[lines.length - 1].rowCount++;
            }
          } else {
            temp.rowCount = 0;
            temp.value = valueNext;
            temp.rowIndex = j;
            temp.columnIndex = i;

            lines.push({ ...temp });
          }
        }

        if (!squares.length && lines.length) {
          lines.map((line) => squares.push(line));
          temp = {
            value: 0,
            rowCount: 0,
            rowIndex: 0,
            columnCount: 0,
            columnIndex: 0,
          };
          lines.length = 0;
          continue;
        }

        if (squares.length) {
          lines.map((line) => {
            const index = squares.findIndex((sq) => {
              const { value, rowIndex, rowCount, columnIndex, columnCount } =
                sq;

              const isValue = value === line.value;
              const isRow = rowIndex === line.rowIndex;
              const isRowCount = rowCount === line.rowCount;
              const isColumn =
                columnIndex + columnCount + 1 === line.columnIndex ||
                columnIndex === line.columnIndex;

              return isValue && isRowCount && isRow && isColumn;
            });

            if (index !== -1) {
              squares[index].columnCount++;
            } else {
              squares.push(line);
            }
          });
        }

        lines.length = 0;
        temp = {
          value: 0,
          rowCount: 0,
          rowIndex: 0,
          columnCount: 0,
          columnIndex: 0,
        };
      }

      return squares;
    },
    initPackedItems: function () {
      const ids = this.currentItems.map(({ id }) => id);

      this.packedItems = [...this.items].map((item) => {
        const { id } = item;
        const isExist = ids.includes(id);

        item.packed = !isExist;

        return item;
      });
    },
    initBoxes: function () {
      if (!this.variant) {
        return;
      }

      if (!Array.isArray(this.variant)) {
        this.ManageBoxes.addBox(this.variant);
      } else {
        this.variant.map((v, index) => this.ManageBoxes.addBox(v, index));
      }
    },
    reset: function () {
      this.ManageBoxes.clearAllBoxesData();
      this.ManageBoxes.clearAllPacks();
      this.packedItems = [];
      this.currentItems = [...this.items];
    },
  },
  mounted() {
    const { $refs } = this;
    this.ManageBoxes = new ManageBoxes($refs.canvas, $refs.view1);
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