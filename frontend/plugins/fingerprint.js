import Vue from "vue";
import fingerprint from "browser-fingerprint";

Vue.mixin({
  methods: {
    fingerprint,
  },
});
