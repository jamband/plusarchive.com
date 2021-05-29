<template>
  <footer class="footer fixed-bottom p-3 text-center fw-bold bg-dark">
    {{ appName }}
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
