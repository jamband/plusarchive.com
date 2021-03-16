<template>
  <div>
    <h2 class="mb-3">
      Recent
      <small class="text-muted">favorite tracks</small>
    </h2>
    <ListRecentFavoriteTracks :tracks="tracks" />
    <h2 class="my-2">
      Search
      <small class="text-muted">by genres</small>
    </h2>
    <ListSearchByGenres :genres="genres" />
    <div class="text-center pt-3 pb-4 small">
      <NLink :to="{ name: 'tracks' }">
        Go to Tracks
      </NLink>
      <span class="text-muted px-1">or</span>
      <NLink :to="{ name: 'playlists' }">
        Playlists<fa icon="angle-right" fixed-width />
      </NLink>
    </div>
  </div>
</template>

<script>
import { APP_NAME } from '~/constants/app'

export default {
  async asyncData ({ $axios }) {
    const [tracks, genres] = await Promise.all([
      $axios.$get('tracks/favorites?expand=genres'),
      $axios.$get('tracks/minimal-genres?limit=38')
    ])

    return {
      tracks: tracks.items,
      genres
    }
  },
  head () {
    return {
      title: APP_NAME,
      titleTemplate: ''
    }
  }
}
</script>
