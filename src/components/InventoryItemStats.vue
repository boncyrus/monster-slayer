<template>
  <div class="row no-gutters justify-content-center">
    <template v-if="info.item.name !== ''">
      <div
        class="col-12 d-flex justify-content-center text-center mb-2 text-white"
      >
        <icon-text :iconClass="getDefaultEquipmentIcon(info.item.type)">{{
          info.item.name | uppercase
        }}</icon-text>
        <!-- <span class="text-white font-weight-bold">{{
          info.item.name | uppercase
        }}</span> -->
      </div>

      <div class="col-8">
        <div class="row no-gutters justify-content-between">
          <div class="col-5" v-for="(value, key) in info.item.bonus" :key="key">
            <div class="d-flex">
              <span class="text-white">{{ key | uppercase }}: </span>
              <span class="ml-1 text-white">{{ " " + value }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="d-flex w-100">
        <p class="text-white text-center empty-item-text">
          {{ emptyMessage }}
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { InventoryDetails } from "../models/inventoryDetails";
import IconText from "./IconText.vue";
import EquipmentMixin from "../shared/mixins/EquipmentMixin.vue";

export default {
  props: {
    info: {
      type: InventoryDetails,
      required: true,
      default: new InventoryDetails(),
    },
    emptyMessage: String,
  },
  components: {
    IconText,
  },
  mixins: [EquipmentMixin],
};
</script>

<style scoped>
.empty-item-text {
  margin: auto;
}
</style>
