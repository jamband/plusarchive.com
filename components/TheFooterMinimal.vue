<template>
  <footer
    class="footer fixed-bottom p-3 text-center font-weight-bold bg-dark"
    style="font-size: 85%;"
  >
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
