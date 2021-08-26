<template>
  <div class="p-2 d-flex align-items-center justify-content-center">
    <fa icon="volume-up" size="sm" fixed-width class="mx-3" />
    <NLink
      :to="linkTo"
      :title="player.title"
      class="py-2 px-1 text-body text-truncate"
      :class="$style.title"
    >
      {{ player.title }}
    </NLink>
    <button
      class="p-3 btn-close btn-sm align-text-top"
      aria-label="Close"
      @click="clear()"
    />
  </div>
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
    linkTo () {
      let routeName = ''
      if (this.player.type === 'track') {
        routeName = 'tracks-id'
      } else if (this.player.type === 'playlist') {
        routeName = 'playlists-id'
      }
      return {
        name: routeName,
        params: { id: this.player.id }
      }
    }
  },
  methods: {
    clear () {
      this.$store.dispatch('player/clear')
    }
  }
}
</script>

<style lang="scss" module>
.title {
  text-decoration: underline;
  text-decoration-color: var(--bs-primary);
  text-decoration-thickness: 0.125em;
  text-underline-offset: 0.3em;
}
</style>
