<template>
  <div class="player-loading" role="status">
    <span>.</span><span>.</span><span>.</span>
  </div>
</template>

<style lang="scss" scoped>
@keyframes loading {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.player-loading {
  color: var(--secondary);
  font-size: 150%;
  font-weight: bold;
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);

  > span {
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-name: loading;
    animation-timing-function: ease;

    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
}
</style>
