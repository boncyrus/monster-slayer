<template>
  <div class="d-flex align-items-center">
    <i :class="iconClass"></i>
    <span :class="`ml-2 ${textClass}`">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    textClass: {
      type: String,
      default: "",
    },
  },
};
</script>
