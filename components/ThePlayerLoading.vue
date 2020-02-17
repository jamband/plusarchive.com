<template functional>
  <div class="player-loading">
    ...
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/css/variables";

@keyframes blink {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.player-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: blink .7s ease infinite;
  font-size: 150%;
  font-weight: $font-weight-bold;
  color: $secondary;
}
</style>
