<template>
  <div :class="$style.loading">
    <span>.</span><span>.</span><span>.</span>
  </div>
</template>

<style lang="scss" module>
@keyframes blink {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.loading {
  color: var(--secondary);
  font-size: 150%;
  font-weight: bold;
  pointer-events: none;

  > span {
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
    animation-name: blink;
    animation-timing-function: ease;

    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
}
</style>
