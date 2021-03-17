<template>
  <div>
    <div class="d-flex">
      <div class="btn-group">
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
