<template>
  <img
    :class="flipped ? 'flipped-avatar' : ''"
    :width="width"
    :height="height"
    :src="getAvatar(classType)"
  />
</template>

<script>
import CharacterMixin from "../shared/mixins/CharacterMixin";

export default {
  props: {
    classType: {
      type: Number,
      default: 0,
      required: true,
    },
    width: {
      type: Number,
      default: 160,
    },
    height: {
      type: Number,
      default: 160,
    },
    flipped: Boolean,
  },
  mixins: [CharacterMixin],
};
</script>

<style scoped>
.flipped-avatar {
  transform: scaleX(-1);
}
</style>
