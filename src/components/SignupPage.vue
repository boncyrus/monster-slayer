<template>
  <div>
    <signup-form @onSignup="hanldeSubmit"></signup-form>
    <div style="display: none">
      <audio
        src="music/menu-music.mp3"
        id="menu-audio"
        loop
        autoplay
        type="audio/mpeg"
      >
        Audio not supported
      </audio>
    </div>
  </div>
</template>

<script>
import SignupForm from "./SignupForm.vue";
import { routeConfig } from "../models/routeConfig";
import AccountsMixin from "../shared/mixins/AccountsMixin";

export default {
  components: {
    SignupForm,
  },
  methods: {
    hanldeSubmit: async function(form) {
      const response = await this.signup(form);
      if (response.ok === true) {
        this.$router.push({
          path: routeConfig.login.path
        });
      } else {
        alert("Failed to signup.");
      }
    },
  },
  mixins: [AccountsMixin],
};
</script>
