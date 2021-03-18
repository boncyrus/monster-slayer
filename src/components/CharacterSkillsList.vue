<template>
  <div class="text-white">
    <div v-for="skill in skills" :key="skill._id" class="row no-gutters mb-1 align-items-center">
      <div class="col">
        <icon-text :iconClass="getSkillIcon(skill.type)">{{
          skill.name
        }}</icon-text>
      </div>
      <div class="col-auto">
        <button :disabled="skills.length <= 1" class="btn btn-outline-info" @click="$emit('onDelete', skill)">
          x
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconText from "./IconText";
import SkillsMixin from "../shared/mixins/SkillsMixin.vue";

export default {
  props: {
    skills: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    IconText,
  },
  mixins: [SkillsMixin],
};
</script>
