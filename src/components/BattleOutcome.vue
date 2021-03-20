<template>
  <v-card>
    <v-toolbar color="primary" dark>Battle has ended!</v-toolbar>
    <div class="p-2">
      <div>
        <span><strong>EXP GAINED: </strong> {{ details.exp }}</span>
      </div>
      <div v-if="details.drop.length > 0">
        <span><strong>DROP: </strong> {{ details.drop }}</span>
      </div>
      <div v-if=" details.newSkills.length > 0">
        <span><strong>SKILLS ACQUIRED: </strong> {{ details.newSkills.join(',') }}</span>
      </div>
      <div v-if="details.unlockedDungeons.length > 0">
        <span><strong>UNLOCKED DUNGEONS: </strong> {{ details.unlockedDungeons.join(',') }}</span>
      </div>
    </div>
    <v-card-actions class="justify-end">
      <v-btn text @click="$emit('onGoBack')">Go back</v-btn>
      <v-btn text @click="$emit('onPlayAgain')">Play again</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { FinishBattleResponse } from "../models/finishBattleResponse";
export default {
  props: {
    details: {
      type: FinishBattleResponse,
      default: new FinishBattleResponse(),
    },
  },
};
</script>