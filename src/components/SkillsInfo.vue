<template>
  <div>
    <icon-text
      @click="$emit('onItemSelect', skill)"
      :iconClass="getSkillIcon(skill.type)"
      v-for="skill in skills"
      :key="skill._id"
      >{{ skill.name }}</icon-text
    >
  </div>
</template>

<script>
import IconText from "./IconText.vue";
import SkillsMixin from "../shared/mixins/SkillsMixin.vue";

export default {
  props: {
    skills: Array,
  },
  components: {
    IconText,
  },
  mixins: [SkillsMixin],
};
</script>
