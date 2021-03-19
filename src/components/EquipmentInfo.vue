<template>
  <div>
    <icon-text :iconClass="getEquipmentIcon(weapon)">{{
      weapon.name
    }}</icon-text>
    <icon-text :iconClass="getEquipmentIcon(armor)">{{ armor.name }}</icon-text>
  </div>
</template>

<script>
import IconText from "./IconText.vue";
import EquipmentMixin from "../shared/mixins/EquipmentMixin.vue";

export default {
  props: {
    armor: Object,
    weapon: Object,
  },
  components: {
    IconText,
  },
  mixins: [EquipmentMixin],
};
</script>
