<template>
  <div>
    <template v-if="skill._id === ''">
      <p class="text-white text-center center-block">
        {{ emptyMessage }}
      </p>
    </template>

    <template v-else>
      <div class="text-center text-white">
        <span
          ><strong>{{ skill.name | uppercase }}</strong></span
        >
      </div>
      <div class="text-white">
        <span><strong>LEVEL</strong>: {{ skill.lvlReq }}</span>
      </div>
      <div class="text-white">
        <span
          ><strong>TARGET</strong>:
          {{ TargetTypes[skill.target].description }}</span
        >
      </div>
      <div class="text-white">
        <span
          ><strong>TYPE</strong>:
          {{ SkillTypes[skill.type]().description }}</span
        >
      </div>
      <div class="text-white">
        <span><strong>COST</strong>: {{ skill.cost }} mana</span>
      </div>
      <div class="text-white">
        <span
          ><strong>{{
            skill.target === TargetTypes.self.code ? "HEAL" : "DAMAGE"
          }}</strong
          >: {{ Math.abs(skill.damage) }}</span
        >
      </div>
    </template>
  </div>
</template>

<script>
import { SkillInfo } from "../models/skillInfo";
import { TargetTypes } from "../models/targetTypes";
import { SkillTypes } from "../models/skillTypes";

export default {
  data() {
    return {
      TargetTypes,
      SkillTypes,
    };
  },
  props: {
    skill: {
      type: SkillInfo,
      default: new SkillInfo(),
      required: true,
    },
    emptyMessage: String,
  },
};
</script>
