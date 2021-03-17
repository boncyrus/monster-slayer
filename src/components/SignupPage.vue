<template>
  <div>
    <signup-form @onSignup="hanldeSubmit"></signup-form>
  </div>
</template>

<script>
import SignupForm from "./SignupForm.vue";
import { routeConfig } from "../models/routeConfig";
import AccountsMixin from "../shared/mixins/AccountsMixin";
import { mapMutations } from "vuex";

export default {
  components: {
    SignupForm,
  },
  methods: {
    ...mapMutations("app", ["setLoading"]),
    hanldeSubmit: async function(form) {
      this.setLoading({
        isLoading: true,
        loadingText: "Signing up",
      });

      const response = await this.signup(form);

      this.setLoading(false);
      if (response.ok === true) {
        this.$router.push({
          path: routeConfig.login.path,
        });
      } else {
        alert("Failed to signup.");
      }
    },
  },
  mixins: [AccountsMixin],
};
</script>
