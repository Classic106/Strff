<template>
  <div class="d-flex position-relative">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";

import isDarkColor from "is-dark-color";

export default {
  name: "BoxVisual",
  props: {
    box: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    canvas: null,
    renderer: null,
    camera: null,
    scene: null,
    cube: null,
  }),
  watch: {
    box: function () {
      this.addCube();
    },
  },
  methods: {
    isDarkColor,
    resizeRendererToDisplaySize: function () {
      const { renderer } = this;

      this.canvas = renderer.domElement;

      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;

      const needResize =
        this.canvas.width !== width || this.canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    },
    colorParse: function (color) {
      return parseInt(color.replace("#", "0x"), 16);
    },
    init: function () {
      this.canvas = this.$refs.canvas;

      this.camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
      this.camera.position.z = 4;

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
      });

      this.addCube();

      this.scene = new THREE.Scene();
      this.scene.add(this.cube);
    },
    addCube: function () {
      const { width, lengthy, height, color } = this.box;

      const geometry = new THREE.BoxGeometry(width, height, lengthy);
      const colorValue = this.colorParse(color);
      const material = new THREE.MeshBasicMaterial({ color: colorValue });
      this.cube = new THREE.Mesh(geometry, material);

      const isDark = this.isDarkColor(color);

      const geo = new THREE.EdgesGeometry(this.cube.geometry);
      const mat = new THREE.LineBasicMaterial({
        color: isDark ? 0xffffff : 0x000000,
      });
      const wireframe = new THREE.LineSegments(geo, mat);
      this.cube.add(wireframe);
      this.cube.rotation.x += 0.5;
    },
    render: function () {
      this.resizeRendererToDisplaySize();
      requestAnimationFrame(this.render);
      this.cube.rotation.y += 0.005;
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
    this.render();
  },
};
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>