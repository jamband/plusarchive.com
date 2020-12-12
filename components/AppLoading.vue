<template functional>
  <span class="app-loading text-secondary font-weight-bold">
    <span>.</span><span>.</span><span>.</span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes blink {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.app-loading {
  font-size: 120%;
  pointer-events: none;

  > span {
    &:nth-child(1) { animation: 0.5s ease 0.1s infinite blink; }
    &:nth-child(2) { animation: 0.5s ease 0.2s infinite blink; }
    &:nth-child(3) { animation: 0.5s ease 0.3s infinite blink; }
  }
}
</style>
