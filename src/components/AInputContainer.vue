<template>
  <div class="input-container">
    <slot />
  </div>
</template>
<script lang="ts">
export default {};
</script>
<style lang="scss" scoped>
.input-container {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
