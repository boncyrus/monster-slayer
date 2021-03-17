<template>
  <div>
    <login-form @onLogin="handleLogin"></login-form>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import AccountsMixin from "../shared/mixins/AccountsMixin";
import { routeConfig } from "../models/routeConfig";
import { mapMutations } from "vuex";

export default {
  components: {
    LoginForm,
  },
  mixins: [AccountsMixin],
  methods: {
    ...mapMutations("app", ["setLoading"]),
    handleLogin: async function(form) {
      this.setLoading({
        isLoading: true,
        loadingText: "Logging in",
      });
      const response = await this.login(form);
      this.setLoading(false);
      if (response.ok === true) {
        this.$router.push({
          path: routeConfig.character.index.path,
        });
      } else {
        alert("Failed to login.");
      }
    },
  },
};
</script>
