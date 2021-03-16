<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>Playlists <small class="text-muted">via SoundCloud or YouTube</small></h2>
    </div>
    <ListPlaylists :playlists="playlists" />
  </div>
</template>

<script>
import { scrollToTop } from '~/utils/scroll'

export default {
  async asyncData ({ $axios }) {
    const playlists = await $axios.$get('playlists')

    return {
      playlists: playlists.items
    }
  },
  head () {
    return {
      title: 'Playlists'
    }
  },
  mounted () {
    scrollToTop()
  }
}
</script>
