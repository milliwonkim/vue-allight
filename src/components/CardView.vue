<template>
  <div class="card-container">
    <slot />
  </div>
</template>
<style lang="scss">
.card-container {
  min-width: 400px;
  width: 100%;

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
