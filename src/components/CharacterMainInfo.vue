<template>
  <div class="root">
    <div class="d-flex">
      <character-name-display
        class="center-block"
        :name="info.name"
      ></character-name-display>
    </div>
    <div class="mt-4">
      <avatar class="center-block" width.number="120" height.number="120" :classType="info.classType"></avatar>
    </div>
    <div class="mt-4">
      <div class="row no-gutters">
        <span class="col-5 info-label">Char Id</span>
        <span class="col-7 info-value">{{ info._id }}</span>
      </div>
      <div class="row no-gutters">
        <span class="col-5 info-label">Level</span>
        <span class="col-7 info-value">{{ info.level }}</span>
      </div>
      <div class="row no-gutters">
        <span class="col-5 info-label">Class</span>
        <span class="col-7 info-value">{{ info.classType }}</span>
      </div>
      <div class="row no-gutters">
        <span class="col-5 info-label">Total Exp</span>
        <span class="col-7 info-value">{{ info.totalExp }}</span>
      </div>
      <div class="row no-gutters">
        <span class="col-5 info-label">Next Lvl</span>
        <span class="col-7 info-value">{{ info.nextLevelExp }}</span>
      </div>
    </div>

    <div class="mt-4">
      <div class="row no-gutters">
        <span class="col-12 info-label">Dungeons Unlocked</span>
        <span>
          <span
            v-for="(dungeon, index) in info.dungeonAccess"
            :key="dungeon.name"
            >{{ dungeon.name
            }}{{ index === info.dungeonAccess.length - 1 ? "" : ", " }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { CharacterMainInfo } from "../models/characterMainInfo";
import CharacterNameDisplay from "./CharacterNameDisplay.vue";
import CharacterMixin from "../shared/mixins/CharacterMixin.vue";
import Avatar from "./Avatar.vue";

export default {
  props: {
    info: {
      type: CharacterMainInfo,
      required: true,
    },
  },
  components: {
    Avatar,
    CharacterNameDisplay,
  },
  mixins: [CharacterMixin],
};
Avatar;
</script>

<style scoped>
.info-label {
  font-weight: bold;
}

.info-value {
  overflow-wrap: break-word;
}

.root {
  color: white;
}
</style>
