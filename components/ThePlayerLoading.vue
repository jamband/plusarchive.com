<template>
  <div :class="$style.loading" role="status">
    <span>.</span><span>.</span><span>.</span>
  </div>
</template>

<style lang="scss" module>
@keyframes loading {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.loading {
  align-items: center;
  color: var(--bs-secondary);
  display: flex;
  font-size: 180%;
  font-weight: bold;
  justify-content: center;
  pointer-events: none;

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
