<template>
  <div class="form-group">
    <label :for="id">{{ labelText }}</label>
    <select
      :id="id"
      class="form-control"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <slot></slot>
    </select>
    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    id: String,
    labelText: String,
  },
};
</script>
