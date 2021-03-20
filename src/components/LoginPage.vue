<template>
  <div>
    <v-snackbar
      color="primary"
      top
      content-class="text-center"
      :timeout="1500"
      v-model="loginFailed"
    >
      <span class="text-white">Invalid username or password!</span>
    </v-snackbar>
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
  data() {
    return {
      loginFailed: false,
    };
  },
  mixins: [AccountsMixin],
  methods: {
    ...mapMutations("app", ["setLoading"]),
    handleLogin: async function(form) {
      this.loginSuccess = false;

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
        this.loginFailed = true;
      }
    },
  },
};
</script>
