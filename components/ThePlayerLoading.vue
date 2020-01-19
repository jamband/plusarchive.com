<template>
  <div class="player-loading line-scale">
    <div /><div /><div /><div /><div />
  </div>
</template>

<style lang="scss" scoped>
.player-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  @include media-breakpoint-only(xs) {
    font-size: 150%;
  }

  @include media-breakpoint-up(sm) {
    font-size: 250%;
  }
}
</style>
