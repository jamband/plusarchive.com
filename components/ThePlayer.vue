<template>
  <div>
    <div v-if="is1x1Ratio()" class="row">
      <div class="col-md-8 col-lg-6 offset-md-2 offset-lg-3">
        <div class="ratio ratio-1x1">
          <ThePlayerLoading v-if="player.loading" />
          <iframe
            :key="player.id"
            :src="player.src"
            class="rounded"
            allowfullscreen
            @load="load()"
          />
        </div>
      </div>
    </div>
    <div v-else class="ratio ratio-16x9">
      <ThePlayerLoading v-if="player.loading" />
      <iframe
        :key="player.id"
        :src="player.src"
        class="rounded"
        allowfullscreen
        @load="load()"
      />
    </div>
    <h5 class="mt-3 mb-2 text-center fw-bold">
      {{ player.title }}
      <small class="text-muted">via {{ player.provider }}</small>
    </h5>
    <p class="text-center">
      <NLink :to="{ name: backTo() }">
        <fa icon="angle-left" size="sm" fixed-width />
        Back to {{ backToLabel() }}
      </NLink>
      <span class="mx-1 text-muted">or</span>
      <NLink :to="{ name: 'index' }">Recent Favorites</NLink>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    is1x1Ratio () {
      return ['Bandcamp', 'SoundCloud'].includes(this.player.provider)
    },
    load () {
      this.$store.dispatch('player/loading', { status: false })
    },
    backTo () {
      return this.$route.name === 'tracks-id'
        ? 'tracks'
        : 'playlists'
    },
    backToLabel () {
      return this.player.type === 'track'
        ? 'Tracks'
        : 'Playlists'
    }
  }
}
</script>
