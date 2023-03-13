<template>
  <form
    id="delivery_form"
    ref="form"
    v-on:submit.prevent="submit"
    class="was-validated d-flex flex-column"
  >
    <div class="mb-2">
      <label class="d-flex" for="title"> Title </label>
      <input
        id="title"
        type="text"
        placeholder="Enter title"
        v-model.trim="form.title"
        required
        pattern="^[a-zA-Z\s.,-:]{10,100}$"
        autofocus="true"
        class="form-control w-100"
      />
      <div class="invalid-feedback">
        <div class="d-flex align-items-center">
          Title must be from 10 to 100 symbols and may contain &nbsp;
          <h6>. , - :</h6>
        </div>
      </div>
    </div>
    <DeliveryMedia
      :delivery="form"
      v-on:setFile="setFile"
      v-on:setLogo="setLogo"
    />
    <BoxesBlock class="mb-2" v-on:setBoxes="setBoxes" />
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UploadImages from "vue-upload-drop-images";

import DeliveryMedia from "./DeliveryMedia.vue";
import BoxesBlock from "./BoxesBlock.vue";

export default {
  name: "DeliveryForm",
  components: { DeliveryMedia, BoxesBlock, UploadImages },
  data: () => ({
    show: false,
    isLogo_url: true,
    form: {
      title: "",
      logo: null,
      file: null,
      boxes: [],
    },
    settings: {
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
  methods: {
    ...mapActions({
      setDelivery: "admin_delivery/setDelivery",
      updateDelivery: "admin_delivery/updateDelivery",
    }),
    setFile: function (file) {
      this.form.file = file;
    },
    setLogo: function (logo) {
      this.form.logo = logo;
    },
    setBoxes: function (boxes) {
      this.form.boxes = boxes.map((box) => box.id);
    },
    submit: function () {
      const { selectedDelivery, form } = this;

      if (selectedDelivery) {
        this.updateDelivery(form);
      } else {
        this.setDelivery(form);
      }
    },
  },
  mounted() {
    const { selectedDelivery } = this;

    if (selectedDelivery) {
      this.form = { ...selectedDelivery };
    }
  },
};
</script>

<style scoped>
.scroll {
  height: 45vh;
}
</style>