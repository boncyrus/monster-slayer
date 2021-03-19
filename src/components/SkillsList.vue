<template>
  <div class="row no-gutters text-white">
    <div class="col-auto m-1" v-for="skill in skills" :key="skill._id">
      <button
        class="btn btn-outline-dark"
        @click="$emit('onItemSelect', skill)"
      >
        <icon-text class="text-white" :iconClass="getSkillIcon(skill.type)">{{
          skill.name
        }}</icon-text>
      </button>
    </div>
  </div>
</template>

<script>
import SkillsMixin from "../shared/mixins/SkillsMixin.vue";
import IconText from "./IconText.vue";

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
