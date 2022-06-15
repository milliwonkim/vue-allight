<template>
  <div :class="$style.cardContainer">
    <slot />
  </div>
</template>
<style lang="scss" module>
.card-container {
  max-height: 160px;
  height: 100%;
  width: 100%;
  word-break: keep-all;

  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media (max-width: 920px) {
    max-width: 400px;
    box-sizing: border-box;
  }

  @media (max-width: 625px) {
    min-width: 0;
    width: 100%;
  }
}
</style>
