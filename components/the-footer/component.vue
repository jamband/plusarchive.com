<template>
  <footer class="fixed-bottom fw-bold bg-dark">
    <div :class="$style.contents">
      <TheFooterPlayerTitle v-if="hasTitle()" key="player" />
      <TheFooterTracking v-else-if="tracking.disable" key="tracking" />
      <div v-else key="default" class="p-3 text-center">{{ appName }}</div>
    </div>
  </footer>
</template>

<script>
import { TheFooterPlayerTitle } from '~/components/the-footer-player-title'
import { TheFooterTracking } from '~/components/the-footer-tracking'
import { APP_NAME } from '~/constants/app'

export default {
  name: 'TheFooter',
  components: {
    TheFooterPlayerTitle,
    TheFooterTracking
  },
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
      if (this.player.title !== '' && !this.player.loading && !['tracks-id', 'playlists-id'].includes(this.$route.name)) {
        if (this.$route.name !== 'privacy' || !this.tracking.disable) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss" src="./style.scss" module></style>
