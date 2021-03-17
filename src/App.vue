<template>
  <div id="app" class="container">
    <page-loading :isLoading="isLoading"></page-loading>
    <component :is="layout" class="content-container">
      <router-view class="h-100" />
    </component>
  </div>
</template>

<script>
import "./assets/fonts/monster-slayer.css";
import PageLoading from "./components/PageLoading.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      isLoading: (state) => state.app.isLoading,
    }),
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
  components: {
    PageLoading,
  },
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  background: url("/images/game-battle-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
}

.center-block {
  display: block;
  margin: 0 auto;
}
</style>

<style scoped>
.character-container {
  flex: 1;
}

.account-create-form-container {
  min-width: 340px;
  width: 50%;
  align-self: center;
}

.content-container {
  min-height: 620px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
