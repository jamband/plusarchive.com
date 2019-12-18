<template>
  <div>
    <TheHeader />
    <div class="container">
      <nuxt />
    </div>
    <footer class="footer fixed-bottom p-3 text-center bg-dark">
      {{ $app.name }}
    </footer>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheHeader
  }
}
</script>
