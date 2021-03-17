<template>
  <div class="pill">
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style scoped>
.pill {
  display: inline-block;
  padding: 1px 10px;
  border-radius: 10px;
  width: auto;
  color: white;
  background-color: teal;
}
</style>
