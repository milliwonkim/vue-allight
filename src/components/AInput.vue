<template>
  <label class="input-label" :for="id">
    <div v-if="!!title">{{ title }}</div>
    <textarea
      v-if="!!isTextArea"
      :rows="rows"
      :placeholder="placeholder"
      class="input"
      :value="inputData"
      @change="handleInputData($event)"
      :id="id"
    ></textarea>
    <input
      v-else
      :placeholder="placeholder"
      :type="type"
      class="input"
      :value="inputData"
      @change="handleInputData($event)"
      :id="id"
    />
  </label>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: [
    "inputData",
    "id",
    "title",
    "handleInput",
    "type",
    "placeholder",
    "isTextArea",
    "rows",
  ],
  setup(_, context) {
    function handleInputData(event: Event) {
      context.emit("handleInput", event);
    }

    return {
      handleInputData,
    };
  },
});
</script>
<style lang="scss" scoped>
.input {
  display: flex;
  border-radius: $small-border-radius;
  padding: 8px 16px;
  border: 1px solid $default-color;
}

.input-label {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
