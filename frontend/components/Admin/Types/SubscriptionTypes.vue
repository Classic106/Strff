<template>
  <div>
    <h6 class="w-100 text-left p-3 m-0">Subscription types</h6>
    <div class="block tags-input-container mx-5 p-2">
      <div
        class="tag p-1 m-1"
        :class="index === activeTag && 'active'"
        v-for="(type, index) in currentTypes"
        :key="type.name"
      >
        <span v-if="activeTag !== index" @click="activeTag = index">{{
          type.title
        }}</span>
        <input
          v-else
          v-model.lazy="currentTypes[index].title"
          v-focus
          :style="{ width: type.title.length + 'ch' }"
          @blur="update(type)"
          @keyup.enter="update(type)"
        />
        <span @click="remove(type)"><BIconX /></span>
      </div>
      <input
        v-model="tagValue"
        @keyup.enter="add"
        class="m-2"
        placeholder="Add type..."
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SubscriptionTypes",
  data: () => ({
    tagValue: "",
    activeTag: null,
    currentTypes: [],
  }),
  computed: {
    ...mapGetters({
      subscriptionTypes: "purchase-types/subscriptionTypes",
    }),
  },
  watch: {
    subscriptionTypes: function () {
      this.currentTypes = JSON.parse(JSON.stringify(this.subscriptionTypes));
    },
  },
  methods: {
    ...mapActions({
      getSubscriptionTypes: "purchase-types/getSubscriptionTypes",
      createSubscriptionType: "purchase-types/createSubscriptionType",
      updateSubscriptionType: "purchase-types/updateSubscriptionType",
      deleteSubscriptionType: "purchase-types/deleteSubscriptionType",
    }),
    add: async function () {
      await this.createSubscriptionType({
        title: this.tagValue[0].toUpperCase() + this.tagValue.slice(1),
      });
      this.tagValue = "";
    },
    update: async function (type) {
      if (this.activeTag === null) return;
      this.activeTag = null;

      const { id, title } = type;

      const t = this.subscriptionTypes.filter((t) => t.id === id)[0];

      if (t && t.title === title) return;

      const body = {
        title: title[0].toUpperCase() + title.slice(1),
      };

      await this.updateSubscriptionType({ id, body });
      this.activeTag = null;
    },
    remove: async function (type) {
      const { id } = type;
      await this.deleteSubscriptionType(id);
    },
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus();
      },
    },
  },
  async mounted() {
    await this.getSubscriptionTypes();
    this.currentTypes = JSON.parse(JSON.stringify(this.subscriptionTypes));
  },
};
</script>


<style lang="scss" scoped>
.tags-input-container {
  background-color: rgba($color: #ffffff, $alpha: 0.7);

  input {
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    font-size: 1rem;
  }
  .tag {
    float: left;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover,
    &.active {
      background-color: #57c340;
      border-radius: 5px;
    }
    span:first-child {
      margin-right: 8px;
    }
    svg {
      color: #666;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>