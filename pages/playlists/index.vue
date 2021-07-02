<template>
  <div class="row">
    <div class="col-md-5 offset-md-1 mb-2 mb-md-0">
      <h2>Playlists <small class="text-muted">via SoundCloud or YouTube</small></h2>
    </div>
    <div class="col-md-6">
      <ul class="list-unstyled text-truncate">
        <li v-for="playlist in playlists" :key="playlist.id" class="h5 fw-bold">
          <NLink :to="{ name: 'playlists-id', params: { id: playlist.id } }" @click.native="play(playlist.id)">
            {{ playlist.title }} <fa icon="angle-right" fixed-width />
          </NLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { scrollToTop } from '~/utils/scroll'

export default {
  async asyncData ({ $axios }) {
    const playlists = await $axios.$get('playlists')

    return {
      playlists: playlists.items
    }
  },
  head () {
    return {
      title: 'Playlists'
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  mounted () {
    scrollToTop()
  },
  methods: {
    play (id) {
      if (id !== this.player.id) {
        this.$store.dispatch('player/loading', { status: true })
      }
    }
  }
}
</script>
