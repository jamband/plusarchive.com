<template>
  <div>
    <div v-if="$fetchState.pending" class="row row-cols-1 row-cols-md-3 text-center card-container">
      <div v-for="(pending, index) in Array(3)" :key="index" class="col mb-md-4">
        <div class="card">
          <div class="card-img-wrap">
            <img
              class="card-img-top"
              data-aspectratio="1/1"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNQqgcAAMYAogMXSH0AAAAASUVORK5CYII="
              alt=""
            >
          </div>
          <div class="card-body">
            <h6 class="card-title">&nbsp;</h6>
            <div class="card-text">&nbsp;</div>
            <div class="card-info">&nbsp;</div>
          </div>
        </div>
        <hr class="d-md-none">
      </div>
    </div>
    <div v-else-if="$fetchState.error">
      Request failure.
    </div>
    <div v-else class="row row-cols-1 row-cols-md-3 text-center card-container">
      <div v-for="track in tracks" :key="track.id" class="col mb-md-4">
        <div class="card">
          <div class="card-img-wrap">
            <NLink
              :to="{ name: 'track', params: { id: track.id } }"
              :aria-label="track.title"
              @click.native="load(track.id)"
            >
              <CardLazyImage :image="track.image" :aspectratio="aspectRatio(track.provider)" />
              <fa :icon="audioStatusIcon(track.id)" class="card-play" />
            </NLink>
          </div>
          <div class="card-body">
            <h6 class="card-title text-truncate">
              {{ track.title }}
            </h6>
            <div class="card-text">
              <NLink v-for="genre in track.genres" :key="genre.id" :to="{ name: 'tracks', query: { genre: genre.name } }" class="badge badge-secondary" append>
                {{ genre.name }}
              </NLink>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      tracks: []
    }
  },
  async fetch () {
    const { items } = await this.$axios.$get('tracks/favorites?expand=genres')
    this.tracks = items
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
    },
    aspectRatio (provider) {
      return ['Vimeo', 'YouTube'].includes(provider)
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
  }
}
</script>
