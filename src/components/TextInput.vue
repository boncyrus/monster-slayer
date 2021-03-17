<template>
  <div class="form-group">
    <label :for="id">{{ labelText }}</label>
    <input
      :type="type"
      class="form-control"
      :id="id"
      :value="value"
      @blur="$emit('blur')"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    />
    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    labelText: String,
    placeholder: String,
    value: String,
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>
