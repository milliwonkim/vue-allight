<template>
  <div class="teacher-info-container"><slot /></div>
</template>
<style lang="scss" scoped>
.teacher-info-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  box-sizing: border-box;
  margin: 24px 0;

  @media (max-width: 1760px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1385px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 920px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 24px 0;
    justify-items: center;
  }
}
</style>
