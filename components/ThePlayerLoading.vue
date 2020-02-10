<template>
  <div class="loading line-scale">
    <div /><div /><div /><div /><div />
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/css/variables";
@import "~loaders.css/src/animations/line-scale";

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  div {
    background-color: $gray-500;
  }
}
</style>
