<template>
  <footer class="footer fixed-bottom p-3 text-center fw-bold bg-dark">
    <div :class="$style.contents">
      {{ appName }}
    </div>
  </footer>
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
  data () {
    return {
      appName: APP_NAME
    }
  }
}
</script>

<style lang="scss" module>
.contents {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
