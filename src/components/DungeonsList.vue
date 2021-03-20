<template>
  <div class="d-flex flex-column align-items-center">
    <div
      @click="$emit('onSelect', dungeon)"
      v-for="dungeon in dungeons"
      :key="dungeon._id"
      class="mb-3 img-container"
    >
      <div
        :class="overlay(dungeon)"
        :style="`background-image: url('/images/dungeons/${dungeon.image}.jpg')`"
      >
        <img
          v-if="dungeon.locked"
          class="lock-overlay"
          width="240"
          height="120"
          src="images/dungeons/locked-overlay.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { DungeonInfo } from "../models/dungeonInfo";

export default {
  props: {
    dungeons: {
      type: Array,
      default: () => [],
      required: true,
    },
    selected: {
      type: DungeonInfo,
      default: new DungeonInfo(),
    },
  },
  methods: {
    overlay: function (dungeon) {
      const selectedClass = dungeon === this.selected ? "selected" : "";

      return `lock-overlay-container ${selectedClass}`;
    },
  },
};
</script>

<style scoped>
.img-container {
  cursor: pointer;
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  display: block;
  box-sizing: content-box;
}

.lock-overlay-container {
  height: 120px;
  width: 240px;
  z-index: 999;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  left: 0;
  box-sizing: content-box;
  transition: all 0.2s ease;
}

.selected {
  border: 5px solid teal;
}
</style>
