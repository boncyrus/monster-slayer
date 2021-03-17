<template>
  <div>
    <icon-text iconClass="icon-sword">{{ weapon }}</icon-text>
    <icon-text iconClass="icon-armor">{{ armor }}</icon-text>
  </div>
</template>

<script>
import IconText from "./IconText.vue";

export default {
  props: {
    armor: {
      type: String,
      default: "None",
    },
    weapon: {
      type: String,
      default: "None",
    },
  },
  components: {
    IconText,
  },
};
</script>
