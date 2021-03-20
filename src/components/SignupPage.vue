<template>
  <div>
    <v-snackbar
      color="primary"
      top
      content-class="text-center"
      :timeout="1500"
      v-model="showAlert"
    >
      <span class="text-white">{{ alertMessage }}</span>
    </v-snackbar>
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
  data() {
    return {
      alertMessage: "",
      showAlert: false,
    };
  },
  methods: {
    ...mapMutations("app", ["setLoading"]),
    hanldeSubmit: async function(form) {
      this.alertMessage = "";
      this.showAlert = false;

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
        this.alertMessage = "Failed to signup!";
        this.showAlert = true;
      }
    },
  },
  mixins: [AccountsMixin],
};
</script>
