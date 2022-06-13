<template>
  <div class="card-container">
    <slot />
  </div>
</template>
<style lang="scss">
.card-container {
  max-height: 160px;
  height: 100%;
  width: 100%;
  word-break: keep-all;

  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  box-shadow: 0px 0px 30px 0px #00000040;

  @media (max-width: 625px) {
    min-width: 0;
    width: 100%;
  }
}
</style>
