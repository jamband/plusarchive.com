<template>
  <footer
    class="footer fixed-bottom p-3 text-center font-weight-bold bg-dark"
    style="font-size: 85%;"
  >
    <TheFooterPlayerTitle v-if="hasTitle()" key="player" />
    <TheFooterTracking v-else-if="tracking.disable" key="tracking" />
    <div v-else key="default">{{ appName }}</div>
  </footer>
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
  data () {
    return {
      appName: APP_NAME
    }
  },
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
      if (this.player.title !== '' && !this.player.loading && !['track', 'playlist'].includes(this.$route.name)) {
        if (this.$route.name !== 'privacy' || !this.tracking.disable) {
          return true
        }
      }
      return false
    }
  }
}
</script>
