<template>
  <div class="d-flex flex-column">
    <div class="row justify-content-center h-100">
      <div class="col-12">
        <character-status
          :hp="health"
          :mp="mana"
          class="col-12"
        ></character-status>
        <div class="d-flex justify-content-center">
          <character-name-display
            class="mt-1 col-auto"
            :name="name"
          ></character-name-display>
        </div>
      </div>

      <div class="col-12 avatar-container d-flex justify-content-center">
        <!-- <img width="160" height="160" :src="getAvatar(classType)" /> -->
        <avatar :classType="classType" :flipped="flipAvatar"></avatar>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterStatus from "./CharacterStatus.vue";
import CharacterNameDisplay from "./CharacterNameDisplay.vue";
import Avatar from "./Avatar.vue";

export default {
  props: {
    flipAvatar: Boolean,
    health: Number,
    mana: Number,
    name: String,
    classType: Number,
  },
  components: {
    CharacterStatus,
    CharacterNameDisplay,
    Avatar,
  },
};
</script>

<style scoped>
.avatar-container {
  align-self: center;
  flex: 1;
}

.flipped-avatar {
  transform: scaleX(-1);
}
</style>
