<template>
  <div>
    <div class="progress">
      <div
        class="progress-bar bg-success"
        role="progressbar"
        :style="{ width: hp + '%' }"
      ></div>
    </div>

    <div class="progress mt-1">
      <div
        class="progress-bar bg-info"
        role="progressbar"
        :style="{ width: mp + '%' }"
      ></div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    hp: {
      type: Number,
      default: 100,
      required: true,
    },
    mp: {
      type: Number,
      default: 100,
      required: true,
    },
  },
};
</script>