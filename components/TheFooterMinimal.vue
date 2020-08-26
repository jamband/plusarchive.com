<template>
  <footer class="footer fixed-bottom p-3 text-center bg-dark">
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

<style lang="scss" scoped>
.footer {
  font-size: 85%;
  font-weight: bold;
}
</style>
