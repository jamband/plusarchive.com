<template>
  <div>
    <AppLoading v-if="$fetchState.pending" />
    <div v-else-if="$fetchState.error">
      Request failure.
    </div>
    <div v-for="genre in genres" v-else :key="genre.id" class="d-inline-block">
      <NLink :to="{ name: 'tracks', query: { genre } }" class="badge badge-secondary">{{ genre }}</NLink>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      genres: []
    }
  },
  async fetch () {
    this.genres = await this.$axios.$get('tracks/minimal-genres?limit=38')
  }
}
</script>
