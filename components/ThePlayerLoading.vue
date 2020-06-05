<template functional>
  <div class="player-loading">
    <span>.</span><span>.</span><span>.</span>
  </div>
</template>

<style lang="scss" scoped>
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
  font-size: 150%;
  font-weight: $font-weight-bold;
  color: $secondary;

  > span {
    &:nth-child(1) { animation: .8s ease .3s infinite blink; }
    &:nth-child(2) { animation: .8s ease .4s infinite blink; }
    &:nth-child(3) { animation: .8s ease .5s infinite blink; }
  }
}
</style>
