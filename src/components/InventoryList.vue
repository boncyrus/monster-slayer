<template>
  <div class="row no-gutters">
    <div class="col-auto m-1" v-for="item in inventory" :key="item.item._id">
      <button
        type="button"
        @click="$emit('onItemSelect', item)"
        class="btn btn-outline-dark"
      >
        <icon-text
          textClass="text-white"
          :iconClass="`${getEquipmentIcon(item.item)} text-white`"
          >{{ item.item.name }}</icon-text
        >
      </button>
    </div>
  </div>
</template>

<script>
import IconText from "./IconText.vue";
import EquipmentMixin from "../shared/mixins/EquipmentMixin.vue";

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
  mixins: [EquipmentMixin],
};
</script>
