<template>
  <div class="text-white">
    <section-header class="text-white text-center">{{
      dungeon.name
    }}</section-header>
    <div>
      <span>
        <span class="info-label">Recommended Level: </span>
        {{ dungeon.recommendedLevel }}
      </span>
    </div>
    <div v-if="!dungeon.locked">
      <span class="info-label">Encounters / Drops:</span>
      <div class="ml-2">
        <div
          class="row no-gutters mb-2"
          v-for="enemy in dungeon.enemies"
          :key="enemy._id"
        >
          <div class="col-3">
            {{ enemy.name }}
          </div>

          <div class="col" v-if="enemy.drops.length > 0">
            <div class="row no-gutters">
              <div class="col-auto">
                <icon-text
                  v-for="drop in enemy.drops"
                  :key="drop._id"
                  :iconClass="getEquipmentIcon(drop)"
                  textClass="text-white"
                  >{{ drop.name }}</icon-text
                >
              </div>
            </div>
          </div>
          <div class="col" v-else>
            None
          </div>
        </div>
      </div>
    </div>
    <div v-if="dungeon.locked">
      <span class="info-label">Requirements:</span>
      <p class="ml-2">
        Defeat
        <strong>{{ dungeon.bossReq.name }}</strong> from the previous dungeon.
      </p>
    </div>
  </div>
</template>

<script>
import { DungeonInfo } from "../models/dungeonInfo";
import SectionHeader from "./SectionHeader.vue";
import IconText from "./IconText.vue";
import EquipmentMixin from "../shared/mixins/EquipmentMixin.vue";

export default {
  components: { SectionHeader, IconText },
  props: {
    dungeon: {
      type: DungeonInfo,
      required: true,
      default: new DungeonInfo(),
    },
  },
  mixins: [EquipmentMixin],
};
</script>

<style scoped>
.info-label {
  font-weight: bold;
}
</style>
