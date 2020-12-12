<template>
  <div class="col-md-6">
    <div v-if="$fetchState.pending">
      <AppLoading />
    </div>
    <div v-else-if="$fetchState.error">
      Request failure.
    </div>
    <ul v-else class="list-unstyled text-truncate">
      <li v-for="playlist in playlists" :key="playlist.id" class="h5">
        <NLink :to="{ name: 'playlist', params: { id: playlist.id } }" @click.native="load(playlist.id)">
          {{ playlist.title }} <fa icon="angle-right" fixed-width />
        </NLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playlists: []
    }
  },
  async fetch () {
    const { items } = await this.$axios.$get('playlists')
    this.playlists = items
  },
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    load (id) {
      if (id !== this.player.id) {
        this.$store.dispatch('player/loading', { status: true })
      }
    }
  }
}
</script>
