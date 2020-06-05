<template>
  <footer class="footer fixed-bottom p-3 text-center bg-dark">
    <TheFooterPlayerTitle v-if="hasTitle()" key="player" />
    <TheFooterTracking v-else-if="tracking.disable" key="tracking" />
    <div v-else key="default">{{ $app.name }}</div>
  </footer>
</template>

<script>
export default {
  computed: {
    player () {
      return this.$store.state.player
    },
    tracking () {
      return this.$store.state.tracking
    }
  },
  methods: {
    hasTitle () {
      if (this.player.title !== '' && !this.player.loading && !/^(track|playlist)$/.test(this.$route.name)) {
        if (this.$route.name !== 'privacy' || !this.tracking.disable) {
          return true
        }
      }
      return false
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
