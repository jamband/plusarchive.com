<template>
  <div>
    <div class="mb-md-4 text-center">
      <NLink :to="{ name: 'tracks' }" class="tag">
        <fa icon="redo-alt" size="sm" fixed-width /> Reset All
      </NLink>
      <TotalCount class="me-3" :total="pagination.totalCount" />
      <br class="d-sm-none">
      <SearchDropdown
        id="searchTracksProviders"
        class="d-inline-block"
        label="Providers"
        query="provider"
        :items="providers"
      />
      <SearchDropdown
        id="searchTracksGenres"
        class="d-inline-block"
        label="Genres"
        query="genre"
        items="tracks/genres"
      />
      <SearchForm class="d-md-none my-2" />
    </div>
    <div
      ref="container"
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-md-4"
      @load.capture="masonry()"
    >
      <div v-for="track in tracks" :key="track.id">
        <TrackCard
          :id="track.id"
          :provider="track.provider"
          :image="track.image"
          :title="track.title"
          :footer="track.created_at"
        >
          <NLink :to="{ name: 'tracks', query: { provider: track.provider } }" class="tag">
            {{ track.provider }}
          </NLink>
          <NLink
            v-for="genre in track.genres"
            :key="genre.id"
            :to="{ name: 'tracks', query: { genre: genre.name } }"
            class="tag"
          >
            {{ genre.name }}
          </NLink>
        </TrackCard>
      </div>
    </div>
    <PaginationMinimal
      class="mt-4"
      :current-page="pagination.currentPage"
      :page-count="pagination.pageCount"
    />
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, query }) {
    const url = query.q ? 'tracks/search' : 'tracks'
    const tracks = await $axios.$get(`${url}?expand=genre`, {
      params: query
    })

    return {
      tracks: tracks.items,
      pagination: tracks._meta
    }
  },
  head () {
    return {
      title: 'Tracks'
    }
  },
  computed: {
    player () {
      return this.$store.state.player
    },
    providers () {
      return ['Bandcamp', 'SoundCloud', 'Vimeo', 'YouTube']
    }
  },
  watchQuery: ['genre', 'page', 'provider', 'q'],
  mounted () {
    this.masonry()
  },
  methods: {
    masonry () {
      import('masonry-layout').then((module) => {
        /* eslint-disable no-new, new-cap */
        new module.default(this.$refs.container, {
          transitionDuration: 0
        })
      })
    }
  }
}
</script>
