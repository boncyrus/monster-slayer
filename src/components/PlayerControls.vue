<template>
  <div
    class="shadow-sm p-4 rounded"
    style="background-color: rgba(0,0,0, 0.75)"
  >
    <p class="title">What will you do?</p>
    <div class="row">
      <div class="col px-1" v-for="action in actions" :key="action.name">
        <button
          class="btn btn-primary w-100"
          @click.prevent="handleAction(action)"
        >
          {{ action.name }}
        </button>
      </div>
    </div>

    <div class="row mt-2 justify-content-between">
      <div class="col px-1" v-for="skill in skills" :key="skill.name">
        <button
          :disabled="isSkillDisabled(skill)"
          class="btn btn-secondary w-100"
          @click.prevent="handleSkill(skill)"
        >
          {{ skill.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skills: Array,
    actions: Array,
    beforeActionExecute: Function,
    onActionExecute: Function,
    beforeSkillExecute: Function,
    onSkillExecute: Function,
    mana: Number,
  },
  methods: {
    handleAction: function(action) {
      const canExecute = this.beforeActionExecute(action);

      if (canExecute === true) {
        this.onActionExecute(action);
      }
    },
    handleSkill: function(skill) {
      const canExecute = this.beforeSkillExecute(skill);

      if (canExecute === true) {
        this.onSkillExecute(skill);
      }
    },
    isSkillDisabled: function(skill) {
      return skill.cost > this.mana;
    },
  },
};
</script>

<style scoped>
.title {
  color: white;
  font-weight: bold;
}
</style>
