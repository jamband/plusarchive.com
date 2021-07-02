<template>
  <div>
    <fa icon="volume-up" size="sm" fixed-width />
    <NLink
      :to="linkTo"
      :title="player.title"
      class="mx-3 text-body"
      :class="$style.title"
    >
      {{ title() }}
    </NLink>
    <button
      class="btn-close btn-sm align-text-top"
      aria-label="Close"
      @click="clear()"
    />
    <div class="d-md-none pt-1 text-muted">
      {{ appName }}
    </div>
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
    title () {
      const maxLength = 30

      return this.player.title.length <= maxLength
        ? this.player.title
        : `${this.player.title.substring(0, maxLength)}...`
    },
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
  text-decoration-thickness: 3px;
  text-underline-offset: 0.3em;
}
</style>
