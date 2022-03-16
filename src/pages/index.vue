<template>
  <div>
    <h2 class="mb-2">
      Recent
      <small class="fw-normal text-muted">favorite tracks</small>
    </h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-md-4">
      <div v-for="track in tracks" :key="track.id">
        <TrackCard
          :id="track.id"
          :provider="track.provider"
          :image="track.image"
          :title="track.title"
          :footer="track.created_at"
        >
          <NLink
            :to="{ name: 'tracks', query: { provider: track.provider } }"
            class="tag"
          >
            {{ track.provider }}
          </NLink>
          <NLink
            v-for="genre in track.genres"
            :key="genre.id"
            :to="{ name: 'tracks', query: { genre: genre.name }}"
            class="tag"
          >
            {{ genre.name }}
          </NLink>
        </TrackCard>
      </div>
    </div>
    <h2 class="mt-4 mb-2">
      Search
      <small class="fw-normal text-body">by genres</small>
    </h2>
    <NLink
      v-for="genre in genres"
      :key="genre.id"
      :to="{ name: 'tracks', query: { genre } }"
      class="tag"
    >
      {{ genre }}
    </NLink>
    <div class="my-4 text-center">
      <NLink :to="{ name: 'tracks' }">
        Go to Tracks
      </NLink>
      <span class="mx-1">or</span>
      <NLink :to="{ name: 'playlists' }">
        Playlists <fa icon="angle-right" size="sm" fixed-width />
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
