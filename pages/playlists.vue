<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>Playlists <small class="text-muted">via SoundCloud or YouTube</small></h2>
    </div>
    <div class="col-md-6">
      <ul class="list-unstyled text-truncate">
        <li v-for="playlist in playlists" :key="playlist.id" class="h5">
          <NLink :to="{ name: 'playlist', params: { id: playlist.id } }" @click.native="load(playlist.id)">
            {{ playlist.title }} <fa icon="angle-right" fixed-width />
          </NLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { scrollToTop } from '~/plugins/scroll'

export default {
  async fetch ({ store, error }) {
    await store.dispatch('playlist/fetchItems', { error })
  },
  computed: {
    playlists () {
      return this.$store.state.playlist.items
    },
    player () {
      return this.$store.state.player
    }
  },
  mounted () {
    scrollToTop()
  },
  methods: {
    load (id) {
      if (id !== this.player.id) {
        this.$store.dispatch('player/loading', { status: true })
      }
    }
  },
  head () {
    return {
      title: 'Playlists'
    }
  }
}
</script>
