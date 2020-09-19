<template functional>
  <div class="player-loading">
    <span>.</span><span>.</span><span>.</span>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/css/variables";

@keyframes blink {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.player-loading {
  color: var(--secondary);
  font-size: 150%;
  font-weight: $font-weight-bold;
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);

  > span {
    &:nth-child(1) { animation: 0.8s ease 0.3s infinite blink; }
    &:nth-child(2) { animation: 0.8s ease 0.4s infinite blink; }
    &:nth-child(3) { animation: 0.8s ease 0.5s infinite blink; }
  }
}
</style>
