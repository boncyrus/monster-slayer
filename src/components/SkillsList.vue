<template>
  <div></div>
</template>

<script>
import SkillsMixin from "../shared/mixins/SkillsMixin.vue";
import { SkillInfo } from "../models/skillInfo";

export default {
  props: {
    skills: {
      type: SkillInfo,
      default: new SkillInfo(),
    },
  },

  mixins: [SkillsMixin],
};
</script>
