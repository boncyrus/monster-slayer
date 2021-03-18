<template>
  <div>
    <div class="d-flex">
      <div class="btn-group">
        <router-link :to="$router.history.current.meta.backTo" v-if="hasBack" @click="goBack" class="btn btn-primary text-white">
          <icon-text iconClass="icon-back"></icon-text>
        </router-link>
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
import IconText from "../components/IconText.vue";

export default {
  components: {
    IconText,
  },
  computed: {
    hasBack: function() {
      return !!this.$router.history.current.meta.backTo;
    },
  },
  methods: {
    goBack() {
      console.log(this.$router.history.current.meta.backTo);
      this.$router.replace(this.$router.history.current.meta.backTo)
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
