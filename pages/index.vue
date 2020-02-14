<template>
  <div>
    <h2 class="mb-3">
      Recent
      <small class="text-muted">favorite tracks</small>
    </h2>
    <div class="row row-cols-1 row-cols-md-3 text-center card-container">
      <div v-for="track in tracks" :key="track.id" class="col mb-md-4">
        <div class="card">
          <div class="card-img-wrap">
            <n-link :to="{ name: 'track', params: { id: track.id } }" @click.native="load(track.id)">
              <CardLazyImage :image="track.image" :aspectratio="aspectRatio(track.provider)" />
              <fa :icon="audioStatusIcon(track.id)" class="card-play" />
            </n-link>
          </div>
          <div class="card-body">
            <h6 class="card-title text-truncate">
              {{ track.title }}
            </h6>
            <div class="card-text">
              <n-link v-for="genre in track.genres" :key="genre.id" :to="{ name: 'tracks', query: { genre: genre.name } }" class="badge badge-secondary" append>
                {{ genre.name }}
              </n-link>
            </div>
            <div class="card-info">
              <fa :icon="['fab', providerIcon(track.provider)]" />
              {{ track.provider }}
            </div>
          </div>
        </div>
        <hr class="d-md-none">
      </div>
    </div>
    <h2 class="my-2">
      Search
      <small class="text-muted">by genres</small>
    </h2>
    <div v-for="genre in genres" :key="genre.id" class="d-inline-block">
      <n-link :to="{ name: 'tracks', query: { genre } }" class="badge badge-secondary">{{ genre }}</n-link>
    </div>
    <div class="text-center pt-3 pb-4 small">
      <n-link :to="{ name: 'tracks' }">
        Go to Tracks
      </n-link>
      <span class="text-muted px-1">or</span>
      <n-link :to="{ name: 'playlists' }">
        Playlists<fa icon="angle-right" fixed-width />
      </n-link>
    </div>
  </div>
</template>

<script>
import CardLazyImage from '~/components/CardLazyImage'

export default {
  components: {
    CardLazyImage
  },
  async fetch ({ store, error }) {
    await Promise.all([
      store.dispatch('track/fetchFavorites', { error }),
      store.dispatch('track/fetchMinimalGenres', { error })
    ])
  },
  computed: {
    tracks () {
      return this.$store.state.track.favorites
    },
    genres () {
      return this.$store.state.track.minimalGenres
    },
    player () {
      return this.$store.state.player
    }
  },
  methods: {
    load (id) {
      if (id !== this.player.id) {
        this.$store.dispatch('player/loading', { status: true })
      }
    },
    aspectRatio (provider) {
      return /^(Vimeo|YouTube)$/.test(provider)
        ? '16/9'
        : '1/1'
    },
    audioStatusIcon (id) {
      return id === this.player.id
        ? 'pause-circle'
        : 'play-circle'
    },
    providerIcon (provider) {
      const icon = {
        Bandcamp: 'bandcamp',
        SoundCloud: 'soundcloud',
        Vimeo: 'vimeo-square',
        YouTube: 'youtube-square'
      }
      return icon[provider]
    }
  },
  head () {
    return {
      title: this.$app.name
    }
  }
}
</script>
