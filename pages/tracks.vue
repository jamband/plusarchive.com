<template>
  <div>
    <div class="text-center mb-3">
      <n-link :to="{ name: 'tracks' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </n-link>
      <TotalCount :total="pagination.totalCount" />
      <br class="d-sm-none">
      <SearchDropdown label="Providers" query="provider" :items="providers" />
      <SearchDropdown label="Genres" query="genre" :items="genres" />
      <SearchForm class="d-lg-none mb-3" />
    </div>
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
              <n-link :to="{ query: { provider: track.provider } }" class="badge badge-secondary">
                {{ track.provider }}
              </n-link>
              <n-link v-for="genre in track.genres" :key="genre.id" :to="{ query: { genre: genre.name } }" class="badge badge-secondary" append>
                {{ genre.name }}
              </n-link>
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
</template>

<script>
import CardLazyImage from '~/components/CardLazyImage'
import PaginationMinimal from '~/components/PaginationMinimal'
import SearchDropdown from '~/components/SearchDropdown'
import SearchForm from '~/components/SearchForm'
import TotalCount from '~/components/TotalCount'

export default {
  components: {
    CardLazyImage,
    PaginationMinimal,
    SearchDropdown,
    SearchForm,
    TotalCount
  },
  async fetch ({ store, query, error }) {
    await Promise.all([
      store.dispatch('track/fetchItems', { query, error }),
      store.dispatch('track/fetchGenres', { error })
    ])
  },
  computed: {
    tracks () {
      return this.$store.state.track.items
    },
    pagination () {
      return this.$store.state.pagination
    },
    providers () {
      return ['Bandcamp', 'SoundCloud', 'Vimeo', 'YouTube']
    },
    genres () {
      return this.$store.state.track.genres
    },
    player () {
      return this.$store.state.player
    }
  },
  mounted () {
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

      container.addEventListener('load', () => {
        /* eslint-disable no-new */
        new Masonry(container, { transitionDuration: 0 })
      }, true)
    }
  },
  head () {
    return {
      title: `Tracks - ${this.$app.name}`
    }
  },
  watchQuery: true
}
</script>
