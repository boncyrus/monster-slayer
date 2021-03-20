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
        <avatar
          :class="shouldBlink ? 'blink' : ''"
          :classType="classType"
          :imageSrc="imageSrc"
          :flipped="flipAvatar"
        ></avatar>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterStatus from "./CharacterStatus.vue";
import CharacterNameDisplay from "./CharacterNameDisplay.vue";
import Avatar from "./Avatar.vue";

export default {
  watch: {
    health: function (newVal, oldVal) {
      if (newVal < oldVal) {
        this.shouldBlink = true;
        setTimeout(() => {
          this.shouldBlink = false;
        }, 1000);
      }
    },
  },
  data() {
    return {
      shouldBlink: false,
    };
  },
  props: {
    flipAvatar: Boolean,
    health: Number,
    mana: Number,
    name: String,
    classType: Number,
    imageSrc: String,
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

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.blink {
  animation: blink normal 0.5s ease-in-out;
}
</style>
