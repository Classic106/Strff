<template>
  <div v-if="this.product !== null">
    <div
      class="
        m-6
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-2
        gap-4
        mt-8
      "
    >
      <div class="rounded-t-lg pt-2 pb-2">
        <img :src="`${getStrapiMedia(product.image.url)}`" class="m-auto" />
      </div>
      <div class="w-full p-5 flex flex-col justify-between">
        <div>
          <h4
            class="
              mt-1
              font-semibold
              text-lg
              leading-tight
              truncate
              text-gray-700
            "
          >
            {{ product.title }} - ${{ product.price | formatNumber }} / LB
          </h4>
          <div class="mt-1 items-baseline text-gray-600">
            {{ product.description }}
          </div>
          <div class="flex items-baseline mt-1 mb-6 space-y-4">
            <fieldset>
              <div class="space-x-2 flex">
                <div v-for="size in sizes" :key="size.id">
                  <label
                    :class="
                      (size.id == selected.sizeId ? `border-indigo-500` : ``) +
                      ` border group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer`
                    "
                  >
                    <input
                      type="radio"
                      name="size-choice"
                      value="LG"
                      class="sr-only"
                      aria-labelledby="size-choice-2-label"
                      v-on:click="selectOption($event, size)"
                    />
                    <p id="size-choice-2-label">
                      {{ size.title }}<br />${{
                        (product.price + size.price) | formatNumber
                      }}
                    </p>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <div class="flex items-center">
                <input
                  type="text"
                  class="
                    relative
                    w-full
                    bg-white
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    pl-3
                    pr-10
                    py-2
                    text-left
                    cursor-default
                    focus:outline-none
                    focus:ring-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    sm:text-sm
                  "
                  aria-haspopup="listbox"
                  aria-expanded="true"
                  aria-labelledby="listbox-label"
                  placeholder="Quantity"
                  v-model="selected.quantity"
                />
              </div>
            </fieldset>
            <fieldset>
              <div
                class="mt-4 space-y-4"
                v-for="purchaseType in purchaseTypes"
                :key="purchaseType.title"
              >
                <div class="flex items-center">
                  <input
                    name="push-notifications"
                    type="radio"
                    class="
                      focus:ring-indigo-500
                      h-4
                      w-4
                      text-indigo-600
                      border-gray-300
                    "
                    :value="purchaseType.id"
                    v-model="selected.purchaseTypeId"
                  />
                  <label
                    for="push-email"
                    class="ml-3 block text-sm font-medium text-gray-700"
                  >
                    {{ purchaseType.title }}
                    <p
                      class="text-sm text-gray-500 mt-1"
                      v-if="purchaseType.description"
                    >
                      {{ purchaseType.description }}
                    </p>
                  </label>
                </div>
                <div
                  class="mt-1 relative"
                  v-if="purchaseType.subscription_types.length"
                >
                  <select
                    class="
                      relative
                      w-full
                      bg-white
                      border border-gray-300
                      rounded-md
                      shadow-sm
                      text-left
                      cursor-default
                      focus:outline-none
                      focus:ring-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      sm:text-sm
                    "
                    v-model="selected.subscriptionTypeId"
                    :disabled="purchaseType.id != selected.purchaseTypeId"
                  >
                    <option
                      :value="subscriptionType.id"
                      v-for="subscriptionType in purchaseType.subscription_types"
                      :key="subscriptionType.title"
                    >
                      {{ subscriptionType.title }}
                    </option>
                  </select>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <button
          v-if="product.status === 'published'"
          class="
            mt-4
            bg-white
            border border-gray-200
            d
            hover:shadow-lg
            text-gray-700
            font-semibold
            py-2
            px-4
            rounded
            shadow
          "
          v-on:click="addToCart($event)"
        >
          Add to cart
        </button>

        <div class="text-center mr-10 mb-1" v-else>
          <div
            class="
              p-2
              bg-indigo-800
              items-center
              text-indigo-100
              leading-none
              lg:rounded-full
              flex
              lg:inline-flex
            "
            role="alert"
          >
            <span
              class="
                flex
                rounded-full
                bg-indigo-500
                uppercase
                px-2
                py-1
                text-xs
                font-bold
                mr-3
              "
              >Coming soon...</span
            >
            <span class="font-semibold mr-2 text-left flex-auto"
              >This article is not available yet.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    {{ error }}
  </div>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";
//import Vue from 'vue'
import "~/utils/filters";

export default {
  layout: "products",
  data() {
    return {
      product: null,
      sizes: null,
      purchaseTypes: null,
      options: [],
      error: null,
      selected: {
        productId: 0,
        sizeId: 0,
        quantity: null,
        purchaseTypeId: 0,
        subscriptionTypeId: 0,
      },
    };
  },
  async mounted() {
    try {
      this.product = await this.$strapi.findOne(
        "products",
        this.$route.params.id
      );
      this.sizes = await this.$strapi.find("sizes");
      this.purchaseTypes = await this.$strapi.find("purchase-types");
      this.selected.productId = this.product.id;
    } catch (error) {
      this.error = error;
    }
  },
  computed: {},
  methods: {
    selectOption: function (event, item) {
      this.selected.sizeId = item.id;
    },
    addToCart: async function (event) {
      this.$store.dispatch("cart/add", this.selected);
    },
    getStrapiMedia,
  },
};
</script>

<style scoped>
select {
  margin: 5px 0;
  width: 100%;
  padding: 7px 20px 7px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 38px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 50px !important;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAuJAAALiQE3ycutAAAAB3RJTUUH4wgMBjct9/e3BgAAA0ZJREFUeNrt3M2LTXEcx/H3eBgmT5OHSEwmE+WpZoqijKLMgjwUCxZSsmAhCxZSsrOxkD9B2VrYWFCURFEUpUxEZKJpjCSZGfdaHFNjzP3euebOfTjn/aqzmnvPnO/n+5uZe77nnAFJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ2dMC3AG6gYvGMaapwDXgDXAdaExTcYNAfsR2037/0/y3ozJ6mJbito0qbHi7Zd8BmA68L5BRKiwrUFweuJ3x5s8AegpkM5SmQq8Ei+BuRpvfBHwCcgVy2ZO2gq8Gi+B+xpo/C+gNmr8vrYVfDhbBw4w0fw7QFzR/V9oDuBQsgscprrsBmAf0B83vysqvwIvBInia0prnA9+Curdn7UPQ+SCM5ymrdSHwPai3M6unQWeDUF6mpMbFwI+gzi1ZH4ScDsJ5Vee1LQV+BvVtQgCcDEJ6DUypw5qWAwNBXR22/W/Hg7DekczL68UKkkleoXo22O6xHQ1C+0AyN691K4PTvDywxjbHDgfhfSSZn9eqVcGx54HVtnd8DhYIMEcyP2+qwWNeEzQ+B7TZ1tLsD8LsJZmn14r1QfN/Aa228//sDhZBH8lcvdrag+YP/jkb0AR0BYugn2S+3lClY9sYNP/nnzmAymBHEPQ3kjl7pW0OjukHsMS2lVdnEPh3knl7pWwtciyLbNfk2FLkp25xBY5he5HfRgts0+TaVMW/uzuDzyNfgWbbUxkdwSIYmKRP3ruKnJHMtS2VtSFYBEMk8/hy2VtHM4lMWUs8fVtZhu9xINj/Z2pzKpkpq4nn76smsO9DwX57qO3rEpnSRvmvwB0hvjLZaOy1pZVk7l6Oa/DHiO9NmGbctamFfx9EHbm1j2MfJ4L3v6E+707KlGL34W0M3nsqeF831bvmoBItofQ7cc+Q/juUM2UR8b34W0e89lzwuhdGWZ8aSOby0dM4ncCF4OvPjLH+F0EzyZw+V2ReMHp7YnzpWQRzgS8lLIJHxpY+s4mfyR/eHhhVejWRzO8LLYJ7RpR+Mxn7//LcMZrsaCR55nC4+TeMJJvW4W3bkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiSpCn4DQqseBNuAi3EAAAAASUVORK5CYII=");
  background-repeat: no-repeat;
  background-size: 25px;
  background-position: right 10px top 8px;
}

select::-ms-expand {
  display: none;
}

@media screen and (min-width: 0\0) {
  select {
    background: none\9;
    padding: 5px\9;
  }
}
</style>