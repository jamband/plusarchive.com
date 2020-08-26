<template>
  <footer
    class="footer fixed-bottom p-3 text-center font-weight-bold bg-dark"
    style="font-size: 85%;"
  >
    {{ app.name }}
  </footer>
</template>

<script>
import { APP_NAME } from '~/plugins/constants'

export default {
  data () {
    return {
      app: {
        name: APP_NAME
      }
    }
  }
}
</script>
