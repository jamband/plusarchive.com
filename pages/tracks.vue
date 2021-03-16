<template>
  <div>
    <div class="text-center mb-3">
      <NLink :to="{ name: 'tracks' }" class="text-light">
        <fa icon="redo-alt" fixed-width /> Reset All
      </NLink>
      <TotalCount :total="pagination.totalCount" />
      <br class="d-sm-none">
      <SearchDropdown label="Providers" query="provider" :items="providers" />
      <SearchDropdown label="Genres" query="genre" items="tracks/genres" />
      <SearchForm class="d-lg-none mb-3" />
    </div>
    <ListTracks :tracks="tracks" />
    <PaginationMinimal :current-page="pagination.currentPage" :page-count="pagination.pageCount" />
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, query, store }) {
    const tracks = await $axios.$get(
      `tracks${query.q ? '/search' : ''}?expand=genres`,
      { params: query }
    )

    store.dispatch('pagination/fetchItem', tracks._meta)

    return {
      tracks: tracks.items
    }
  },
  head () {
    return {
      title: 'Tracks'
    }
  },
  computed: {
    pagination () {
      return this.$store.state.pagination
    },
    providers () {
      return ['Bandcamp', 'SoundCloud', 'Vimeo', 'YouTube']
    }
  },
  watchQuery: ['genre', 'page', 'provider']
}
</script>
