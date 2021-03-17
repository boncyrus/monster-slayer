<template>
  <div class="d-flex justify-content-between w-100">
    <div class="w-50" v-for="item in inventory" :key="item.item._id">
      <button
        type="button"
        @click="$emit('onItemSelect', item)"
        class="btn btn-outline-dark"
      >
        <icon-text
          textClass="text-white"
          :iconClass="`${getIconClass(item.item.type)} text-white`"
          >{{ item.item.name }}</icon-text
        >
      </button>
    </div>
  </div>
</template>

<script>
import IconText from "./IconText.vue";
import { WeaponTypes } from "../models/weaponTypes";

export default {
  props: {
    inventory: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    IconText,
  },
  methods: {
    getIconClass: function(weaponType) {
      return weaponType === WeaponTypes.weapon ? "icon-sword" : "icon-armor";
    },
  },
};
</script>
