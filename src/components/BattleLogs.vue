<template>
  <div
    class="shadow-sm p-4 rounded h-100"
    style="background-color: rgba(0,0,0, 0.75)"
  >
    <p class="title">Battle Logs</p>
    <p v-for="log in logs" class="log-text" :key="log.id">{{ log.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    logs: Array,
  },
};
</script>

<style scoped>
.title {
  color: white;
  font-weight: bold;
}

.root {
  max-height: 100%;
  overflow: scroll;
  text-overflow: ellipsis;
}

.log-text {
  color: white;
  background-color: teal;
  border-radius: 5px;
  text-align: center;
}
</style>
