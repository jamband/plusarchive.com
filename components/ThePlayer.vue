<template>
  <div>
    <div :class="aspectRatio" class="embed-responsive">
      <ThePlayerLoading v-if="player.loading" />
      <template v-show="!player.loading">
        <iframe :key="player.id" :src="player.src" class="embed-responsive-item" frameborder="0" allowfullscreen @load="load()" />
      </template>
    </div>

    <h5 class="text-center my-2">
      {{ player.title }} <small class="text-muted">via {{ player.provider }}</small>
    </h5>

    <p class="text-center small">
      <NLink :to="backTo">
        <fa icon="angle-left" fixed-width />Back to {{ backToLabel }}
      </NLink>
      <span class="text-muted px-1">or</span>
      <NLink :to="{ name: 'home' }">Recent Favorites</NLink>
    </p>
  </div>
</template>

<script>
import ThePlayerLoading from '~/components/ThePlayerLoading'

export default {
  components: {
    ThePlayerLoading
  },
  computed: {
    player () {
      return this.$store.state.player
    },
    aspectRatio () {
      return /^(Vimeo|YouTube)$/.test(this.player.provider)
        ? 'embed-responsive-16by9'
        : 'embed-responsive-1by1-half'
    },
    backTo () {
      const name = this.$route.name === 'track'
        ? 'tracks'
        : 'playlists'

      return { name }
    },
    backToLabel () {
      return this.player.type === 'track'
        ? 'Tracks'
        : 'Playlists'
    }
  },
  methods: {
    load () {
      this.$store.dispatch('player/loading', { status: false })
    }
  }
}
</script>
