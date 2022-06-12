<template lang="">
  <button class="default">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'a-button',
};
</script>

<style lang="scss">
.default {
  display: inline-block;
  box-sizing: border-box;
  padding: 8px 16px;
  background-color: #ffffff;
  border: 1px solid transparent;

  &:hover,
  &:active {
    cursor: pointer;
    background-color: #000000;
    color: #ffffff;
    border-radius: 16px;
  }
}
</style>
