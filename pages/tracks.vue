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
    <ListTracks />
  </div>
</template>

<script>
export default {
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
  }
}
</script>
