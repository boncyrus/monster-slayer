<template>
  <div>
    <div class="d-flex mb-2">
      <div class="btn-group">
        <button
          v-if="hasBack"
          @click="goBack"
          class="btn btn-primary text-white d-flex align-items-center justify-content-center"
        >
          <i class="icon-back"></i>
        </button>
        <router-link class="btn btn-secondary" to="/character"
          >Character</router-link
        >
        <router-link class="btn btn-secondary" to="/dungeons"
          >Dungeons</router-link
        >
      </div>

      <div class="right-nav">
        <button @click="logout()">
          <router-link class="btn btn-secondary" to="/accounts/login"
            >Logout</router-link
          >
        </button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import AccountsMixin from "../shared/mixins/AccountsMixin";

export default {
  components: {},
  computed: {
    hasBack: function () {
      return !!this.$route.meta.backTo;
    },
  },
  methods: {
    goBack() {
      this.$router.replace(this.$route.meta.backTo);
    },
  },
  mixins: [AccountsMixin],
};
</script>

<style scoped>
.router-link-active {
  background-color: teal;
}

.right-nav {
  margin-left: auto;
}

.right-nav > button {
  background-color: transparent;
  border: transparent;
}
</style>
