<template>
  <div>
    <AppLoading v-if="$fetchState.pending" class="text-center" />
    <div v-else-if="$fetchState.error" class="text-center">
      Request failure.
    </div>
    <div v-else>
      <div class="row row-cols-1 row-cols-md-3 text-center card-container">
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
                <NLink :to="{ query: { provider: track.provider } }" class="badge badge-secondary">
                  {{ track.provider }}
                </NLink>
                <NLink v-for="genre in track.genres" :key="genre.id" :to="{ query: { genre: genre.name } }" class="badge badge-secondary" append>
                  {{ genre.name }}
                </NLink>
              </div>
              <div class="card-info">
                <fa icon="clock" fixed-width /> {{ track.created_at }}
              </div>
            </div>
          </div>
          <hr class="d-md-none">
        </div>
      </div>
      <PaginationMinimal :current-page="pagination.currentPage" :page-count="pagination.pageCount" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tracks: [],
      pagination: {}
    }
  },
  async fetch () {
    const tracks = await this.$axios.$get(
      `tracks${this.$route.query.q ? '/search' : ''}?expand=genres`,
      { params: this.$route.query }
    )
    this.tracks = tracks.items
    this.pagination = tracks._meta
    this.$store.dispatch('pagination/fetchItem', this.pagination)
  },
  computed: {
    player () {
      return this.$store.state.player
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  mounted () {
    this.masonryLoaded()
  },
  updated () {
    this.masonryLoaded()
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
    masonryLoaded () {
      const Masonry = require('masonry-layout')
      const container = document.querySelector('.card-container')

      if (container) {
        container.addEventListener('load', () => {
        /* eslint-disable no-new */
          new Masonry(container, { transitionDuration: 0 })
        }, true)
      }
    }
  }
}
</script>
